import {normalizeName} from './name-validation.mjs';
// Attach to the existing Supabase client. All booking data lives in PostgreSQL.
// Browser storage contains request metadata only, never the traveler records.
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function normalizeRequest(input) {
  if (!uuidPattern.test(input?.flightId ?? '')) throw new Error('Select a valid flight.');
  if (!['Economy Basic', 'Economy Flex'].includes(input.fareClass)) throw new Error('Select a fare class.');
  function contact(person) {
    const p = {full_name: normalizeName(person?.full_name), dob: String(person?.dob ?? ''),
      email: String(person?.email ?? '').trim(), phone: String(person?.phone ?? '').trim()};
    const d = new Date(p.dob + 'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.dob) || !Number.isFinite(d.getTime()) || d.toISOString().slice(0,10) !== p.dob)
      throw new Error('Enter a valid date of birth.');
    if (p.dob < '1900-01-01' || p.dob > new Date().toISOString().slice(0,10)) throw new Error('Check the date of birth.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) || p.email.length > 255) throw new Error('Enter a valid email.');
    if (!/^\+?[\d ()-]{7,32}$/.test(p.phone) || p.phone.replace(/\D/g,'').length < 7) throw new Error('Enter a valid phone number.');
    if (person.seat_number) throw new Error('This demo allocates seats at check-in.');
    return p;
  }
  if (!Array.isArray(input.travelers) || input.travelers.length < 1 || input.travelers.length > 9)
    throw new Error('Add 1-9 travelers.');
  return {p_flight_id: input.flightId, p_fare_class: input.fareClass,
    p_booker: contact(input.booker), p_travelers: input.travelers.map(contact)};
}

export function createBookingAdapter({supabase, storage, cryptoProvider = globalThis.crypto}) {
  if (!supabase?.rpc || !supabase?.auth?.getSession) throw new Error('Provide your authenticated Supabase client.');
  if (!storage?.getItem || !storage?.setItem || !storage?.removeItem) throw new Error('Provide sessionStorage or a compatible metadata store.');
  let inFlight;
  async function session() {
    const {data, error} = await supabase.auth.getSession();
    if (error || !data?.session?.user?.id) throw new Error('Sign in before booking.');
    return data.session.user.id;
  }
  function read(key) { const value = storage.getItem(key); return value ? JSON.parse(value) : null; }
  async function rpc(name, args) {
    const {data, error} = await supabase.rpc(name, args);
    if (error) {
      const e = new Error(error.message || 'Database request failed.'); e.code = error.code; throw e;
    }
    return data;
  }
  async function fingerprint(payload) {
    const bytes = await cryptoProvider.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload)));
    return [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2,'0')).join('');
  }
  async function performCreate(input) {
    const body = normalizeRequest(input), uid = await session();
    const key = `skybook-request:${uid}`, signature = await fingerprint(body);
    let pending = read(key);
    if (pending && pending.fingerprint !== signature) throw new Error('Resolve the original booking request before changing its data.');
    if (!pending) {
      pending = {requestKey: cryptoProvider.randomUUID(), fingerprint: signature};
      storage.setItem(key,JSON.stringify(pending)); // persist before sending, for lost-response recovery
    }
    let booking;
    try { booking = await rpc('skybook_create_booking',{p_request_key:pending.requestKey,...body}); }
    catch(error) {
      // These errors are explicit transaction rejection from our RPC, not timeouts.
      if (['22023','42501'].includes(error.code)) storage.removeItem(key);
      throw error;
    }
    if (!booking?.booking_id) throw new Error('No booking receipt. Keep the same request key and check again.');
    storage.setItem(key,JSON.stringify({...pending,bookingId:booking.booking_id}));
    return booking;
  }
  return {
    createBooking(input) {
      const normalized = JSON.stringify(normalizeRequest(input));
      if (inFlight) {
        if (inFlight.payload !== normalized) return Promise.reject(new Error('A different booking request is still in progress.'));
        return inFlight.promise;
      }
      const promise = performCreate(input).finally(() => { inFlight = undefined; });
      inFlight = {promise, payload:normalized};
      return promise;
    },
    async readBooking(bookingId) {
      await session();
      if (!uuidPattern.test(bookingId ?? '')) throw new Error('Invalid booking ID.');
      return rpc('skybook_get_booking',{p_booking_id:bookingId});
    },
    async recoverBooking() {
      const uid = await session(), key = `skybook-request:${uid}`, pending = read(key);
      if (!pending) return null;
      const booking = await rpc('skybook_lookup_request',{p_request_key:pending.requestKey});
      if (booking?.booking_id) storage.setItem(key,JSON.stringify({...pending,bookingId:booking.booking_id}));
      return booking;
    },
    async startNewBooking() {
      if (inFlight) throw new Error('Wait for the current request.');
      const uid = await session(), key = `skybook-request:${uid}`, pending = read(key);
      if (pending && !pending.bookingId) throw new Error('Keep the original key. Recover or retry the unresolved request first.');
      storage.removeItem(key);
    },
    async simulateConfirmation(bookingId) {
      const uid = await session();
      if (!uuidPattern.test(bookingId ?? '')) throw new Error('Invalid booking ID.');
      const key = `skybook-demo-payment:${uid}:${bookingId}`;
      let requestKey = storage.getItem(key);
      if (!requestKey) { requestKey = cryptoProvider.randomUUID(); storage.setItem(key,requestKey); }
      return rpc('skybook_demo_confirm',{p_booking_id:bookingId,p_request_key:requestKey});
    }
  };
}

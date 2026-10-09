// Example wiring for the CURRENT web. Use your actual form IDs/field extraction.
// Supabase client/authentication initialization belongs to the existing application.
import {createBookingAdapter} from './booking-adapter.mjs';
export function connectBookingForm({supabase, form, collectInput, showBooking, showError}) {
  const bookings = createBookingAdapter({supabase,storage:sessionStorage});
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('[type="submit"]');
    if (button?.disabled) return;
    if (button) button.disabled = true;
    try {
      const receipt = await bookings.createBooking(collectInput());
      showBooking(receipt); // countdown comes from receipt.hold_expiry, not a new local 30 min
    } catch(error) { showError(error.message + ' Keep the original request for recovery.'); }
    finally { if(button) button.disabled = false; }
  });
  return bookings;
}

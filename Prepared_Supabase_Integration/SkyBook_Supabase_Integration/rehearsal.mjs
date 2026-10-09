import {createBookingAdapter} from './booking-adapter.mjs';
const $=id=>document.getElementById(id), uid='00000000-0000-4000-8000-000000000099';
const bookings=new Map(), requests=new Map(), calls=[];
let receipt=null, busy=false, sequence=0;
const prefix='skybook-rehearsal:';
const storage={getItem:key=>sessionStorage.getItem(prefix+key),setItem:(key,value)=>sessionStorage.setItem(prefix+key,value),removeItem:key=>sessionStorage.removeItem(prefix+key)};
function message(text){$('message').textContent=text;}
function checkExpiry(row){if(row?.status==='PENDING_PAYMENT'&&Date.parse(row.hold_expiry)<=Date.now())row.status='EXPIRED';return row;}
function copy(row){return row?structuredClone(row):null;}
const mock={
  auth:{getSession:async()=>({data:{session:{user:{id:uid}}}})},
  async rpc(name,args){
    calls.push({name,key:args.p_request_key??null});
    await new Promise(resolve=>setTimeout(resolve,120));
    let row;
    if(name==='skybook_create_booking'){
      if(requests.has(args.p_request_key))row=bookings.get(requests.get(args.p_request_key));
      else{
        const adultLimit=new Date();adultLimit.setUTCFullYear(adultLimit.getUTCFullYear()-18);
        if(args.p_booker.dob>adultLimit.toISOString().slice(0,10)||args.p_travelers[0].dob>adultLimit.toISOString().slice(0,10))return {error:{code:'22023',message:'This rehearsal requires an adult booker and one adult traveler.'}};
        sequence++;
        const han=args.p_flight_id.endsWith('1'),flex=args.p_fare_class==='Economy Flex';
        row={booking_id:crypto.randomUUID(),status:'PENDING_PAYMENT',flight_id:args.p_flight_id,fare_class:args.p_fare_class,hold_reference:`MOCK-HOLD-${sequence}`,hold_expiry:new Date(Date.now()+30*60*1000).toISOString(),total_amount:han?(flex?1940000:1640000):(flex?1590000:1290000),currency:'VND',pnr:null,booker:args.p_booker,travelers:args.p_travelers,mode:'MOCK_REHEARSAL'};
        bookings.set(row.booking_id,row);requests.set(args.p_request_key,row.booking_id);
      }
      if($('lose-response').checked){$('lose-response').checked=false;throw new Error('Simulated lost response. Recover the original request or retry with the same data.');}
    }else if(name==='skybook_lookup_request')row=bookings.get(requests.get(args.p_request_key));
    else if(name==='skybook_get_booking')row=bookings.get(args.p_booking_id);
    else if(name==='skybook_demo_confirm'){
      row=checkExpiry(bookings.get(args.p_booking_id));
      if(!row||!['PENDING_PAYMENT','CONFIRMED'].includes(row.status))return {error:{code:'22023',message:'No valid unpaid hold. Reset the rehearsal to start again.'}};
      if(row.status!=='CONFIRMED')Object.assign(row,{status:'CONFIRMED',pnr:'ABC234',payment_status:'SUCCESS',payment_mode:'MOCK_REHEARSAL',commit_reference:`MOCK-COMMIT-${sequence}`});
    }else return {error:{message:'Unsupported mock RPC'}};
    return {data:copy(checkExpiry(row))};
  }
};
const adapter=createBookingAdapter({supabase:mock,storage});
function paint(){
  $('booking-state').textContent=receipt?.status??'NO_BOOKING';$('booking-id').textContent=receipt?.booking_id??'None';
  $('amount').textContent=receipt?`${receipt.total_amount.toLocaleString('en-US')} VND (fixture)`:'None';$('pnr').textContent=receipt?.pnr??'None';
  const seconds=receipt?Math.max(0,Math.floor((Date.parse(receipt.hold_expiry)-Date.now())/1000)):0;
  $('countdown').textContent=receipt?.status==='PENDING_PAYMENT'?`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} remaining. Original deadline: ${receipt.hold_expiry}`:(receipt?`${receipt.status}. Original deadline: ${receipt.hold_expiry}`:'No hold');
  $('receipt').textContent=receipt?JSON.stringify(receipt,null,2):'No receipt';$('calls').textContent=JSON.stringify(calls,null,2);
  $('create').disabled=busy;$('recover').disabled=busy;$('new-request').disabled=busy;
  $('confirm').disabled=busy||receipt?.status!=='PENDING_PAYMENT'||seconds<=0;
  $('expire').disabled=busy||receipt?.status!=='PENDING_PAYMENT';
}
async function act(fn){if(busy)return;busy=true;paint();try{await fn();}catch(error){message(error.message);}finally{busy=false;paint();}}
function person(prefix){return {full_name:$(prefix+'-name').value,dob:$(prefix+'-dob').value,email:$(prefix+'-email').value,phone:$(prefix+'-phone').value};}
$('booking').addEventListener('submit',event=>{event.preventDefault();act(async()=>{receipt=await adapter.createBooking({flightId:$('flight').value,fareClass:$('fare').value,booker:person('b'),travelers:[person('t')]});message('Mock booking loaded. No real database or payment.');});});
$('recover').onclick=()=>act(async()=>{receipt=await adapter.recoverBooking();message(receipt?'Original mock booking recovered. The hold deadline is unchanged.':'No sample booking in this page memory. Reset after a reload.');});
$('confirm').onclick=()=>act(async()=>{receipt=await adapter.simulateConfirmation(receipt.booking_id);message('Payment and seat commit simulated. This mock PNR is not a real ticket.');});
$('new-request').onclick=()=>act(async()=>{await adapter.startNewBooking();receipt=null;message('Ready for a new request. Previous sample bookings remain in page memory.');});
$('expire').onclick=()=>act(async()=>{bookings.get(receipt.booking_id).hold_expiry=new Date(Date.now()-1000).toISOString();receipt=await adapter.readBooking(receipt.booking_id);message('Unpaid sample hold expired. Payment is disabled.');});
$('reset').onclick=()=>{if(busy)return;bookings.clear();requests.clear();calls.length=0;sequence=0;receipt=null;for(const key of Object.keys(sessionStorage))if(key.startsWith(prefix))sessionStorage.removeItem(key);$('booking').reset();paint();message('Rehearsal reset.');};
// Read-only diagnostics for the local rehearsal checks, never database evidence.
window.rehearsal={snapshot:()=>({bookings:[...bookings.values()].map(copy),calls:copy(calls),receipt:copy(receipt),busy})};
paint();setInterval(paint,1000);

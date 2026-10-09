import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {createBookingAdapter,normalizeRequest} from '../booking-adapter.mjs';
const uid='00000000-0000-4000-8000-000000000099', bid='00000000-0000-4000-8000-000000000098';
const request={flightId:'00000000-0000-4000-8000-000000000001',fareClass:'Economy Basic',
 booker:{full_name:'Demo Booker',dob:'1990-01-01',email:'booker@example.test',phone:'0900000000'},
 travelers:[{full_name:'Demo Traveler',dob:'2000-01-01',email:'traveler@example.test',phone:'0900000001'}]};
function fixture(handler,loggedIn=true){
 const data=new Map(),calls=[];
 const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const supabase={auth:{getSession:async()=>({data:{session:loggedIn?{user:{id:uid}}:null}})},
 rpc:async(name,args)=>{calls.push({name,args});return handler(name,args,calls.length);}};
 const create=()=>createBookingAdapter({supabase,storage,cryptoProvider:webcrypto});
 return {adapter:create(),create,calls,data};
}
test('invalid traveler data never calls database',()=>{
 const f=fixture(()=>({data:{booking_id:bid}}));
 assert.throws(()=>f.adapter.createBooking({...request,travelers:[{...request.travelers[0],dob:'2025-02-30'}]}),/date/);
 assert.equal(f.calls.length,0);
});
test('unauthenticated request cannot create booking',async()=>{
 const f=fixture(()=>({data:{}}),false);
 await assert.rejects(f.adapter.createBooking(request),/Sign in/);assert.equal(f.calls.length,0);
});
test('concurrent repeated submit shares one operation and one receipt',async()=>{
 const f=fixture(async()=>{await new Promise(resolve=>setTimeout(resolve,5));return {data:{booking_id:bid,hold_expiry:'2030-01-01T01:00:00Z'}};});
 const [a,b]=await Promise.all([f.adapter.createBooking(request),f.adapter.createBooking(request)]);
 assert.deepEqual(a,b);assert.equal(f.calls.length,1);
});
test('network failure then reload/retry reuses the original request key',async()=>{
 const f=fixture((name,args,n)=>n===1?Promise.reject(new Error('Lost response')):{data:{booking_id:bid}});
 await assert.rejects(f.adapter.createBooking(request),/Lost/);
 const original=f.calls[0].args.p_request_key;
 await f.create().createBooking(request);
 assert.equal(f.calls[1].args.p_request_key,original);
});
test('unknown original request prevents edited payload or new operation',async()=>{
 const f=fixture(()=>Promise.reject(new Error('Timeout')));
 await assert.rejects(f.adapter.createBooking(request));
 await assert.rejects(f.adapter.createBooking({...request,fareClass:'Economy Flex'}),/original/);
 await assert.rejects(f.adapter.startNewBooking(),/unresolved/);assert.equal(f.calls.length,1);
});
test('recovery performs database lookup without creating another booking',async()=>{
 const f=fixture((name)=>name==='skybook_create_booking'?Promise.reject(new Error('Lost')):{data:{booking_id:bid}});
 await assert.rejects(f.adapter.createBooking(request));
 assert.equal((await f.create().recoverBooking()).booking_id,bid);
 assert.equal(f.calls[1].name,'skybook_lookup_request');
});
test('metadata store contains no personal details',async()=>{
 const f=fixture(()=>({data:{booking_id:bid}}));await f.adapter.createBooking(request);
 const stored=[...f.data.values()].join('');
 for(const text of ['Demo Booker','example.test','1990-01-01','0900000000'])assert.equal(stored.includes(text),false);
});
test('read loads from RPC and preserves original hold expiry',async()=>{
 const f=fixture(()=>({data:{booking_id:bid,hold_expiry:'2030-01-01T01:00:00Z'}}));
 assert.equal((await f.adapter.readBooking(bid)).hold_expiry,'2030-01-01T01:00:00Z');
 assert.equal(f.calls[0].name,'skybook_get_booking');
});
test('simulation always calls server RPC and reuses its operation key',async()=>{
 const f=fixture(()=>({data:{booking_id:bid,status:'CONFIRMED',evidence_mode:'SIMULATED_SERVICES'}}));
 await f.adapter.simulateConfirmation(bid);await f.create().simulateConfirmation(bid);
 assert.equal(f.calls[0].name,'skybook_demo_confirm');
 assert.equal(f.calls[0].args.p_request_key,f.calls[1].args.p_request_key);
});
test('new explicit booking uses a new key only after receipt exists',async()=>{
 const f=fixture(()=>({data:{booking_id:bid}}));await f.adapter.createBooking(request);
 await f.adapter.startNewBooking();await f.adapter.createBooking(request);
 assert.notEqual(f.calls[0].args.p_request_key,f.calls[1].args.p_request_key);
});
test('traveler count limits and seat selection match MVP scope',()=>{
 assert.throws(()=>normalizeRequest({...request,travelers:[]}),/1-9/);
 assert.throws(()=>normalizeRequest({...request,travelers:Array(10).fill(request.travelers[0])}),/1-9/);
 assert.throws(()=>normalizeRequest({...request,travelers:[{...request.travelers[0],seat_number:'12A'}]}),/check-in/);
});
test('different concurrent input cannot silently reuse an in-flight request',async()=>{
 const f=fixture(async()=>{await new Promise(resolve=>setTimeout(resolve,5));return {data:{booking_id:bid}};});
 const original=f.adapter.createBooking(request);
 await assert.rejects(f.adapter.createBooking({...request,fareClass:'Economy Flex'}),/different/);
 await original;assert.equal(f.calls.length,1);
});
test('explicit database validation rejection allows correcting the input',async()=>{
 const f=fixture((name,args,n)=>n===1?{error:{code:'22023',message:'Booker age rejected'}}:{data:{booking_id:bid}});
 await assert.rejects(f.adapter.createBooking(request),/age/);
 await f.adapter.createBooking({...request,fareClass:'Economy Flex'});
 assert.notEqual(f.calls[0].args.p_request_key,f.calls[1].args.p_request_key);
});

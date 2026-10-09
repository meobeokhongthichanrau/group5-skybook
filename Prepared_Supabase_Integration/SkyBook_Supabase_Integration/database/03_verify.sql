-- NOT EXECUTED on your Supabase project. Run only in the demo project after setup.
-- Create TWO synthetic test users in Authentication first, using these emails.
-- All fixture writes are rolled back. Missing users cause a deliberate failure.
begin;
create temp table test_users as select
 (select id from auth.users where email='skybook.owner@example.test') owner_id,
 (select id from auth.users where email='skybook.other@example.test') other_id;
do $$ begin
 if exists(select 1 from test_users where owner_id is null or other_id is null) then
  raise exception 'Create both synthetic test users first'; end if;
end $$;
grant select on test_users to authenticated;
select set_config('request.jwt.claim.sub',(select owner_id::text from test_users),true);
set local role authenticated;
do $$
declare bid uuid; receipt jsonb; repeat_receipt jsonb; rk uuid:=gen_random_uuid();
 fid uuid:='00000000-0000-4000-8000-000000000001';
 booker jsonb:='{"full_name":"Demo Booker","dob":"1990-01-01","email":"booker@example.test","phone":"0900000000"}';
 travelers jsonb:='[{"full_name":"Demo Traveler","dob":"2000-01-01","email":"traveler@example.test","phone":"0900000001"}]';
 before_count integer;
begin
 receipt:=public.skybook_create_booking(rk,fid,'Economy Basic',booker,travelers);
 bid:=(receipt->>'booking_id')::uuid;
 assert receipt->>'status'='PENDING_PAYMENT','Expected acknowledged simulated hold';
 assert jsonb_array_length(receipt->'travelers')=1,'Missing traveler';
 repeat_receipt:=public.skybook_create_booking(rk,fid,'Economy Basic',booker,travelers);
 assert repeat_receipt->>'booking_id'=bid::text,'Duplicate operation created another booking';
 assert repeat_receipt->>'hold_expiry'=receipt->>'hold_expiry','Replay reset countdown';
 select count(*) into before_count from skybook_demo.booking;
 begin
  perform public.skybook_create_booking(gen_random_uuid(),fid,'Economy Basic',booker,'[]');
  raise exception 'TEST FAILURE: invalid traveler count accepted';
 exception when invalid_parameter_value then null; end;
 assert (select count(*) from skybook_demo.booking)=before_count,'Rejected input created an orphan booking';
 begin
  update skybook_demo.booking set status='CONFIRMED' where booking_id=bid;
  raise exception 'TEST FAILURE: browser role could change status directly';
 exception when insufficient_privilege then null; end;
 receipt:=public.skybook_demo_confirm(bid,gen_random_uuid());
 assert receipt->>'status'='CONFIRMED','Simulation did not confirm';
 assert receipt->>'evidence_mode'='SIMULATED_SERVICES','Simulation disclosure missing';
 assert receipt->>'inventory_commit_ref' like 'SIMULATED-COMMIT-%','Missing simulated commit evidence';
 assert receipt->'payment'->>'evidence_mode'='SIMULATED','Missing simulated money evidence';
 assert (select count(*) from skybook_demo.payment where booking_id=bid)=1,'Payment multiplicity violated';
 perform public.skybook_demo_confirm(bid,gen_random_uuid());
 assert (select count(*) from skybook_demo.payment where booking_id=bid)=1,'Repeated confirmation created payment';
 perform set_config('skybook.test.booking_id',bid::text,true);
end $$;
reset role;
select set_config('request.jwt.claim.sub',(select other_id::text from test_users),true);
set local role authenticated;
do $$ begin
 assert not exists(select 1 from skybook_demo.booking where booking_id=current_setting('skybook.test.booking_id')::uuid),'RLS exposed another owner booking';
 begin
  perform public.skybook_get_booking(current_setting('skybook.test.booking_id')::uuid);
  raise exception 'TEST FAILURE: RPC exposed another owner booking';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
-- Privileged fixture checks for internal constraints; never grant these writes to clients.
do $$
declare pid uuid; captured numeric; rid uuid;
begin
 select payment_id,total_amount into pid,captured from skybook_demo.payment
 where booking_id=current_setting('skybook.test.booking_id')::uuid;
 assert skybook_demo.valid_name('Nguyễn Tiến Phát');
 assert skybook_demo.valid_name('李明');
 assert not skybook_demo.valid_name('Khoa123');
 assert not skybook_demo.valid_name('---');
 begin
  insert into skybook_demo.refund(payment_id,amount,refund_operation_key,status)
   values(pid,-1,gen_random_uuid(),'REQUESTED');
  raise exception 'TEST FAILURE: negative refund accepted';
 exception when check_violation then null; end;
 begin
  insert into skybook_demo.refund(payment_id,amount,refund_operation_key,status)
   values(pid,captured+1,gen_random_uuid(),'REQUESTED');
  raise exception 'TEST FAILURE: over-capture refund accepted';
 exception when check_violation then null; end;
 insert into skybook_demo.refund(payment_id,amount,refund_operation_key,status)
  values(pid,0,gen_random_uuid(),'REQUESTED') returning refund_id into rid;
 delete from skybook_demo.refund where refund_id=rid;
 insert into skybook_demo.refund(payment_id,amount,refund_operation_key,status)
  values(pid,captured,gen_random_uuid(),'REQUESTED');
 begin
  update skybook_demo.payment set total_amount=captured-1 where payment_id=pid;
  raise exception 'TEST FAILURE: capture lowered beneath refund';
 exception when check_violation then null; end;
 begin
  delete from skybook_demo.passenger where booking_id=current_setting('skybook.test.booking_id')::uuid;
  set constraints all immediate;
  raise exception 'TEST FAILURE: empty passenger list accepted';
 exception when check_violation then null; end;
 set constraints all immediate;
end $$;
rollback;
-- Success proves ONLY the assertions above in this database session.
-- Add separate API-auth, concurrency, expiry, capacity and deployed-browser tests.

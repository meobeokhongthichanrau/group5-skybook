-- Fictional fares, dates and capacity. Run after 01_schema.sql.
insert into skybook_demo.flight(flight_id,flight_number,origin,destination,departure_time,capacity,basic_vnd,flex_vnd) values
 ('00000000-0000-4000-8000-000000000001','DEMO-VN220','SGN','HAN',((now() at time zone 'Asia/Ho_Chi_Minh')::date+2+time '09:30') at time zone 'Asia/Ho_Chi_Minh',30,1640000,1940000),
 ('00000000-0000-4000-8000-000000000002','DEMO-VN120','SGN','DAD',((now() at time zone 'Asia/Ho_Chi_Minh')::date+3+time '14:20') at time zone 'Asia/Ho_Chi_Minh',20,1290000,1590000)
on conflict(flight_id) do nothing;

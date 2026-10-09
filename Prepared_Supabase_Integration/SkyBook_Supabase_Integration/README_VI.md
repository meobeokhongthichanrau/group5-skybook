# SkyBook: bộ tích hợp Supabase cho bài cuối kỳ

Đây là bộ code tích hợp và trang kiểm tra riêng, **chưa phải bản sửa đã deploy của skybook-vn.netlify.app**. Snapshot mã nguồn đang được phục vụ trên Netlify được đóng gói riêng trong `../../SkyBook_Web_Source`; snapshot đó vẫn là prototype tĩnh, chưa gắn bộ Supabase này. Migration và kiểm thử trên Supabase project của nhóm chưa được thực hiện trong bộ bằng chứng hiện có.

## Bắt đầu luyện demo trên máy

Chạy bằng Node, không cần cài thư viện:

```bash
node serve-demo.mjs
```

Mở `http://127.0.0.1:8000/rehearsal.html`. Không mở HTML trực tiếp bằng file URL vì trang dùng ES modules. Trang có **mock session và RPC giả lập**, booking lưu trong bộ nhớ trang. Reload sẽ mất dữ liệu booking mẫu. Chỉ metadata khóa yêu cầu ở sessionStorage; đó không phải database.

Ví dụ thống nhất với slide và SRS: DEMO-VN220, SGN đi HAN, Economy Flex, một người lớn, giá fixture 1.940.000 VND. Người đặt và hành khách là hai người test khác nhau.

Luồng luyện: Create → xem PENDING_PAYMENT và deadline gốc → Create lại để kiểm tra cùng booking → Simulate payment and commit → CONFIRMED và mock PNR ABC234. Nếu muốn luyện lỗi mạng: Reset → bật Lose response → Create → Recover. Khi kết quả chưa rõ, sửa dữ liệu hoặc bắt đầu khóa mới sẽ bị chặn. Không dùng reload của trang này để chứng minh lưu database.

Đã chạy riêng **8 kiểm tra sự kiện rehearsal** bằng `node rehearsal-checks.mjs`: 8 đạt, 0 lỗi. Môi trường là Node với DOM stubs và RPC giả lập trong RAM. Kết quả ở `rehearsal-check-results.json`. Giao diện rehearsal, SQL và RLS chưa được kiểm chứng trên môi trường thật. Riêng prototype Netlify đã có 4 smoke check bằng trình duyệt; kết quả đó chỉ chứng minh luồng UI mẫu. Bộ kiểm thử mục tiêu hiện có 56 ca bám theo 56 mã yêu cầu trong SRS.

`demo.html` là trang kiểm tra Supabase riêng, yêu cầu cấu hình test project, schema, seed và user test. Khi đã cấu hình, booking được kỳ vọng lưu ở PostgreSQL; hiện chưa có kết quả thực thi xác nhận điều đó. Gateway, Inventory và PNR vẫn mô phỏng ngay cả ở chế độ này.

## Đã chuẩn bị

- SQL cho 7 bảng Customer, Flight, Booking, Passenger, Payment, PaymentAttempt, Refund, khóa và quan hệ tương ứng với mô hình.
- RPC tạo booking: kiểm tra người sở hữu từ Supabase Auth, xác thực dữ liệu, khóa dòng Flight và kiểm tra capacity mô phỏng, tạo Booking + Passenger trong cùng giao dịch, trả về hold 30 phút từ database.
- Khóa yêu cầu ổn định: gửi lại cùng dữ liệu và khóa nhận booking cũ; khác dữ liệu bị từ chối. Adapter giữ khóa khi mất phản hồi và hỗ trợ đọc lại bằng RPC.
- RLS đọc dữ liệu của chính chủ. Browser không có quyền INSERT/UPDATE trực tiếp các bảng nghiệp vụ; ghi dữ liệu qua RPC có kiểm tra chủ sở hữu.
- RPC xác nhận demo: ghi Payment SUCCESS và PaymentAttempt SUCCESS **mô phỏng**, tạo Inventory commit reference **mô phỏng**, rồi mới đổi Booking sang CONFIRMED trong cùng giao dịch.
- Adapter JavaScript và ví dụ gắn vào form của web hiện có. Trang `demo.html` kiểm tra một hành khách; adapter/database hỗ trợ 1-9.

## Trạng thái kiểm thử

Đã chạy và đạt **26 kiểm thử client** bằng Node. Các kiểm thử dùng RPC giả lập để kiểm tra hợp đồng của client, bấm lặp, giữ khóa sau mất phản hồi, phục hồi, xử lý dữ liệu sai, quyền đăng nhập và metadata.

**Chưa chạy SQL trên PostgreSQL/Supabase. Chưa kiểm thử RLS thực tế, concurrent database requests, expiry/capacity trên database, hoặc luồng browser có kết nối Supabase.** File `database/03_verify.sql` là kịch bản kiểm tra cần chạy, không phải báo cáo đã đạt. Không dùng 26 kiểm thử client hay 4 UI smoke check để nói database hoặc toàn bộ hệ thống đã pass.

## 1. Cài schema trong môi trường demo

1. Dùng một Supabase project demo riêng, hoặc review schema mới `skybook_demo` trong project hiện có. Không chạy tùy tiện lên dữ liệu thật.
2. Mở SQL Editor, chạy `database/01_schema.sql`, sau đó `database/02_seed.sql`.
3. Migration chạy một lần. Nếu namespace/hàm đã tồn tại, script báo lỗi và rollback; không xóa schema hiện có để cố chạy lại.
4. Không cần thêm `skybook_demo` vào exposed schemas để dùng RPC: các RPC có tên `public.skybook_*`, còn bảng ở schema riêng. Xem bảng trong Table Editor bằng cách chọn schema `skybook_demo`.
5. Tạo một tài khoản khách demo trong Supabase Authentication, dùng dữ liệu giả. Cơ chế này không yêu cầu bật anonymous sign-in hoặc cấp quyền INSERT công khai.

## 2. Cấu hình trang thử nghiệm

1. Trong `config.mjs`, điền Project URL và **publishable key hoặc legacy anon key** lấy từ project. Không điền dashboard password, database password, `sb_secret_*` hoặc service_role key.
2. Chạy server tĩnh, ví dụ `python -m http.server 8000`, rồi mở `http://localhost:8000/demo.html`.
3. Trang thử nghiệm dùng Supabase JavaScript SDK v2 từ CDN, cần Internet. Source adapter không cần dependency npm.
4. Đăng nhập bằng tài khoản khách demo, chọn Flight được seed, nhập Booker và Traveler, bấm Create booking.
5. Mở Table Editor để kiểm tra Booking/Passenger. Bấm Read / recover hoặc reload rồi Read / recover để đọc lại bằng RPC.
6. Nếu bấm Simulate Gateway success and Inventory commit, phải nói rõ hai dịch vụ đều mô phỏng. Database persistence là thật khi migration và request đã được xác minh trên project.

## 3. Gắn vào web Netlify hiện tại

1. Đưa `booking-adapter.mjs`, `name-validation.mjs` và `integrate-existing-web.mjs` vào source của web hiện tại.
2. Truyền Supabase client đang sử dụng và session khách đã đăng nhập vào `connectBookingForm`. Viết `collectInput()` theo ID/fields thật của form. Ví dụ dữ liệu:

```js
{
  flightId: 'UUID_FROM_DATABASE',
  fareClass: 'Economy Basic',
  booker: {full_name: 'Demo Booker', dob: '1990-01-01', email: 'booker@example.test', phone: '0900000000'},
  travelers: [{full_name: 'Demo Traveler', dob: '2000-01-01', email: 'traveler@example.test', phone: '0900000001'}]
}
```

3. Dùng `booking.hold_expiry` cho countdown. Reload không bắt đầu 30 phút mới.
4. Hiển thị dữ liệu trả về từ RPC. Không tự dựng booking receipt khi request lỗi. Không gọi `.update({status:'CONFIRMED'})` từ frontend.
5. `sessionStorage` của adapter chỉ giữ khóa thao tác, fingerprint và booking ID để phục hồi. Hồ sơ khách/hành khách nằm trong database. Đây không phải cách dùng LocalStorage thay database.
6. Nếu muốn thử riêng trên Netlify, deploy thư mục này vào **site demo mới**, mở `/demo.html`; không ghi đè site hiện tại trước khi tích hợp đúng form và kiểm thử.

## 4. Kiểm chứng trước khi sửa slide thành “đã triển khai”

- Chạy `node --test tests/*.test.mjs` để kiểm tra adapter.
- Tạo hai khách giả có email `skybook.owner@example.test` và `skybook.other@example.test`, sau đó chạy `database/03_verify.sql` trong project demo. Script rollback dữ liệu test và kiểm tra PK/FK được sử dụng, replay, dữ liệu sai, quyền đọc của chính chủ và chặn UPDATE trực tiếp. Nếu không có hai tài khoản, script dừng.
- Kiểm tra API bằng hai session khách thật để xác nhận server xác minh JWT và chính chủ. SQL test đặt auth claim chỉ kiểm tra quyền database, không chứng minh API xác minh token.
- Thử hai request cùng khóa đồng thời; kiểm tra một booking và đúng số Passenger. Thử request khác nhau khi còn một ghế. Kiểm tra timeout client rồi tra lại cùng khóa.
- Kiểm tra đúng hạn 30 phút: hết hạn chỉ khi chưa thanh toán; xác nhận demo sau hết hạn phải bị chặn. Người khác không đọc hoặc xác nhận booking của chủ.
- Lưu Network request/response, screenshot bảng có record giả và kết quả kiểm thử. Không đưa JWT, password hoặc dữ liệu cá nhân thật vào ảnh báo cáo.

## Những phần vẫn mô phỏng hoặc chưa triển khai

Inventory/capacity/commit là mô phỏng trong PostgreSQL, không kết nối nhà cung cấp vé. Gateway là mô phỏng, không trừ tiền. Refund chỉ có schema. Chưa triển khai cancellation, refund settlement, Gateway/Inventory timeout reconciliation, notification/email, vé thật, seat selection, round-trip hoặc multi-city. Không có kết quả đo NFR.

Tuổi booker tính tại checkout, tuổi traveler tính ngày khởi hành theo Asia/Ho_Chi_Minh, ngày đi từ ngày lịch kế tiếp: đây là lựa chọn **đề xuất** cho ISS-09/ISS-10 cần nhóm duyệt. Giá seed là giá mẫu trọn gói áp dụng như nhau cho các traveler, chưa đại diện biểu giá thực tế hoặc chính sách giá infant.

## Lời báo cáo sau khi kiểm chứng

Chỉ khi đã chạy và kiểm tra trên project mới nói: “The demo persists bookings and passengers in Supabase PostgreSQL. The Inventory and Payment Gateway outcomes are simulated. We verify ownership and create the booking and passenger records in one database transaction.”

Trước khi kiểm chứng, dùng: “We prepared the Supabase schema and integration code. Live deployment and database verification are pending.”

## Tài liệu chính thức

- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/getting-started/api-keys


## Đồng bộ với SRS ngày 09 October 2026

- BR-03: validator client và SQL dùng cùng tập Unicode 15.0 General_Category L, chuẩn NFC; 2-255 code point, ít nhất một chữ cái; cho phép dấu cách, gạch nối, apostrophe thẳng hoặc cong. Chặn chữ số, emoji, ký hiệu và xuống dòng. Kiểm tra format không xác minh tên theo giấy tờ.
- SQL có CHECK tên ở Customer, Booker snapshot và Passenger. Trigger Refund khóa Payment SUCCESS rồi kiểm tra 0 <= amount <= captured total; Payment update không thể làm vô hiệu cap đã có. Zero balance không cần gửi tiền cho provider.
- Count constraints chờ cuối giao dịch: Booking có 1-9 Passenger và Payment có ít nhất một PaymentAttempt. Script 03_verify kiểm tra deferred constraints bằng SET CONSTRAINTS ALL IMMEDIATE. SQL vẫn chưa được thực thi.
- Tất cả tiền lưu NUMERIC(18,0), đơn vị một VND nguyên. Seed là dữ liệu minh họa, không có itemized fare/thuế/phí hay giá infant đã duyệt. Chưa triển khai FR-PAY-02/FR-BOOK-07 đầy đủ.
- INITIATED/hold ACK bất định là thiết kế mục tiêu. RPC demo mô phỏng ACK hold ngay trong giao dịch, không gọi Inventory hoặc thể hiện thời gian chờ ACK thật.
- FR-BOOK-04 vẫn thuộc yêu cầu mục tiêu; demo chỉ để phân bổ tại check-in, chưa triển khai bộ máy check-in hoặc chọn ghế.
- NFR-SEC-02 chưa có bằng chứng nghiệm thu mã hóa at rest; không có field encryption trong package. RLS không thay thế mã hóa. Chỉ dùng hồ sơ giả, không lưu PAN/CVV hoặc token thanh toán thật.
- 56 ca kiểm tra bám theo yêu cầu đã được lập trong Test Case Suite. Phần lớn vẫn PLANNED / NOT RUN trên hệ thống đích; 26 test client và 4 UI smoke check chỉ là bằng chứng trong môi trường đã ghi rõ.

SQL này dành cho schema demo mới. Nếu đã chạy bản cũ, cần migration riêng được review; không xóa schema đang có hoặc chạy chồng để bỏ lỗi.

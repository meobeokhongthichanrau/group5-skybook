const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const words = {
  en: {
    navHome:'Home',navFlights:'Flights',navBookings:'My Bookings',navManage:'Manage Booking',navSupport:'Support',demoAccount:'Demo account',
    heroEyebrow:'YOUR NEXT JOURNEY STARTS HERE',heroTitle:'Explore the World',heroSubtitle:'Find a flight that fits your plans.',
    oneWay:'One-way',roundTrip:'Round-trip',multiCity:'Multi-city',from:'From',to:'To',departure:'Departure Date',returnDate:'Return Date',passengers:'Passengers',travelClass:'Travel Class',searchFlights:'Search Flights',
    basic:'Economy Basic',flex:'Economy Flex',passengerOne:'1 Passenger',passengersMany:'{n} Passengers',leg:'Leg',addLeg:'+ Add another leg',removeLeg:'Remove leg',
    sampleFares:'SAMPLE FARES · NO LIVE INVENTORY',availableFlights:'Available Flights',sortBy:'Sort by',priceSort:'Price (Low to High)',timeSort:'Departure Time',durationSort:'Shortest Flight',
    select:'Select',selected:'Selected',direct:'Direct',chooseFlight:'Choose a flight for this leg.',noFlights:'No flights match these details.',tryAnother:'Try a different route or date.',
    yourTrip:'YOUR TRIP',bookingSummary:'Booking Summary',summaryIntro:'Select a flight to see your trip and total.',outbound:'Outbound',inbound:'Return',
    fare:'Fare',taxes:'Taxes & fees',total:'Total',perPerson:'per person',continueBooking:'Continue Booking',chooseAllLegs:'Choose a flight for every leg to continue.',demoOnly:'Demo only · No real ticket or payment.',
    clearFares:'Clear fares',clearFaresDesc:'See your total before booking',helpfulSupport:'Helpful support',helpfulSupportDesc:'Answers when you need them',simpleBooking:'Simple booking',simpleBookingDesc:'A few clear steps',moreRoutes:'More routes',moreRoutesDesc:'Explore sample destinations',
    yourJourneys:'YOUR JOURNEYS',bookingsIntro:'Your demo bookings from this browser session appear here.',noBookings:'No bookings yet',noBookingsText:'Choose a sample flight to create your first demo booking.',browseFlights:'Browse flights',
    tripDetails:'TRIP DETAILS',manageIntro:'Look up a demo booking using its reference and email.',bookingReference:'Booking reference',email:'Email',findBooking:'Find booking',bookingNotFound:'No matching booking in this session. Check the reference and email.',
    status:'Status',confirmed:'Confirmed',cancelled:'Cancelled',manage:'Manage',cancelBooking:'Cancel demo booking',cancelConfirm:'Confirm cancellation',keepBooking:'Keep booking',basicCannotCancel:'Economy Basic is non-cancellable in this demo.',tooLate:'Cancellation is unavailable less than 2 hours before departure.',refundEstimate:'Estimated demo refund',refundFull:'Full refund: at least 24 hours before departure.',refundHalf:'A 50% cancellation fee applies from 2 to under 24 hours before departure.',cancelDisclaimer:'This only changes your demo booking. No money is moved.',
    helpCenter:'HELP CENTER',supportIntro:'Quick answers about this SkyBook demo.',footerNote:'A flight booking prototype. Fares and bookings are examples; no real tickets or payments are issued.',
    invalidRoute:'Choose two different airports.',invalidDate:'Choose a departure date from today onward.',invalidReturn:'Return date must be after departure.',invalidLegDate:'Trip dates must be in chronological order.',
    checkoutKicker:'BOOKING DETAILS',checkoutTitle:'Complete your demo booking',checkoutIntro:'Add your contact details. We will create a sample booking reference without collecting a payment.',fullName:'Full name',phone:'Phone number',confirmDemo:'Confirm Demo Booking',
    successKicker:'DEMO BOOKING CREATED',successTitle:'Your trip is ready to review',successText:'Your sample booking reference is',viewBookings:'View my bookings',close:'Close',confirmationNote:'Save the reference if you want to look up this booking before refreshing the page.',
    demoStatus:'Demo',route:'Route',date:'Date',travelers:'Travelers',fareClass:'Fare class',flight:'Flight',created:'Created',
    faq1:'Are these real flights and prices?',ans1:'No. The flight times and fares are sample data for a working prototype. SkyBook is not connected to airline inventory.',
    faq2:'Will I be charged when I book?',ans2:'No. The booking step does not collect card details or process payments. It creates a demo reference in this browser session only.',
    faq3:'Where can I find my booking?',ans3:'Open My Bookings to see bookings made in this session. You can also use the booking reference and email under Manage Booking.',
    faq4:'What happens if I refresh the page?',ans4:'Demo bookings are held only while this page remains open. A refresh clears them.',
    faq5:'Can I cancel a demo booking?',ans5:'Economy Flex can be cancelled until 2 hours before the first flight. A sample refund amount is shown; no real money changes hands.',
    toastSelected:'Flight selected',toastBooking:'Demo booking created',toastCancelled:'Demo booking cancelled',
    exploreRoutes:'Explore routes',routeDaNang:'Da Nang',routePhuQuoc:'Phu Quoc',routeNhaTrang:'Nha Trang',routeDaLat:'Da Lat',
    airlineFilter:'Airline',allAirlines:'All airlines',timeFilter:'Departure',anyTime:'Any time',morning:'Morning · before 12',afternoon:'Afternoon · 12–18',evening:'Evening · after 18',
    budgetFilter:'Budget per person',anyBudget:'Any budget',directOnly:'Direct only',resetFilters:'Clear filters',compareHint:'Select up to 3 to compare',bestFare:'Best fare',
    resultCount:'{n} sample flights · {route}',oneStop:'1 stop',compare:'Add to compare',comparing:'Added to compare',compareFlights:'Open comparison',compareSelection:'Compare {n} flights',compareIntro:'Prices shown per person for this leg. These flights and fares are examples.',removeCompare:'Remove from comparison',clearComparison:'Clear comparison',comparisonLimit:'You can compare up to 3 flights.',noFilterMatches:'No flights match your filters.',adjustFilters:'Try clearing filters to see all sample flights.',departureTime:'Departure',arrivalTime:'Arrival',durationLabel:'Duration',stopsLabel:'Stops',
  },
  vi: {
    navHome:'Trang chủ',navFlights:'Chuyến bay',navBookings:'Vé của tôi',navManage:'Quản lý đặt vé',navSupport:'Hỗ trợ',demoAccount:'Tài khoản mẫu',
    heroEyebrow:'BẮT ĐẦU HÀNH TRÌNH CỦA BẠN',heroTitle:'Khám phá thế giới',heroSubtitle:'Tìm chuyến bay phù hợp với kế hoạch của bạn.',
    oneWay:'Một chiều',roundTrip:'Khứ hồi',multiCity:'Nhiều chặng',from:'Điểm đi',to:'Điểm đến',departure:'Ngày khởi hành',returnDate:'Ngày về',passengers:'Hành khách',travelClass:'Hạng vé',searchFlights:'Tìm chuyến bay',
    basic:'Phổ thông tiết kiệm',flex:'Phổ thông linh hoạt',passengerOne:'1 hành khách',passengersMany:'{n} hành khách',leg:'Chặng',addLeg:'+ Thêm chặng',removeLeg:'Xóa chặng',
    sampleFares:'GIÁ MẪU · KHÔNG PHẢI CHUYẾN BAY THỰC',availableFlights:'Chuyến bay hiện có',sortBy:'Sắp xếp',priceSort:'Giá thấp đến cao',timeSort:'Giờ khởi hành',durationSort:'Bay nhanh nhất',
    select:'Chọn',selected:'Đã chọn',direct:'Bay thẳng',chooseFlight:'Chọn chuyến bay cho chặng này.',noFlights:'Không có chuyến bay phù hợp.',tryAnother:'Hãy thử tuyến hoặc ngày khác.',
    yourTrip:'HÀNH TRÌNH CỦA BẠN',bookingSummary:'Tóm tắt đặt vé',summaryIntro:'Chọn chuyến bay để xem hành trình và tổng tiền.',outbound:'Lượt đi',inbound:'Lượt về',
    fare:'Giá vé',taxes:'Thuế và phí',total:'Tổng cộng',perPerson:'mỗi người',continueBooking:'Tiếp tục đặt vé',chooseAllLegs:'Chọn đủ các chặng để tiếp tục.',demoOnly:'Bản mẫu · Không xuất vé hay thu tiền thật.',
    clearFares:'Giá rõ ràng',clearFaresDesc:'Xem tổng tiền trước khi đặt',helpfulSupport:'Hỗ trợ dễ hiểu',helpfulSupportDesc:'Có câu trả lời khi bạn cần',simpleBooking:'Đặt vé đơn giản',simpleBookingDesc:'Chỉ vài bước rõ ràng',moreRoutes:'Nhiều hành trình',moreRoutesDesc:'Khám phá điểm đến mẫu',
    yourJourneys:'HÀNH TRÌNH CỦA BẠN',bookingsIntro:'Vé mẫu tạo trong lần mở trang này sẽ xuất hiện ở đây.',noBookings:'Chưa có vé nào',noBookingsText:'Hãy chọn một chuyến bay mẫu để tạo vé đầu tiên.',browseFlights:'Xem chuyến bay',
    tripDetails:'THÔNG TIN ĐẶT VÉ',manageIntro:'Tra cứu vé mẫu bằng mã đặt chỗ và email.',bookingReference:'Mã đặt chỗ',email:'Email',findBooking:'Tra cứu vé',bookingNotFound:'Không tìm thấy vé khớp trong lần mở trang này. Kiểm tra lại mã và email.',
    status:'Trạng thái',confirmed:'Đã xác nhận',cancelled:'Đã hủy',manage:'Quản lý',cancelBooking:'Hủy vé mẫu',cancelConfirm:'Xác nhận hủy',keepBooking:'Giữ vé',basicCannotCancel:'Vé Phổ thông tiết kiệm không thể hủy trong bản mẫu.',tooLate:'Không thể hủy khi còn dưới 2 giờ trước giờ bay.',refundEstimate:'Tiền hoàn dự kiến (mẫu)',refundFull:'Hoàn đủ khi hủy trước giờ bay ít nhất 24 giờ.',refundHalf:'Phí hủy 50% nếu còn từ 2 đến dưới 24 giờ.',cancelDisclaimer:'Thao tác chỉ đổi trạng thái vé mẫu, không chuyển tiền thật.',
    helpCenter:'TRUNG TÂM HỖ TRỢ',supportIntro:'Giải đáp nhanh về website mẫu SkyBook.',footerNote:'Website đặt vé máy bay mẫu. Giá và vé chỉ để minh họa; không có vé hay thanh toán thật.',
    invalidRoute:'Hãy chọn hai sân bay khác nhau.',invalidDate:'Ngày khởi hành phải từ hôm nay trở đi.',invalidReturn:'Ngày về phải sau ngày khởi hành.',invalidLegDate:'Ngày của các chặng phải theo thứ tự thời gian.',
    checkoutKicker:'THÔNG TIN ĐẶT VÉ',checkoutTitle:'Hoàn tất vé mẫu',checkoutIntro:'Điền thông tin liên hệ để tạo mã đặt chỗ mẫu. Website không thu thông tin thanh toán.',fullName:'Họ và tên',phone:'Số điện thoại',confirmDemo:'Xác nhận vé mẫu',
    successKicker:'ĐÃ TẠO VÉ MẪU',successTitle:'Hành trình đã sẵn sàng',successText:'Mã đặt chỗ mẫu của bạn là',viewBookings:'Xem vé của tôi',close:'Đóng',confirmationNote:'Lưu mã nếu bạn muốn tra cứu trước khi tải lại trang.',
    demoStatus:'Mẫu',route:'Tuyến',date:'Ngày',travelers:'Hành khách',fareClass:'Hạng vé',flight:'Chuyến bay',created:'Tạo lúc',
    faq1:'Đây có phải chuyến bay và giá thật?',ans1:'Không. Giờ bay và giá là dữ liệu mẫu để minh họa website. SkyBook chưa kết nối kho chuyến bay của hãng.',
    faq2:'Tôi có bị trừ tiền khi đặt vé không?',ans2:'Không. Website không yêu cầu thẻ và không xử lý thanh toán; mã đặt chỗ chỉ tồn tại trong lần mở trang này.',
    faq3:'Tìm vé đã đặt ở đâu?',ans3:'Mở Vé của tôi để xem các vé tạo trong lần mở trang này. Bạn cũng có thể dùng mã đặt chỗ và email trong Quản lý đặt vé.',
    faq4:'Tải lại trang thì sao?',ans4:'Vé mẫu chỉ được giữ khi trang còn mở. Tải lại trang sẽ xóa các vé đó.',
    faq5:'Có thể hủy vé mẫu không?',ans5:'Vé Phổ thông linh hoạt có thể hủy trước giờ bay ít nhất 2 giờ. Website chỉ hiển thị tiền hoàn mẫu và không chuyển tiền thật.',
    toastSelected:'Đã chọn chuyến bay',toastBooking:'Đã tạo vé mẫu',toastCancelled:'Đã hủy vé mẫu',
    exploreRoutes:'Khám phá tuyến bay',routeDaNang:'Đà Nẵng',routePhuQuoc:'Phú Quốc',routeNhaTrang:'Nha Trang',routeDaLat:'Đà Lạt',
    airlineFilter:'Hãng bay',allAirlines:'Tất cả hãng',timeFilter:'Giờ khởi hành',anyTime:'Bất kỳ giờ nào',morning:'Buổi sáng · trước 12h',afternoon:'Buổi chiều · 12–18h',evening:'Buổi tối · sau 18h',
    budgetFilter:'Giá mỗi khách',anyBudget:'Không giới hạn',directOnly:'Chỉ bay thẳng',resetFilters:'Xóa bộ lọc',compareHint:'Chọn tối đa 3 chuyến để so sánh',bestFare:'Giá tốt nhất',
    resultCount:'{n} chuyến bay mẫu · {route}',oneStop:'1 điểm dừng',compare:'So sánh',comparing:'Đã thêm',compareFlights:'So sánh chuyến bay',compareSelection:'So sánh {n} chuyến',compareIntro:'Giá mỗi khách cho chặng này. Giờ bay và giá chỉ để minh họa.',removeCompare:'Bỏ khỏi so sánh',clearComparison:'Xóa so sánh',comparisonLimit:'Chỉ có thể so sánh tối đa 3 chuyến.',noFilterMatches:'Không có chuyến phù hợp với bộ lọc.',adjustFilters:'Xóa bộ lọc để xem tất cả chuyến bay mẫu.',departureTime:'Giờ đi',arrivalTime:'Giờ đến',durationLabel:'Thời gian bay',stopsLabel:'Điểm dừng',
  },
};


Object.assign(words.en, {
  stepSearch:'Search flights',stepSelect:'Select a flight',stepCheckout:'Add a voucher & try demo payment',
  allIn:'Total per person',included:'Includes taxes & fees',priceForGroup:'{n} travelers · {price}',fareConditions:'Fare conditions',basicRule:'Non-refundable',flexRule:'Refund available under demo rules',basicDetail:'Economy Basic cannot be cancelled in this demo.',flexDetail:'Cancel at least 24 hours before departure for a full demo refund; 2–24 hours for 50%. No cancellation within 2 hours.',
  demoTitle:'Demo · No real tickets',demoDetail:'Sample flights only. No ticket is issued and no payment is collected.',demoContacts:'Use sample contact details. Bookings disappear when this page is refreshed.',
  compareCount:'Comparison · {n}/3',compareReady:'Choose 2–3 flights, then open comparison.',compareFull:'3/3 selected. Remove a flight to add another.',comparing:'Added to compare',compareIntro:'Final prices per person, including taxes and fees, for the same leg and fare class.',
  searchChanged:'Your search has changed. Search again to update flights and totals.',updateSearch:'Update search',appliedSearch:'{route} · {date} · {travelers} · {fare}',allInHint:'All prices include taxes & fees',budgetFilter:'Total / person',selectedLegs:'{done}/{count} legs selected',tripTotal:'Trip total · {travelers}',partialTotal:'Selected flights subtotal',
  invalidAirport:'Choose an airport from the list.',invalidReturn:'Return date cannot be before departure.',invalidPassengers:'Choose 1–9 travelers and a valid fare class.',invalidName:'Enter a name with 2–80 characters, including letters.',invalidEmail:'Enter a valid email, e.g. demo@example.com.',invalidPhone:'Enter 8–15 digits. Spaces, +, brackets and hyphens are allowed.',fixContact:'Check the highlighted contact details.',invalidTiming:'Choose a flight that departs after the previous leg arrives.',noDepartures:'No remaining flights for this date or connection.',nextDay:'Next day',continueBooking:'Continue demo booking',confirmDemo:'Create demo booking',searchErrorTitle:'Please check your search',selectFirst:'Choose a flight for the previous leg first.',expiredFlight:'This departure has passed. Please search again.',
});
Object.assign(words.vi, {
  stepSearch:'Tìm chuyến bay',stepSelect:'Chọn chuyến bay',stepCheckout:'Thêm mã ưu đãi & thử thanh toán mẫu',
  allIn:'Tổng giá / người',included:'Đã gồm thuế và phí',priceForGroup:'{n} hành khách · {price}',fareConditions:'Điều kiện vé',basicRule:'Không được hoàn vé',flexRule:'Có thể hoàn theo quy định mẫu',basicDetail:'Vé Phổ thông tiết kiệm không thể hủy trong bản demo.',flexDetail:'Hoàn đủ nếu hủy trước giờ bay ít nhất 24 giờ; hoàn 50% nếu còn 2–24 giờ. Không thể hủy khi còn dưới 2 giờ.',
  demoTitle:'Bản demo · Không phát hành vé thật',demoDetail:'Chuyến bay chỉ để minh họa. Website không xuất vé và không thu tiền.',demoContacts:'Hãy dùng thông tin liên hệ mẫu. Vé sẽ mất khi tải lại trang.',
  compareCount:'So sánh · {n}/3',compareReady:'Chọn 2–3 chuyến, sau đó mở bảng so sánh.',compareFull:'Đã đủ 3/3 chuyến. Bỏ một chuyến để thêm chuyến khác.',comparing:'Đã thêm vào so sánh',compareIntro:'Tổng giá mỗi người đã gồm thuế và phí, cùng chặng bay và hạng vé.',
  searchChanged:'Bạn đã đổi thông tin. Tìm lại để cập nhật chuyến bay và tổng tiền.',updateSearch:'Cập nhật tìm kiếm',appliedSearch:'{route} · {date} · {n} khách · {fare}',allInHint:'Mọi giá hiển thị đã gồm thuế và phí',budgetFilter:'Tổng giá / người',selectedLegs:'Đã chọn {done}/{count} chặng',tripTotal:'Tổng hành trình · {n} khách',partialTotal:'Tạm tính các chuyến đã chọn',
  invalidAirport:'Hãy chọn sân bay có trong danh sách.',invalidReturn:'Ngày về không được trước ngày đi.',invalidPassengers:'Chọn từ 1–9 hành khách và hạng vé hợp lệ.',invalidName:'Nhập tên từ 2–80 ký tự, có chứa chữ cái.',invalidEmail:'Nhập email hợp lệ, ví dụ demo@example.com.',invalidPhone:'Nhập 8–15 chữ số; có thể dùng dấu +, ngoặc, cách và gạch nối.',fixContact:'Kiểm tra các thông tin liên hệ được đánh dấu.',invalidTiming:'Chọn chuyến khởi hành sau khi chặng trước đã đến.',noDepartures:'Không còn chuyến phù hợp với ngày hoặc thời gian nối chặng này.',nextDay:'Ngày kế tiếp',continueBooking:'Tiếp tục đặt vé mẫu',confirmDemo:'Tạo vé mẫu',searchErrorTitle:'Kiểm tra thông tin tìm kiếm',selectFirst:'Hãy chọn chuyến cho chặng trước.',expiredFlight:'Chuyến bay đã qua giờ khởi hành. Hãy tìm lại.',
});

Object.assign(words.en, {
 heroTitle:'Beyond the ordinary',heroLine1:'Your next journey.',heroLine2:'Beyond the ordinary.',heroEyebrow:'THE WORLD, FROM A DIFFERENT ANGLE',heroSubtitle:'Flights across Vietnam. A little closer to the stars.',searchKicker:'01 / PLAN YOUR FLIGHT',navOffers:'Offers',exploreOffers:'Explore Orbit offers',
 offersKicker:'A LITTLE EXTRA FOR YOUR JOURNEY',offersTitle:'Good fares. Better with a code.',offersIntro:'Pick a demo voucher and apply it at checkout. One code per booking.',voucherRules:'Demo offers only. Discounts apply to base fares; taxes stay unchanged. No real payments or tickets.',useVoucher:'Use this code',savedVoucher:'Code saved for checkout',voucherSaved:'{code} is ready. Choose your flights to use it at checkout.',
 voucher:'Voucher',voucherPlaceholder:'Enter a code',apply:'Apply',removeVoucher:'Remove',voucherHint:'Try ORBIT10 for 10% off base fares, up to ₫300,000.',voucherInvalid:'That code is not valid. Try ORBIT10 or LUNAR200.',voucherMinimum:'LUNAR200 needs at least ₫2,000,000 in base fares.',voucherApplied:'{code} applied. You save {amount}.',voucherRemoved:'Voucher removed.',discount:'Voucher discount',orderTotal:'Demo amount due',voucherAtCheckout:'Have a code? Add it at checkout.',
    detailStep:'Your details',paymentStep:'Demo payment',doneStep:'Confirmation',checkoutTitle:'Passenger details & voucher',continuePayment:'Continue to demo payment',paymentTitle:'Choose a demo payment method',paymentIntro:'Scan the QR to open the demo payment page, or use the button below. No money is charged.',qrTitle:'Scan QR for demo payment',qrNote:'This is a demo link, not a bank payment QR. No money can be transferred.',qrExpires:'QR expires in',qrExpired:'This QR has expired. Generate a new one to continue.',refreshQr:'Generate a new QR',paymentReference:'Demo payment reference',openPreview:'Open payment preview',paymentCode:'Demo confirmation code',verifyPayment:'Confirm demo code',codeHint:'On another device, simulate the payment, then enter the 6-character code shown there.',codeInvalid:'The code does not match this demo payment.',simulatePayment:'Simulate payment on this device',orTryHere:'OR TRY IT HERE',backDetails:'Back to details',paymentComplete:'Demo payment completed',paymentExpired:'This demo payment has expired. Generate a new QR.',paymentMissing:'Start the demo payment step first.',qrUnavailable:'QR preview is unavailable. You can still simulate payment below.',paidWithVoucher:'Saved {amount} with {code}',receipt:'Demo receipt',paidStatus:'Simulated · no money charged',
 faq2:'Will I be charged when I book?',ans2:'No. The QR opens a demo page, not a banking app. You can simulate payment or enter a demo confirmation code. No card details, bank transfers or real payments are collected.',faq6:'How do demo vouchers work?',ans6:'ORBIT10 takes 10% off base fares, capped at ₫300,000. LUNAR200 takes ₫200,000 off when base fares reach ₫2,000,000. One code per booking; taxes are unchanged.',faq7:'Can I scan the QR on another device?',ans7:'Yes. Scan with your camera, review the demo amount and simulate payment. Enter the displayed code in the original booking tab to confirm. Both pages clearly identify the flow as a demo.',
});
Object.assign(words.vi, {
 heroTitle:'Hành trình khác biệt',heroLine1:'Hành trình kế tiếp.',heroLine2:'Vượt khỏi thường ngày.',heroEyebrow:'THẾ GIỚI TỪ MỘT GÓC NHÌN KHÁC',heroSubtitle:'Bay khắp Việt Nam. Gần những vì sao hơn một chút.',searchKicker:'01 / LÊN KẾ HOẠCH BAY',navOffers:'Ưu đãi',exploreOffers:'Khám phá ưu đãi Orbit',offersKicker:'THÊM MỘT NIỀM VUI CHO HÀNH TRÌNH',offersTitle:'Giá tốt hơn với mã ưu đãi.',offersIntro:'Chọn voucher mẫu để áp dụng khi đặt vé. Một mã cho mỗi đơn.',voucherRules:'Ưu đãi mẫu, áp dụng cho giá vé trước thuế. Thuế không đổi. Không thanh toán hay phát hành vé thật.',useVoucher:'Dùng mã này',savedVoucher:'Đã lưu mã cho đơn vé',voucherSaved:'Đã lưu {code}. Chọn chuyến bay để dùng mã khi đặt vé.',voucher:'Mã ưu đãi',voucherPlaceholder:'Nhập mã ưu đãi',apply:'Áp dụng',removeVoucher:'Bỏ mã',voucherHint:'Dùng ORBIT10 giảm 10% giá vé, tối đa 300.000 ₫.',voucherInvalid:'Mã không hợp lệ. Hãy thử ORBIT10 hoặc LUNAR200.',voucherMinimum:'LUNAR200 yêu cầu giá vé trước thuế từ 2.000.000 ₫.',voucherApplied:'Đã áp dụng {code}, giảm {amount}.',voucherRemoved:'Đã bỏ mã.',discount:'Giảm giá voucher',orderTotal:'Tổng tiền mẫu',voucherAtCheckout:'Có voucher? Thêm ở bước đặt vé.',detailStep:'Thông tin',paymentStep:'Thanh toán mẫu',doneStep:'Xác nhận',checkoutTitle:'Hành trình của bạn',continuePayment:'Tiếp tục thanh toán mẫu',paymentTitle:'Trải nghiệm thanh toán mới',paymentIntro:'Quét QR bằng camera điện thoại hoặc thử mô phỏng tại đây.',qrTitle:'Quét để thử thanh toán mẫu',qrNote:'QR mở trang demo, không phải mã chuyển khoản ngân hàng. Không chuyển tiền thật.',qrExpires:'QR hết hạn sau',qrExpired:'QR đã hết hạn. Tạo mã mới để tiếp tục.',refreshQr:'Tạo QR mới',paymentReference:'Mã giao dịch mẫu',openPreview:'Mở trang thanh toán mẫu',paymentCode:'Mã xác nhận mẫu',verifyPayment:'Xác nhận mã mẫu',codeHint:'Trên thiết bị khác, mô phỏng thanh toán rồi nhập mã 6 ký tự được hiển thị.',codeInvalid:'Mã không khớp với giao dịch mẫu này.',simulatePayment:'Mô phỏng thanh toán tại đây',orTryHere:'HOẶC THỬ TẠI ĐÂY',backDetails:'Quay lại thông tin',paymentComplete:'Đã hoàn tất thanh toán mẫu',paymentExpired:'Giao dịch mẫu đã hết hạn. Hãy tạo QR mới.',paymentMissing:'Hãy mở bước thanh toán mẫu trước.',qrUnavailable:'Không thể mở QR. Bạn vẫn có thể mô phỏng thanh toán bên dưới.',paidWithVoucher:'Đã giảm {amount} với {code}',receipt:'Biên nhận mẫu',paidStatus:'Mô phỏng · không thu tiền',faq6:'Voucher mẫu hoạt động thế nào?',ans6:'ORBIT10 giảm 10% giá vé, tối đa 300.000 ₫. LUNAR200 giảm 200.000 ₫ cho giá vé từ 2.000.000 ₫. Một mã mỗi đơn, không giảm thuế.',faq7:'Có thể quét QR trên thiết bị khác?',ans7:'Có. Quét bằng camera, kiểm tra số tiền mẫu rồi mô phỏng thanh toán. Nhập mã được hiển thị vào trang đặt vé ban đầu để hoàn tất. Không có giao dịch thật.',ans2:'Không. QR mở trang demo, không phải ứng dụng ngân hàng. Bạn chỉ mô phỏng thanh toán hoặc nhập mã mẫu, không chuyển tiền thật.',
});
const VOUCHERS = [
 {code:'ORBIT10',percent:10,cap:300000,minFare:0},
 {code:'LUNAR200',amount:200000,minFare:2000000},
];
let paymentTimer=null;

const TAX_PER_LEG = 120000;

const airports = [
  {code:'SGN',en:'Ho Chi Minh City',vi:'TP. Hồ Chí Minh',lat:10.82,lon:106.65},
  {code:'HAN',en:'Hanoi',vi:'Hà Nội',lat:21.03,lon:105.83},
  {code:'DAD',en:'Da Nang',vi:'Đà Nẵng',lat:16.06,lon:108.20},
  {code:'PQC',en:'Phu Quoc',vi:'Phú Quốc',lat:10.22,lon:103.96},
  {code:'CXR',en:'Nha Trang',vi:'Nha Trang',lat:12.24,lon:109.19},
  {code:'DLI',en:'Da Lat',vi:'Đà Lạt',lat:11.94,lon:108.46},
  {code:'HUI',en:'Hue',vi:'Huế',lat:16.46,lon:107.59},
  {code:'HPH',en:'Hai Phong',vi:'Hải Phòng',lat:20.86,lon:106.68},
  {code:'VCA',en:'Can Tho',vi:'Cần Thơ',lat:10.04,lon:105.79},
  {code:'VII',en:'Vinh',vi:'Vinh',lat:18.67,lon:105.69},
];
const airlines = [
  {name:'Vietnam Airlines',mark:'VN',skin:'vn',base:380000},
  {name:'Vietjet Air',mark:'VJ',skin:'vj',base:160000},
  {name:'Bamboo Airways',mark:'BA',skin:'ba',base:260000},
  {name:'Vietravel Airlines',mark:'VT',skin:'vt',base:230000},
];
const flightSchedule = [
  {airline:1,time:'06:15',adjust:-40000,stops:0},{airline:0,time:'07:10',adjust:90000,stops:0},
  {airline:2,time:'08:05',adjust:50000,stops:0},{airline:1,time:'09:30',adjust:0,stops:0},
  {airline:3,time:'10:40',adjust:20000,stops:1},{airline:0,time:'11:55',adjust:150000,stops:0},
  {airline:2,time:'13:20',adjust:80000,stops:0},{airline:1,time:'14:45',adjust:40000,stops:0},
  {airline:0,time:'16:05',adjust:125000,stops:0},{airline:3,time:'17:30',adjust:35000,stops:1},
  {airline:2,time:'18:40',adjust:100000,stops:0},{airline:1,time:'20:10',adjust:20000,stops:0},
];
const state = {lang:'en',trip:'one',sort:'price',legs:[],selected:{},activeLeg:0,multiExtra:[],bookings:[],lookup:null,activeView:'home',filters:{airline:'all',time:'all',budget:'all',direct:false},compare:[],searchPassengers:1,searchFareClass:'basic',searchTrip:'one',searchDirty:false,searchKey:'',savedVoucher:'',checkout:null};
const t = (key, values={}) => (words[state.lang][key] ?? words.en[key] ?? key).replace(/\{(\w+)\}/g, (_,k) => String(values[k] ?? ''));
const iso = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const plusDays = (value, days) => {const d=new Date(`${value}T12:00:00`);d.setDate(d.getDate()+days);return iso(d)};
const vietnamToday = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const today = vietnamToday();
const formatDate = (value,short=false) => new Intl.DateTimeFormat(state.lang==='vi'?'vi-VN':'en-US',{month:short?'short':'long',day:'numeric',year:'numeric'}).format(new Date(`${value}T12:00:00`));
const money = value => new Intl.NumberFormat(state.lang==='vi'?'vi-VN':'en-US',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(value);
const place = code => {const airport=airports.find(x=>x.code===code);return airport ? `${airport[state.lang]} (${code})` : code};
const classLabel = () => t(state.searchFareClass==='flex'?'flex':'basic');
const scrollBehavior=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
const passengerLabel = n => n===1?t('passengerOne'):t('passengersMany',{n});
const displayLeg = i => state.searchTrip==='round' ? t(i===0?'outbound':'inbound') : `${t('leg')} ${i+1}`;

function airportOptions(selected){return airports.map(a=>`<option value="${a.code}" ${a.code===selected?'selected':''}>${a.code} · ${escapeHtml(a[state.lang])}</option>`).join('')}
function setAirportSelects(){const origin=$('#origin').value||'SGN',dest=$('#destination').value||'HAN';$('#origin').innerHTML=airportOptions(origin);$('#destination').innerHTML=airportOptions(dest)}
function syncFields(){
  const a=$('#origin').value||'SGN',b=$('#destination').value||'HAN',p=$('#passengerCount').value||'1',c=$('#travelClass').value||'basic';
  setAirportSelects();$('#origin').value=a;$('#destination').value=b;
  $('#passengerCount').innerHTML=Array.from({length:9},(_,i)=>`<option value="${i+1}">${escapeHtml(passengerLabel(i+1))}</option>`).join('');$('#passengerCount').value=p;
  $('#travelClass').innerHTML=`<option value="basic">${escapeHtml(t('basic'))}</option><option value="flex">${escapeHtml(t('flex'))}</option>`;$('#travelClass').value=c;
  $('#returnField').hidden=state.trip!=='round';$('#returnDate').required=state.trip==='round';$('#multiLegs').hidden=state.trip!=='multi';
  $('.search-panel').classList.toggle('has-return',state.trip==='round');renderMultiLegFields();
}
function translateStatic(){
  document.documentElement.lang=state.lang;
  $$('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
  $$('[data-trip]').forEach(tab=>{const active=tab.dataset.trip===state.trip;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active))});
  $$('[data-view]').forEach(button=>{if(button.classList.contains('nav-link'))button.classList.toggle('active',button.dataset.view===state.activeView)});
  document.title=`SkyBook — ${t('heroTitle')}`;syncFields();$('#searchHint').textContent=t('searchChanged');renderAll();
}
function renderMultiLegFields(){
  const parent=$('#multiLegs');if(state.trip!=='multi')return;
  parent.innerHTML=state.multiExtra.map((leg,i)=>`<div class="multi-leg-row" data-extra="${i}">
    <span class="multi-leg-title">${escapeHtml(t('leg'))} ${i+2}</span>
    <label class="field"><span>${escapeHtml(t('from'))}</span><span class="field-control">${icon('pin')}<select data-part="from" aria-label="${escapeHtml(t('from'))} ${i+2}">${airportOptions(leg.from)}</select></span></label>
    <label class="field"><span>${escapeHtml(t('to'))}</span><span class="field-control">${icon('pin')}<select data-part="to" aria-label="${escapeHtml(t('to'))} ${i+2}">${airportOptions(leg.to)}</select></span></label>
    <label class="field"><span>${escapeHtml(t('departure'))}</span><span class="field-control">${icon('calendar')}<input type="date" data-part="date" value="${leg.date}" min="${today}" aria-label="${escapeHtml(t('departure'))} ${i+2}"></span></label>
    <button type="button" class="icon-button remove-leg" data-remove="${i}" aria-label="${escapeHtml(t('removeLeg'))}" ${state.multiExtra.length<=1?'disabled':''}>${icon('close')}</button>
  </div>`).join('')+`<button type="button" class="add-leg" id="addLeg" ${state.multiExtra.length>=3?'disabled':''}>${escapeHtml(t('addLeg'))}</button>`;
}
function routeDuration(a,b){
  const routes={'SGN-HAN':130,'HAN-SGN':130,'SGN-DAD':80,'DAD-SGN':80,'HAN-DAD':80,'DAD-HAN':80,'SGN-PQC':65,'PQC-SGN':65,'HAN-PQC':145,'PQC-HAN':145,'DAD-PQC':95,'PQC-DAD':95};
  return routes[`${a}-${b}`]||Math.max(55,Math.round((routeDistance(a,b)/710*60+32)/5)*5);
}
function routeDistance(a,b){
  const from=airports.find(x=>x.code===a),to=airports.find(x=>x.code===b);
  if(!from||!to)return 600;
  const rad=Math.PI/180,dLat=(to.lat-from.lat)*rad,dLon=(to.lon-from.lon)*rad;
  const h=Math.sin(dLat/2)**2+Math.cos(from.lat*rad)*Math.cos(to.lat*rad)*Math.sin(dLon/2)**2;
  return Math.round(12742*Math.atan2(Math.sqrt(h),Math.sqrt(1-h)));
}
function addMinutes(time,minutes){const [h,m]=time.split(':').map(Number);const total=h*60+m+minutes;return `${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`}
function optionsForLeg(leg){
  const distance=routeDistance(leg.from,leg.to),duration=routeDuration(leg.from,leg.to),factor=state.searchFareClass==='flex'?1.22:1;
  return flightSchedule.map((slot,index)=>{
    const air=airlines[slot.airline],flightDuration=duration+slot.stops*65;
    return {
    ...air,id:index,time:slot.time,stops:slot.stops,from:leg.from,to:leg.to,date:leg.date,duration:flightDuration,arrival:addMinutes(slot.time,flightDuration),
    price:Math.round(Math.max(490000,380000+distance*660+air.base+slot.adjust-(slot.stops?130000:0))*factor/10000)*10000,
    };
  }).map(f=>({...f,totalPrice:f.price+TAX_PER_LEG,arrivalDate:Number(f.time.slice(0,2))*60+Number(f.time.slice(3))+f.duration>=1440?plusDays(f.date,1):f.date}));
}
function departureMs(f){return new Date(`${f.date}T${f.time}:00+07:00`).getTime()}
function arrivalMs(f){return departureMs(f)+f.duration*60000}
function availableOptions(leg,index=state.legs.indexOf(leg)){
  const previous=index>0?selectedFlight(index-1):null;
  return optionsForLeg(leg).filter(f=>departureMs(f)>Date.now()&&(!previous||departureMs(f)>arrivalMs(previous)));
}
function filteredOptions(leg){
  const {airline,time,budget,direct}=state.filters;
  return availableOptions(leg).filter(f=>{
    const hour=Number(f.time.slice(0,2));
    return (airline==='all'||f.mark===airline)&&(time==='all'||(time==='morning'&&hour<12)||(time==='afternoon'&&hour>=12&&hour<18)||(time==='evening'&&hour>=18))&&(budget==='all'||f.totalPrice<=Number(budget))&&(!direct||f.stops===0);
  });
}
function selectedFlight(i){const id=state.selected[i];return id===undefined?null:optionsForLeg(state.legs[i]).find(f=>f.id===id)||null}
function itineraryTotal(){let fare=0;state.legs.forEach((_,i)=>{const f=selectedFlight(i);if(f)fare+=f.price});const n=state.searchPassengers;const taxes=state.legs.filter((_,i)=>selectedFlight(i)).length*TAX_PER_LEG*n;return{fare:fare*n,taxes,total:fare*n+taxes,n}}
function buildLegs(){
  const first={from:$('#origin').value,to:$('#destination').value,date:$('#departDate').value};
  if(state.trip==='round')return [first,{from:first.to,to:first.from,date:$('#returnDate').value}];
  if(state.trip==='multi')return [first,...state.multiExtra.map(leg=>({...leg}))];
  return [first];
}
function isValidDate(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return false;
  const d=new Date(`${value}T12:00:00Z`);return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value;
}
function validateLegs(legs){
  if(!legs.length||legs.some(l=>![l.from,l.to].every(c=>airports.some(a=>a.code===c))))return t('invalidAirport');
  if(legs.some(l=>l.from===l.to))return t('invalidRoute');
  if(legs.some(l=>!isValidDate(l.date)||l.date<vietnamToday()))return t('invalidDate');
  if(state.trip==='round'&&legs[1].date<legs[0].date)return t('invalidReturn');
  if(legs.some((l,i)=>i>0&&l.date<legs[i-1].date))return t('invalidLegDate');
  const n=Number($('#passengerCount').value);
  if(!Number.isInteger(n)||n<1||n>9||!['basic','flex'].includes($('#travelClass').value))return t('invalidPassengers');
  return '';
}
function currentSearchKey(){return JSON.stringify({legs:buildLegs(),trip:state.trip,n:Number($('#passengerCount').value),fare:$('#travelClass').value})}
function markSearchDirty(){
  state.searchDirty=currentSearchKey()!==state.searchKey;
  $('#searchHint').hidden=!state.searchDirty;$('#searchHint').textContent=t('searchChanged');
  renderFlights();renderSummary();
}
function doSearch(event){
  event?.preventDefault();const legs=buildLegs(),error=validateLegs(legs);
  $('#searchError').hidden=!error;$('#searchError').textContent=error;
  if(error){$('#searchError').focus();return false}
  state.legs=legs;state.selected={};state.activeLeg=0;state.compare=[];
  state.searchPassengers=Number($('#passengerCount').value);state.searchFareClass=$('#travelClass').value;state.searchTrip=state.trip;state.searchKey=currentSearchKey();state.searchDirty=false;
  $('#searchHint').hidden=true;renderAll();
  $('#flightList').animate([{opacity:.25,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:220});
  $('#resultsSection').scrollIntoView({behavior:scrollBehavior(),block:'start'});return true;
}

function renderLegNavigation(){
  const nav=$('#legNavigation');nav.hidden=state.legs.length===1;
  nav.innerHTML=state.legs.map((leg,i)=>`<button class="leg-pill ${i===state.activeLeg?'current':''} ${selectedFlight(i)?'done':''}" type="button" data-leg="${i}">${escapeHtml(displayLeg(i))}: ${leg.from}–${leg.to}</button>`).join('');
}
function durationText(f){return `${Math.floor(f.duration/60)}h ${String(f.duration%60).padStart(2,'0')}m`}
function demoNotice(){return `<div class="demo-notice">${icon('shield')}<div><strong>${escapeHtml(t('demoTitle'))}</strong><p>${escapeHtml(t('demoDetail'))}</p></div></div>`}
function conditionText(){return t(state.searchFareClass==='flex'?'flexRule':'basicRule')}
function conditionDetail(){return t(state.searchFareClass==='flex'?'flexDetail':'basicDetail')}
function renderFlights(){
  renderLegNavigation();const list=$('#flightList'),leg=state.legs[state.activeLeg];if(!leg){list.innerHTML='';return}
  const options=filteredOptions(leg);
  options.sort((a,b)=>state.sort==='time'?a.time.localeCompare(b.time):state.sort==='duration'?a.duration-b.duration:a.totalPrice-b.totalPrice);
  const lowest=Math.min(...availableOptions(leg).map(f=>f.totalPrice));
  $('#resultsContext').textContent=t('appliedSearch',{route:`${place(leg.from)} → ${place(leg.to)}`,date:formatDate(leg.date,true),n:state.searchPassengers,travelers:passengerLabel(state.searchPassengers),fare:classLabel()});
  $('#resultCount').textContent=t('resultCount',{n:options.length,route:`${leg.from} → ${leg.to}`});
  $('#resultsUpdate').hidden=!state.searchDirty;
  list.innerHTML=options.length?options.map(f=>{
    const selected=state.selected[state.activeLeg]===f.id,compared=state.compare.includes(f.id),blocked=state.compare.length===3&&!compared;
    return `<article class="flight-card ${selected?'selected':''} ${compared?'in-comparison':''}" data-card="${f.id}">
      <div class="flight-main"><div class="airline"><span class="airline-mark ${f.skin}">${f.mark}</span><div><strong class="airline-name">${escapeHtml(f.name)}</strong><span class="airline-sub">${escapeHtml(classLabel())}</span>${f.totalPrice===lowest?`<span class="fare-badge">${escapeHtml(t('bestFare'))}</span>`:''}</div></div>
      <div class="flight-journey"><div class="flight-time"><strong>${f.time}</strong><span>${f.from}</span></div><div class="route-visual"><span>${durationText(f)}</span><span class="line">${icon('plane')}</span><span>${escapeHtml(t(f.stops?'oneStop':'direct'))}</span></div><div class="flight-time"><strong>${f.arrival}</strong><span>${f.to}</span>${f.arrivalDate!==f.date?`<small>+1 ${escapeHtml(t('nextDay'))}</small>`:''}</div></div>
      <div class="fare"><span class="fare-label">${escapeHtml(t('allIn'))}</span><strong>${money(f.totalPrice)}</strong><span class="tax-included">${icon('check')}${escapeHtml(t('included'))}</span>${state.searchPassengers>1?`<span class="group-total">${escapeHtml(t('priceForGroup',{n:state.searchPassengers,price:money(f.totalPrice*state.searchPassengers)}))}</span>`:''}</div></div>
      <div class="flight-details"><span>${escapeHtml(t('fare'))}: ${money(f.price)} <span class="price-plus">+</span> ${escapeHtml(t('taxes'))}: ${money(TAX_PER_LEG)}</span><details class="fare-conditions"><summary>${escapeHtml(conditionText())}</summary><p>${escapeHtml(conditionDetail())}</p></details></div>
      <div class="flight-actions"><button type="button" class="compare-toggle ${compared?'is-added':''}" data-compare="${f.id}" aria-pressed="${compared}" aria-label="${escapeHtml(t(compared?'removeCompare':'compare'))} ${escapeHtml(f.name)} ${f.time}" ${blocked?'disabled':''}>${icon(compared?'check':'ticket')}${escapeHtml(t(compared?'comparing':'compare'))}</button><button type="button" class="button ${selected?'button-selected':'button-primary'}" data-flight="${f.id}" ${state.searchDirty?'disabled':''} aria-label="${escapeHtml(t(selected?'selected':'select'))} ${escapeHtml(f.name)} ${f.time}">${selected?icon('check'):''}${escapeHtml(t(selected?'selected':'select'))}${!selected?icon('arrow'):''}</button></div>
    </article>`;
  }).join(''):`<div class="empty-state">${icon('search')}<h3>${escapeHtml(t(availableOptions(leg).length?'noFilterMatches':'noDepartures'))}</h3><p>${escapeHtml(t(availableOptions(leg).length?'adjustFilters':'tryAnother'))}</p><button type="button" class="button button-outline" id="emptyResetFilters">${escapeHtml(t('resetFilters'))}</button></div>`;
  renderCompareBar();
}
function renderCompareBar(){
  const bar=$('#compareBar'),n=state.compare.length;bar.hidden=false;bar.classList.toggle('has-items',n>0);
  const flights=optionsForLeg(state.legs[state.activeLeg]);
  bar.innerHTML=`<div class="compare-bar-top"><div><strong id="compareCount" role="status">${escapeHtml(t('compareCount',{n}))}</strong><p>${escapeHtml(t(n===3?'compareFull':'compareReady'))}</p></div><button type="button" class="button button-outline" id="openCompare" ${n<2?'disabled':''}>${escapeHtml(t('compareFlights'))}${icon('arrow')}</button></div>${n?`<div class="compare-chips">${state.compare.map(id=>{const f=flights.find(f=>f.id===id);return `<button type="button" data-remove-compare="${id}" aria-label="${escapeHtml(t('removeCompare'))} ${escapeHtml(f.name)} ${f.time}"><span>${f.mark} · ${f.time}</span>${icon('close')}</button>`}).join('')}<button type="button" class="clear-filters" id="clearCompare">${escapeHtml(t('clearComparison'))}</button></div>`:''}`;
}
let modalReturnFocus=null;
function showDialog(wide=false){
  modalReturnFocus=document.activeElement;
  $('.checkout-modal').classList.toggle('wide',wide);$('#modalBackdrop').hidden=false;
  document.body.style.overflow='hidden';$$('body > header, body > main, body > footer').forEach(el=>el.inert=true);$('#closeModal').focus();
}
function openComparison(){
  if(state.compare.length<2)return;
  const flights=state.compare.map(id=>optionsForLeg(state.legs[state.activeLeg]).find(f=>f.id===id)).filter(Boolean);
  $('#modalContent').innerHTML=`<span class="modal-kicker">${escapeHtml(t('sampleFares'))}</span><h2 id="modalTitle">${escapeHtml(t('compareFlights'))}</h2><p class="modal-copy">${escapeHtml(t('compareIntro'))}</p><div class="comparison-grid">${flights.map(f=>`<article class="comparison-card"><div class="airline"><span class="airline-mark ${f.skin}">${f.mark}</span><strong>${escapeHtml(f.name)}</strong></div><span class="fare-label">${escapeHtml(t('allIn'))}</span><strong class="comparison-price">${money(f.totalPrice)}</strong><span class="tax-included">${escapeHtml(t('included'))}</span><dl><div><dt>${escapeHtml(t('departureTime'))}</dt><dd>${f.time} · ${f.from}</dd></div><div><dt>${escapeHtml(t('arrivalTime'))}</dt><dd>${f.arrival} · ${f.to}${f.arrivalDate!==f.date?' +1':''}</dd></div><div><dt>${escapeHtml(t('durationLabel'))}</dt><dd>${durationText(f)}</dd></div><div><dt>${escapeHtml(t('stopsLabel'))}</dt><dd>${escapeHtml(t(f.stops?'oneStop':'direct'))}</dd></div><div><dt>${escapeHtml(t('fare'))}</dt><dd>${money(f.price)}</dd></div><div><dt>${escapeHtml(t('taxes'))}</dt><dd>${money(TAX_PER_LEG)}</dd></div></dl><p class="comparison-rule">${escapeHtml(classLabel())} · ${escapeHtml(conditionText())}</p><button type="button" class="button button-primary" data-select-compare="${f.id}" ${state.searchDirty?'disabled':''}>${escapeHtml(t('select'))} ${f.time}</button></article>`).join('')}</div>${demoNotice()}`;
  showDialog(true);
}
function chooseFlight(id){
  if(state.searchDirty){toast(t('searchChanged'));return false}
  const f=availableOptions(state.legs[state.activeLeg]).find(f=>f.id===id);
  if(!f){toast(t('invalidTiming'));return false}
  if(state.activeLeg>0&&!selectedFlight(state.activeLeg-1)){toast(t('selectFirst'));return false}
  state.selected[state.activeLeg]=id;
  for(let i=state.activeLeg+1;i<state.legs.length;i++){
    const prev=selectedFlight(i-1),next=selectedFlight(i);
    if(!prev||(next&&departureMs(next)<=arrivalMs(prev)))delete state.selected[i];
  }
  const next=state.legs.findIndex((_,i)=>!selectedFlight(i));if(next!==-1)state.activeLeg=next;
  state.compare=[];renderFlights();renderSummary();toast(t('toastSelected'));
  if(window.innerWidth<=760&&state.legs.every((_,i)=>selectedFlight(i)))$('.summary-card').scrollIntoView({behavior:scrollBehavior(),block:'start'});
  return true;
}

function resetFilters(){
  state.filters={airline:'all',time:'all',budget:'all',direct:false};
  $('#filterAirline').value='all';$('#filterTime').value='all';$('#filterBudget').value='all';$('#filterDirect').checked=false;renderFlights();
}
function readyToBook(){return !state.searchDirty&&state.legs.length>0&&state.legs.every((_,i)=>{const f=selectedFlight(i),prev=i>0?selectedFlight(i-1):null;return f&&departureMs(f)>Date.now()&&(!prev||departureMs(f)>arrivalMs(prev))})}
function renderSummary(){
  const body=$('#summaryBody'),done=state.legs.filter((_,i)=>selectedFlight(i)).length;
  const pieces=state.legs.map((leg,i)=>{const f=selectedFlight(i);return `<div class="summary-segment"><div class="summary-segment-top"><strong>${escapeHtml(displayLeg(i))}</strong><span>${escapeHtml(formatDate(leg.date,true))}</span></div>${f?`<div class="summary-airline">${escapeHtml(f.name)} · ${escapeHtml(classLabel())}</div><div class="summary-route"><div><strong>${f.time}</strong><span>${escapeHtml(place(leg.from))}</span></div>${icon('arrow')}<div><strong>${f.arrival}${f.arrivalDate!==f.date?' +1':''}</strong><span>${escapeHtml(place(leg.to))}</span></div></div>`:`<button type="button" class="summary-placeholder" data-leg="${i}">${leg.from} → ${leg.to}<span>${escapeHtml(t('chooseFlight'))}</span></button>`}</div>`}).join('');
  const price=itineraryTotal(),complete=done===state.legs.length;
  body.innerHTML=`<p class="selection-progress">${escapeHtml(t('selectedLegs',{done,count:state.legs.length}))}</p>${pieces}${done?`<div class="price-breakdown"><div class="price-line"><span>${escapeHtml(t('passengers'))}</span><strong>${price.n}</strong></div><div class="price-line"><span>${escapeHtml(t('fare'))}</span><strong>${money(price.fare)}</strong></div><div class="price-line"><span>${escapeHtml(t('taxes'))}</span><strong>${money(price.taxes)}</strong></div><div class="price-total"><span>${escapeHtml(complete?t('tripTotal',{n:price.n,travelers:passengerLabel(price.n)}):t('partialTotal'))}</span><strong>${money(price.total)}</strong><span>${escapeHtml(t('included'))}</span></div></div>`:''}${state.searchDirty?`<p class="inline-warning">${escapeHtml(t('searchChanged'))}</p>`:''}<button type="button" class="voucher-teaser" data-view="offers">${icon('ticket')}<span>${escapeHtml(state.savedVoucher?`${state.savedVoucher} · ${t('savedVoucher')}`:t('voucherAtCheckout'))}</span>${icon('chevron')}</button>${demoNotice()}<button type="button" id="continueBtn" class="button button-primary summary-cta" ${readyToBook()?'':'disabled'}>${escapeHtml(t('continueBooking'))}${icon('arrow')}</button>${!complete?`<p class="summary-footnote">${escapeHtml(t('chooseAllLegs'))}</p>`:''}`;
}

function renderAll(){renderFlights();renderSummary();renderBookings();renderFaq();renderOffers();if(state.lookup)renderLookup()}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),3000)}
function showView(name){
  state.activeView=name;const target=name==='home'||name==='flights'?'home':name;
  $$('.view').forEach(view=>{const isCurrent=view.id===`${target}View`;view.hidden=!isCurrent;view.classList.toggle('active',isCurrent)});
  $$('.nav-link').forEach(link=>link.classList.toggle('active',link.dataset.view===name));
  $('#primaryNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');
  if(name==='bookings')renderBookings();if(name==='support')renderFaq();if(name==='offers')renderOffers();
  const view=$(`#${target}View`);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)view.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
  requestAnimationFrame(()=>{if(name==='flights')$('#resultsSection').scrollIntoView({block:'start',behavior:scrollBehavior()});else window.scrollTo({top:0,behavior:scrollBehavior()})});
}
function voucherResult(raw,fare){
  const code=String(raw||'').trim().toUpperCase(),voucher=VOUCHERS.find(v=>v.code===code);
  if(!code)return {code:'',discount:0,error:''};
  if(!voucher)return{code:'',discount:0,error:t('voucherInvalid')};
  if(fare<voucher.minFare)return{code:'',discount:0,error:t('voucherMinimum')};
  const discount=voucher.percent?Math.min(voucher.cap,Math.round(fare*voucher.percent/100)):Math.min(fare,voucher.amount);
  return {code,discount,error:''};
}
function checkoutPrice(){const price=itineraryTotal(),voucher=voucherResult(state.checkout?.voucher||'',price.fare);return{...price,discount:voucher.discount,voucher:voucher.code,total:price.total-voucher.discount}}
function checkoutFingerprint(){return JSON.stringify({legs:state.legs,selected:state.selected,n:state.searchPassengers,fare:state.searchFareClass,voucher:state.checkout?.voucher||'',total:checkoutPrice().total})}
function checkoutSteps(step){return `<ol class="checkout-steps">${['detailStep','paymentStep','doneStep'].map((key,i)=>`<li class="${i+1===step?'current':i+1<step?'complete':''}" ${i+1===step?'aria-current="step"':''}><span>${i+1<step?'✓':i+1}</span>${escapeHtml(t(key))}</li>`).join('')}</ol>`}
function priceLedger(){const p=checkoutPrice();return `<div class="checkout-ledger"><div><span>${escapeHtml(t('fare'))} · ${escapeHtml(passengerLabel(p.n))}</span><strong>${money(p.fare)}</strong></div><div><span>${escapeHtml(t('taxes'))}</span><strong>${money(p.taxes)}</strong></div>${p.discount?`<div class="discount-line"><span>${escapeHtml(t('discount'))} · ${p.voucher}</span><strong>−${money(p.discount)}</strong></div>`:''}<div class="ledger-total"><span>${escapeHtml(t('orderTotal'))}</span><strong>${money(p.total)}</strong></div><p>${escapeHtml(t('included'))} · ${state.legs.length} ${escapeHtml(t('leg').toLowerCase())}${state.lang==='en'&&state.legs.length>1?'s':''}</p></div>`}
function renderOffers(){
  $('#offersList').innerHTML=VOUCHERS.map((v,i)=>`<article class="offer-card spotlight"><div class="offer-top"><span class="offer-icon">${icon('ticket')}</span><span class="offer-tag">${i===0?'ORBIT PERK':'LUNAR PERK'}</span></div><p class="offer-value">${i===0?'10% off':money(200000)+' off'}</p><h2>${v.code}</h2><p>${state.lang==='vi'?(i===0?'Giảm 10% giá vé trước thuế, tối đa 300.000 ₫. Không yêu cầu giá trị tối thiểu.':'Giảm 200.000 ₫ khi tổng giá vé trước thuế từ 2.000.000 ₫.'):(i===0?'10% off base fares, up to ₫300,000. No minimum fare.':'Save ₫200,000 when your total base fares reach ₫2,000,000.')}</p><div class="offer-bottom"><span>DEMO VOUCHER</span><button type="button" class="button button-primary" data-use-voucher="${v.code}">${escapeHtml(t(state.savedVoucher===v.code?'savedVoucher':'useVoucher'))}${icon('arrow')}</button></div></article>`).join('');
}
function openModal(){
  if(!readyToBook()){toast(t(state.searchDirty?'searchChanged':'chooseAllLegs'));return false}
  const saved=voucherResult(state.savedVoucher,itineraryTotal().fare);
  state.checkout={step:1,contact:{name:'',email:'',phone:''},voucher:saved.code,payment:null};
  renderCheckoutDetails();if(saved.error)renderVoucherFeedback(saved.error);showDialog(true);$('#fullName').focus();return true;
}
function renderCheckoutDetails(){
  clearInterval(paymentTimer);state.checkout.step=1;state.checkout.payment=null;
  const c=state.checkout.contact;
  $('#modalContent').innerHTML=`${checkoutSteps(1)}<span class="modal-kicker">${escapeHtml(t('checkoutKicker'))}</span><h2 id="modalTitle">${escapeHtml(t('checkoutTitle'))}</h2><p class="modal-copy">${escapeHtml(t('demoContacts'))}</p><div class="checkout-grid"><form id="checkoutForm" class="checkout-form" novalidate><div id="contactError" class="search-error" role="alert" hidden></div>${[['fullName','fullName','text','name',80,'Alex Morgan',c.name],['contactEmail','email','email','email',120,'demo@example.com',c.email],['contactPhone','phone','tel','tel',24,'0901234567',c.phone]].map(([id,label,type,autocomplete,max,placeholder,value])=>`<label class="field"><span>${escapeHtml(t(label))}</span><span class="field-control"><input id="${id}" type="${type}" autocomplete="${autocomplete}" maxlength="${max}" placeholder="${placeholder}" value="${escapeHtml(value)}" required aria-label="${escapeHtml(t(label))}" aria-describedby="${id}Error" /></span><span class="field-error" id="${id}Error" hidden></span></label>`).join('')}<div class="contact-privacy">${icon('shield')}<span>${escapeHtml(t('demoOnly'))}</span></div></form><aside class="checkout-order"><span class="modal-kicker">${escapeHtml(t('yourTrip'))}</span><h3>${state.legs.map(l=>`${l.from} → ${l.to}`).join(' · ')}</h3><p>${escapeHtml(classLabel())} · ${escapeHtml(formatDate(state.legs[0].date,true))}</p><div class="voucher-box"><label for="voucherInput">${escapeHtml(t('voucher'))}</label><div class="voucher-input-row"><input id="voucherInput" autocomplete="off" autocapitalize="characters" maxlength="24" placeholder="${escapeHtml(t('voucherPlaceholder'))}" value="${escapeHtml(state.checkout.voucher||state.savedVoucher)}" /><button type="button" class="button button-outline" id="applyVoucher">${escapeHtml(t('apply'))}</button></div><p class="voucher-hint">${escapeHtml(t('voucherHint'))}</p><p id="voucherFeedback" class="voucher-feedback" role="status" hidden></p><div id="appliedVoucher"></div></div><div id="checkoutTotals">${priceLedger()}</div></aside></div>${demoNotice()}<button form="checkoutForm" type="submit" class="button button-primary checkout-next">${escapeHtml(t('continuePayment'))}${icon('arrow')}</button>`;
  renderVoucherFeedback();
}
function renderVoucherFeedback(error=''){
  const p=checkoutPrice(),feedback=$('#voucherFeedback');feedback.hidden=!error&&!p.voucher;feedback.textContent=error||(p.voucher?t('voucherApplied',{code:p.voucher,amount:money(p.discount)}):'');feedback.classList.toggle('error',!!error);
  $('#voucherInput').setAttribute('aria-invalid',String(!!error));$('#checkoutTotals').innerHTML=priceLedger();
  $('#appliedVoucher').innerHTML=p.voucher?`<button type="button" id="removeVoucher" class="voucher-applied">${icon('check')}${p.voucher}<span>${escapeHtml(t('removeVoucher'))}</span>${icon('close')}</button>`:'';
}
function applyVoucher(){
  if(!state.checkout||state.checkout.step!==1)return;
  const result=voucherResult($('#voucherInput').value,itineraryTotal().fare);
  if(result.error){renderVoucherFeedback(result.error);return false}
  state.checkout.voucher=result.code;state.savedVoucher=result.code;state.checkout.payment=null;$('#voucherInput').value=result.code;renderVoucherFeedback();renderOffers();return true;
}
function closeModal(){
  clearInterval(paymentTimer);state.checkout=null;
  document.body.style.overflow='';$('#modalBackdrop').hidden=true;$('.checkout-modal').classList.remove('wide');$$('body > header, body > main, body > footer').forEach(el=>el.inert=false);
  if(modalReturnFocus?.isConnected&&!modalReturnFocus.disabled)modalReturnFocus.focus();else $('#continueBtn')?.focus();
}
function validateContact(){
  const fields=[['fullName','invalidName',v=>v.length>=2&&v.length<=80&&/\p{L}/u.test(v)],['contactEmail','invalidEmail',v=>v.length<=120&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&$('#contactEmail').validity.valid],['contactPhone','invalidPhone',v=>/^[+()\d .-]+$/.test(v)&&v.replace(/\D/g,'').length>=8&&v.replace(/\D/g,'').length<=15]];
  let first=null;
  for(const [id,key,valid] of fields){const input=$(`#${id}`),error=$(`#${id}Error`);input.value=input.value.trim();const bad=!valid(input.value);input.setAttribute('aria-invalid',String(bad));error.hidden=!bad;error.textContent=bad?t(key):'';if(bad&&!first)first=input}
  $('#contactError').hidden=!first;$('#contactError').textContent=t('fixContact');first?.focus();return !first;
}

function makeCode(){
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let code;
  do{const bytes=new Uint8Array(6);crypto.getRandomValues(bytes);code=Array.from(bytes,x=>alphabet[x%alphabet.length]).join('')}while(state.bookings.some(b=>b.code===code));
  return code;
}
function confirmBooking(event){
  event.preventDefault();if(!validateContact())return false;
  if(!readyToBook()){$('#contactError').hidden=false;$('#contactError').textContent=t('expiredFlight');return false}
  state.checkout.contact={name:$('#fullName').value.trim(),email:$('#contactEmail').value.trim(),phone:$('#contactPhone').value.trim()};
  beginDemoPayment();return true;
}
function beginDemoPayment(){
  clearInterval(paymentTimer);state.checkout.step=2;
  state.checkout.payment={reference:`SKY-${makeCode()}`,code:makeCode(),expiresAt:Date.now()+5*60*1000,fingerprint:checkoutFingerprint(),completed:false};
  renderPayment();paymentTimer=setInterval(updatePaymentTimer,1000);
}
function paymentPreviewUrl(){
  const p=state.checkout.payment;
  const params=new URLSearchParams({reference:p.reference,code:p.code,amount:String(checkoutPrice().total),expires:String(p.expiresAt)});
  return `https://skybook-vn.netlify.app/payment-demo.html#${params}`;
}
function renderPayment(){
  const p=state.checkout.payment,url=paymentPreviewUrl();let qrMarkup='';
  try{const qr=qrcode(0,'M');qr.addData(url);qr.make();qrMarkup=qr.createSvgTag({scalable:true,margin:8})}catch{qrMarkup=`<p>${escapeHtml(t('qrUnavailable'))}</p>`}
  $('#modalContent').innerHTML=`${checkoutSteps(2)}<span class="modal-kicker">SKYBOOK / PAYMENT SANDBOX</span><h2 id="modalTitle">${escapeHtml(t('paymentTitle'))}</h2><p class="modal-copy">${escapeHtml(t('paymentIntro'))}</p><div class="payment-grid"><section class="qr-column"><span class="qr-label">${escapeHtml(t('qrTitle'))}</span><div class="qr-frame" role="img" aria-label="Scannable QR code opening the SkyBook demo payment preview">${qrMarkup}</div><p class="qr-expiry">${escapeHtml(t('qrExpires'))} <strong id="qrTimer" role="timer">05:00</strong></p><a class="payment-preview-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(t('openPreview'))}${icon('arrow')}</a><p class="qr-note">${escapeHtml(t('qrNote'))}</p></section><section class="payment-controls"><div class="payment-reference"><span>${escapeHtml(t('paymentReference'))}</span><strong>${p.reference}</strong></div>${priceLedger()}<form id="paymentCodeForm" novalidate><label class="field" for="paymentCode"><span>${escapeHtml(t('paymentCode'))}</span><span class="field-control"><input id="paymentCode" maxlength="6" autocomplete="off" autocapitalize="characters" placeholder="ABC123" aria-describedby="paymentCodeHint paymentError" /></span></label><p id="paymentCodeHint" class="modal-copy">${escapeHtml(t('codeHint'))}</p><button class="button button-outline" type="submit" id="verifyPayment">${escapeHtml(t('verifyPayment'))}</button></form><div class="payment-divider">${escapeHtml(t('orTryHere'))}</div><button type="button" class="button button-primary" id="simulatePayment">${escapeHtml(t('simulatePayment'))}${icon('check')}</button><p id="paymentError" class="search-error" role="alert" hidden></p><button type="button" class="button button-outline" id="refreshPayment" hidden>${escapeHtml(t('refreshQr'))}</button></section></div>${demoNotice()}<button type="button" class="back-details" id="backDetails">← ${escapeHtml(t('backDetails'))}</button>`;
  updatePaymentTimer();$('#modalTitle').tabIndex=-1;$('#modalTitle').focus({preventScroll:true});$('.checkout-modal').scrollTop=0;
}
function updatePaymentTimer(){
  const p=state.checkout?.payment;if(!p||state.checkout.step!==2){clearInterval(paymentTimer);return}
  const seconds=Math.max(0,Math.ceil((p.expiresAt-Date.now())/1000));
  if($('#qrTimer'))$('#qrTimer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  if(seconds===0){clearInterval(paymentTimer);$('#paymentError').hidden=false;$('#paymentError').textContent=t('qrExpired');$('#refreshPayment').hidden=false;$('#simulatePayment').disabled=true;$('#verifyPayment').disabled=true;$('.qr-frame').classList.add('expired')}
}
function verifyDemoPayment(event){event.preventDefault();return completeDemoPayment('qr_demo',$('#paymentCode').value)}
function completeDemoPayment(method,code=''){
  const c=state.checkout,p=c?.payment;
  if(!p||c.step!==2||p.completed)return false;
  let error='';
  if(Date.now()>=p.expiresAt)error=t('paymentExpired');
  else if(!readyToBook()||p.fingerprint!==checkoutFingerprint())error=t('searchChanged');
  else if(method==='qr_demo'&&String(code).trim().toUpperCase()!==p.code)error=t('codeInvalid');
  else if(!['qr_demo','simulation'].includes(method))return false;
  if(error){$('#paymentError').hidden=false;$('#paymentError').textContent=error;$('#paymentCode').setAttribute('aria-invalid','true');updatePaymentTimer();return false}
  p.completed=true;clearInterval(paymentTimer);const price=checkoutPrice();
  const booking={code:makeCode(),...c.contact,legs:state.legs.map((leg,i)=>({...leg,flight:{...selectedFlight(i)}})),passengers:price.n,travelClass:state.searchFareClass,subtotal:price.fare,taxes:price.taxes,discount:price.discount,voucher:price.voucher,total:price.total,status:'confirmed',created:new Date().toISOString(),payment:{method,reference:p.reference,demo:true}};
  state.bookings.unshift(booking);c.step=3;renderBookings();toast(t('paymentComplete'));
  $('#modalContent').innerHTML=`${checkoutSteps(3)}<div class="success-emblem">${icon('check')}</div><span class="modal-kicker">${escapeHtml(t('successKicker'))}</span><h2 id="modalTitle">${escapeHtml(t('successTitle'))}</h2><p class="modal-copy">${escapeHtml(t('successText'))}</p><div class="reference-code">${booking.code}</div><div class="confirmation-ticket"><div><span>${escapeHtml(t('route'))}</span><strong>${escapeHtml(booking.legs.map(l=>`${l.from} → ${l.to}`).join(' · '))}</strong></div><div><span>${escapeHtml(t('total'))}</span><strong>${money(booking.total)}</strong></div>${booking.discount?`<p class="discount-line">${escapeHtml(t('paidWithVoucher',{amount:money(booking.discount),code:booking.voucher}))}</p>`:''}<p>${escapeHtml(t('paidStatus'))}</p></div><div class="modal-actions"><button class="button button-primary" type="button" id="viewBookingsBtn">${escapeHtml(t('viewBookings'))}${icon('arrow')}</button><button class="button button-outline" type="button" id="doneModalBtn">${escapeHtml(t('close'))}</button></div><p class="modal-note">${escapeHtml(t('confirmationNote'))}</p>${demoNotice()}`;
  $('#viewBookingsBtn').focus();return true;
}
function initPaymentChannel(){
  if(typeof BroadcastChannel==='undefined')return;
  const channel=new BroadcastChannel('skybook-demo-payments');
  channel.addEventListener('message',event=>{const data=event.data,p=state.checkout?.payment;if(data?.type==='demo-payment'&&p?.reference===data.reference&&data.code===p.code)completeDemoPayment('qr_demo',data.code)});
}
function initOrbitInteractions(){
  let frame=0;
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const card=event.target.closest('.flight-card,.offer-card,.search-panel');if(!card||frame)return;
    frame=requestAnimationFrame(()=>{const box=card.getBoundingClientRect();card.style.setProperty('--pointer-x',`${event.clientX-box.left}px`);card.style.setProperty('--pointer-y',`${event.clientY-box.top}px`);frame=0});
  },{passive:true});
}
function renderBookings(){
  const list=$('#bookingsList');if(!state.bookings.length){list.innerHTML=`<div class="empty-state">${icon('ticket')}<h3>${escapeHtml(t('noBookings'))}</h3><p>${escapeHtml(t('noBookingsText'))}</p><button type="button" class="button button-outline" data-view="flights" style="margin-top:17px">${escapeHtml(t('browseFlights'))}</button></div>`;return}
  list.innerHTML=state.bookings.map(b=>`<article class="booking-card"><div><h3>${escapeHtml(b.legs.map(l=>`${l.from} → ${l.to}`).join(' · '))}</h3><p>${escapeHtml(t('bookingReference'))}: <strong>${b.code}</strong> · ${escapeHtml(formatDate(b.legs[0].date))}</p><p>${escapeHtml(b.name)} · ${money(b.total)}</p>${b.discount?`<p class="discount-line">${escapeHtml(t('paidWithVoucher',{amount:money(b.discount),code:b.voucher}))}</p>`:''}${b.payment?`<p class="booking-payment">${escapeHtml(t('paidStatus'))} · ${b.payment.reference}</p>`:''}</div><span class="status-badge ${b.status==='cancelled'?'cancelled':''}">${escapeHtml(t(b.status))}</span><button class="button button-outline" type="button" data-manage-code="${b.code}">${escapeHtml(t('manage'))}</button></article>`).join('');
}
function lookupBooking(event){event.preventDefault();const code=$('#lookupCode').value.trim().toUpperCase(),email=$('#lookupEmail').value.trim().toLowerCase();state.lookup={code,email,confirmCancel:false};renderLookup()}
function cancelInfo(booking){
  const hours=(departureMs(booking.legs[0].flight)-Date.now())/36e5;
  if(booking.status==='cancelled')return{allowed:false,reason:t('cancelled')};
  if(booking.travelClass==='basic')return{allowed:false,reason:t('basicCannotCancel')};
  if(hours<2)return{allowed:false,reason:t('tooLate')};
  return{allowed:true,refund:hours>=24?booking.total:Math.round(booking.total*.5),reason:t(hours>=24?'refundFull':'refundHalf')};
}
function renderLookup(){
  const box=$('#lookupResult');if(!state.lookup)return;
  const {code,email,confirmCancel}=state.lookup;const b=state.bookings.find(x=>x.code===code&&x.email.toLowerCase()===email);
  if(!b){box.innerHTML=`<div class="lookup-notice warning">${escapeHtml(t('bookingNotFound'))}</div>`;return}
  const eligibility=cancelInfo(b);
  box.innerHTML=`<article class="lookup-card"><div class="summary-segment-top">${escapeHtml(t('bookingReference'))}: ${b.code}<span class="status-badge ${b.status==='cancelled'?'cancelled':''}" style="margin-left:auto">${escapeHtml(t(b.status))}</span></div><h3>${escapeHtml(b.legs.map(l=>`${l.from} → ${l.to}`).join(' · '))}</h3><dl><div><dt>${escapeHtml(t('fullName'))}</dt><dd>${escapeHtml(b.name)}</dd></div><div><dt>${escapeHtml(t('date'))}</dt><dd>${escapeHtml(formatDate(b.legs[0].date))}</dd></div><div><dt>${escapeHtml(t('fareClass'))}</dt><dd>${escapeHtml(t(b.travelClass==='flex'?'flex':'basic'))}</dd></div><div><dt>${escapeHtml(t('total'))}</dt><dd>${money(b.total)}</dd></div></dl>
   ${eligibility.allowed?`<div class="lookup-notice">${escapeHtml(eligibility.reason)}<br><strong>${escapeHtml(t('refundEstimate'))}: ${money(eligibility.refund)}</strong><br>${escapeHtml(t('cancelDisclaimer'))}</div><div class="lookup-actions">${confirmCancel?`<button class="button button-primary" type="button" id="confirmCancelBtn">${escapeHtml(t('cancelConfirm'))}</button><button class="button button-outline" type="button" id="keepBookingBtn">${escapeHtml(t('keepBooking'))}</button>`:`<button class="button button-outline" type="button" id="askCancelBtn">${escapeHtml(t('cancelBooking'))}</button>`}</div>`:`<div class="lookup-notice">${escapeHtml(eligibility.reason)}</div>`}</article>`;
}
function renderFaq(){
  $('#faqList').innerHTML=Array.from({length:7},(_,i)=>`<details><summary>${escapeHtml(t(`faq${i+1}`))}</summary><p>${escapeHtml(t(`ans${i+1}`))}</p></details>`).join('');
}
function setupEvents(){
  document.addEventListener('click',event=>{
    const offer=event.target.closest('[data-use-voucher]');if(offer){state.savedVoucher=offer.dataset.useVoucher;renderOffers();renderSummary();toast(t('voucherSaved',{code:state.savedVoucher}));showView('flights');return}
    if(event.target.closest('#applyVoucher')){applyVoucher();return}
    if(event.target.closest('#removeVoucher')){state.checkout.voucher='';state.savedVoucher='';$('#voucherInput').value='';renderVoucherFeedback();return}
    if(event.target.closest('#simulatePayment')){completeDemoPayment('simulation');return}
    if(event.target.closest('#refreshPayment')){beginDemoPayment();return}
    if(event.target.closest('#backDetails')){renderCheckoutDetails();$('#fullName').focus();return}
    const view=event.target.closest('[data-view]');if(view){showView(view.dataset.view);return}
    const trip=event.target.closest('[data-trip]');if(trip){state.trip=trip.dataset.trip;if(state.trip==='multi'&&!state.multiExtra.length){const from=$('#destination').value;state.multiExtra=[{from,to:from==='DAD'?'PQC':'DAD',date:plusDays($('#departDate').value||today,3)}]}syncFields();$$('[data-trip]').forEach(tab=>{const on=tab.dataset.trip===state.trip;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on))});markSearchDirty();return}
    const route=event.target.closest('[data-route]');if(route){const [from,to]=route.dataset.route.split('-');state.trip='one';translateStatic();$('#origin').value=from;$('#destination').value=to;doSearch();return}
    const flight=event.target.closest('[data-flight]');if(flight){chooseFlight(Number(flight.dataset.flight));return}
    const comparing=event.target.closest('[data-compare]');if(comparing){const id=Number(comparing.dataset.compare);if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);else if(state.compare.length<3)state.compare.push(id);else{toast(t('comparisonLimit'));return}renderFlights();$(`[data-compare="${id}"]`)?.focus({preventScroll:true});return}
    const comparisonFlight=event.target.closest('[data-select-compare]');if(comparisonFlight){const id=Number(comparisonFlight.dataset.selectCompare);closeModal();chooseFlight(id);return}
    const removedCompare=event.target.closest('[data-remove-compare]');if(removedCompare){state.compare=state.compare.filter(id=>id!==Number(removedCompare.dataset.removeCompare));renderFlights();$('#openCompare').focus();return}
    if(event.target.closest('#updateSearch')){$('#searchTop').scrollIntoView({behavior:scrollBehavior()});$('#origin').focus({preventScroll:true});return}
    if(event.target.closest('#openCompare')){openComparison();return}
    if(event.target.closest('#clearCompare')){state.compare=[];renderFlights();return}
    if(event.target.closest('#resetFilters')||event.target.closest('#emptyResetFilters')){resetFilters();return}
    const leg=event.target.closest('[data-leg]');if(leg){state.activeLeg=Number(leg.dataset.leg);state.compare=[];renderFlights();$('#resultsSection').scrollIntoView({behavior:scrollBehavior()});return}
    const remove=event.target.closest('[data-remove]');if(remove&&state.multiExtra.length>1){state.multiExtra.splice(Number(remove.dataset.remove),1);renderMultiLegFields();markSearchDirty();return}
    if(event.target.closest('#addLeg')){const last=state.multiExtra.at(-1);if(state.multiExtra.length<3){state.multiExtra.push({from:last.to,to:last.to==='PQC'?'HAN':'PQC',date:plusDays(last.date,2)});renderMultiLegFields();markSearchDirty()}return}
    if(event.target.closest('#continueBtn')){openModal();return}
    if(event.target.closest('#viewBookingsBtn')){closeModal();showView('bookings');return}
    if(event.target.closest('#doneModalBtn')||event.target.closest('#closeModal')){closeModal();return}
    const manage=event.target.closest('[data-manage-code]');if(manage){const b=state.bookings.find(x=>x.code===manage.dataset.manageCode);if(b){$('#lookupCode').value=b.code;$('#lookupEmail').value=b.email;state.lookup={code:b.code,email:b.email.toLowerCase(),confirmCancel:false};showView('manage');renderLookup()}return}
    if(event.target.closest('#askCancelBtn')){state.lookup.confirmCancel=true;renderLookup();return}
    if(event.target.closest('#keepBookingBtn')){state.lookup.confirmCancel=false;renderLookup();return}
    if(event.target.closest('#confirmCancelBtn')){const b=state.bookings.find(x=>x.code===state.lookup.code);if(b&&cancelInfo(b).allowed){b.status='cancelled';state.lookup.confirmCancel=false;renderLookup();renderBookings();toast(t('toastCancelled'))}return}
  });
  $('#modalBackdrop').addEventListener('click',event=>{if(event.target===$('#modalBackdrop'))closeModal()});
  document.addEventListener('keydown',event=>{
    if($('#modalBackdrop').hidden)return;
    if(event.key==='Enter'&&event.target.id==='voucherInput'){event.preventDefault();applyVoucher();return}
    if(event.key==='Escape'){closeModal();return}
    if(event.key==='Tab'){const focusables=$$('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]',$('.checkout-modal')).filter(el=>!el.hidden&&el.getClientRects().length);const first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
  });
  $('#modalContent').addEventListener('submit',event=>{if(event.target.id==='checkoutForm')confirmBooking(event);if(event.target.id==='paymentCodeForm')verifyDemoPayment(event)});
  $('#searchForm').addEventListener('submit',doSearch);
  $('#lookupForm').addEventListener('submit',lookupBooking);
  $('#swapBtn').addEventListener('click',()=>{const a=$('#origin').value;$('#origin').value=$('#destination').value;$('#destination').value=a;const svg=$('#swapBtn svg');svg.animate([{transform:'rotate(0deg)'},{transform:'rotate(180deg)'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:270});markSearchDirty()});
  $('#sortSelect').addEventListener('change',event=>{state.sort=event.target.value;renderFlights()});
  $('#filterAirline').addEventListener('change',event=>{state.filters.airline=event.target.value;renderFlights()});
  $('#filterTime').addEventListener('change',event=>{state.filters.time=event.target.value;renderFlights()});
  $('#filterBudget').addEventListener('change',event=>{state.filters.budget=event.target.value;renderFlights()});
  $('#filterDirect').addEventListener('change',event=>{state.filters.direct=event.target.checked;renderFlights()});
  $('#languageSelect').addEventListener('change',event=>{state.lang=event.target.value;translateStatic()});
  $('#menuToggle').addEventListener('click',()=>{const menu=$('#primaryNav');menu.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(menu.classList.contains('open')))});
  $('#multiLegs').addEventListener('change',event=>{const row=event.target.closest('[data-extra]');if(row&&event.target.dataset.part){state.multiExtra[Number(row.dataset.extra)][event.target.dataset.part]=event.target.value;markSearchDirty()}});
  $('#searchForm').addEventListener('input',event=>{if(!event.target.closest('#multiLegs'))markSearchDirty()});
  $('#searchForm').addEventListener('change',event=>{if(!event.target.closest('#multiLegs'))markSearchDirty()});
  $('#modalContent').addEventListener('input',event=>{const input=event.target;if(input.matches('#checkoutForm input')){input.removeAttribute('aria-invalid');$(`#${input.id}Error`).hidden=true}});
  $('#departDate').addEventListener('change',()=>{$('#returnDate').min=$('#departDate').value||today});
}

function registerWebTools(){
  const context=document.modelContext;
  if(!context?.registerTool)return;
  const register=tool=>{try{Promise.resolve(context.registerTool(tool)).catch(()=>{})}catch{}};
  register({
    name:'search_sample_flights',title:'Search sample flights',
    description:'Search the SkyBook demo by airport codes and dates. Updates the visible results and does not query live airline inventory.',
    inputSchema:{type:'object',properties:{origin:{type:'string',enum:airports.map(a=>a.code)},destination:{type:'string',enum:airports.map(a=>a.code)},departureDate:{type:'string',format:'date'},tripType:{type:'string',enum:['one','round']},returnDate:{type:'string',format:'date'},passengers:{type:'integer',minimum:1,maximum:9},fareClass:{type:'string',enum:['basic','flex']}},required:['origin','destination','departureDate'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    async execute(input){
      if(!input||!airports.some(a=>a.code===input.origin)||!airports.some(a=>a.code===input.destination)||input.origin===input.destination||!isValidDate(input.departureDate)||input.departureDate<vietnamToday())throw new Error('Invalid route or departure date');
      const trip=input.tripType||'one';if(!['one','round'].includes(trip))throw new Error('Unsupported trip type');
      if(trip==='round'&&(!isValidDate(input.returnDate)||input.returnDate<input.departureDate))throw new Error('Return date must be after departure');
      if(input.passengers!==undefined&&(!Number.isInteger(input.passengers)||input.passengers<1||input.passengers>9))throw new Error('Passenger count must be 1–9');
      if(input.fareClass!==undefined&&!['basic','flex'].includes(input.fareClass))throw new Error('Unsupported fare class');
      state.trip=trip;syncFields();$('#origin').value=input.origin;$('#destination').value=input.destination;$('#departDate').value=input.departureDate;
      if(trip==='round')$('#returnDate').value=input.returnDate;
      if(input.passengers!==undefined)$('#passengerCount').value=String(input.passengers);
      if(input.fareClass)$('#travelClass').value=input.fareClass;
      $$('[data-trip]').forEach(tab=>{const on=tab.dataset.trip===trip;tab.classList.toggle('active',on);tab.setAttribute('aria-selected',String(on))});
      showView('home');doSearch();await new Promise(resolve=>setTimeout(resolve,230));
      return{route:state.legs.map(l=>`${l.from}-${l.to}`),optionsPerLeg:state.legs.map(l=>optionsForLeg(l).length),currency:'VND',demo:true};
    },
  });
  register({
    name:'select_sample_flight',title:'Select sample flight',description:'Select one listed sample flight for a leg and update the visible booking summary.',
    inputSchema:{type:'object',properties:{legIndex:{type:'integer',minimum:0},flightIndex:{type:'integer',minimum:0,maximum:11}},required:['legIndex','flightIndex'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input){
      if(!input||!Number.isInteger(input.legIndex)||input.legIndex<0||input.legIndex>=state.legs.length||!Number.isInteger(input.flightIndex)||input.flightIndex<0||input.flightIndex>=flightSchedule.length)throw new Error('Invalid leg or flight index');
      state.activeLeg=input.legIndex;state.compare=[];if(!chooseFlight(input.flightIndex))throw new Error('Search again or select a valid connecting flight');
      const flight=selectedFlight(input.legIndex);return{legIndex:input.legIndex,airline:flight.name,departure:flight.time,priceVND:flight.totalPrice,includesTaxes:true,allLegsSelected:state.legs.every((_,i)=>selectedFlight(i)!==null)};
    },
  });
  register({
    name:'create_demo_booking',title:'Create demo booking',description:'Complete the selected itinerary by simulating payment and creating a session-only demo booking. No real payment or ticket is issued.',
    inputSchema:{type:'object',properties:{fullName:{type:'string',minLength:2},email:{type:'string',format:'email'},phone:{type:'string',minLength:8}},required:['fullName','email','phone'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input){
      if(!readyToBook())throw new Error('Search again and select every valid flight leg first');
      if(!input||typeof input.fullName!=='string'||typeof input.email!=='string'||typeof input.phone!=='string')throw new Error('Contact details are required');
      openModal();$('#fullName').value=input.fullName;$('#contactEmail').value=input.email;$('#contactPhone').value=input.phone;
      const form=$('#checkoutForm');if(!confirmBooking({preventDefault(){},currentTarget:form}))throw new Error('Invalid contact details or itinerary');if(!completeDemoPayment('simulation'))throw new Error('Demo payment could not complete');const booking=state.bookings[0];
      return{reference:booking.code,status:booking.status,totalVND:booking.total,demo:true};
    },
  });
}

function init(){
  state.lang='en';$('#languageSelect').value='en';
  $('#year').textContent=new Date().getFullYear();$('#departDate').min=today;$('#departDate').value=plusDays(today,1);$('#returnDate').value=plusDays(today,5);$('#returnDate').min=plusDays(today,1);
  $('#origin').innerHTML=airportOptions('SGN');$('#destination').innerHTML=airportOptions('HAN');
  state.legs=[{from:'SGN',to:'HAN',date:$('#departDate').value}];state.selected={};
  setupEvents();translateStatic();state.searchKey=currentSearchKey();registerWebTools();initPaymentChannel();initOrbitInteractions();
}
init();

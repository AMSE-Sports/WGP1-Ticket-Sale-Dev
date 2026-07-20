"use strict";

const APP_CONFIG = {
  eventYear: 2026,
  dataMode: "local-development",
  privacyNoticeVersion: "JWC26-DRAFT-01",
  ticketTypes: [
    { id: "weekday-day", nameKey: "ticketWeekdayDay", price: 250 },
    { id: "weekend-day", nameKey: "ticketWeekendDay", price: 350 },
    { id: "weekday-pass", nameKey: "ticketWeekdayPass", price: 400 },
    { id: "pro-weekend", nameKey: "ticketProWeekend", price: 500 },
    { id: "all-event", nameKey: "ticketAllEvent", price: 750 },
    { id: "complimentary", nameKey: "ticketComplimentary", price: 0 }
  ]
};

const localeCodes = { th: "th-TH", en: "en-US", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", fr: "fr-FR", es: "es-ES" };
const translations = {
  th: {
    languageLabel:"ภาษา", devVersion:"เวอร์ชันพัฒนาปี 2026", heroSubtitle:"ลงทะเบียนผู้เข้าชมและจำหน่ายตั๋ว", devNoticeTitle:"เวอร์ชันทดสอบปี 2026", devNoticeBody:"วันแข่งขันและราคาตั๋วเป็นค่าร่าง ข้อมูลจะเก็บในอุปกรณ์นี้เท่านั้นและยังไม่ส่งเข้าฐานข้อมูลจริง",
    partVisitor:"ส่วนที่ 1 · ผู้เข้าชม", visitorTitle:"ลงทะเบียนผู้เข้าชมรายบุคคล", visitorIntro:"ผู้เข้าชมทุกคนต้องกรอกข้อมูลของตนเองทีละคนก่อนเข้าสู่ขั้นตอนจำหน่ายตั๋ว", registered:"ลงทะเบียนแล้ว", progressVisitor:"1 ข้อมูลผู้ชม", progressConsent:"2 ยืนยันสิทธิ", progressHandover:"3 ส่งต่อเจ้าหน้าที่",
    identityTitle:"ข้อมูลประจำตัว", identitySubtitle:"ข้อมูลส่วนบุคคล", firstName:"ชื่อจริง *", lastName:"นามสกุล *", ageGroup:"ช่วงอายุ *", selectOption:"— กรุณาเลือก —", ageUnder10:"ต่ำกว่า 10 ปี", age60Plus:"60 ปีขึ้นไป", gender:"เพศ *", male:"ชาย", female:"หญิง", nonBinary:"นอนไบนารี", preferNot:"ไม่ประสงค์ระบุ",
    profileTitle:"ที่อยู่อาศัยและข้อมูลผู้ชม", profileSubtitle:"ข้อมูลผู้ชม", country:"ประเทศที่อาศัย *", countrySelect:"— เลือกประเทศ —", city:"จังหวัดหรือเมือง *", cityPlaceholder:"เช่น ชลบุรี / พัทยา", previousAttendance:"เคยเข้าชม WGP#1 หรือไม่ *", firstTime:"มาครั้งแรก", returning:"เคยเข้าชมแล้ว", discovery:"ช่องทางหลักที่ทำให้มางาน *", influencer:"อินฟลูเอนเซอร์ / ครีเอเตอร์", pattayaPromotion:"ป้ายหรือสื่อในพัทยา", hotelTour:"โรงแรมหรือบริษัททัวร์", friendFamily:"เพื่อนหรือครอบครัว", previousEvent:"งาน WGP#1 ครั้งก่อน", other:"อื่น ๆ",
    guardianTitle:"ข้อมูลผู้ปกครอง", guardianSubtitle:"จำเป็นสำหรับผู้เข้าชมอายุต่ำกว่า 20 ปี", guardianName:"ชื่อ–นามสกุลผู้ปกครอง *", relationship:"ความสัมพันธ์ *", parent:"บิดา/มารดา", legalGuardian:"ผู้ปกครองตามกฎหมาย", authorizedAdult:"ผู้ใหญ่ที่ได้รับมอบหมาย", guardianPhone:"เบอร์โทรศัพท์ผู้ปกครอง *", guardianConfirm:"ข้าพเจ้าเป็นผู้ปกครองหรือผู้มีอำนาจดำเนินการแทนผู้เยาว์ และยืนยันข้อมูลข้างต้น",
    privacyTitle:"ประกาศความเป็นส่วนตัวและสื่อภายในงาน", privacySubtitle:"ความเป็นส่วนตัวและสื่อภายในงาน", privacyRegistration:"<strong>การลงทะเบียนและจำหน่ายตั๋ว:</strong> WGP#1 เก็บข้อมูลที่จำเป็นเพื่อยืนยันตัวผู้เข้าชม บริหารตั๋ว วิเคราะห์จำนวนผู้ชม และรักษาความปลอดภัยภายในงาน โดยจัดเก็บตามระยะเวลาที่องค์กรกำหนดและให้สิทธิเจ้าของข้อมูลตามกฎหมาย", privacyMedia:"<strong>ภาพถ่ายและการถ่ายทอดสด:</strong> พื้นที่จัดการแข่งขันอาจมีการบันทึกภาพ เสียง และถ่ายทอดสดเพื่อรายงานการแข่งขันและประชาสัมพันธ์งาน หากมีข้อกังวล กรุณาแจ้งเจ้าหน้าที่ก่อนเข้าสู่พื้นที่กล้อง", privacyAck:"ฉันได้อ่านและรับทราบประกาศความเป็นส่วนตัวและข้อมูลเกี่ยวกับสื่อภายในงาน", marketingConsent:"ฉันยินยอมรับข่าวสารการแข่งขันและกิจกรรมในอนาคตจาก WGP#1 (ไม่บังคับ)", confirmVisitor:"ยืนยันข้อมูลผู้เข้าชมคนนี้",
    visitorConfirmed:"ยืนยันผู้เข้าชมแล้ว", visitorSaved:"บันทึกผู้เข้าชมเรียบร้อยแล้ว", addVisitor:"ลงทะเบียนผู้ชมคนถัดไป", addVisitorHint:"เพิ่มผู้เข้าชมอีกหนึ่งคน", finishVisitors:"กรอกข้อมูลผู้ชมครบแล้ว", finishVisitorsHint:"ส่งต่อให้เจ้าหน้าที่", removeLast:"ลบผู้ชมคนล่าสุด", staffNext:"ขั้นตอนถัดไปสำหรับเจ้าหน้าที่", handoverTitle:"การลงทะเบียนผู้ชมเสร็จสมบูรณ์", visitors:"ผู้เข้าชม", handoverBody:"กรุณาส่งอุปกรณ์คืนให้เจ้าหน้าที่เพื่อดำเนินการเรื่องตั๋วและการชำระเงิน", staffContinue:"เจ้าหน้าที่ดำเนินการต่อ",
    partStaff:"ส่วนที่ 2 · สำหรับเจ้าหน้าที่", staffTitle:"สรุปรายการจำหน่ายตั๋ว", staffIntro:"เลือกประเภทตั๋วให้ครบตามจำนวนผู้ชมที่ลงทะเบียน", visitorsInSale:"ผู้ชมในรายการ", staff:"เจ้าหน้าที่ *", selectStaff:"— เลือกเจ้าหน้าที่ —", payment:"ช่องทางการชำระ *", cash:"เงินสด", qrTransfer:"QR / โอนผ่านธนาคาร", complimentary:"บัตรเชิญ", ticketTypes:"ประเภทและจำนวนตั๋ว", ticketTypesSubtitle:"เลือกประเภทและจำนวน", mustAllocate:"ต้องจัดสรร", totalTickets:"จำนวนตั๋วรวม", calculatedTotal:"ยอดคำนวณ", amountPaid:"ยอดรับจริง (THB) *", staffNote:"หมายเหตุ", staffNotePlaceholder:"ส่วนลด บัตรเชิญ หรือกรณีพิเศษ", back:"ย้อนกลับ", finalize:"ยืนยันและบันทึกรายการ",
    registrationComplete:"ลงทะเบียนเสร็จสมบูรณ์", completeTitle:"ดำเนินการเสร็จสมบูรณ์", transactionNumber:"หมายเลขรายการ", localDataNotice:"ข้อมูลทดสอบถูกเก็บเฉพาะในอุปกรณ์นี้ และยังไม่ส่งเข้าฐานข้อมูลจริง", nextGroup:"เริ่มรายการผู้ชมชุดถัดไป", footer:"© 2026 WGP#1 · สำเนาสำหรับพัฒนา",
    peopleUnit:"คน", ticketUnit:"ใบ", confirmedCount:"ลงทะเบียนแล้ว {count} คน", requiredError:"กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน", mismatchError:"จำนวนตั๋วต้องเท่ากับจำนวนผู้ชมที่ลงทะเบียน ({count} ใบ)", perTicket:"ต่อใบ", noCharge:"ไม่มีค่าใช้จ่าย", quantityFor:"จำนวนสำหรับ {name}", ticketWeekdayDay:"บัตรวันเดียว — วันธรรมดา", ticketWeekendDay:"บัตรวันเดียว — วันสุดสัปดาห์", ticketWeekdayPass:"แพ็กเกจวันธรรมดา", ticketProWeekend:"โปรวีคเอนด์", ticketAllEvent:"บัตรเข้าชมตลอดงาน", ticketComplimentary:"บัตรเชิญ"
  },
  en: {
    languageLabel:"Language", devVersion:"2026 DEVELOPMENT VERSION", heroSubtitle:"Visitor Registration & Ticket Sale", devNoticeTitle:"2026 test version", devNoticeBody:"Event dates and ticket prices are drafts. Data is stored only on this device and is not sent to the production database.",
    partVisitor:"PART 1 · VISITOR", visitorTitle:"Individual visitor registration", visitorIntro:"Every visitor must complete their own registration before staff can issue tickets.", registered:"Registered", progressVisitor:"1 Visitor details", progressConsent:"2 Consent", progressHandover:"3 Staff handover",
    identityTitle:"Identity details", identitySubtitle:"Personal information", firstName:"First name *", lastName:"Last name *", ageGroup:"Age group *", selectOption:"— Please select —", ageUnder10:"Under 10", age60Plus:"60 or older", gender:"Gender *", male:"Male", female:"Female", nonBinary:"Non-binary", preferNot:"Prefer not to say",
    profileTitle:"Residence and visitor profile", profileSubtitle:"Audience profile", country:"Country of residence *", countrySelect:"— Select a country —", city:"Province / City *", cityPlaceholder:"e.g. Chonburi / Pattaya", previousAttendance:"Previous WGP#1 attendance *", firstTime:"First time", returning:"Returning visitor", discovery:"Main discovery channel *", influencer:"Influencer / Creator", pattayaPromotion:"Pattaya advertising", hotelTour:"Hotel or tour company", friendFamily:"Friend or family", previousEvent:"Previous WGP#1 event", other:"Other",
    guardianTitle:"Guardian details", guardianSubtitle:"Required for visitors under 20", guardianName:"Guardian full name *", relationship:"Relationship *", parent:"Parent", legalGuardian:"Legal guardian", authorizedAdult:"Authorized adult", guardianPhone:"Guardian phone *", guardianConfirm:"I am authorized to act for this minor and confirm the information above.",
    privacyTitle:"Privacy notice and event media", privacySubtitle:"Privacy & event media", privacyRegistration:"<strong>Registration and ticketing:</strong> WGP#1 processes necessary information to verify visitors, administer tickets, analyze attendance and maintain event safety. Data is retained under organizational policy and data subjects may exercise their legal rights.", privacyMedia:"<strong>Photography and live broadcast:</strong> The venue may include photography, audio recording and live broadcasting for event reporting and promotion. If you have concerns, please tell staff before entering camera areas.", privacyAck:"I have read and acknowledged the Privacy Notice and event media information.", marketingConsent:"I agree to receive future WGP#1 news and offers (optional).", confirmVisitor:"Confirm this visitor",
    visitorConfirmed:"VISITOR CONFIRMED", visitorSaved:"Visitor saved successfully", addVisitor:"Register the next visitor", addVisitorHint:"Add another visitor", finishVisitors:"All visitors are registered", finishVisitorsHint:"Continue to staff handover", removeLast:"Remove last visitor", staffNext:"STAFF NEXT", handoverTitle:"Visitor registration is complete", visitors:"visitors", handoverBody:"Please return this device to staff to complete ticketing and payment.", staffContinue:"Staff continue",
    partStaff:"PART 2 · STAFF ONLY", staffTitle:"Ticket sale summary", staffIntro:"Allocate tickets to match the number of registered visitors.", visitorsInSale:"Visitors in sale", staff:"Staff *", selectStaff:"— Select staff —", payment:"Payment method *", cash:"Cash", qrTransfer:"QR / Bank transfer", complimentary:"Complimentary", ticketTypes:"Ticket types and quantities", ticketTypesSubtitle:"Select type and quantity", mustAllocate:"Required", totalTickets:"Total tickets", calculatedTotal:"Calculated total", amountPaid:"Amount paid (THB) *", staffNote:"Staff note", staffNotePlaceholder:"Discount, complimentary ticket or special case", back:"Back", finalize:"Confirm and save",
    registrationComplete:"REGISTRATION COMPLETE", completeTitle:"Transaction complete", transactionNumber:"Transaction number", localDataNotice:"Test data is stored only on this device and is not sent to the production database.", nextGroup:"Start next visitor group", footer:"© 2026 WGP#1 · Development Copy",
    peopleUnit:"people", ticketUnit:"tickets", confirmedCount:"{count} visitor(s) confirmed", requiredError:"Please complete all required fields.", mismatchError:"Ticket quantity must match the registered visitors ({count}).", perTicket:"per ticket", noCharge:"No charge", quantityFor:"Quantity for {name}", ticketWeekdayDay:"Single Day — Weekday", ticketWeekendDay:"Single Day — Weekend", ticketWeekdayPass:"Weekday Package", ticketProWeekend:"Pro Weekend", ticketAllEvent:"All Event Pass", ticketComplimentary:"Complimentary"
  },
  zh: {
    languageLabel:"语言", devVersion:"2026 开发版本", heroSubtitle:"观众登记与售票", devNoticeTitle:"2026 测试版本", devNoticeBody:"比赛日期和票价为草案。数据仅保存在本设备上，尚未发送至正式数据库。",
    partVisitor:"第 1 部分 · 观众", visitorTitle:"观众个人登记", visitorIntro:"每位观众必须逐一完成登记，之后工作人员才能办理售票。", registered:"已登记", progressVisitor:"1 观众资料", progressConsent:"2 同意确认", progressHandover:"3 交给工作人员",
    identityTitle:"身份资料", identitySubtitle:"个人信息", firstName:"名 *", lastName:"姓 *", ageGroup:"年龄组 *", selectOption:"— 请选择 —", ageUnder10:"10 岁以下", age60Plus:"60 岁及以上", gender:"性别 *", male:"男", female:"女", nonBinary:"非二元性别", preferNot:"不愿透露",
    profileTitle:"居住地与观众资料", profileSubtitle:"观众概况", country:"居住国家/地区 *", countrySelect:"— 选择国家/地区 —", city:"省份 / 城市 *", cityPlaceholder:"例如：春武里 / 芭堤雅", previousAttendance:"是否参加过 WGP#1 *", firstTime:"首次参加", returning:"曾经参加", discovery:"主要获知渠道 *", influencer:"网红 / 创作者", pattayaPromotion:"芭堤雅广告", hotelTour:"酒店或旅行社", friendFamily:"朋友或家人", previousEvent:"以往 WGP#1 活动", other:"其他",
    guardianTitle:"监护人资料", guardianSubtitle:"未满 20 岁观众必填", guardianName:"监护人姓名 *", relationship:"关系 *", parent:"父母", legalGuardian:"法定监护人", authorizedAdult:"获授权成年人", guardianPhone:"监护人电话 *", guardianConfirm:"本人有权代表该未成年人，并确认以上资料属实。",
    privacyTitle:"隐私声明与现场媒体", privacySubtitle:"隐私与现场媒体", privacyRegistration:"<strong>登记与售票：</strong> WGP#1 处理核实观众身份、管理门票、分析到场人数及保障活动安全所需的信息。数据依组织政策保留，数据主体可依法行使权利。", privacyMedia:"<strong>摄影与直播：</strong> 场地内可能为赛事报道及宣传进行拍照、录音和直播。如有顾虑，请在进入拍摄区域前告知工作人员。", privacyAck:"我已阅读并知悉隐私声明及现场媒体信息。", marketingConsent:"我同意接收 WGP#1 未来赛事和活动资讯（可选）。", confirmVisitor:"确认此观众资料",
    visitorConfirmed:"观众已确认", visitorSaved:"观众资料已保存", addVisitor:"登记下一位观众", addVisitorHint:"添加另一位观众", finishVisitors:"所有观众已登记", finishVisitorsHint:"交给工作人员继续", removeLast:"删除最后一位观众", staffNext:"下一步：工作人员", handoverTitle:"观众登记已完成", visitors:"位观众", handoverBody:"请将设备交还工作人员，以完成出票和付款。", staffContinue:"工作人员继续",
    partStaff:"第 2 部分 · 仅限工作人员", staffTitle:"售票汇总", staffIntro:"分配的门票数量必须与已登记观众人数一致。", visitorsInSale:"本单观众", staff:"工作人员 *", selectStaff:"— 选择工作人员 —", payment:"付款方式 *", cash:"现金", qrTransfer:"二维码 / 银行转账", complimentary:"赠票", ticketTypes:"票种与数量", ticketTypesSubtitle:"选择票种和数量", mustAllocate:"需分配", totalTickets:"门票总数", calculatedTotal:"计算金额", amountPaid:"实收金额 (THB) *", staffNote:"工作人员备注", staffNotePlaceholder:"折扣、赠票或特殊情况", back:"返回", finalize:"确认并保存",
    registrationComplete:"登记完成", completeTitle:"交易已完成", transactionNumber:"交易编号", localDataNotice:"测试数据仅保存在本设备上，尚未发送至正式数据库。", nextGroup:"开始下一组观众", footer:"© 2026 WGP#1 · 开发副本",
    peopleUnit:"人", ticketUnit:"张", confirmedCount:"已确认 {count} 位观众", requiredError:"请填写所有必填项目。", mismatchError:"门票数量必须与已登记观众人数一致（{count} 张）。", perTicket:"每张", noCharge:"免费", quantityFor:"{name} 数量", ticketWeekdayDay:"单日票 — 工作日", ticketWeekendDay:"单日票 — 周末", ticketWeekdayPass:"工作日套票", ticketProWeekend:"专业赛周末票", ticketAllEvent:"全程通票", ticketComplimentary:"赠票"
  },
  ja: {
    languageLabel:"言語", devVersion:"2026 開発版", heroSubtitle:"来場者登録・チケット販売", devNoticeTitle:"2026 テスト版", devNoticeBody:"開催日とチケット価格は暫定です。データはこの端末にのみ保存され、本番データベースには送信されません。",
    partVisitor:"パート1 · 来場者", visitorTitle:"来場者個別登録", visitorIntro:"チケット手続きの前に、来場者全員が一人ずつ登録してください。", registered:"登録済み", progressVisitor:"1 来場者情報", progressConsent:"2 同意確認", progressHandover:"3 スタッフへ引渡し",
    identityTitle:"本人情報", identitySubtitle:"個人情報", firstName:"名 *", lastName:"姓 *", ageGroup:"年齢層 *", selectOption:"— 選択してください —", ageUnder10:"10歳未満", age60Plus:"60歳以上", gender:"性別 *", male:"男性", female:"女性", nonBinary:"ノンバイナリー", preferNot:"回答しない",
    profileTitle:"居住地・来場者プロフィール", profileSubtitle:"来場者プロフィール", country:"居住国・地域 *", countrySelect:"— 国・地域を選択 —", city:"都道府県 / 市区町村 *", cityPlaceholder:"例：チョンブリー / パタヤ", previousAttendance:"WGP#1 来場経験 *", firstTime:"初めて", returning:"来場経験あり", discovery:"主な情報入手先 *", influencer:"インフルエンサー / クリエイター", pattayaPromotion:"パタヤの広告", hotelTour:"ホテルまたは旅行会社", friendFamily:"友人または家族", previousEvent:"過去の WGP#1", other:"その他",
    guardianTitle:"保護者情報", guardianSubtitle:"20歳未満の来場者は必須", guardianName:"保護者氏名 *", relationship:"続柄 *", parent:"親", legalGuardian:"法定保護者", authorizedAdult:"委任された成人", guardianPhone:"保護者電話番号 *", guardianConfirm:"私はこの未成年者を代理する権限があり、上記情報を確認します。",
    privacyTitle:"プライバシー通知・会場メディア", privacySubtitle:"プライバシーと会場メディア", privacyRegistration:"<strong>登録・発券：</strong> WGP#1 は本人確認、チケット管理、来場分析、会場の安全確保に必要な情報を取り扱います。データは組織の方針に従って保管され、本人は法的権利を行使できます。", privacyMedia:"<strong>撮影・ライブ配信：</strong> 大会報道や広報のため、会場内で写真撮影、録音、ライブ配信を行う場合があります。ご心配な方は撮影区域に入る前にスタッフへお申し出ください。", privacyAck:"プライバシー通知と会場メディア情報を読み、内容を確認しました。", marketingConsent:"今後の WGP#1 ニュースや案内の受信に同意します（任意）。", confirmVisitor:"この来場者を確認",
    visitorConfirmed:"来場者確認済み", visitorSaved:"来場者情報を保存しました", addVisitor:"次の来場者を登録", addVisitorHint:"別の来場者を追加", finishVisitors:"全員の登録が完了", finishVisitorsHint:"スタッフへ引き渡す", removeLast:"最後の来場者を削除", staffNext:"次はスタッフ", handoverTitle:"来場者登録が完了しました", visitors:"名", handoverBody:"発券と支払い手続きのため、端末をスタッフにお渡しください。", staffContinue:"スタッフが続ける",
    partStaff:"パート2 · スタッフ専用", staffTitle:"チケット販売まとめ", staffIntro:"登録済み来場者数と同じ枚数のチケットを割り当ててください。", visitorsInSale:"この取引の来場者", staff:"スタッフ *", selectStaff:"— スタッフを選択 —", payment:"支払方法 *", cash:"現金", qrTransfer:"QR / 銀行振込", complimentary:"招待券", ticketTypes:"チケット種別・枚数", ticketTypesSubtitle:"種別と枚数を選択", mustAllocate:"必要枚数", totalTickets:"合計枚数", calculatedTotal:"計算金額", amountPaid:"受領金額 (THB) *", staffNote:"スタッフメモ", staffNotePlaceholder:"割引、招待券、特記事項", back:"戻る", finalize:"確認して保存",
    registrationComplete:"登録完了", completeTitle:"取引が完了しました", transactionNumber:"取引番号", localDataNotice:"テストデータはこの端末にのみ保存され、本番データベースには送信されません。", nextGroup:"次のグループを開始", footer:"© 2026 WGP#1 · 開発用コピー",
    peopleUnit:"名", ticketUnit:"枚", confirmedCount:"{count}名の来場者を確認しました", requiredError:"必須項目をすべて入力してください。", mismatchError:"チケット枚数を登録済み来場者数（{count}枚）に合わせてください。", perTicket:"1枚", noCharge:"無料", quantityFor:"{name}の枚数", ticketWeekdayDay:"1日券 — 平日", ticketWeekendDay:"1日券 — 週末", ticketWeekdayPass:"平日パッケージ", ticketProWeekend:"プロ・ウィークエンド", ticketAllEvent:"全日程パス", ticketComplimentary:"招待券"
  },
  ko: {
    languageLabel:"언어", devVersion:"2026 개발 버전", heroSubtitle:"관람객 등록 및 티켓 판매", devNoticeTitle:"2026 테스트 버전", devNoticeBody:"행사 일정과 티켓 가격은 초안입니다. 데이터는 이 기기에만 저장되며 운영 데이터베이스로 전송되지 않습니다.",
    partVisitor:"파트 1 · 관람객", visitorTitle:"관람객 개별 등록", visitorIntro:"티켓 발권 전에 모든 관람객이 한 명씩 직접 등록해야 합니다.", registered:"등록 완료", progressVisitor:"1 관람객 정보", progressConsent:"2 동의 확인", progressHandover:"3 직원에게 전달",
    identityTitle:"신원 정보", identitySubtitle:"개인 정보", firstName:"이름 *", lastName:"성 *", ageGroup:"연령대 *", selectOption:"— 선택해 주세요 —", ageUnder10:"10세 미만", age60Plus:"60세 이상", gender:"성별 *", male:"남성", female:"여성", nonBinary:"논바이너리", preferNot:"응답하지 않음",
    profileTitle:"거주지 및 관람객 정보", profileSubtitle:"관람객 프로필", country:"거주 국가/지역 *", countrySelect:"— 국가/지역 선택 —", city:"주 / 도시 *", cityPlaceholder:"예: 촌부리 / 파타야", previousAttendance:"WGP#1 관람 경험 *", firstTime:"처음 방문", returning:"방문 경험 있음", discovery:"주요 유입 경로 *", influencer:"인플루언서 / 크리에이터", pattayaPromotion:"파타야 광고", hotelTour:"호텔 또는 여행사", friendFamily:"친구 또는 가족", previousEvent:"이전 WGP#1 행사", other:"기타",
    guardianTitle:"보호자 정보", guardianSubtitle:"20세 미만 관람객 필수", guardianName:"보호자 성명 *", relationship:"관계 *", parent:"부모", legalGuardian:"법적 보호자", authorizedAdult:"위임받은 성인", guardianPhone:"보호자 전화번호 *", guardianConfirm:"본인은 이 미성년자를 대리할 권한이 있으며 위 정보를 확인합니다.",
    privacyTitle:"개인정보 안내 및 현장 미디어", privacySubtitle:"개인정보 및 현장 미디어", privacyRegistration:"<strong>등록 및 발권:</strong> WGP#1은 관람객 확인, 티켓 관리, 관람 분석 및 행사 안전에 필요한 정보를 처리합니다. 데이터는 조직 정책에 따라 보관되며 정보주체는 법적 권리를 행사할 수 있습니다.", privacyMedia:"<strong>촬영 및 생중계:</strong> 행사 보도와 홍보를 위해 현장에서 사진, 음성 녹음 및 생중계가 진행될 수 있습니다. 우려가 있다면 촬영 구역에 들어가기 전에 직원에게 알려 주세요.", privacyAck:"개인정보 안내와 현장 미디어 정보를 읽고 확인했습니다.", marketingConsent:"향후 WGP#1 소식과 행사 안내 수신에 동의합니다(선택).", confirmVisitor:"이 관람객 확인",
    visitorConfirmed:"관람객 확인 완료", visitorSaved:"관람객 정보가 저장되었습니다", addVisitor:"다음 관람객 등록", addVisitorHint:"관람객 한 명 더 추가", finishVisitors:"모든 관람객 등록 완료", finishVisitorsHint:"직원에게 전달", removeLast:"마지막 관람객 삭제", staffNext:"다음 단계: 직원", handoverTitle:"관람객 등록이 완료되었습니다", visitors:"명", handoverBody:"티켓 및 결제를 완료할 수 있도록 기기를 직원에게 돌려주세요.", staffContinue:"직원 계속",
    partStaff:"파트 2 · 직원 전용", staffTitle:"티켓 판매 요약", staffIntro:"등록된 관람객 수에 맞게 티켓을 배정하세요.", visitorsInSale:"거래 관람객", staff:"직원 *", selectStaff:"— 직원 선택 —", payment:"결제 방법 *", cash:"현금", qrTransfer:"QR / 은행 송금", complimentary:"초대권", ticketTypes:"티켓 종류 및 수량", ticketTypesSubtitle:"종류와 수량 선택", mustAllocate:"필요 수량", totalTickets:"총 티켓", calculatedTotal:"계산 금액", amountPaid:"수령 금액 (THB) *", staffNote:"직원 메모", staffNotePlaceholder:"할인, 초대권 또는 특이사항", back:"뒤로", finalize:"확인 및 저장",
    registrationComplete:"등록 완료", completeTitle:"거래가 완료되었습니다", transactionNumber:"거래 번호", localDataNotice:"테스트 데이터는 이 기기에만 저장되며 운영 데이터베이스로 전송되지 않습니다.", nextGroup:"다음 관람객 그룹 시작", footer:"© 2026 WGP#1 · 개발용 사본",
    peopleUnit:"명", ticketUnit:"장", confirmedCount:"관람객 {count}명 확인 완료", requiredError:"필수 항목을 모두 입력해 주세요.", mismatchError:"티켓 수량은 등록 관람객 수({count}장)와 같아야 합니다.", perTicket:"장당", noCharge:"무료", quantityFor:"{name} 수량", ticketWeekdayDay:"1일권 — 평일", ticketWeekendDay:"1일권 — 주말", ticketWeekdayPass:"평일 패키지", ticketProWeekend:"프로 주말권", ticketAllEvent:"전 일정 패스", ticketComplimentary:"초대권"
  },
  fr: {
    languageLabel:"Langue", devVersion:"VERSION DE DÉVELOPPEMENT 2026", heroSubtitle:"Inscription des visiteurs et vente de billets", devNoticeTitle:"Version de test 2026", devNoticeBody:"Les dates et tarifs sont provisoires. Les données restent sur cet appareil et ne sont pas envoyées à la base de production.",
    partVisitor:"PARTIE 1 · VISITEUR", visitorTitle:"Inscription individuelle", visitorIntro:"Chaque visiteur doit s’inscrire séparément avant l’émission des billets par le personnel.", registered:"Inscrits", progressVisitor:"1 Informations", progressConsent:"2 Consentement", progressHandover:"3 Remise au personnel",
    identityTitle:"Identité", identitySubtitle:"Informations personnelles", firstName:"Prénom *", lastName:"Nom *", ageGroup:"Tranche d’âge *", selectOption:"— Veuillez sélectionner —", ageUnder10:"Moins de 10 ans", age60Plus:"60 ans ou plus", gender:"Genre *", male:"Homme", female:"Femme", nonBinary:"Non binaire", preferNot:"Préfère ne pas répondre",
    profileTitle:"Résidence et profil visiteur", profileSubtitle:"Profil du public", country:"Pays de résidence *", countrySelect:"— Choisir un pays —", city:"Province / Ville *", cityPlaceholder:"ex. Chonburi / Pattaya", previousAttendance:"Déjà venu au WGP#1 *", firstTime:"Première visite", returning:"Déjà venu", discovery:"Canal de découverte principal *", influencer:"Influenceur / Créateur", pattayaPromotion:"Publicité à Pattaya", hotelTour:"Hôtel ou voyagiste", friendFamily:"Ami ou famille", previousEvent:"Événement WGP#1 précédent", other:"Autre",
    guardianTitle:"Informations du responsable", guardianSubtitle:"Obligatoire pour les visiteurs de moins de 20 ans", guardianName:"Nom complet du responsable *", relationship:"Lien *", parent:"Parent", legalGuardian:"Tuteur légal", authorizedAdult:"Adulte autorisé", guardianPhone:"Téléphone du responsable *", guardianConfirm:"Je suis autorisé(e) à représenter ce mineur et je confirme les informations ci-dessus.",
    privacyTitle:"Avis de confidentialité et médias", privacySubtitle:"Confidentialité et médias de l’événement", privacyRegistration:"<strong>Inscription et billetterie :</strong> WGP#1 traite les informations nécessaires à la vérification des visiteurs, à la gestion des billets, à l’analyse de fréquentation et à la sécurité. Les données sont conservées selon la politique de l’organisation et les personnes peuvent exercer leurs droits légaux.", privacyMedia:"<strong>Photos et direct :</strong> Des photos, enregistrements audio et diffusions en direct peuvent avoir lieu pour informer et promouvoir l’événement. En cas de préoccupation, prévenez le personnel avant d’entrer dans les zones filmées.", privacyAck:"J’ai lu et pris connaissance de l’avis de confidentialité et des informations sur les médias.", marketingConsent:"J’accepte de recevoir les futures actualités et offres WGP#1 (facultatif).", confirmVisitor:"Confirmer ce visiteur",
    visitorConfirmed:"VISITEUR CONFIRMÉ", visitorSaved:"Visiteur enregistré", addVisitor:"Inscrire le visiteur suivant", addVisitorHint:"Ajouter un autre visiteur", finishVisitors:"Tous les visiteurs sont inscrits", finishVisitorsHint:"Remettre au personnel", removeLast:"Supprimer le dernier visiteur", staffNext:"AU PERSONNEL", handoverTitle:"L’inscription des visiteurs est terminée", visitors:"visiteurs", handoverBody:"Veuillez rendre cet appareil au personnel pour finaliser les billets et le paiement.", staffContinue:"Continuer — personnel",
    partStaff:"PARTIE 2 · PERSONNEL", staffTitle:"Récapitulatif de vente", staffIntro:"Attribuez autant de billets que de visiteurs inscrits.", visitorsInSale:"Visiteurs de la vente", staff:"Personnel *", selectStaff:"— Choisir un membre —", payment:"Mode de paiement *", cash:"Espèces", qrTransfer:"QR / Virement bancaire", complimentary:"Invitation", ticketTypes:"Types et quantités de billets", ticketTypesSubtitle:"Choisir le type et la quantité", mustAllocate:"À attribuer", totalTickets:"Total des billets", calculatedTotal:"Total calculé", amountPaid:"Montant reçu (THB) *", staffNote:"Note du personnel", staffNotePlaceholder:"Réduction, invitation ou cas particulier", back:"Retour", finalize:"Confirmer et enregistrer",
    registrationComplete:"INSCRIPTION TERMINÉE", completeTitle:"Transaction terminée", transactionNumber:"Numéro de transaction", localDataNotice:"Les données de test restent sur cet appareil et ne sont pas envoyées à la base de production.", nextGroup:"Commencer le groupe suivant", footer:"© 2026 WGP#1 · Copie de développement",
    peopleUnit:"personnes", ticketUnit:"billets", confirmedCount:"{count} visiteur(s) confirmé(s)", requiredError:"Veuillez remplir tous les champs obligatoires.", mismatchError:"Le nombre de billets doit correspondre aux visiteurs inscrits ({count}).", perTicket:"par billet", noCharge:"Gratuit", quantityFor:"Quantité pour {name}", ticketWeekdayDay:"Journée — Semaine", ticketWeekendDay:"Journée — Week-end", ticketWeekdayPass:"Forfait semaine", ticketProWeekend:"Week-end Pro", ticketAllEvent:"Pass événement complet", ticketComplimentary:"Invitation"
  },
  es: {
    languageLabel:"Idioma", devVersion:"VERSIÓN DE DESARROLLO 2026", heroSubtitle:"Registro de visitantes y venta de entradas", devNoticeTitle:"Versión de prueba 2026", devNoticeBody:"Las fechas y los precios son provisionales. Los datos se guardan solo en este dispositivo y no se envían a la base de producción.",
    partVisitor:"PARTE 1 · VISITANTE", visitorTitle:"Registro individual de visitantes", visitorIntro:"Cada visitante debe registrarse por separado antes de que el personal emita las entradas.", registered:"Registrados", progressVisitor:"1 Datos", progressConsent:"2 Consentimiento", progressHandover:"3 Entrega al personal",
    identityTitle:"Identidad", identitySubtitle:"Información personal", firstName:"Nombre *", lastName:"Apellidos *", ageGroup:"Grupo de edad *", selectOption:"— Selecciona —", ageUnder10:"Menos de 10 años", age60Plus:"60 años o más", gender:"Género *", male:"Hombre", female:"Mujer", nonBinary:"No binario", preferNot:"Prefiero no decirlo",
    profileTitle:"Residencia y perfil del visitante", profileSubtitle:"Perfil del público", country:"País de residencia *", countrySelect:"— Selecciona un país —", city:"Provincia / Ciudad *", cityPlaceholder:"p. ej., Chonburi / Pattaya", previousAttendance:"Asistencia previa a WGP#1 *", firstTime:"Primera vez", returning:"Ya ha asistido", discovery:"Canal principal de descubrimiento *", influencer:"Influencer / Creador", pattayaPromotion:"Publicidad en Pattaya", hotelTour:"Hotel o agencia de viajes", friendFamily:"Amigo o familiar", previousEvent:"Evento WGP#1 anterior", other:"Otro",
    guardianTitle:"Datos del tutor", guardianSubtitle:"Obligatorio para visitantes menores de 20 años", guardianName:"Nombre completo del tutor *", relationship:"Relación *", parent:"Padre o madre", legalGuardian:"Tutor legal", authorizedAdult:"Adulto autorizado", guardianPhone:"Teléfono del tutor *", guardianConfirm:"Estoy autorizado para representar a este menor y confirmo la información anterior.",
    privacyTitle:"Aviso de privacidad y medios", privacySubtitle:"Privacidad y medios del evento", privacyRegistration:"<strong>Registro y entradas:</strong> WGP#1 trata la información necesaria para verificar visitantes, administrar entradas, analizar la asistencia y mantener la seguridad. Los datos se conservan según la política de la organización y las personas pueden ejercer sus derechos legales.", privacyMedia:"<strong>Fotografía y transmisión:</strong> Puede haber fotografías, grabación de audio y emisiones en directo para informar y promocionar el evento. Si tienes alguna inquietud, avisa al personal antes de entrar en zonas de cámaras.", privacyAck:"He leído y reconozco el aviso de privacidad y la información sobre medios del evento.", marketingConsent:"Acepto recibir futuras noticias y ofertas de WGP#1 (opcional).", confirmVisitor:"Confirmar este visitante",
    visitorConfirmed:"VISITANTE CONFIRMADO", visitorSaved:"Visitante guardado correctamente", addVisitor:"Registrar al siguiente visitante", addVisitorHint:"Añadir otro visitante", finishVisitors:"Todos los visitantes están registrados", finishVisitorsHint:"Entregar al personal", removeLast:"Eliminar último visitante", staffNext:"SIGUE EL PERSONAL", handoverTitle:"El registro de visitantes ha terminado", visitors:"visitantes", handoverBody:"Devuelve este dispositivo al personal para completar las entradas y el pago.", staffContinue:"Continuar — personal",
    partStaff:"PARTE 2 · SOLO PERSONAL", staffTitle:"Resumen de venta de entradas", staffIntro:"Asigna tantas entradas como visitantes registrados.", visitorsInSale:"Visitantes de la venta", staff:"Personal *", selectStaff:"— Seleccionar personal —", payment:"Método de pago *", cash:"Efectivo", qrTransfer:"QR / Transferencia bancaria", complimentary:"Invitación", ticketTypes:"Tipos y cantidades de entradas", ticketTypesSubtitle:"Selecciona tipo y cantidad", mustAllocate:"Por asignar", totalTickets:"Total de entradas", calculatedTotal:"Total calculado", amountPaid:"Importe recibido (THB) *", staffNote:"Nota del personal", staffNotePlaceholder:"Descuento, invitación o caso especial", back:"Atrás", finalize:"Confirmar y guardar",
    registrationComplete:"REGISTRO COMPLETADO", completeTitle:"Transacción completada", transactionNumber:"Número de transacción", localDataNotice:"Los datos de prueba se guardan solo en este dispositivo y no se envían a la base de producción.", nextGroup:"Iniciar siguiente grupo", footer:"© 2026 WGP#1 · Copia de desarrollo",
    peopleUnit:"personas", ticketUnit:"entradas", confirmedCount:"{count} visitante(s) confirmado(s)", requiredError:"Completa todos los campos obligatorios.", mismatchError:"La cantidad de entradas debe coincidir con los visitantes registrados ({count}).", perTicket:"por entrada", noCharge:"Sin cargo", quantityFor:"Cantidad de {name}", ticketWeekdayDay:"Un día — Laborable", ticketWeekendDay:"Un día — Fin de semana", ticketWeekdayPass:"Paquete laborables", ticketProWeekend:"Fin de semana Pro", ticketAllEvent:"Pase completo", ticketComplimentary:"Invitación"
  }
};

const countryCodes = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
const state = { attendees: [], ticketQuantities: {} };
const screens = ["screen-visitor","screen-group","screen-handover","screen-staff","screen-complete"];
const $ = id => document.getElementById(id);
let currentLanguage = localStorage.getItem("wgp1-language") || "th";
if (!translations[currentLanguage]) currentLanguage = "th";

function t(key, variables = {}) {
  let value = translations[currentLanguage][key] ?? translations.en[key] ?? key;
  Object.entries(variables).forEach(([name, replacement]) => { value = value.replaceAll(`{${name}}`, replacement); });
  return value;
}

function localizedNumber(value) { return Number(value).toLocaleString(localeCodes[currentLanguage]); }

function populateCountries() {
  const select = $("v-country");
  const selected = select.value || "TH";
  const displayNames = new Intl.DisplayNames([localeCodes[currentLanguage]], { type: "region" });
  const collator = new Intl.Collator(localeCodes[currentLanguage]);
  const countries = countryCodes.map(code => ({ code, name: displayNames.of(code) || code })).sort((a, b) => collator.compare(a.name, b.name));
  const thailand = countries.find(country => country.code === "TH");
  const ordered = thailand ? [thailand, ...countries.filter(country => country.code !== "TH")] : countries;
  select.textContent = "";
  const placeholder = document.createElement("option"); placeholder.value = ""; placeholder.textContent = t("countrySelect"); select.appendChild(placeholder);
  ordered.forEach(country => { const option = document.createElement("option"); option.value = country.code; option.textContent = country.name; select.appendChild(option); });
  select.value = countryCodes.includes(selected) ? selected : "TH";
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "th";
  localStorage.setItem("wgp1-language", currentLanguage);
  document.documentElement.lang = localeCodes[currentLanguage];
  document.title = `WGP#1 2026 — ${t("heroSubtitle")}`;
  $("language-select").value = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(element => { element.innerHTML = t(element.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  populateCountries(); renderTickets(); updateCounts();
}

function showScreen(id) { screens.forEach(screenId => $(screenId).classList.toggle("hidden", screenId !== id)); window.scrollTo({ top: 0, behavior: "smooth" }); }
function setError(id, message) { const box = $(id); box.textContent = message; box.classList.toggle("hidden", !message); }
function updateCounts() {
  const count = localizedNumber(state.attendees.length);
  $("visitor-count").textContent = `${count} ${t("peopleUnit")}`;
  $("group-message").textContent = t("confirmedCount", { count });
  $("handover-count").textContent = count;
  $("staff-attendee-count").textContent = `${count} ${t("peopleUnit")}`;
  $("tickets-required").textContent = `${count} ${t("ticketUnit")}`;
}
function isMinorAgeGroup(value) { return value === "under-10" || value === "10-19"; }
function updateGuardianPanel() { const required = isMinorAgeGroup($("v-age").value); $("guardian-panel").classList.toggle("hidden", !required); ["g-name","g-relation","g-phone","g-confirm"].forEach(id => $(id).required = required); }

function readVisitor() {
  const ageGroup = $("v-age").value;
  const minor = isMinorAgeGroup(ageGroup);
  const code = $("v-country").value;
  return {
    attendeeId: crypto.randomUUID ? crypto.randomUUID() : `ATT-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    firstName: $("v-first").value.trim(), lastName: $("v-last").value.trim(), ageGroup, gender: $("v-gender").value,
    countryCode: code, countryName: new Intl.DisplayNames([localeCodes[currentLanguage]], { type: "region" }).of(code), city: $("v-city").value.trim(),
    previousAttendance: $("v-previous").value, marketingSource: $("v-source").value,
    guardian: minor ? { name: $("g-name").value.trim(), relationship: $("g-relation").value, phone: $("g-phone").value.trim(), confirmed: $("g-confirm").checked } : null,
    privacy: { acknowledged: $("v-privacy").checked, marketingConsent: $("v-marketing").checked, noticeVersion: APP_CONFIG.privacyNoticeVersion, recordedAt: new Date().toISOString(), language: currentLanguage }
  };
}

function validateForm(form, errorId) {
  const valid = form.checkValidity();
  form.querySelectorAll("input,select").forEach(field => field.setAttribute("aria-invalid", field.required && !field.checkValidity() ? "true" : "false"));
  if (!valid) { setError(errorId, t("requiredError")); const firstInvalid = form.querySelector(":invalid"); if (firstInvalid) firstInvalid.focus(); } else setError(errorId, "");
  return valid;
}
function resetVisitorForm() { $("visitor-form").reset(); $("v-country").value = "TH"; updateGuardianPanel(); setError("visitor-error", ""); $("visitor-form").querySelectorAll("[aria-invalid]").forEach(element => element.removeAttribute("aria-invalid")); }

function renderTickets() {
  const container = $("ticket-lines"); if (!container) return; container.textContent = "";
  APP_CONFIG.ticketTypes.forEach(ticket => {
    const name = t(ticket.nameKey); const row = document.createElement("div"); row.className = "ticket-line";
    const description = document.createElement("div"); const title = document.createElement("strong"); title.textContent = name;
    const note = document.createElement("p"); note.textContent = ticket.price ? `${localizedNumber(ticket.price)} THB ${t("perTicket")}` : t("noCharge"); description.append(title, note);
    const qty = document.createElement("input"); qty.type = "number"; qty.min = "0"; qty.step = "1"; qty.value = state.ticketQuantities[ticket.id] || 0; qty.dataset.ticketId = ticket.id; qty.setAttribute("aria-label", t("quantityFor", { name }));
    qty.addEventListener("input", () => {
      const otherTickets = APP_CONFIG.ticketTypes.reduce((total, item) => item.id === ticket.id ? total : total + Math.max(0, Number(state.ticketQuantities[item.id] || 0)), 0);
      const maximumForThisType = Math.max(0, state.attendees.length - otherTickets);
      const requested = Math.max(0, Math.floor(Number(qty.value || 0)));
      state.ticketQuantities[ticket.id] = Math.min(requested, maximumForThisType);
      qty.value = state.ticketQuantities[ticket.id];
      updateTicketSummary();
    });
    const price = document.createElement("strong"); price.className = "ticket-price"; price.textContent = `${localizedNumber(ticket.price)} THB`;
    row.append(description, qty, price); container.appendChild(row);
  }); updateTicketSummary();
}
function calculateTickets() {
  return APP_CONFIG.ticketTypes.reduce((summary, ticket) => { const quantity = Math.max(0, Number(state.ticketQuantities[ticket.id] || 0)); if (quantity) summary.items.push({ ticketType: ticket.id, ticketName: t(ticket.nameKey), unitPrice: ticket.price, quantity, lineTotal: ticket.price * quantity }); summary.quantity += quantity; summary.total += ticket.price * quantity; return summary; }, { items: [], quantity: 0, total: 0 });
}
function updateTicketSummary() {
  const summary = calculateTickets();
  const remaining = Math.max(0, state.attendees.length - summary.quantity);
  document.querySelectorAll("#ticket-lines input[data-ticket-id]").forEach(input => {
    const currentQuantity = Math.max(0, Number(state.ticketQuantities[input.dataset.ticketId] || 0));
    input.max = String(currentQuantity + remaining);
    input.disabled = state.attendees.length === 0;
  });
  $("ticket-total-qty").textContent = `${localizedNumber(summary.quantity)} ${t("ticketUnit")}`;
  $("calculated-total").textContent = `${localizedNumber(summary.total)} THB`;
  if (document.activeElement !== $("s-amount")) $("s-amount").value = summary.total;
}
function resetAll() { state.attendees = []; state.ticketQuantities = {}; $("staff-form").reset(); resetVisitorForm(); renderTickets(); updateCounts(); showScreen("screen-visitor"); }
function buildTransaction() {
  const ticketSummary = calculateTickets(); const transactionId = `JWC26-${new Date().toISOString().replace(/\D/g, "").slice(2,14)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  return { transactionId, eventYear: APP_CONFIG.eventYear, dataMode: APP_CONFIG.dataMode, interfaceLanguage: currentLanguage, submittedAt: new Date().toISOString(), attendeeCount: state.attendees.length, attendees: state.attendees, sale: { staff: $("s-staff").value, paymentMethod: $("s-payment").value, ticketItems: ticketSummary.items, ticketQuantity: ticketSummary.quantity, calculatedTotal: ticketSummary.total, amountPaid: Number($("s-amount").value || 0), note: $("s-note").value.trim() } };
}
function saveDevelopmentTransaction(transaction) { const key = "wgp1-jwc26-development-transactions"; const current = JSON.parse(localStorage.getItem(key) || "[]"); current.push(transaction); localStorage.setItem(key, JSON.stringify(current.slice(-200))); }

$("language-select").addEventListener("change", event => applyLanguage(event.target.value));
$("v-age").addEventListener("change", updateGuardianPanel);
$("visitor-form").addEventListener("submit", event => { event.preventDefault(); if (!validateForm(event.currentTarget, "visitor-error")) return; state.attendees.push(readVisitor()); updateCounts(); showScreen("screen-group"); });
$("add-visitor").addEventListener("click", () => { resetVisitorForm(); showScreen("screen-visitor"); });
$("remove-last").addEventListener("click", () => { state.attendees.pop(); updateCounts(); if (!state.attendees.length) { resetVisitorForm(); showScreen("screen-visitor"); } });
$("finish-visitors").addEventListener("click", () => { if (!state.attendees.length) return; updateCounts(); showScreen("screen-handover"); });
$("to-staff").addEventListener("click", () => { renderTickets(); updateCounts(); showScreen("screen-staff"); });
$("back-handover").addEventListener("click", () => showScreen("screen-handover"));
$("staff-form").addEventListener("submit", event => { event.preventDefault(); if (!validateForm(event.currentTarget, "staff-error")) return; const summary = calculateTickets(); if (summary.quantity !== state.attendees.length) { setError("staff-error", t("mismatchError", { count: localizedNumber(state.attendees.length) })); return; } const transaction = buildTransaction(); saveDevelopmentTransaction(transaction); $("transaction-id").textContent = transaction.transactionId; setError("staff-error", ""); showScreen("screen-complete"); });
$("next-customer").addEventListener("click", resetAll);

applyLanguage(currentLanguage);
resetAll();

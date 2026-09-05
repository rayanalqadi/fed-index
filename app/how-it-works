export const metadata = {
  title: "كيف يعمل مؤشر الفيدرالي",
};

const sectionStyle = {
  marginBottom: "2.4rem",
};

const headingStyle = {
  fontFamily: "'Markazi Text', serif",
  fontWeight: 700,
  fontSize: 24,
  color: "#F2EFE9",
  marginBottom: "0.9rem",
};

const bodyStyle = {
  fontSize: 15,
  color: "#C9CFD9",
  lineHeight: 2,
};

export default function HowItWorks() {
  return (
    <div style={{ minHeight: "100vh", padding: "8vw 6vw 4rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ color: "#B8974D", fontSize: 13, textDecoration: "none" }}>
          ← الرجوع للتوقع الحالي
        </a>

        <h1
          style={{
            fontFamily: "'Markazi Text', serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 38px)",
            color: "#F2EFE9",
            margin: "1.6rem 0 3rem",
          }}
        >
          كيف يعمل مؤشر الفيدرالي؟
        </h1>

        <div style={sectionStyle}>
          <div style={headingStyle}>الفكرة الأساسية</div>
          <div style={bodyStyle}>
            هذا الموقع يتوقع اتجاه قرار لجنة السوق المفتوحة الفيدرالية الأمريكية (FOMC) في
            اجتماعها القادم — هل ستُبقي على سعر الفائدة، أم ترفعه، أم تخفضه — بناءً على نموذج
            إحصائي مبني على بيانات اقتصادية رسمية، وليس على تكهنات أو أخبار.
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>البيانات المستخدمة</div>
          <div style={bodyStyle}>
            أربع سلاسل بيانات رسمية من FRED (البنك الفيدرالي الاحتياطي في سانت لويس):
            <br />
            • التضخم الأساسي (Core PCE) — المقياس المفضل لدى الفيدرالي نفسه
            <br />
            • معدل البطالة
            <br />
            • عدد الوظائف غير الزراعية
            <br />
            • سعر الفائدة الفعلي الحالي
            <br />
            الموقع يجلب أحدث نسخة من هذي البيانات تلقائيًا يوميًا مباشرة من FRED API.
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>منهجية النموذج: "تشريح الدورات"</div>
          <div style={bodyStyle}>
            الفكرة الجوهرية: قرارات الفيدرالي نادرًا ما تكون معزولة — هي غالبًا جزء من "دورة"
            (دورة رفع، دورة خفض، أو فترة تثبيت طويلة). النموذج يتتبع أي دورة نشطة حاليًا، ويطبق
            قواعد واضحة لتحديد متى تُستنفد الدورة أو متى تُكسر حالة التثبيت:
            <br />
            <br />
            • دورة الخفض تُعتبر مكتملة بعد 3 خفوض متتالية
            <br />
            • دورة الرفع تنتهي إذا انخفض التضخم عن 2.5%، أو تباطأ زخمه مع بطالة صاعدة
            <br />
            • كسر التثبيت لرفع يتطلب تضخمًا مرتفعًا جدًا (أعلى من 5%) مع زخم إيجابي مستمر
            <br />
            • كسر التثبيت لخفض يتطلب ارتفاع بطالة ملحوظ مع فائدة حقيقية مرتفعة
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>الدقة الفعلية المُختبرة</div>
          <div style={bodyStyle}>
            اختُبر النموذج على 51 اجتماعًا فعليًا للجنة الفيدرالية من 2019 إلى 2026 (باستثناء
            2020 لتشوه بياناته بسبب جائحة كورونا)، بمقارنة توقع النموذج بالقرار الحقيقي الذي
            اتخذته اللجنة فعليًا في كل اجتماع:
            <br />
            <br />
            <strong style={{ color: "#B8974D" }}>دقة النموذج: 90.2%</strong> (46 من 51)
            <br />
            <strong style={{ color: "#7A8291" }}>دقة "الجمود الساذج"</strong> (توقع تكرار آخر
            قرار فقط، كخط أساس للمقارنة): 80.4%
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={headingStyle}>حدود النموذج بصراحة</div>
          <div style={bodyStyle}>
            • يتوقع <strong>الاتجاه العام فقط</strong> (تثبيت/رفع/خفض) — لا يتوقع حجم التغيير
            (0.25% أو 0.5%) ولا التوقيت الدقيق داخل الشهر
            <br />
            • لا يأخذ بعين الاعتبار التوجيه الكلامي للجنة (Forward Guidance) أو خطابات المسؤولين
            — وهذا مصدر معظم الأخطاء التاريخية للنموذج (5 من أصل 51)
            <br />
            • أدوات مؤسسية مثل CME FedWatch، المبنية على أسعار عقود مستقبلية حقيقية يتداول بها
            آلاف المستثمرين بأموال فعلية، غالبًا ما تكون أدق من أي نموذج إحصائي بسيط مثل هذا
          </div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            padding: "1.4rem",
            border: "1px solid #2A3242",
            borderRadius: 8,
            fontSize: 13,
            color: "#9AA3B2",
            lineHeight: 1.9,
          }}
        >
          <strong style={{ color: "#F2EFE9" }}>إخلاء مسؤولية:</strong> هذا مشروع تجريبي شخصي
          لأغراض تعليمية واستكشافية، وليس أداة مالية احترافية ولا نصيحة استثمارية بأي شكل. لا
          تُتخذ أي قرارات مالية أو استثمارية بناءً على توقعات هذا الموقع وحدها. راجع مصادر
          موثوقة ومختصين ماليين مرخصين قبل اتخاذ أي قرار مالي.
        </div>
      </div>
    </div>
  );
}

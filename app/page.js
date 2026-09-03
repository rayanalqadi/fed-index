import { kv } from "@vercel/kv";

const LABELS = {
  hold: "يُبقي على سعر الفائدة دون تغيير",
  hike: "يرفع سعر الفائدة",
  cut: "يخفض سعر الفائدة",
};

function formatArabicDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await kv.get("fed_index:latest");

  const decisionText = data ? LABELS[data.decision] : null;
  const meetingDate = data ? formatArabicDate(data.meetingDate) : null;
  const dataAsOf = data ? formatArabicDate(data.dataAsOf) : null;

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>مؤشر الفيدرالي</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;700&family=Tajawal:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0B1220",
          color: "#F2EFE9",
          fontFamily: "'Tajawal', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6vw",
        }}
      >
        <div style={{ maxWidth: 780, textAlign: "center" }}>
          {data ? (
            <>
              <div style={{ fontSize: 14, color: "#B8974D", marginBottom: "2.2rem" }}>
                توقع اجتماع لجنة الفيدرالي — {meetingDate}
              </div>
              <div
                style={{
                  fontFamily: "'Markazi Text', serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 5vw, 46px)",
                  lineHeight: 1.55,
                }}
              >
                من المتوقع أن {decisionText} الاحتياطي الفيدرالي الأمريكي.
              </div>
              <div style={{ width: 64, height: 2, background: "#B8974D", margin: "2.4rem auto" }} />
              <div style={{ marginTop: "3rem", fontSize: 12, color: "#5E6675", lineHeight: 1.8 }}>
                مبني على أحدث بيانات رسمية متاحة حتى {dataAsOf}، عبر نموذج داخلي بدقة ~90% على
                البيانات التاريخية.
                <br />
                نموذج تجريبي لأغراض التعلم — ليس نصيحة استثمارية.
              </div>
            </>
          ) : (
            <div style={{ fontSize: 20, color: "#9AA3B2" }}>
              لا يوجد توقع محفوظ بعد — بانتظار أول تشغيل لمهمة التحديث.
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

import { kvGet } from "../lib/redis";

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
  const data = await kvGet("fed_index:latest");

  const decisionText = data ? LABELS[data.decision] : null;
  const meetingDate = data ? formatArabicDate(data.meetingDate) : null;
  const dataAsOf = data ? formatArabicDate(data.dataAsOf) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2.4rem",
                flexWrap: "wrap",
                margin: "1.8rem 0",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Markazi Text', serif", fontWeight: 700, fontSize: 26, color: "#B8974D" }}>
                  90.2%
                </div>
                <div style={{ fontSize: 11, color: "#7A8291" }}>دقة النموذج تاريخيًا</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Markazi Text', serif", fontWeight: 700, fontSize: 26, color: "#B8974D" }}>
                  51
                </div>
                <div style={{ fontSize: 11, color: "#7A8291" }}>اجتماعًا اختُبر عليها النموذج</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Markazi Text', serif", fontWeight: 700, fontSize: 26, color: "#B8974D" }}>
                  2019–2026
                </div>
                <div style={{ fontSize: 11, color: "#7A8291" }}>نطاق البيانات التاريخية</div>
              </div>
            </div>

            <div style={{ marginTop: "1.8rem", fontSize: 12, color: "#5E6675", lineHeight: 1.9 }}>
              يعتمد النموذج على بيانات BLS الرسمية (التضخم Core PCE، البطالة، التوظيف، سعر
              الفائدة الفعلي) من 2019 حتى 2026 (باستثناء 2020 لتشوه بيانات كورونا)، ويُقارن
              بأداء "الجمود الساذج" (تكرار آخر قرار) البالغة دقته 80.4% على نفس الفترة.
              <br />
              مبني على أحدث بيانات متاحة حتى {dataAsOf}.
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
    </div>
  );
}

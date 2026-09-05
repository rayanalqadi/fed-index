import { kvGet, kvSet } from "../../../../lib/redis";
import { fetchAllSeries, latestObservationDate } from "../../../../lib/fred";
import { forecastNextMeeting } from "../../../../lib/predictor";

// تاريخ آخر قرارات FOMC فعلية مؤكدة (بالترتيب الزمني) - يُحدَّث يدويًا كل ما
// يُعلَن قرار اجتماع جديد فعليًا (مرة كل ~6 أسابيع، وليس تلقائيًا لأن هذي
// معلومة "قرار حقيقي حصل" مو بيانات اقتصادية خام)
const KNOWN_DECISION_HISTORY = ["cut", "cut", "cut", "hold", "hold", "hold"];
// ملاحظة: آخر تحديث لهذي القائمة كان بعد اجتماع 29 أبريل 2026 (hold).
// اجتماعا يونيو ويوليو 2026 لم يُدخلا بعد بانتظار تأكيد النتيجة الفعلية.

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const apiKey = process.env.FRED_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "FRED_API_KEY غير مضبوط" }, { status: 500 });
    }

    const seriesData = await fetchAllSeries(apiKey);
    const newLatestDate = latestObservationDate(seriesData);

    const stored = await kvGet("fed_index:latest");
    const previousLatestDate = stored?.dataAsOf || null;

    // لو ما فيه بيانات أحدث من المخزّنة، ما نعيد الحساب (توفير)
    if (previousLatestDate && newLatestDate <= previousLatestDate) {
      return Response.json({ updated: false, reason: "لا بيانات جديدة", dataAsOf: newLatestDate });
    }

    const forecast = forecastNextMeeting(seriesData, KNOWN_DECISION_HISTORY);
    const result = {
      ...forecast,
      dataAsOf: newLatestDate,
    };

    await kvSet("fed_index:latest", result);

    return Response.json({ updated: true, result });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

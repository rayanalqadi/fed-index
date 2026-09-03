// lib/predictor.js
// نسخة JS من نموذج v4 المبني والمختبر في بايثون (دقة 90.2% على 51 اجتماع تاريخي)

// مواعيد اجتماعات FOMC 2026 (رسمية من federalreserve.gov) - تُحدَّث يدويًا كل سنة
const FOMC_2026 = [
  "2026-01-28", "2026-03-18", "2026-04-29", "2026-06-17",
  "2026-07-29", "2026-09-16", "2026-10-28", "2026-12-09",
];

function toMonthKey(dateStr) {
  return dateStr.slice(0, 7); // "YYYY-MM"
}

function monthAdd(monthKey, n) {
  const [y, m] = monthKey.split("-").map(Number);
  const total = y * 12 + (m - 1) + n;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return `${ny}-${String(nm).padStart(2, "0")}`;
}

function seriesToMonthlyMap(series) {
  const map = new Map();
  for (const { date, value } of series) {
    map.set(toMonthKey(date), value);
  }
  return map;
}

function pceYoY(pceMap, monthKey) {
  const cur = pceMap.get(monthKey);
  const prevKey = monthAdd(monthKey, -12);
  const prev = pceMap.get(prevKey);
  if (cur == null || prev == null || prev === 0) return null;
  return (cur / prev - 1) * 100;
}

/**
 * يبني ميزات نقطة-بزمن لأحدث شهر بيانات متاح (يُستخدم قبل أقرب اجتماع قادم)
 */
function buildLatestFeatures(seriesData) {
  const fedfundsMap = seriesToMonthlyMap(seriesData.fedfunds);
  const unrateMap = seriesToMonthlyMap(seriesData.unrate);
  const pceMap = seriesToMonthlyMap(seriesData.pcepilfe);

  const latestFFRMonth = [...fedfundsMap.keys()].sort().at(-1);
  const latestUnrateMonth = [...unrateMap.keys()].sort().at(-1);
  const latestPceMonth = [...pceMap.keys()].sort().at(-1);

  const infl = pceYoY(pceMap, latestPceMonth);
  const infl3mAgo = pceYoY(pceMap, monthAdd(latestPceMonth, -3));
  const momentum = infl != null && infl3mAgo != null ? infl - infl3mAgo : 0;

  const unemp = unrateMap.get(latestUnrateMonth);
  const unemp3mAgo = unrateMap.get(monthAdd(latestUnrateMonth, -3));
  const unempChange3m = unemp != null && unemp3mAgo != null ? unemp - unemp3mAgo : 0;

  const ffr = fedfundsMap.get(latestFFRMonth);
  const realRate = ffr != null && infl != null ? ffr - infl : 0;

  return {
    asOf: { pce: latestPceMonth, unrate: latestUnrateMonth, fedfunds: latestFFRMonth },
    inflationYoy: infl != null ? round3(infl) : null,
    inflationMomentum: round3(momentum),
    unemployment: unemp,
    unemploymentChange3m: round3(unempChange3m),
    fedfunds: ffr,
    realRate: round3(realRate),
  };
}

function round3(x) {
  return Math.round(x * 1000) / 1000;
}

function currentStreak(historyLabels) {
  if (!historyLabels.length) return { move: null, streak: 0 };
  const last = historyLabels.at(-1);
  if (last === "hold") return { move: "hold", streak: 0 };
  let streak = 0;
  for (let i = historyLabels.length - 1; i >= 0; i--) {
    if (historyLabels[i] === last) streak++;
    else break;
  }
  return { move: last, streak };
}

/**
 * نموذج v4 - نفس القواعد الموثقة والمختبرة في predictors.py
 */
function predictV4(feat, historyLabels) {
  const { inflationYoy: infl, inflationMomentum: mom, unemploymentChange3m: unempChg, realRate } = feat;
  const { move: lastMove, streak } = currentStreak(historyLabels);
  const lastLabel = historyLabels.length ? historyLabels.at(-1) : "hold";

  if (lastMove === "cut" && lastLabel === "cut") {
    return streak >= 3 ? "hold" : "cut";
  }
  if (lastMove === "hike" && lastLabel === "hike") {
    if (infl < 2.5) return "hold";
    if (mom < -0.3 && infl < 4.5) return "hold";
    if (unempChg >= 0.2) return "hold";
    return "hike";
  }
  if (lastLabel === "hold") {
    if (infl > 5 && mom > 0) return "hike";
    if (unempChg >= 0.3 && realRate > 2) return "cut";
    return "hold";
  }
  return "hold";
}

/**
 * يحدد أقرب اجتماع FOMC قادم بعد تاريخ اليوم
 */
function nextMeeting(fromDate = new Date()) {
  const isoToday = fromDate.toISOString().slice(0, 10);
  const upcoming = FOMC_2026.filter((d) => d >= isoToday).sort();
  return upcoming[0] || null;
}

/**
 * الدالة الرئيسية: تاريخ آخر قرارات فعلية معروفة (history) + بيانات السلاسل
 * الخام -> ترجع التوقع الكامل للاجتماع القادم
 */
function forecastNextMeeting(seriesData, historyLabels) {
  const feat = buildLatestFeatures(seriesData);
  const decision = predictV4(feat, historyLabels);
  const meeting = nextMeeting();
  return {
    meetingDate: meeting,
    decision, // "hold" | "hike" | "cut"
    features: feat,
    generatedAt: new Date().toISOString(),
  };
}

module.exports = { buildLatestFeatures, predictV4, currentStreak, nextMeeting, forecastNextMeeting, FOMC_2026 };

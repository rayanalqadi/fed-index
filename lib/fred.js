// lib/fred.js
// يجلب آخر ملاحظات كل سلسلة من FRED API مباشرة (JSON) - بدل تنزيل CSV يدوي

const FRED_BASE = "https://api.stlouisfed.org/fred/series/observations";

async function fetchSeries(seriesId, apiKey, { limit = 24 } = {}) {
  const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`فشل جلب ${seriesId}: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  // نرجعها بترتيب زمني تصاعدي، ونتجاهل القيم المفقودة (".")
  return data.observations
    .filter((o) => o.value !== ".")
    .map((o) => ({ date: o.date, value: parseFloat(o.value) }))
    .reverse();
}

async function fetchAllSeries(apiKey) {
  const [fedfunds, unrate, pcepilfe, payems] = await Promise.all([
    fetchSeries("FEDFUNDS", apiKey, { limit: 30 }),
    fetchSeries("UNRATE", apiKey, { limit: 30 }),
    fetchSeries("PCEPILFE", apiKey, { limit: 30 }),
    fetchSeries("PAYEMS", apiKey, { limit: 30 }),
  ]);
  return { fedfunds, unrate, pcepilfe, payems };
}

// أحدث تاريخ ملاحظة عبر السلاسل الأربعة - نستخدمه لمعرفة هل صدرت بيانات جديدة
function latestObservationDate(seriesData) {
  const dates = [
    seriesData.fedfunds.at(-1)?.date,
    seriesData.unrate.at(-1)?.date,
    seriesData.pcepilfe.at(-1)?.date,
    seriesData.payems.at(-1)?.date,
  ].filter(Boolean);
  return dates.sort().at(-1) || null;
}

module.exports = { fetchSeries, fetchAllSeries, latestObservationDate };

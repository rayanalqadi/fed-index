"use client";
import { useEffect, useState } from "react";

const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
  "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

function formatHijri(date) {
  try {
    const fmt = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
      year: "numeric", month: "numeric", day: "numeric",
    });
    const parts = fmt.formatToParts(date);
    const day = parts.find((p) => p.type === "day")?.value;
    const month = parseInt(parts.find((p) => p.type === "month")?.value, 10);
    const year = parts.find((p) => p.type === "year")?.value;
    return `${day} ${HIJRI_MONTHS[month - 1]} ${year}هـ`;
  } catch {
    return "";
  }
}

export default function LiveClock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const timeStr = now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const gregorianStr = now.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const hijriStr = formatHijri(now);

  return (
    <div style={{ fontSize: 12, color: "#7A8291", lineHeight: 1.9 }}>
      <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 20, color: "#C9CFD9", fontVariantNumeric: "tabular-nums" }}>
        {timeStr}
      </div>
      <div>{gregorianStr}</div>
      {hijriStr && <div>{hijriStr}</div>}
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";

function diffParts(targetISO) {
  const target = new Date(targetISO + "T18:00:00Z"); // موعد تقريبي لإعلان القرار مساءً بتوقيت واشنطن
  const now = new Date();
  let ms = target - now;
  if (ms < 0) ms = 0;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate }) {
  const [parts, setParts] = useState(null);

  useEffect(() => {
    if (!targetDate) return;
    setParts(diffParts(targetDate));
    const timer = setInterval(() => setParts(diffParts(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate || !parts) return null;

  const unit = (label, value) => (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Markazi Text', serif",
          fontWeight: 700,
          fontSize: 22,
          color: "#B8974D",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 10, color: "#7A8291" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", margin: "1.2rem 0" }}>
      {unit("يوم", parts.days)}
      {unit("ساعة", parts.hours)}
      {unit("دقيقة", parts.minutes)}
      {unit("ثانية", parts.seconds)}
    </div>
  );
}
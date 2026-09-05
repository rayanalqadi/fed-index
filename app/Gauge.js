// app/Gauge.js
// عداد نصف دائري (Gauge) يشبه عداد السيارة - سهم يشير لمنطقة ملونة حسب
// التوقع: أخضر = خفض، أصفر = تثبيت، أحمر = رفع

const ZONES = {
  cut: { angle: -60, color: "#3DA35D", label: "خفض" },   // يسار (أخضر)
  hold: { angle: 0, color: "#D4A72C", label: "تثبيت" },  // وسط (أصفر)
  hike: { angle: 60, color: "#D14343", label: "رفع" },    // يمين (أحمر)
};

// يحول زاوية (بالدرجات، -90 يسار إلى 90 يمين) إلى نقطة على قوس نصف دائري
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function Gauge({ decision }) {
  const cx = 140;
  const cy = 130;
  const r = 100;
  const strokeWidth = 22;

  const zone = ZONES[decision] || ZONES.hold;
  const needleAngle = zone.angle;
  const needleTip = polarToCartesian(cx, cy, r - 18, needleAngle);

  return (
    <svg viewBox="0 0 280 155" width="220" style={{ display: "block", margin: "0 auto" }}>
      {/* المناطق الثلاث الملونة */}
      <path
        d={arcPath(cx, cy, r, -90, -30)}
        fill="none"
        stroke={ZONES.cut.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={decision === "cut" ? 1 : 0.35}
      />
      <path
        d={arcPath(cx, cy, r, -30, 30)}
        fill="none"
        stroke={ZONES.hold.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={decision === "hold" ? 1 : 0.35}
      />
      <path
        d={arcPath(cx, cy, r, 30, 90)}
        fill="none"
        stroke={ZONES.hike.color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={decision === "hike" ? 1 : 0.35}
      />

      {/* تسميات المناطق */}
      <text x={cx - r + 5} y={cy + 20} fontSize="11" fill="#9AA3B2" textAnchor="middle">خفض</text>
      <text x={cx} y={cy - r + 5} fontSize="11" fill="#9AA3B2" textAnchor="middle">تثبيت</text>
      <text x={cx + r - 5} y={cy + 20} fontSize="11" fill="#9AA3B2" textAnchor="middle">رفع</text>

      {/* السهم */}
      <line
        x1={cx}
        y1={cy}
        x2={needleTip.x}
        y2={needleTip.y}
        stroke={zone.color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="7" fill={zone.color} />
    </svg>
  );
}

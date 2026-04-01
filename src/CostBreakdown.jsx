import { useState } from "react";
import { BLUE, TEAL } from "./data/countries.js";

const STAMP = 1.80;

const ITEMS = [
  {
    label: "Wages & benefits",
    pct: 67,
    color: "#1a237e",
    icon: "👷",
    desc: "Royal Mail employs around 130,000 people — postal workers, van drivers, sorting staff and management. People costs consistently account for c.70% of all operating expenditure.",
    source: "IDS / EP Group Annual Report 2023/24 (£5.7bn people costs vs £8.1bn total opex)",
  },
  {
    label: "Transport & fuel",
    pct: 9,
    color: "#bf360c",
    icon: "🚐",
    desc: "A fleet of over 50,000 vehicles plus air mail services and ferry connections to Scottish islands and Northern Ireland. Fuel and third-party haulage costs have risen sharply since 2021.",
    source: "IDS Annual Report 2023/24; Ofcom Annual Monitoring Update 2024",
  },
  {
    label: "Network & depots",
    pct: 8,
    color: "#00695c",
    icon: "🏭",
    desc: "1,250 delivery offices and 9 major mail processing centres across the UK, plus the automated sorting machinery needed to handle 6.7 billion items a year across 32 million addresses.",
    source: "IDS Annual Report 2023/24; Ofcom DUSP Review 2022",
  },
  {
    label: "USO cross-subsidy",
    pct: 6,
    color: "#6a1b9a",
    icon: "🏔️",
    desc: "The Universal Service Obligation requires Royal Mail to deliver to every UK address 6 days a week at a uniform stamp price. Deliveries to remote islands, highland farms and rural hamlets cost several times the stamp price — urban senders effectively subsidise them.",
    source: "Ofcom DUSP Decision 2022; NAO 'Securing the future of the Universal Postal Service' 2023",
  },
  {
    label: "Technology & overheads",
    pct: 5,
    color: "#37474f",
    icon: "💻",
    desc: "IT infrastructure, parcel tracking systems, regulatory compliance, finance and HR functions, and property costs not captured in depot figures.",
    source: "IDS Annual Report 2023/24 (segment overhead allocation)",
  },
  {
    label: "Operating margin",
    pct: 5,
    color: "#2e7d32",
    icon: "📈",
    desc: "The letter business ran at an operating loss for several years as volumes collapsed. The April 2026 rise to £1.80 aims to restore a thin 3–5% margin. Ofcom monitors Royal Mail's return on capital and can intervene if margins become excessive.",
    source: "Ofcom Annual Monitoring Update 2024; IDS FY2024 preliminary results",
  },
];

// SVG donut helpers
function polarToCartesian(cx, cy, r, deg) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutPath(cx, cy, R, r, a1, a2) {
  const os = polarToCartesian(cx, cy, R, a1);
  const oe = polarToCartesian(cx, cy, R, a2);
  const ie = polarToCartesian(cx, cy, r, a2);
  const is = polarToCartesian(cx, cy, r, a1);
  const lg = a2 - a1 > 180 ? 1 : 0;
  const f = n => n.toFixed(2);
  return [
    `M ${f(os.x)} ${f(os.y)}`,
    `A ${R} ${R} 0 ${lg} 1 ${f(oe.x)} ${f(oe.y)}`,
    `L ${f(ie.x)} ${f(ie.y)}`,
    `A ${r} ${r} 0 ${lg} 0 ${f(is.x)} ${f(is.y)}`,
    `Z`,
  ].join(" ");
}

// Pre-compute slice angles
const slices = ITEMS.reduce((acc, item, i) => {
  const start = i === 0 ? 0 : acc[i - 1].end;
  return [...acc, { ...item, start, end: start + (item.pct / 100) * 360 }];
}, []);

export default function CostBreakdown() {
  const [hovered, setHovered] = useState(null);
  const cx = 110, cy = 110, R = 90, r = 52;

  return (
    <div style={{ maxWidth: 780, margin: "12px auto 0", padding: "0 14px", paddingBottom: 40 }}>

      {/* Intro */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: BLUE }}>Where does your £1.80 go?</h2>
        <p style={{ margin: 0, fontSize: 12, color: "#546e7a", lineHeight: 1.65 }}>
          Royal Mail must deliver to all 32 million UK addresses six days a week at the same price — whether that's a city flat or a Scottish island croft.
          The breakdown below is derived from Royal Mail / IDS public annual reports and Ofcom regulatory filings.
          Exact internal cost allocation between letters and parcels is not publicly disclosed; figures are best estimates based on reported segment data and public IDS accounts.
        </p>
      </div>

      {/* Donut + legend */}
      <div style={{
        background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,.07)",
        display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center",
      }}>
        {/* SVG */}
        <div style={{ flex: "0 0 auto" }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            {slices.map((s, i) => (
              <path
                key={s.label}
                d={donutPath(cx, cy, R, r, s.start, s.end)}
                fill={s.color}
                opacity={hovered === null || hovered === i ? 1 : 0.3}
                style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
            {/* Centre label */}
            <text x={cx} y={cy - 7} textAnchor="middle"
              fill={hovered !== null ? slices[hovered].color : BLUE}
              fontSize={hovered !== null ? 22 : 17}
              fontWeight={700} fontFamily="Inter,sans-serif">
              {hovered !== null ? `${slices[hovered].pct}%` : "£1.80"}
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle"
              fill="#999" fontSize={10} fontFamily="Inter,sans-serif">
              {hovered !== null
                ? `£${(slices[hovered].pct / 100 * STAMP).toFixed(2)}`
                : "per stamp"}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {slices.map((s, i) => (
            <div key={s.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "5px 8px", borderRadius: 6, cursor: "default", marginBottom: 2,
                background: hovered === i ? "#f5f5f5" : "transparent",
                opacity: hovered === null || hovered === i ? 1 : 0.45,
                transition: "all 0.15s",
              }}
            >
              <div style={{ width: 11, height: 11, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 12, color: "#333" }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color, minWidth: 32, textAlign: "right" }}>{s.pct}%</div>
              <div style={{ fontSize: 11, color: "#aaa", minWidth: 36, textAlign: "right" }}>
                £{(s.pct / 100 * STAMP).toFixed(2)}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: "0 8px", fontSize: 10, color: "#bbb" }}>
            Hover slices or rows to highlight · estimates from public filings
          </div>
        </div>
      </div>

      {/* Detail cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10, marginBottom: 12 }}>
        {slices.map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 10, padding: "12px 14px",
            boxShadow: "0 1px 4px rgba(0,0,0,.07)",
            borderTop: `3px solid ${s.color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.icon} {s.label}</div>
              <div style={{ textAlign: "right", marginLeft: 8 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: s.color }}>
                  £{(s.pct / 100 * STAMP).toFixed(2)}
                </div>
                <div style={{ fontSize: 10, color: "#bbb" }}>{s.pct}%</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#546e7a", lineHeight: 1.65, marginBottom: 6 }}>{s.desc}</div>
            <div style={{ fontSize: 9, color: "#bbb", borderTop: "1px solid #f0f0f0", paddingTop: 5 }}>
              {s.source}
            </div>
          </div>
        ))}
      </div>

      {/* Volume context */}
      <div style={{
        background: "#fff8e1", borderLeft: "3px solid #f9a825",
        borderRadius: "0 8px 8px 0", padding: "10px 14px", marginBottom: 12,
        fontSize: 12, color: "#5d4037", lineHeight: 1.65,
      }}>
        <strong>📉 Why stamp prices keep rising:</strong> Royal Mail must maintain infrastructure for{" "}
        <strong>32 million addresses</strong> — but letter volumes have fallen from{" "}
        <strong>20 billion</strong> items (2004/05) to <strong>6.7 billion</strong> (2023/24),
        while the number of delivery addresses has grown by 4 million.
        The fixed cost of the network is spread across ever fewer letters,
        so the unit cost rises every year even before wage inflation.
        This structural economics, not greed, is the primary driver of each price increase.
      </div>

      {/* Sources */}
      <div style={{ fontSize: 9, color: "#bbb", lineHeight: 1.7 }}>
        <strong style={{ color: "#aaa" }}>Sources & methodology: </strong>
        Royal Mail / IDS (EP Group plc) Annual Report &amp; Accounts 2023/24 ·
        Ofcom Annual Monitoring Update on Royal Mail 2024 ·
        Ofcom DUSP (Designated Universal Service Provider) Decision 2022 ·
        NAO "Securing the future of the Universal Postal Service" HC 1066, 2023 ·
        People cost share c.70% per IDS AR2024 (£5.7bn people costs / £8.1bn total opex, letters + parcels combined) ·
        Internal allocation between letter and parcel cost pools not publicly disclosed;
        percentages derived from reported segment revenue splits and publicly available regulatory submissions.
      </div>
    </div>
  );
}

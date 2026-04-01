import { useState, useMemo } from "react";
import {
  data, EU_AVG_GBP,
  RED, BLUE, TEAL, GREY, LIGHT_RED, LIGHT_TEAL, AMBER,
  MODES, fmt,
} from "./data/countries.js";
import CostBreakdown from "./CostBreakdown.jsx";

export default function App() {
  const [tab, setTab] = useState("index");
  const [modeKey, setModeKey] = useState("vpd");
  const [sort, setSort] = useState("desc");
  const [view, setView] = useState("chart");
  const [showChanged, setShowChanged] = useState(false);

  const mode = MODES.find(m => m.key === modeKey);
  const field = mode.field;
  const avgVal = mode.avgFn(data);
  const accentColor = modeKey === "vpd" ? TEAL : RED;
  const lightAccent = modeKey === "vpd" ? LIGHT_TEAL : LIGHT_RED;

  const filtered = showChanged ? data.filter(d => d.changed || d.highlight) : data;

  const sorted = useMemo(() => {
    const d = [...filtered];
    return sort === "desc" ? d.sort((a, b) => b[field] - a[field])
      : sort === "asc"  ? d.sort((a, b) => a[field] - b[field])
      : d.sort((a, b) => a.country.localeCompare(b.country));
  }, [sort, field, filtered]);

  const maxVal = Math.max(...data.map(d => d[field]));
  const uk = data.find(d => d.code === "GB");
  const ukVal = uk[field];
  const rank = [...data].sort((a, b) => b[field] - a[field]).findIndex(d => d.code === "GB") + 1;
  const changedCount = data.filter(d => d.changed).length;
  const pppAvg = data.reduce((s, x) => s + x.ppp, 0) / data.length;
  const vpdAvg = data.reduce((s, x) => s + x.vpd, 0) / data.length;

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif", background: "#f5f6f8", minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: BLUE, color: "#fff", padding: "20px 18px 14px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: .6, marginBottom: 4 }}>Royal Mail Comparison</div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>European Stamp Price Index</h1>
          <p style={{ margin: "4px 0 0", fontSize: 11, opacity: .7 }}>
            All prices in <strong>GBP</strong> · EUR/GBP 0.8696 (31 Mar 2026) ·
            UK: Apr 2026 · {changedCount} European countries updated to 2026 rates
          </p>
        </div>
      </div>

      {/* Top-level tabs */}
      <div style={{ background: BLUE, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", padding: "0 16px" }}>
          {[["index", "📊 Price comparison"], ["breakdown", "💰 Cost breakdown"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "9px 16px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: "transparent", color: tab === key ? "#fff" : "rgba(255,255,255,0.55)",
              borderBottom: tab === key ? "2px solid #fff" : "2px solid transparent",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {tab === "breakdown" && <CostBreakdown />}
      {tab === "index" && <>

      {/* Update banner */}
      <div style={{ background: "#fff3e0", borderBottom: "1px solid #ffe0b2", padding: "8px 18px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", fontSize: 12, color: AMBER }}>
          <strong>🔄 2026 price updates confirmed:</strong>{" "}
          🇬🇧 UK £1.80 (+5.9%) · 🇫🇷 France €1.52 (+9.4%) · 🇳🇱 Netherlands €1.40 (+6.9%) · 🇧🇪 Belgium €1.63 (+6.1%) · 🇮🇪 Ireland €1.85 (+12.1%) · 🇳🇴 Norway kr 28 (+7.7%)
          {" · "}
          <button onClick={() => setShowChanged(v => !v)} style={{
            background: "none", border: "1px solid " + AMBER, borderRadius: 4,
            padding: "2px 8px", cursor: "pointer", fontSize: 11, color: AMBER, fontWeight: 600,
          }}>{showChanged ? "Show all" : "Show updated only"}</button>
        </div>
      </div>

      {/* Mode tabs + controls */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "9px 16px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {MODES.map(m => (
            <button key={m.key} onClick={() => setModeKey(m.key)} style={{
              padding: "7px 13px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: modeKey === m.key ? (m.key === "vpd" ? TEAL : BLUE) : "#f0f0f0",
              color: modeKey === m.key ? "#fff" : "#555",
            }}>{m.label}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
            {[["desc", "↓"], ["asc", "↑"], ["alpha", "A–Z"]].map(([v, l]) => (
              <button key={v} onClick={() => setSort(v)} style={{
                padding: "5px 8px", borderRadius: 5, border: "1px solid #ddd", cursor: "pointer", fontSize: 11,
                background: sort === v ? "#e8eaf6" : "#fff", color: sort === v ? BLUE : "#666", fontWeight: sort === v ? 700 : 400,
              }}>{l}</button>
            ))}
            <div style={{ width: 1, height: 16, background: "#ddd", margin: "0 3px" }} />
            {[["chart", "📊"], ["table", "📋"]].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "5px 8px", borderRadius: 5, border: "1px solid #ddd", cursor: "pointer", fontSize: 12,
                background: view === v ? "#e8eaf6" : "#fff", color: view === v ? BLUE : "#666",
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #efefef" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexWrap: "wrap" }}>
          {[
            { label: "UK · " + mode.label, value: fmt(ukVal), sub: "from 7 Apr 2026", color: accentColor },
            { label: "European average",   value: fmt(avgVal), sub: "all 31 countries", color: "#546e7a" },
            { label: "UK rank",            value: `#${rank} / ${data.length}`, sub: "by this metric", color: accentColor },
            { label: "UK vs. average",     value: ((ukVal / avgVal - 1) * 100).toFixed(0) + "%",
              sub: ukVal > avgVal ? "above avg" : "below avg", color: ukVal > avgVal ? RED : TEAL },
          ].map((k, i) => (
            <div key={i} style={{ flex: "1 1 120px", padding: "12px 14px", borderRight: "1px solid #f0f0f0" }}>
              <div style={{ fontSize: 10, color: "#999", marginBottom: 2 }}>{k.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: 10, color: "#bbb" }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "12px auto 0", padding: "0 14px" }}>

        {modeKey === "vpd" && (
          <div style={{ background: "#e0f2f1", borderLeft: "3px solid " + TEAL, borderRadius: "0 8px 8px 0", padding: "9px 13px", marginBottom: 11, fontSize: 12, color: "#1b5e20", lineHeight: 1.6 }}>
            <strong>📅 Price per delivery day</strong> = stamp ÷ days/week.
            UK £1.80 ÷ 6 = <strong>£0.30/day</strong>.
            Denmark {fmt(data.find(d => d.code === "DK").price_gbp)} ÷ 2 = <strong>{fmt(data.find(d => d.code === "DK").vpd)}/day</strong>.
            ★ = D+1 guarantee on standard product.
          </div>
        )}
        {modeKey === "ppp" && (
          <div style={{ background: "#e8eaf6", borderLeft: "3px solid " + BLUE, borderRadius: "0 8px 8px 0", padding: "9px 13px", marginBottom: 11, fontSize: 12, color: "#1a237e", lineHeight: 1.6 }}>
            <strong>⚖️ PPP:</strong> price ÷ AIC index (Eurostat 2024, EU27=100).
            UK AIC=113 → £1.80÷1.13={fmt(uk.ppp)}.
            Latvia AIC=72 → {fmt(data.find(d => d.code === "LV").price_gbp)}÷0.72={fmt(data.find(d => d.code === "LV").ppp)}.
          </div>
        )}

        {view === "chart" ? (
          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 10px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 11, fontSize: 11, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ display: "inline-block", width: 16, borderTop: "2px dashed #bbb" }} /> avg {fmt(avgVal)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ display: "inline-block", width: 11, height: 11, borderRadius: 2, background: lightAccent }} /> above avg
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ display: "inline-block", width: 11, height: 11, borderRadius: 2, background: GREY }} /> below avg
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: AMBER }}>↑ price updated 2026</span>
            </div>
            {sorted.map(d => {
              const val = d[field];
              const pct = (val / maxVal) * 100;
              const avgPct = (avgVal / maxVal) * 100;
              const above = val > avgVal;
              const isUK = d.code === "GB";
              const barColor = isUK ? BLUE : above ? lightAccent : GREY;
              return (
                <div key={d.code} style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 5,
                  background: isUK ? "#e8eaf6" : "transparent",
                  borderRadius: isUK ? 6 : 0,
                  padding: isUK ? "2px 4px" : "2px 4px",
                  margin: isUK ? "4px 0" : "0 0 5px 0",
                }}>
                  <div style={{ width: 20, fontSize: 13, textAlign: "center" }}>{d.flag}</div>
                  <div style={{ width: 112, fontSize: 11, color: isUK ? BLUE : "#333", fontWeight: isUK ? 700 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {d.changed && <span style={{ color: AMBER, marginRight: 3 }}>↑</span>}
                    {d.country}
                  </div>
                  <div style={{ flex: 1, position: "relative", height: 18 }}>
                    <div style={{ position: "absolute", left: `${avgPct}%`, top: 0, bottom: 0, width: 1, borderLeft: "1.5px dashed #bbb", zIndex: 2 }} />
                    <div style={{ position: "absolute", left: 0, top: 2, height: 14, width: `${pct}%`,
                      background: barColor, borderRadius: 3 }} />
                  </div>
                  <div style={{ width: 44, fontSize: 11, fontWeight: 700, textAlign: "right",
                    color: isUK ? BLUE : above ? (modeKey === "vpd" ? TEAL : "#b71c1c") : "#546e7a" }}>
                    {fmt(val)}
                  </div>
                  {modeKey === "vpd" && (
                    <div style={{ width: 34, fontSize: 10, color: d.d1 ? "#2e7d32" : "#bbb", textAlign: "right", fontWeight: d.d1 ? 700 : 400 }}>
                      {d.d1 ? "★ D+1" : d.delivery_days + "d"}
                    </div>
                  )}
                  {modeKey === "ppp" && (
                    <div style={{ width: 30, fontSize: 10, color: "#ccc", textAlign: "right" }}>({d.aic})</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr style={{ background: "#f5f6f8", borderBottom: "2px solid #e0e0e0" }}>
                  <th style={{ padding: "7px 10px", textAlign: "left", color: "#555", fontWeight: 700 }}>Country</th>
                  <th style={{ padding: "7px 10px", textAlign: "right", color: "#555", fontWeight: 700 }}>Nominal</th>
                  <th style={{ padding: "7px 10px", textAlign: "right", color: BLUE, fontWeight: 700 }}>PPP</th>
                  <th style={{ padding: "7px 10px", textAlign: "right", color: TEAL, fontWeight: 700 }}>Per day</th>
                  <th style={{ padding: "7px 10px", textAlign: "left", color: "#555", fontWeight: 700 }}>Updated</th>
                  <th style={{ padding: "7px 10px", textAlign: "left", color: "#555", fontWeight: 700 }}>Service</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((d, i) => (
                  <tr key={d.code} style={{
                    background: d.code === "GB" ? "#e8eaf6" : i % 2 === 0 ? "#fff" : "#fafafa",
                    borderBottom: "1px solid #f0f0f0",
                    fontWeight: d.code === "GB" ? 700 : 400,
                  }}>
                    <td style={{ padding: "6px 10px", fontWeight: d.code === "GB" ? 700 : 400, color: d.code === "GB" ? BLUE : "#333" }}>
                      {d.flag} {d.country}
                    </td>
                    <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: modeKey === "nominal" ? 700 : 400,
                      color: d.price_gbp > EU_AVG_GBP ? "#b71c1c" : "#37474f" }}>{fmt(d.price_gbp)}</td>
                    <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: modeKey === "ppp" ? 700 : 400,
                      color: d.ppp > pppAvg ? "#b71c1c" : "#2e7d32" }}>{fmt(d.ppp)}</td>
                    <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: modeKey === "vpd" ? 700 : 400,
                      color: d.vpd < vpdAvg ? TEAL : "#37474f" }}>
                      {fmt(d.vpd)}{d.d1 ? " ★" : ""}
                    </td>
                    <td style={{ padding: "6px 10px", fontSize: 10, color: d.changed ? AMBER : "#bbb", fontWeight: d.changed ? 600 : 400 }}>
                      {d.updated}
                    </td>
                    <td style={{ padding: "6px 10px", color: "#999", fontSize: 10 }}>{d.delivery_label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: "6px 10px", fontSize: 9, color: "#ccc", borderTop: "1px solid #f0f0f0" }}>
              ↑ = confirmed price change since Bundesnetzagentur Jan 2025 baseline · EUR/GBP 0.8696 (31 Mar 2026)
              · Remaining countries: Bundesnetzagentur Jan 2025 data, no confirmed 2026 change found
              · ★ = D+1 next-day guarantee on standard product
            </div>
          </div>
        )}

        <div style={{ marginTop: 10, fontSize: 9, color: "#bbb", textAlign: "center", lineHeight: 1.5 }}>
          Sources: Royal Mail (Apr 2026) · La Poste / PostNL / bpost / An Post / Posten NO official announcements 2026
          · Remaining prices: Bundesnetzagentur Jan 2025 · Eurostat AIC PPS 2024 · EUR/GBP ECB 31 Mar 2026
        </div>
      </div>

      </>}
    </div>
  );
}

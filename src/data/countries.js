const EUR_GBP = 0.8696;
const NOK_EUR = 0.0860;
const SEK_EUR = 0.0877;
const DKK_EUR = 0.1340;

const RAW = [
  // UK: Royal Mail Apr 2026
  { country: "United Kingdom", code: "GB", flag: "🇬🇧",
    price_gbp: 1.80, price_display: "£1.80", updated: "Apr 2026 ↑",
    aic: 113, delivery_days: 6, d1: true, delivery_label: "6d/wk · D+1", highlight: true, changed: true },

  // Denmark: PostNord
  { country: "Denmark", code: "DK", flag: "🇩🇰",
    price_gbp: 21 * DKK_EUR * EUR_GBP, price_display: "kr 21", updated: "2026",
    aic: 128, delivery_days: 2, d1: false, delivery_label: "2-3d/wk" },

  // Norway: Posten NOK 28 from Feb 2026
  { country: "Norway", code: "NO", flag: "🇳🇴",
    price_gbp: 28 * NOK_EUR * EUR_GBP, price_display: "kr 28", updated: "Feb 2026 ↑",
    aic: 121, delivery_days: 3, d1: false, delivery_label: "3d/wk", changed: true },

  // Sweden: PostNord SEK 22
  { country: "Sweden", code: "SE", flag: "🇸🇪",
    price_gbp: 22 * SEK_EUR * EUR_GBP, price_display: "kr 22", updated: "2025",
    aic: 116, delivery_days: 3, d1: false, delivery_label: "3d/wk" },

  // Finland: Posti €2.00
  { country: "Finland", code: "FI", flag: "🇫🇮",
    price_gbp: 2.00 * EUR_GBP, price_display: "€2.00", updated: "2025",
    aic: 111, delivery_days: 3, d1: false, delivery_label: "alt. days" },

  // Ireland: An Post €1.85 from 3 Feb 2026
  { country: "Ireland", code: "IE", flag: "🇮🇪",
    price_gbp: 1.85 * EUR_GBP, price_display: "€1.85", updated: "Feb 2026 ↑",
    aic: 110, delivery_days: 5, d1: false, delivery_label: "5d/wk", changed: true },

  // Netherlands: PostNL €1.40 from 1 Jan 2026
  { country: "Netherlands", code: "NL", flag: "🇳🇱",
    price_gbp: 1.40 * EUR_GBP, price_display: "€1.40", updated: "Jan 2026 ↑",
    aic: 120, delivery_days: 3, d1: false, delivery_label: "3d/wk · alt. days", changed: true },

  // Belgium: bpost non-prior €1.63 from 1 Jan 2026
  { country: "Belgium", code: "BE", flag: "🇧🇪",
    price_gbp: 1.63 * EUR_GBP, price_display: "€1.63", updated: "Jan 2026 ↑",
    aic: 113, delivery_days: 5, d1: true, delivery_label: "5d/wk · D+1", changed: true },

  // France: La Poste lettre verte €1.52 from 1 Jan 2026
  { country: "France", code: "FR", flag: "🇫🇷",
    price_gbp: 1.52 * EUR_GBP, price_display: "€1.52", updated: "Jan 2026 ↑",
    aic: 107, delivery_days: 5, d1: false, delivery_label: "5d/wk · D+3", changed: true },

  // Germany: Deutsche Post €0.95 from Jan 2025
  { country: "Germany", code: "DE", flag: "🇩🇪",
    price_gbp: 0.95 * EUR_GBP, price_display: "€0.95", updated: "Jan 2025",
    aic: 119, delivery_days: 5, d1: false, delivery_label: "5d/wk · D+2" },

  // Austria: €1.20
  { country: "Austria", code: "AT", flag: "🇦🇹",
    price_gbp: 1.20 * EUR_GBP, price_display: "€1.20", updated: "2025",
    aic: 114, delivery_days: 5, d1: true, delivery_label: "5d/wk · D+1" },

  // Switzerland: CHF 1.10 ≈ €1.16
  { country: "Switzerland", code: "CH", flag: "🇨🇭",
    price_gbp: 1.16 * EUR_GBP, price_display: "CHF 1.10", updated: "2025",
    aic: 116, delivery_days: 5, d1: false, delivery_label: "5d/wk" },

  { country: "Italy", code: "IT", flag: "🇮🇹",
    price_gbp: 1.25 * EUR_GBP, price_display: "€1.25", updated: "2025",
    aic: 96, delivery_days: 5, d1: false, delivery_label: "5d/wk · D+3" },
  { country: "Spain", code: "ES", flag: "🇪🇸",
    price_gbp: 0.80 * EUR_GBP, price_display: "€0.80", updated: "2025",
    aic: 93, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Portugal", code: "PT", flag: "🇵🇹",
    price_gbp: 0.72 * EUR_GBP, price_display: "€0.72", updated: "2025",
    aic: 84, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Luxembourg", code: "LU", flag: "🇱🇺",
    price_gbp: 1.25 * EUR_GBP, price_display: "€1.25", updated: "2025",
    aic: 146, delivery_days: 5, d1: true, delivery_label: "5d/wk · D+1" },
  { country: "Iceland", code: "IS", flag: "🇮🇸",
    price_gbp: 1.30 * EUR_GBP, price_display: "kr 205", updated: "2025",
    aic: 116, delivery_days: 4, d1: false, delivery_label: "4d/wk" },
  { country: "Poland", code: "PL", flag: "🇵🇱",
    price_gbp: 0.61 * EUR_GBP, price_display: "zł 2.70", updated: "2025",
    aic: 83, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Czech Republic", code: "CZ", flag: "🇨🇿",
    price_gbp: 0.58 * EUR_GBP, price_display: "Kč 15", updated: "2025",
    aic: 88, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Slovakia", code: "SK", flag: "🇸🇰",
    price_gbp: 1.40 * EUR_GBP, price_display: "€1.40", updated: "2025",
    aic: 78, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Hungary", code: "HU", flag: "🇭🇺",
    price_gbp: 0.72 * EUR_GBP, price_display: "Ft 295", updated: "2025",
    aic: 72, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Romania", code: "RO", flag: "🇷🇴",
    price_gbp: 0.42 * EUR_GBP, price_display: "lei 2.10", updated: "2025",
    aic: 80, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Bulgaria", code: "BG", flag: "🇧🇬",
    price_gbp: 0.42 * EUR_GBP, price_display: "лв 0.82", updated: "2025",
    aic: 73, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Croatia", code: "HR", flag: "🇭🇷",
    price_gbp: 0.53 * EUR_GBP, price_display: "€0.53", updated: "2025",
    aic: 78, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Greece", code: "GR", flag: "🇬🇷",
    price_gbp: 1.20 * EUR_GBP, price_display: "€1.20", updated: "2025",
    aic: 76, delivery_days: 5, d1: false, delivery_label: "5d/wk · D+3" },
  { country: "Estonia", code: "EE", flag: "🇪🇪",
    price_gbp: 1.20 * EUR_GBP, price_display: "€1.20", updated: "2025",
    aic: 74, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Latvia", code: "LV", flag: "🇱🇻",
    price_gbp: 1.70 * EUR_GBP, price_display: "€1.70", updated: "2025",
    aic: 72, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Lithuania", code: "LT", flag: "🇱🇹",
    price_gbp: 1.02 * EUR_GBP, price_display: "€1.02", updated: "2025",
    aic: 84, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Slovenia", code: "SI", flag: "🇸🇮",
    price_gbp: 1.41 * EUR_GBP, price_display: "€1.41", updated: "2025",
    aic: 85, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Malta", code: "MT", flag: "🇲🇹",
    price_gbp: 0.35 * EUR_GBP, price_display: "€0.35", updated: "2025",
    aic: 92, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
  { country: "Cyprus", code: "CY", flag: "🇨🇾",
    price_gbp: 0.51 * EUR_GBP, price_display: "€0.51", updated: "2025",
    aic: 89, delivery_days: 5, d1: false, delivery_label: "5d/wk" },
];

export const data = RAW.map(d => ({
  ...d,
  ppp: d.price_gbp / (d.aic / 100),
  vpd: d.price_gbp / d.delivery_days,
}));

export const EU_AVG_GBP =
  data.filter(d => d.code !== "GB").reduce((s, d) => s + d.price_gbp, 0) /
  (data.length - 1);

export const RED = "#c62828";
export const BLUE = "#1a237e";
export const TEAL = "#00695c";
export const GREY = "#90a4ae";
export const LIGHT_RED = "#ef9a9a";
export const LIGHT_TEAL = "#80cbc4";
export const AMBER = "#e65100";

export const MODES = [
  { key: "nominal", label: "💷 Nominal",         field: "price_gbp", avgFn: () => EU_AVG_GBP },
  { key: "ppp",     label: "⚖️ Purchasing power", field: "ppp",       avgFn: d => d.reduce((s, x) => s + x.ppp, 0) / d.length },
  { key: "vpd",     label: "📅 Per delivery day", field: "vpd",       avgFn: d => d.reduce((s, x) => s + x.vpd, 0) / d.length },
];

export const fmt = v => "£" + v.toFixed(2);

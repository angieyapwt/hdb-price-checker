const DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6lrlclwzN1Uk8C86L8MyeI0OUbKZCo5axKFRc3UQZPLLnXN1RGgFDQWnP1pMqkqVXxw/exec";
const OWNER_EMAIL = "angieyapwt@gmail.com";
const URGENT_CONTACT = "83963088";

const postalDirectory = {
  "520123": { block: "123", street: "TAMPINES STREET 11", town: "TAMPINES" },
  "560128": { block: "128", street: "ANG MO KIO AVENUE 3", town: "ANG MO KIO" },
  "730688": { block: "688", street: "WOODLANDS DRIVE 75", town: "WOODLANDS" },
  "310079": { block: "79", street: "LORONG 4 TOA PAYOH", town: "TOA PAYOH" },
  "640682": { block: "682", street: "JURONG WEST CENTRAL 1", town: "JURONG WEST" }
};

const sampleTransactions = [
  { month: "2026-05", town: "TAMPINES", flat_type: "4 ROOM", block: "123", street_name: "TAMPINES STREET 11", storey_range: "10 TO 12", floor_area_sqm: "104", flat_model: "Model A", lease_commence_date: "1984", remaining_lease: "57 years", resale_price: "688000" },
  { month: "2026-05", town: "TAMPINES", flat_type: "2 ROOM", block: "123", street_name: "TAMPINES STREET 11", storey_range: "07 TO 09", floor_area_sqm: "45", flat_model: "Improved", lease_commence_date: "1984", remaining_lease: "57 years", resale_price: "342000" },
  { month: "2026-04", town: "TAMPINES", flat_type: "2 ROOM", block: "124", street_name: "TAMPINES STREET 11", storey_range: "04 TO 06", floor_area_sqm: "45", flat_model: "Improved", lease_commence_date: "1984", remaining_lease: "57 years", resale_price: "328000" },
  { month: "2026-04", town: "TAMPINES", flat_type: "4 ROOM", block: "125", street_name: "TAMPINES STREET 11", storey_range: "10 TO 12", floor_area_sqm: "104", flat_model: "Model A", lease_commence_date: "1985", remaining_lease: "58 years", resale_price: "705000" },
  { month: "2026-04", town: "TAMPINES", flat_type: "4 ROOM", block: "120", street_name: "TAMPINES STREET 11", storey_range: "07 TO 09", floor_area_sqm: "103", flat_model: "Model A", lease_commence_date: "1984", remaining_lease: "57 years", resale_price: "650000" },
  { month: "2026-03", town: "TAMPINES", flat_type: "4 ROOM", block: "121", street_name: "TAMPINES STREET 11", storey_range: "13 TO 15", floor_area_sqm: "104", flat_model: "Model A", lease_commence_date: "1984", remaining_lease: "57 years", resale_price: "698000" },
  { month: "2026-05", town: "ANG MO KIO", flat_type: "4 ROOM", block: "128", street_name: "ANG MO KIO AVENUE 3", storey_range: "10 TO 12", floor_area_sqm: "92", flat_model: "New Generation", lease_commence_date: "1978", remaining_lease: "51 years", resale_price: "610000" },
  { month: "2026-04", town: "ANG MO KIO", flat_type: "4 ROOM", block: "130", street_name: "ANG MO KIO AVENUE 3", storey_range: "07 TO 09", floor_area_sqm: "92", flat_model: "New Generation", lease_commence_date: "1978", remaining_lease: "51 years", resale_price: "588000" },
  { month: "2026-03", town: "ANG MO KIO", flat_type: "4 ROOM", block: "126", street_name: "ANG MO KIO AVENUE 3", storey_range: "13 TO 15", floor_area_sqm: "92", flat_model: "New Generation", lease_commence_date: "1978", remaining_lease: "51 years", resale_price: "628000" },
  { month: "2026-05", town: "WOODLANDS", flat_type: "5 ROOM", block: "688", street_name: "WOODLANDS DRIVE 75", storey_range: "10 TO 12", floor_area_sqm: "121", flat_model: "Improved", lease_commence_date: "1997", remaining_lease: "70 years", resale_price: "640000" },
  { month: "2026-04", town: "WOODLANDS", flat_type: "5 ROOM", block: "686", street_name: "WOODLANDS DRIVE 75", storey_range: "07 TO 09", floor_area_sqm: "121", flat_model: "Improved", lease_commence_date: "1997", remaining_lease: "70 years", resale_price: "620000" },
  { month: "2026-05", town: "TOA PAYOH", flat_type: "4 ROOM", block: "79", street_name: "LORONG 4 TOA PAYOH", storey_range: "10 TO 12", floor_area_sqm: "90", flat_model: "Improved", lease_commence_date: "1970", remaining_lease: "43 years", resale_price: "720000" },
  { month: "2026-04", town: "TOA PAYOH", flat_type: "4 ROOM", block: "80", street_name: "LORONG 4 TOA PAYOH", storey_range: "07 TO 09", floor_area_sqm: "90", flat_model: "Improved", lease_commence_date: "1970", remaining_lease: "43 years", resale_price: "695000" },
  { month: "2026-05", town: "JURONG WEST", flat_type: "4 ROOM", block: "682", street_name: "JURONG WEST CENTRAL 1", storey_range: "10 TO 12", floor_area_sqm: "104", flat_model: "Model A", lease_commence_date: "1998", remaining_lease: "71 years", resale_price: "565000" },
  { month: "2026-04", town: "JURONG WEST", flat_type: "4 ROOM", block: "684", street_name: "JURONG WEST CENTRAL 1", storey_range: "07 TO 09", floor_area_sqm: "104", flat_model: "Model A", lease_commence_date: "1998", remaining_lease: "71 years", resale_price: "548000" }
];

let activeReport = null;
let liveLookupError = "";

const form = document.querySelector("#checkerForm");
const leadForm = document.querySelector("#leadForm");
const emptyState = document.querySelector("#emptyState");
const results = document.querySelector("#results");
const targetPriceInput = document.querySelector("#targetPrice");

targetPriceInput.addEventListener("input", () => {
  const digits = targetPriceInput.value.replace(/\D/g, "");
  targetPriceInput.value = digits ? Number(digits).toLocaleString("en-SG") : "";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const postalCode = cleanPostal(document.querySelector("#postalCode").value);
  const flatType = document.querySelector("#flatType").value;
  const storeyRange = document.querySelector("#storeyRange").value;
  const targetPrice = parseMoney(document.querySelector("#targetPrice").value);

  if (!postalCode || !targetPrice) return;

  const liveData = await getLiveAnalysisData({ postalCode, flatType, storeyRange });
  const hasLiveRecords = !!(liveData?.transactions && liveData.transactions.length);
  const address = liveData?.address || postalDirectory[postalCode] || inferAddressFromPostal(postalCode);
  const transactions = hasLiveRecords ? liveData.transactions : await getTransactions(address, flatType);
  const analysis = analysePrice({ postalCode, address, flatType, storeyRange, targetPrice, transactions });
  analysis.dataSource = hasLiveRecords
    ? `Live OneMap + data.gov.sg match: ${liveData.matchLevel || "town"} level, ${liveData.transactionCount || transactions.length} records`
    : liveData
      ? `Preview fallback: live lookup found the address but no matching ${flatType.toLowerCase()} resale records`
      : GOOGLE_SCRIPT_URL
      ? `Preview fallback: ${liveLookupError || "live lookup did not return data"}`
      : "Preview fallback: Google Apps Script URL is not connected";

  activeReport = analysis;
  renderAnalysis(analysis);
});

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeReport) return;

  const lead = {
    name: document.querySelector("#leadName").value.trim(),
    email: document.querySelector("#leadEmail").value.trim(),
    mobile: document.querySelector("#leadMobile").value.trim(),
    submittedAt: new Date().toISOString()
  };

  const report = { ...activeReport, lead };
  saveLead(report);
  await sendLeadToSheet(report);
  downloadPdf(report);
});

function cleanPostal(value) {
  return value.replace(/\D/g, "").slice(0, 6);
}

function parseMoney(value) {
  return Number(String(value).replace(/[^\d.]/g, ""));
}

function inferAddressFromPostal(postalCode) {
  const sector = postalCode.slice(0, 2);
  const sectorTown = {
    "51": "PASIR RIS",
    "52": "TAMPINES",
    "56": "ANG MO KIO",
    "73": "WOODLANDS",
    "31": "TOA PAYOH",
    "64": "JURONG WEST"
  };
  const town = sectorTown[sector] || "TAMPINES";
  return { block: postalCode.slice(3), street: `${town} AREA`, town };
}

async function getTransactions(address, flatType) {
  try {
    const streetRecords = await fetchTransactions({ town: address.town, flat_type: flatType, street_name: address.street });
    if (streetRecords.length) return streetRecords;

    const townRecords = await fetchTransactions({ town: address.town, flat_type: flatType });
    if (townRecords.length) return townRecords;
  } catch (error) {
    console.info("Using preview data because live data is unavailable.", error);
  }

  const streetSamples = sampleTransactions.filter((item) => item.street_name === address.street && item.flat_type === flatType);
  if (streetSamples.length) return streetSamples;
  return sampleTransactions.filter((item) => item.town === address.town && item.flat_type === flatType);
}

async function getLiveAnalysisData({ postalCode, flatType, storeyRange }) {
  if (!GOOGLE_SCRIPT_URL) return null;
  liveLookupError = "";

  try {
    return await loadJsonp(GOOGLE_SCRIPT_URL, {
      action: "analyze",
      postalCode,
      flatType,
      storeyRange
    });
  } catch (error) {
    liveLookupError = getFriendlyLookupError(error.message);
    console.info("Live analysis unavailable, using browser fallback.", error);
    return null;
  }
}

function getFriendlyLookupError(message) {
  if (message.includes("UrlFetchApp.fetch") || message.includes("script.external_request")) {
    return "Google Apps Script needs permission for external API requests. Run authorizeSetup() in Apps Script, approve permissions, then redeploy.";
  }

  if (message.includes("OneMap credentials are missing")) {
    return "OneMap credentials are missing in Google Apps Script properties.";
  }

  return message;
}

function loadJsonp(url, params) {
  return new Promise((resolve, reject) => {
    const callbackName = `hdbCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Live lookup timed out"));
    }, 12000);

    const requestUrl = new URL(url);
    Object.entries(params).forEach(([key, value]) => requestUrl.searchParams.set(key, value));
    requestUrl.searchParams.set("callback", callbackName);

    window[callbackName] = (data) => {
      cleanup();
      if (data?.error) {
        reject(new Error(data.error));
        return;
      }
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Live lookup failed"));
    };

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    script.src = requestUrl.toString();
    document.body.appendChild(script);
  });
}

async function fetchTransactions(filters) {
  const url = new URL("https://data.gov.sg/api/action/datastore_search");
  url.searchParams.set("resource_id", DATASET_ID);
  url.searchParams.set("limit", "100");
  url.searchParams.set("filters", JSON.stringify(filters));
  url.searchParams.set("sort", "month desc");

  const response = await fetch(url);
  if (!response.ok) throw new Error("Data.gov.sg request failed");
  const json = await response.json();
  return json?.result?.records || [];
}

function analysePrice(input) {
  const prices = input.transactions.map((item) => Number(item.resale_price)).filter(Boolean).sort((a, b) => a - b);
  const fallbackByFlat = sampleTransactions.filter((item) => item.flat_type === input.flatType).map((item) => Number(item.resale_price)).sort((a, b) => a - b);
  const fallbackAll = sampleTransactions.map((item) => Number(item.resale_price)).sort((a, b) => a - b);
  const safePrices = prices.length ? prices : fallbackByFlat.length ? fallbackByFlat : fallbackAll;
  const min = safePrices[0];
  const max = safePrices[safePrices.length - 1];
  const median = percentile(safePrices, 0.5);
  const p25 = percentile(safePrices, 0.25);
  const p75 = percentile(safePrices, 0.75);
  const fallbackLatest = sampleTransactions.find((item) => item.flat_type === input.flatType) || sampleTransactions[0];
  const latest = [...input.transactions].sort((a, b) => String(b.month).localeCompare(String(a.month)))[0] || fallbackLatest;
  const gap = input.targetPrice - median;
  const pctVsMedian = median ? gap / median : 0;
  const pctVsTop = max ? (input.targetPrice - max) / max : 0;
  const score = getConfidenceScore(input.targetPrice, median, p25, p75, min, max);
  const position = getPosition(input.targetPrice, median, p25, p75, min, max);

  return {
    ...input,
    generatedAt: new Date(),
    min,
    max,
    median,
    p25,
    p75,
    latest,
    gap,
    pctVsMedian,
    pctVsTop,
    score,
    position,
    insight: getInsight(position, pctVsMedian)
  };
}

function percentile(values, p) {
  if (!values.length) return 0;
  const index = (values.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return values[lower];
  return values[lower] + (values[upper] - values[lower]) * (index - lower);
}

function getConfidenceScore(target, median, p25, p75, min, max) {
  if (target >= p25 && target <= p75) return 88;
  if (target >= min && target <= max) return 76;
  if (target > max && target <= max * 1.05) return 64;
  if (target > max && target <= max * 1.12) return 48;
  if (target < min) return 70;
  return 34;
}

function getPosition(target, median, p25, p75, min, max) {
  if (target < min) return "Below Market";
  if (target >= p25 && target <= p75) return "Fair Market";
  if (target <= max) return "Slightly Ambitious";
  if (target <= max * 1.08) return "Ambitious";
  return "High Risk";
}

function getInsight(position, pctVsMedian) {
  const premium = Math.abs(pctVsMedian * 100).toFixed(1);
  const insights = {
    "Below Market": `Your target price sits below recent transaction evidence. This can attract more buyer attention, but you may want to confirm that you are not leaving value on the table before listing.`,
    "Fair Market": `Your target price is aligned with recent HDB resale transactions. This is a realistic range if your unit condition, floor level, layout, and presentation are competitive.`,
    "Slightly Ambitious": `Your target price is above the middle of recent transactions by about ${premium}%. It may still be achievable if the unit has strong attributes such as higher floor, better facing, strong renovation condition, or convenient amenities.`,
    "Ambitious": `Your target price is above recent market evidence. A premium may be possible, but buyers will need clear reasons to justify it, and the listing strategy must be more deliberate.`,
    "High Risk": `Your target price is meaningfully above recent transaction support. This may reduce buyer enquiries unless the unit has standout qualities or the market has moved ahead of the latest registered transactions.`
  };
  return insights[position];
}

function renderAnalysis(report) {
  emptyState.classList.add("hidden");
  results.classList.remove("hidden");

  document.querySelector("#positionTitle").textContent = report.position;
  document.querySelector("#matchedAddress").textContent = `${titleCase(report.address.block)} ${titleCase(report.address.street)}, ${titleCase(report.address.town)} | ${report.dataSource}`;
  document.querySelector("#confidenceScore").textContent = report.score;
  document.querySelector("#meterFill").style.width = `${report.score}%`;
  document.querySelector("#priceComparison").textContent = `${money(report.targetPrice)} vs ${money(report.min)} - ${money(report.max)}`;

  const topGap = report.targetPrice - report.max;
  document.querySelector("#comparisonCopy").textContent = topGap > 0
    ? `Your price is ${percent(topGap / report.max)} above the top recent transaction in this comparison set.`
    : "Your price sits within the recent transaction range.";

  document.querySelector("#latestTransaction").textContent = money(Number(report.latest.resale_price));
  document.querySelector("#latestCopy").textContent = `${titleCase(report.latest.flat_type)}, ${titleCase(report.latest.town)}, ${report.latest.storey_range}, ${monthLabel(report.latest.month)}`;
  document.querySelector("#priceGap").textContent = `${report.gap >= 0 ? "+" : "-"}${money(Math.abs(report.gap))}`;
  document.querySelector("#gapCopy").textContent = `Compared with the median nearby transaction of ${money(report.median)}.`;
  document.querySelector("#scoreCopy").textContent = `${report.score} / 100`;
  document.querySelector("#confidenceCopy").textContent = getScoreCopy(report.score);
  document.querySelector("#insightCopy").textContent = report.insight;
}

function getScoreCopy(score) {
  if (score >= 85) return "Strongly supported by transaction data.";
  if (score >= 70) return "Realistic but still needs good positioning.";
  if (score >= 55) return "Possible, but the evidence is more selective.";
  if (score >= 40) return "Higher asking price risk.";
  return "Weak support from recent transactions.";
}

function saveLead(report) {
  const logs = JSON.parse(localStorage.getItem("hdb_price_checker_leads") || "[]");
  logs.push({
    lead: report.lead,
    postalCode: report.postalCode,
    flatType: report.flatType,
    storeyRange: report.storeyRange,
    targetPrice: report.targetPrice,
    position: report.position,
    score: report.score,
    generatedAt: report.generatedAt.toISOString()
  });
  localStorage.setItem("hdb_price_checker_leads", JSON.stringify(logs));
}

async function sendLeadToSheet(report) {
  if (!GOOGLE_SCRIPT_URL) return;

  const payload = {
    submittedAt: report.lead.submittedAt,
    ownerEmail: OWNER_EMAIL,
    urgentContact: URGENT_CONTACT,
    name: report.lead.name,
    email: report.lead.email,
    mobile: report.lead.mobile,
    postalCode: report.postalCode,
    town: report.address.town,
    street: report.address.street,
    flatType: report.flatType,
    storeyRange: report.storeyRange,
    targetPrice: report.targetPrice,
    position: report.position,
    confidenceScore: report.score,
    recentMarketMin: report.min,
    recentMarketMax: report.max,
    medianNearbyPrice: report.median,
    latestTransactionPrice: Number(report.latest.resale_price),
    latestTransactionMonth: report.latest.month,
    priceGapVsMedian: report.gap,
    advisoryInsight: report.insight,
    sourcePage: window.location.href
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch (error) {
    console.info("Lead logging did not complete, but the report can still be downloaded.", error);
  }
}

function downloadPdf(report) {
  const pdf = createPdf(report);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `HDB-Price-Position-Report-${report.postalCode}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createPdf(report) {
  const writer = new PdfWriter();
  const blue = "153E9F";
  const ink = "08142F";
  const muted = "64708B";
  const line = "DBE3F7";
  const soft = "E8EFFF";

  writer.rect(0, 0, 595, 842, "F6F8FF");
  writer.rect(36, 34, 523, 774, "FFFFFF");
  writer.line(36, 132, 559, 132, line);
  writer.text("HDB PRICE POSITION REPORT", 54, 66, 10, blue, true);
  writer.text("Prepared for " + safe(report.lead.name), 54, 92, 24, ink, true);
  writer.text(`${safe(report.postalCode)} | ${titleCase(report.flatType)} | ${report.storeyRange}`, 54, 116, 11, muted);
  writer.text(monthLabel(report.generatedAt.toISOString().slice(0, 7)), 454, 66, 10, muted);

  writer.rect(54, 158, 226, 100, soft);
  writer.text("Price Position", 72, 186, 10, blue, true);
  writer.text(report.position, 72, 216, 26, ink, true);
  writer.text("Market Confidence Score: " + report.score + " / 100", 72, 240, 11, muted);

  writer.rect(304, 158, 201, 100, "FBFCFF");
  writer.text("Target Selling Price", 322, 186, 10, blue, true);
  writer.text(money(report.targetPrice), 322, 216, 26, ink, true);
  writer.text("Compared against public resale transactions", 322, 240, 10, muted);

  const metrics = [
    ["Recent Market Range", money(report.min) + " - " + money(report.max)],
    ["Median Nearby Price", money(report.median)],
    ["Latest Transaction", money(Number(report.latest.resale_price))],
    ["Price Gap vs Median", (report.gap >= 0 ? "+" : "-") + money(Math.abs(report.gap))]
  ];
  let y = 292;
  metrics.forEach((metric, index) => {
    const x = index % 2 === 0 ? 54 : 304;
    if (index === 2) y += 86;
    writer.rect(x, y, 226, 64, "FBFCFF");
    writer.text(metric[0], x + 16, y + 24, 9, muted, true);
    writer.text(metric[1], x + 16, y + 48, 18, ink, true);
  });

  writer.text("Advisory Insight", 54, 490, 14, ink, true);
  writer.wrap(report.insight, 54, 516, 487, 12, muted, 18);

  writer.text("Latest Comparable Transaction", 54, 610, 14, ink, true);
  const latestLine = `${titleCase(report.latest.flat_type)} flat at ${titleCase(report.latest.town)}, ${report.latest.storey_range}, ${monthLabel(report.latest.month)}, ${report.latest.remaining_lease || "remaining lease unavailable"}`;
  writer.wrap(latestLine, 54, 636, 487, 11, muted, 16);
  writer.wrap("Data source: " + (report.dataSource || "Public resale transaction comparison"), 54, 676, 487, 9, muted, 13);

  writer.line(54, 704, 541, 704, line);
  writer.wrap("Prepared using public HDB resale transaction fields from data.gov.sg. Resale prices are indicative and final pricing should also consider unit condition, renovation, facing, floor level, ethnic quota, buyer demand, and competing supply.", 54, 728, 487, 9, muted, 13);
  writer.text("Contact details submitted: " + safe(report.lead.email) + " | " + safe(report.lead.mobile), 54, 774, 9, muted);
  writer.text("Urgent enquiries: " + URGENT_CONTACT, 54, 790, 9, muted);

  return writer.output();
}

class PdfWriter {
  constructor() {
    this.objects = [];
    this.commands = [];
  }

  text(text, x, y, size = 12, color = "000000", bold = false) {
    const font = bold ? "F2" : "F1";
    const escaped = safe(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    this.commands.push(`BT /${font} ${size} Tf ${hex(color)} rg ${x} ${842 - y} Td (${escaped}) Tj ET`);
  }

  wrap(text, x, y, width, size, color, lineHeight) {
    const words = safe(text).split(" ");
    let line = "";
    let cursor = y;
    const maxChars = Math.floor(width / (size * 0.5));
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (test.length > maxChars) {
        this.text(line, x, cursor, size, color);
        line = word;
        cursor += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) this.text(line, x, cursor, size, color);
  }

  rect(x, y, w, h, color) {
    this.commands.push(`${hex(color)} rg ${x} ${842 - y - h} ${w} ${h} re f`);
  }

  line(x1, y1, x2, y2, color) {
    this.commands.push(`${hex(color)} RG 1 w ${x1} ${842 - y1} m ${x2} ${842 - y2} l S`);
  }

  output() {
    const stream = this.commands.join("\n");
    this.add("<< /Type /Catalog /Pages 2 0 R >>");
    this.add("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    this.add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>");
    this.add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    this.add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
    this.add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    this.objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
      pdf += String(offset).padStart(10, "0") + " 00000 n \n";
    });
    pdf += `trailer\n<< /Size ${this.objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return pdf;
  }

  add(object) {
    this.objects.push(object);
  }
}

function hex(color) {
  const n = color.match(/[a-fA-F0-9]{2}/g).map((part) => parseInt(part, 16) / 255);
  return n.map((value) => value.toFixed(3)).join(" ");
}

function money(value) {
  return "$" + Math.round(Number(value)).toLocaleString("en-SG");
}

function percent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function monthLabel(value) {
  const date = new Date(String(value).length === 7 ? `${value}-01T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-SG", { month: "long", year: "numeric" });
}

function titleCase(value) {
  return String(value || "").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function safe(value) {
  return String(value ?? "").replace(/[^\x20-\x7E]/g, "");
}

window.HDBPriceChecker = {
  createPdf,
  getLeadLogs: () => JSON.parse(localStorage.getItem("hdb_price_checker_leads") || "[]")
};

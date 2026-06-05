const DATASET_ID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6lrlclwzN1Uk8C86L8MyeI0OUbKZCo5axKFRc3UQZPLLnXN1RGgFDQWnP1pMqkqVXxw/exec";
const BACKEND_PROXY_URL = "/api/hdb";
const OWNER_EMAIL = "angieyapwt@gmail.com";
const URGENT_CONTACT = "83963088";
const LIVE_LOOKUP_TIMEOUT_MS = 45000;
const PROXY_LOOKUP_TIMEOUT_MS = 35000;
const LIVE_LOOKUP_RETRIES = 0;

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
let activeReportDownloaded = false;
const liveAnalysisCache = new Map();

const form = document.querySelector("#checkerForm");
const leadForm = document.querySelector("#leadForm");
const emptyState = document.querySelector("#emptyState");
const errorState = document.querySelector("#errorState");
const results = document.querySelector("#results");
const targetPriceInput = document.querySelector("#targetPrice");
const generateButton = document.querySelector("#generateButton");

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

  errorState.classList.add("hidden");
  setLoading(true);
  try {
    const liveData = await getLiveAnalysisData({ postalCode, flatType, storeyRange });
    const hasLiveRecords = !!(liveData?.transactions && liveData.transactions.length);
    if (!hasLiveRecords) {
      showLookupError(liveData
        ? `Live lookup found the address, but data.gov.sg did not return matching ${flatType.toLowerCase()} resale transactions for this check.`
        : liveLookupError || "Unable to retrieve live OneMap or data.gov.sg data.");
      return;
    }

    const address = liveData.address;
    const transactions = liveData.transactions;
    const analysis = analysePrice({ postalCode, address, flatType, storeyRange, targetPrice, transactions });
    analysis.matchLevel = liveData.matchLevel;
    analysis.transactionCount = liveData.transactionCount || transactions.length;
    analysis.dataSource = `Live OneMap + data.gov.sg match: ${liveData.matchLevel || "town"} level, ${liveData.transactionCount || transactions.length} records`;

    activeReport = analysis;
    activeReportDownloaded = false;
    renderAnalysis(analysis);
  } finally {
    setLoading(false);
  }
});

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeReport || activeReportDownloaded) return;

  const downloadButton = leadForm.querySelector("button[type='submit']");
  downloadButton.disabled = true;
  downloadButton.textContent = "Preparing PDF...";

  const lead = {
    name: document.querySelector("#leadName").value.trim(),
    email: document.querySelector("#leadEmail").value.trim(),
    mobile: document.querySelector("#leadMobile").value.trim(),
    submittedAt: new Date().toISOString()
  };

  const report = { ...activeReport, lead };
  const pdf = createPdf(report);
  activeReportDownloaded = true;
  saveLead(report);
  await sendLeadToSheet(report, pdf);
  downloadPdf(report, pdf);
  downloadButton.textContent = "PDF downloaded";
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
    "09": "BUKIT MERAH",
    "51": "PASIR RIS",
    "52": "TAMPINES",
    "54": "SENGKANG",
    "55": "SERANGOON",
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
  if (!GOOGLE_SCRIPT_URL && !BACKEND_PROXY_URL) return null;
  liveLookupError = "";
  const cacheKey = `${postalCode}|${flatType}|${storeyRange}`;
  const cached = liveAnalysisCache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < 10 * 60 * 1000) {
    return cached.data;
  }

  if (shouldUseBackendProxy()) {
    const proxyData = await getLiveAnalysisViaProxy({ postalCode, flatType, storeyRange });
    if (proxyData) {
      liveAnalysisCache.set(cacheKey, { createdAt: Date.now(), data: proxyData });
      return proxyData;
    }
    return null;
  }

  for (let attempt = 0; attempt <= LIVE_LOOKUP_RETRIES; attempt += 1) {
    try {
      const data = await loadJsonp(GOOGLE_SCRIPT_URL, {
        action: "analyze",
        postalCode,
        flatType,
        storeyRange
      }, LIVE_LOOKUP_TIMEOUT_MS);
      liveAnalysisCache.set(cacheKey, { createdAt: Date.now(), data });
      return data;
    } catch (error) {
      liveLookupError = getFriendlyLookupError(error.message);
      console.info(`Live analysis attempt ${attempt + 1} unavailable.`, error);
      if (attempt === LIVE_LOOKUP_RETRIES) return null;
    }
  }

  return null;
}

async function getLiveAnalysisViaProxy({ postalCode, flatType, storeyRange }) {
  if (!shouldUseBackendProxy()) return null;

  try {
    const requestUrl = new URL(BACKEND_PROXY_URL, window.location.href);
    requestUrl.searchParams.set("action", "analyze");
    requestUrl.searchParams.set("postalCode", postalCode);
    requestUrl.searchParams.set("flatType", flatType);
    requestUrl.searchParams.set("storeyRange", storeyRange);
    requestUrl.searchParams.set("_", Date.now());

    const request = fetch(requestUrl.toString(), {
      method: "GET",
      cache: "no-store",
      headers: { "Accept": "application/json" }
    });
    const timeout = new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error("Backend proxy lookup timed out")), PROXY_LOOKUP_TIMEOUT_MS);
    });
    const response = await Promise.race([request, timeout]);

    if (!response.ok) throw new Error(`Proxy lookup failed (${response.status})`);
    const data = await response.json();
    if (data?.error) throw new Error(data.error);
    return data;
  } catch (error) {
    liveLookupError = getFriendlyLookupError(error.message);
    console.info("Backend proxy lookup unavailable.", error);
    return null;
  }
}

function shouldUseBackendProxy() {
  if (!BACKEND_PROXY_URL) return false;
  return !["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function getFriendlyLookupError(message) {
  if (message.includes("UrlFetchApp.fetch") || message.includes("script.external_request")) {
    return "Google Apps Script needs permission for external API requests. Run authorizeSetup() in Apps Script, approve permissions, then redeploy.";
  }

  if (message.includes("OneMap credentials are missing")) {
    return "OneMap credentials are missing in Google Apps Script properties.";
  }

  if (message.includes("Proxy lookup failed (404)") || message.includes("Proxy lookup failed (405)")) {
    return "The Netlify backend proxy is not connected yet. Check that netlify.toml is in the repository root and netlify/functions/hdb-proxy.js is deployed.";
  }

  if (message.includes("Backend proxy lookup timed out")) {
    return "The Netlify backend proxy took too long to respond. Please check the Netlify Function logs for /api/hdb.";
  }

  return message;
}

function loadJsonp(url, params, timeoutMs = LIVE_LOOKUP_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const callbackName = `hdbCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    let settled = false;
    const timeout = window.setTimeout(() => {
      finish(() => reject(new Error("Live lookup timed out")));
    }, timeoutMs);

    const requestUrl = new URL(url);
    Object.entries(params).forEach(([key, value]) => requestUrl.searchParams.set(key, value));
    requestUrl.searchParams.set("callback", callbackName);
    requestUrl.searchParams.set("_", Date.now());

    window[callbackName] = (data) => {
      finish(() => {
        if (data?.error) {
          reject(new Error(data.error));
          return;
        }
        resolve(data);
      });
    };

    script.onerror = () => {
      // Mobile browsers can report an early script error during the Apps Script redirect.
      // Let the callback or timeout decide so valid lookups do not fail immediately.
    };

    function finish(callback) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
      callback();
    }

    script.async = true;
    script.referrerPolicy = "no-referrer";
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
  const position = getPosition(input.targetPrice, median, p25, p75, min, max);
  const score = getConfidenceScore(input.targetPrice, median, p25, p75, min, max, position);
  const negotiation = getNegotiationRange(input.targetPrice, median, position);

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
    negotiation,
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

function getConfidenceScore(target, median, p25, p75, min, max, position) {
  const gapPct = median ? Math.abs((target - median) / median) : 0;
  const scoreByPosition = {
    "Below Market": target < min ? 94 : Math.max(82, 94 - Math.round(gapPct * 30)),
    "Fair Market": 90,
    "Slightly Above Market": Math.max(66, 78 - Math.round(gapPct * 35)),
    "Ambitious": Math.max(48, 64 - Math.round(gapPct * 45)),
    "High Risk": Math.max(24, 44 - Math.round(gapPct * 55))
  };

  return Math.min(96, Math.max(24, scoreByPosition[position] || 60));
}

function getPosition(target, median, p25, p75, min, max) {
  if (target < median) return "Below Market";
  if (target >= median * 0.97 && target <= median * 1.03) return "Fair Market";
  if (target <= p75) return "Fair Market";
  if (target <= max) return "Slightly Above Market";
  if (target <= max * 1.08) return "Ambitious";
  return "High Risk";
}

function getInsight(position, pctVsMedian) {
  const percentageGap = Math.abs(pctVsMedian * 100).toFixed(1);
  const leaseNote = "Remaining lease also affects pricing; older estates and shorter leases may face lease decay, which can reduce buyer demand and valuation even when recent transactions look supportive.";
  const insights = {
    "Below Market": `Your target price is about ${percentageGap}% below the median of the comparison set. This can attract more buyer attention, but you may want to confirm that you are not leaving value on the table before listing. ${leaseNote}`,
    "Fair Market": `Your target price is aligned with recent HDB resale transactions. This is a realistic range if your unit condition, floor level, layout, presentation, and remaining lease are competitive. ${leaseNote}`,
    "Slightly Above Market": `Your target price is about ${percentageGap}% above the median of the comparison set. It may still be achievable if the unit has strong attributes such as higher floor, better facing, strong renovation condition, convenient amenities, or stronger remaining lease. ${leaseNote}`,
    "Ambitious": `Your target price is above recent market evidence. A premium may be possible, but buyers will need clear reasons to justify it, and the listing strategy must be more deliberate. ${leaseNote}`,
    "High Risk": `Your target price is meaningfully above recent transaction support. This may reduce buyer enquiries unless the unit has standout qualities or the market has moved ahead of the latest registered transactions. ${leaseNote}`
  };
  return insights[position];
}

function getNegotiationRange(target, median, position) {
  const lowerMultiplier = position === "Below Market" ? 0.98 : position === "Fair Market" ? 0.96 : 0.93;
  const upperMultiplier = position === "Below Market" ? 1.04 : position === "Fair Market" ? 1.02 : 0.98;
  const evidenceFloor = median * 0.86;
  const lower = roundToThousand(Math.max(evidenceFloor, target * lowerMultiplier));
  const upper = roundToThousand(Math.max(lower + 5000, target * upperMultiplier));

  return { lower, upper };
}

function roundToThousand(value) {
  return Math.round(value / 1000) * 1000;
}

function renderAnalysis(report) {
  emptyState.classList.add("hidden");
  errorState.classList.add("hidden");
  results.classList.remove("hidden");
  const downloadButton = leadForm.querySelector("button[type='submit']");
  downloadButton.disabled = false;
  downloadButton.textContent = "Download PDF report";

  document.querySelector("#positionTitle").textContent = report.position;
  document.querySelector("#matchedAddress").textContent = formatMatchLine(report);
  document.querySelector("#confidenceScore").textContent = report.score;
  document.querySelector("#meterFill").style.width = `${report.score}%`;
  document.querySelector("#priceComparison").innerHTML = `<span>${money(report.targetPrice)}</span><small>vs</small><span>${money(report.min)} - ${money(report.max)}</span>`;

  const topGap = report.targetPrice - report.max;
  document.querySelector("#comparisonCopy").textContent = topGap > 0
    ? `Your price is ${percent(topGap / report.max)} above the top recent transaction in this comparison set.`
    : report.targetPrice < report.median
    ? `Your price is ${percent((report.median - report.targetPrice) / report.median)} below the median of this comparison set.`
    : "Your price sits within the recent transaction range.";

  document.querySelector("#latestTransaction").textContent = money(Number(report.latest.resale_price));
  document.querySelector("#latestCopy").innerHTML = `${titleCase(report.latest.flat_type)}, ${titleCase(report.latest.town)},<br>${report.latest.storey_range}, ${monthLabel(report.latest.month)}`;
  document.querySelector("#priceGap").textContent = `${report.gap >= 0 ? "+" : "-"}${money(Math.abs(report.gap))}`;
  document.querySelector("#gapCopy").textContent = `Compared with the median nearby transaction of ${money(report.median)}.`;
  document.querySelector("#scoreCopy").textContent = `${report.score} / 100`;
  document.querySelector("#confidenceCopy").textContent = getScoreCopy(report.score);
  document.querySelector("#insightCopy").textContent = report.insight;
  document.querySelector("#rangeLow").textContent = money(report.p25);
  document.querySelector("#rangeHigh").textContent = money(report.p75);
  const markerPosition = getMarkerPosition(report.targetPrice, report.min, report.max);
  const marker = document.querySelector("#priceMarker");
  marker.style.left = `${markerPosition}%`;
  marker.classList.toggle("is-low-edge", markerPosition < 12);
  marker.classList.toggle("is-high-edge", markerPosition > 88);
  renderTransactions(report);
}

function showLookupError(message) {
  activeReport = null;
  results.classList.add("hidden");
  emptyState.classList.add("hidden");
  errorState.classList.remove("hidden");
  document.querySelector("#errorCopy").textContent = message;
}

function getScoreCopy(score) {
  if (score >= 88) return "Strong transaction support.";
  if (score >= 75) return "Good support from recent transactions.";
  if (score >= 60) return "Moderate support; positioning matters.";
  if (score >= 45) return "Selective support; stronger justification needed.";
  return "Weak support from recent transactions.";
}

function formatMatchLine(report) {
  const address = `${titleCase(report.address.block)} ${titleCase(report.address.street)}`.trim();
  const town = titleCase(report.address.town);
  const source = report.dataSource?.startsWith("Live OneMap")
    ? "Live OneMap + data.gov.sg match"
    : report.dataSource || "Live data unavailable";

  return `${address} | ${town} | ${source}`;
}

function getMarkerPosition(target, min, max) {
  if (!min || !max || max === min) return 50;
  const paddedMin = min - (max - min) * 0.1;
  const paddedMax = max + (max - min) * 0.1;
  return Math.max(0, Math.min(100, ((target - paddedMin) / (paddedMax - paddedMin)) * 100));
}

function getNegotiationCopy(report) {
  const gapText = percent(Math.abs(report.pctVsMedian));
  if (report.position === "Below Market") {
    return `Based on ${gapText} below the median. This range protects value while staying attractive against recent transactions.`;
  }

  if (report.position === "Fair Market") {
    return `Based on recent transaction support. This range leaves room for negotiation while staying close to market evidence.`;
  }

  return `Based on ${gapText} above the median. Aim to justify the premium, or leave room for buyer negotiation.`;
}

function renderTransactions(report) {
  const transactions = [...report.transactions]
    .sort((a, b) => String(b.month).localeCompare(String(a.month)))
    .slice(0, 6);

  document.querySelector("#transactionsTitle").textContent = `Recent sales in ${titleCase(report.address.town || "this area")}`;
  document.querySelector("#transactionsCount").textContent = `${transactions.length} records`;
  document.querySelector("#transactionsList").innerHTML = transactions.map((item) => `
    <div class="transaction-row">
      <div>
        <strong>Blk ${safe(item.block)} ${titleCase(item.street_name || item.town)}</strong>
        <p>${safe(item.storey_range)} &middot; ${safe(item.remaining_lease || "remaining lease unavailable")} &middot; ${monthLabel(item.month)}</p>
      </div>
      <div class="transaction-price">${money(Number(item.resale_price))}</div>
    </div>
  `).join("");
}

function setLoading(isLoading) {
  generateButton.classList.toggle("is-loading", isLoading);
  generateButton.disabled = isLoading;
  generateButton.querySelector(".button-label").textContent = isLoading
    ? "Retrieving live data..."
    : "Generate price position";
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

async function sendLeadToSheet(report, pdf) {
  if (!GOOGLE_SCRIPT_URL && !BACKEND_PROXY_URL) return;

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
    suggestedNegotiationRange: `${money(report.negotiation.lower)} - ${money(report.negotiation.upper)}`,
    advisoryInsight: report.insight,
    pdfFileName: getReportFileName(report),
    pdfBase64: btoa(pdf),
    sourcePage: window.location.href
  };

  try {
    if (shouldUseBackendProxy()) {
      const response = await fetch(new URL(BACKEND_PROXY_URL, window.location.href).toString(), {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        keepalive: true
      });

      if (response.ok) return;
    }

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

function downloadPdf(report, pdf) {
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getReportFileName(report);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getReportFileName(report) {
  const clientName = safeFilePart(report.lead?.name || "Client");
  const postalCode = safeFilePart(report.postalCode || "PostalCode");
  return `HDB-Price-Position-Report-${postalCode}-${clientName}.pdf`;
}

function safeFilePart(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "Client";
}

function createPdf(report) {
  const writer = new PdfWriter();
  const blue = "153E9F";
  const navy = "0A1B44";
  const royal = "245BE8";
  const lightBlue = "DDE9FF";
  const ink = "08142F";
  const muted = "64708B";
  const line = "DBE3F7";
  const soft = "F3F7FF";
  const verySoft = "F8FAFF";
  const address = `${titleCase(report.address.block)} ${titleCase(report.address.street)}`.trim();
  const town = titleCase(report.address.town);
  const latest = report.latest || {};
  const transactions = [...(report.transactions || [])]
    .sort((a, b) => String(b.month).localeCompare(String(a.month)))
    .slice(0, 6);

  const tile = (x, y, w, h, label, value, note = "", fill = "FBFCFF") => {
    writer.rect(x, y, w, h, fill);
    writer.text(label.toUpperCase(), x + 12, y + 18, 7.5, muted, true);
    writer.text(value, x + 12, y + 42, 15, ink, true);
    if (note) writer.wrap(note, x + 12, y + 58, w - 24, 7.8, muted, 10);
  };

  writer.rect(0, 0, 595, 842, "F3F6FD");
  writer.rect(30, 30, 535, 782, "FFFFFF");
  writer.rect(30, 30, 535, 6, blue);
  writer.text("HDB PRICE POSITION REPORT", 54, 60, 8.5, blue, true);
  writer.text("Prepared for " + safe(report.lead.name), 54, 84, 20, ink, true);
  writer.text("Postal code: " + safe(report.postalCode) + "  |  Address: " + address + ", " + town, 54, 106, 9.2, muted);
  writer.text(`${titleCase(report.flatType)} | ${report.storeyRange} | Generated ${monthLabel(report.generatedAt.toISOString().slice(0, 7))}`, 54, 122, 8.6, muted);

  writer.rect(54, 145, 487, 74, lightBlue);
  writer.rect(54, 145, 210, 74, "D8E7FF");
  writer.rect(264, 145, 150, 74, "7EA5FF");
  writer.rect(414, 145, 127, 74, navy);
  writer.text("PRICE POSITION", 72, 166, 7.5, blue, true);
  writer.text(report.position, 72, 194, 24, ink, true);
  writer.text("Confidence score", 435, 168, 7.5, "FFFFFF", true);
  writer.text(report.score + " / 100", 435, 195, 21, "FFFFFF", true);

  tile(54, 240, 153, 68, "Target selling price", money(report.targetPrice), "Client's intended asking price.", soft);
  tile(221, 240, 153, 68, "Recent market range", `${money(report.min)} - ${money(report.max)}`, "Based on comparable resale records.", verySoft);
  tile(388, 240, 153, 68, "Latest transaction", money(Number(latest.resale_price || 0)), `${titleCase(latest.flat_type || report.flatType)}, ${latest.storey_range || report.storeyRange}`, verySoft);

  tile(54, 322, 236, 68, "Median comparable", money(report.median), "Middle point of the comparison set.", verySoft);
  tile(305, 322, 236, 68, "Price gap analysis", `${report.gap >= 0 ? "+" : "-"}${money(Math.abs(report.gap))}`, "Against the median comparable price.", verySoft);

  writer.rect(54, 414, 487, 104, "EAF1FF");
  writer.rect(54, 414, 4, 104, blue);
  writer.text("ADVISORY INSIGHT", 72, 436, 8, blue, true);
  writer.wrap(report.insight, 72, 456, 443, 7.8, muted, 10.5);

  writer.text("LATEST 6 TRANSACTIONS", 54, 548, 8.5, blue, true);
  writer.textRight("Data source: Live OneMap + data.gov.sg", 541, 548, 8.2, muted);
  writer.line(54, 564, 541, 564, line);

  transactions.forEach((item, index) => {
    const y = 586 + index * 32;
    const rowTitle = `Blk ${safe(item.block)} ${titleCase(item.street_name || item.town)}`;
    const rowMeta = `${safe(item.storey_range)} | ${safe(item.remaining_lease || "remaining lease unavailable")} | ${monthLabel(item.month)}`;
    writer.text(rowTitle, 54, y, 8.5, ink, true);
    writer.text(rowMeta, 54, y + 13, 7.8, muted);
    writer.textRight(money(Number(item.resale_price)), 541, y + 9, 9.5, ink, true);
    if (index < transactions.length - 1) writer.line(54, y + 26, 541, y + 26, "E8EEF9");
  });

  writer.line(54, 786, 541, 786, line);
  writer.wrap("This report uses public HDB resale transaction fields and is indicative only. Final pricing should also consider unit condition, renovation, facing, floor level, remaining lease, ethnic quota, buyer demand, and competing supply.", 54, 800, 487, 6.6, muted, 9);
  writer.text("Book a personalised HDB pricing discussion", 54, 824, 8, blue, true);
  writer.text("Angie Yap | CEA Reg: R067805D | Whatsapp: +65 83963088", 262, 824, 8, ink, true);

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

  textRight(text, rightX, y, size = 12, color = "000000", bold = false) {
    const content = safe(text);
    const estimatedWidth = content.length * size * (bold ? 0.56 : 0.52);
    this.text(content, rightX - estimatedWidth, y, size, color, bold);
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

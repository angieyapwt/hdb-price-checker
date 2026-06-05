const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6lrlclwzN1Uk8C86L8MyeI0OUbKZCo5axKFRc3UQZPLLnXN1RGgFDQWnP1pMqkqVXxw/exec";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return response(204, "");
  }

  try {
    if (event.httpMethod === "GET") {
      return await handleAnalyze(event);
    }

    if (event.httpMethod === "POST") {
      return await handleLeadLog(event);
    }

    return response(405, { error: "Method not allowed" });
  } catch (error) {
    return response(500, { error: error.message || "Proxy request failed" });
  }
};

async function handleAnalyze(event) {
  const params = event.queryStringParameters || {};
  const scriptUrl = new URL(getScriptUrl());

  scriptUrl.searchParams.set("action", "analyze");
  scriptUrl.searchParams.set("postalCode", params.postalCode || "");
  scriptUrl.searchParams.set("flatType", params.flatType || "");
  scriptUrl.searchParams.set("storeyRange", params.storeyRange || "");
  scriptUrl.searchParams.set("callback", "proxyCallback");
  scriptUrl.searchParams.set("_", Date.now());

  const upstream = await fetch(scriptUrl.toString(), {
    headers: { "Accept": "application/javascript, application/json" }
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    throw new Error(`Apps Script returned ${upstream.status}`);
  }

  return response(200, parseJsonp(text));
}

async function handleLeadLog(event) {
  const upstream = await fetch(getScriptUrl(), {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: event.body || "{}"
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    throw new Error(`Apps Script lead logging returned ${upstream.status}`);
  }

  try {
    return response(200, JSON.parse(text));
  } catch (_) {
    return response(200, { ok: true });
  }
}

function parseJsonp(text) {
  const trimmed = String(text || "").trim();
  const match = trimmed.match(/^[^(]+\(([\s\S]*)\);?$/);
  return JSON.parse(match ? match[1] : trimmed);
}

function getScriptUrl() {
  return process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": typeof body === "string" ? "text/plain;charset=utf-8" : "application/json;charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: typeof body === "string" ? body : JSON.stringify(body)
  };
}

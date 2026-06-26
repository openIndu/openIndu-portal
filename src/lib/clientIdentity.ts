const VISITOR_ID_KEY = "openindu_visitor_id";
const CLIENT_ID_KEY = "openindu_client_id";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreate(key: string) {
  let value = localStorage.getItem(key);
  if (!value) {
    value = createId();
    localStorage.setItem(key, value);
  }
  return value;
}

export function getVisitorId() {
  return getOrCreate(VISITOR_ID_KEY);
}

export function getClientId() {
  return getOrCreate(CLIENT_ID_KEY);
}

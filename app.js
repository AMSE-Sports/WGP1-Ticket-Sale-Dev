"use strict";

const APP_CONFIG = {
  eventYear: 2026,
  dataMode: "local-development",
  privacyNoticeVersion: "JWC26-DRAFT-01",
  ticketTypes: [
    { id: "weekday-day", name: "Single Day — Weekday", price: 250 },
    { id: "weekend-day", name: "Single Day — Weekend", price: 350 },
    { id: "weekday-pass", name: "Weekday Package", price: 400 },
    { id: "pro-weekend", name: "Pro Weekend", price: 500 },
    { id: "all-event", name: "All Event Pass", price: 750 },
    { id: "complimentary", name: "Complimentary / บัตรเชิญ", price: 0 }
  ]
};

const countries = ["Thailand","Australia","Austria","Bahrain","Belgium","Brazil","Brunei","Bulgaria","Cambodia","Canada","China","Croatia","Czechia","Denmark","Estonia","Finland","France","Germany","Greece","Hong Kong","Hungary","India","Indonesia","Ireland","Italy","Japan","Kazakhstan","Kuwait","Laos","Latvia","Lithuania","Malaysia","Maldives","Mexico","Mongolia","Myanmar","Netherlands","New Zealand","Norway","Oman","Philippines","Poland","Portugal","Qatar","Romania","Saudi Arabia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sweden","Switzerland","Taiwan","Türkiye","Ukraine","United Arab Emirates","United Kingdom","United States","Vietnam","Other"];

const state = { attendees: [], ticketQuantities: {} };
const screens = ["screen-visitor","screen-group","screen-handover","screen-staff","screen-complete"];
const $ = id => document.getElementById(id);

function showScreen(id) {
  screens.forEach(screenId => $(screenId).classList.toggle("hidden", screenId !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setError(id, message) {
  const box = $(id);
  box.textContent = message;
  box.classList.toggle("hidden", !message);
}

function updateCounts() {
  const label = `${state.attendees.length} คน`;
  $("visitor-count").textContent = label;
  $("group-message").textContent = `ลงทะเบียนแล้ว ${label} · ${state.attendees.length} visitor(s) confirmed`;
  $("handover-count").textContent = state.attendees.length;
  $("staff-attendee-count").textContent = label;
  $("tickets-required").textContent = `${state.attendees.length} ใบ`;
}

function isMinorAgeGroup(value) {
  return value === "under-10" || value === "10-19";
}

function updateGuardianPanel() {
  const required = isMinorAgeGroup($("v-age").value);
  $("guardian-panel").classList.toggle("hidden", !required);
  ["g-name","g-relation","g-phone","g-confirm"].forEach(id => $(id).required = required);
}

function readVisitor() {
  const ageGroup = $("v-age").value;
  const minor = isMinorAgeGroup(ageGroup);
  return {
    attendeeId: crypto.randomUUID ? crypto.randomUUID() : `ATT-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    firstName: $("v-first").value.trim(),
    lastName: $("v-last").value.trim(),
    ageGroup,
    gender: $("v-gender").value,
    country: $("v-country").value.trim(),
    city: $("v-city").value.trim(),
    previousAttendance: $("v-previous").value,
    marketingSource: $("v-source").value,
    guardian: minor ? {
      name: $("g-name").value.trim(),
      relationship: $("g-relation").value,
      phone: $("g-phone").value.trim(),
      confirmed: $("g-confirm").checked
    } : null,
    privacy: {
      acknowledged: $("v-privacy").checked,
      marketingConsent: $("v-marketing").checked,
      noticeVersion: APP_CONFIG.privacyNoticeVersion,
      recordedAt: new Date().toISOString()
    }
  };
}

function validateForm(form, errorId) {
  const valid = form.checkValidity();
  form.querySelectorAll("input,select").forEach(field => field.setAttribute("aria-invalid", field.required && !field.checkValidity() ? "true" : "false"));
  if (!valid) {
    setError(errorId, "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน / Please complete all required fields.");
    const firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) firstInvalid.focus();
  } else setError(errorId, "");
  return valid;
}

function resetVisitorForm() {
  $("visitor-form").reset();
  $("v-country").value = "Thailand";
  updateGuardianPanel();
  setError("visitor-error", "");
  $("visitor-form").querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
}

function renderTickets() {
  const container = $("ticket-lines");
  container.textContent = "";
  APP_CONFIG.ticketTypes.forEach(ticket => {
    const row = document.createElement("div");
    row.className = "ticket-line";
    const description = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = ticket.name;
    const note = document.createElement("p");
    note.textContent = ticket.price ? `${ticket.price.toLocaleString()} THB per ticket` : "No charge";
    description.append(title, note);
    const qty = document.createElement("input");
    qty.type = "number"; qty.min = "0"; qty.step = "1"; qty.value = state.ticketQuantities[ticket.id] || 0;
    qty.setAttribute("aria-label", `Quantity for ${ticket.name}`);
    qty.addEventListener("input", () => { state.ticketQuantities[ticket.id] = Math.max(0, Number(qty.value || 0)); updateTicketSummary(); });
    const price = document.createElement("strong");
    price.className = "ticket-price"; price.textContent = `${ticket.price.toLocaleString()} THB`;
    row.append(description, qty, price); container.appendChild(row);
  });
  updateTicketSummary();
}

function calculateTickets() {
  return APP_CONFIG.ticketTypes.reduce((summary, ticket) => {
    const quantity = Math.max(0, Number(state.ticketQuantities[ticket.id] || 0));
    if (quantity) summary.items.push({ ticketType: ticket.id, ticketName: ticket.name, unitPrice: ticket.price, quantity, lineTotal: ticket.price * quantity });
    summary.quantity += quantity; summary.total += ticket.price * quantity; return summary;
  }, { items: [], quantity: 0, total: 0 });
}

function updateTicketSummary() {
  const summary = calculateTickets();
  $("ticket-total-qty").textContent = `${summary.quantity} ใบ`;
  $("calculated-total").textContent = `${summary.total.toLocaleString()} THB`;
  if (document.activeElement !== $("s-amount")) $("s-amount").value = summary.total;
}

function resetAll() {
  state.attendees = []; state.ticketQuantities = {};
  $("staff-form").reset(); resetVisitorForm(); renderTickets(); updateCounts(); showScreen("screen-visitor");
}

function buildTransaction() {
  const ticketSummary = calculateTickets();
  const transactionId = `JWC26-${new Date().toISOString().replace(/\D/g, "").slice(2,14)}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  return {
    transactionId,
    eventYear: APP_CONFIG.eventYear,
    dataMode: APP_CONFIG.dataMode,
    submittedAt: new Date().toISOString(),
    attendeeCount: state.attendees.length,
    attendees: state.attendees,
    sale: {
      staff: $("s-staff").value,
      paymentMethod: $("s-payment").value,
      ticketItems: ticketSummary.items,
      ticketQuantity: ticketSummary.quantity,
      calculatedTotal: ticketSummary.total,
      amountPaid: Number($("s-amount").value || 0),
      note: $("s-note").value.trim()
    }
  };
}

function saveDevelopmentTransaction(transaction) {
  const key = "wgp1-jwc26-development-transactions";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  current.push(transaction);
  localStorage.setItem(key, JSON.stringify(current.slice(-200)));
}

$("v-age").addEventListener("change", updateGuardianPanel);
$("visitor-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!validateForm(event.currentTarget, "visitor-error")) return;
  state.attendees.push(readVisitor()); updateCounts(); showScreen("screen-group");
});
$("add-visitor").addEventListener("click", () => { resetVisitorForm(); showScreen("screen-visitor"); });
$("remove-last").addEventListener("click", () => { state.attendees.pop(); updateCounts(); if (!state.attendees.length) { resetVisitorForm(); showScreen("screen-visitor"); } });
$("finish-visitors").addEventListener("click", () => { if (!state.attendees.length) return; updateCounts(); showScreen("screen-handover"); });
$("to-staff").addEventListener("click", () => { renderTickets(); updateCounts(); showScreen("screen-staff"); });
$("back-handover").addEventListener("click", () => showScreen("screen-handover"));
$("staff-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!validateForm(event.currentTarget, "staff-error")) return;
  const summary = calculateTickets();
  if (summary.quantity !== state.attendees.length) {
    setError("staff-error", `จำนวนตั๋วต้องเท่ากับจำนวนผู้ชมที่ลงทะเบียน (${state.attendees.length} ใบ) / Ticket quantity must match the registered visitors.`); return;
  }
  const transaction = buildTransaction();
  saveDevelopmentTransaction(transaction);
  $("transaction-id").textContent = transaction.transactionId;
  setError("staff-error", ""); showScreen("screen-complete");
});
$("next-customer").addEventListener("click", resetAll);

countries.forEach(country => { const option = document.createElement("option"); option.value = country; $("country-list").appendChild(option); });
resetAll();

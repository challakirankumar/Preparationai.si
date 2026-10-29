"use strict";
/* ============================================================
   PREPARATION AI — standalone edition · vanilla JS engine
   ============================================================ */

/* ---------------- Lucide icon library (inline SVG paths) ---------------- */
var ICONS = {
  "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-up": '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  "menu": '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  "moon": '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  "sparkles": '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  "layers": '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  "chart-pie": '<path d="M21 12c.55 0 1-.45.95-1a10 10 0 0 0-8.95-8.95c-.55-.06-1 .39-1 .95v8.1c0 .5.4.9.9.9Z"/><path d="M10.5 1.24a10 10 0 1 0 9.99 9.98"/>',
  "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  "play-circle": '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  "calendar-days": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
  "trending-up": '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  "message-circle-question": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.1 8.1a2 2 0 0 1 2.5-1.9"/><path d="M12 11v-1"/><circle cx="11" cy="11.5" r="1.6"/>',
  "book-open-check": '<path d="M2 4h5a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-5a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h6z"/><path d="m10 10 1.5 1.5L14 9"/>',
  "graduation-cap": '<path d="M21.4 10.9a1 1 0 0 0 0-1.8L12.8 5.2a2 2 0 0 0-1.7 0L2.6 9.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  "award": '<path d="m15.5 12.9 1.5 8.5a.5.5 0 0 1-.8.5l-3.6-2.7a1 1 0 0 0-1.2 0l-3.6 2.7a.5.5 0 0 1-.8-.5l1.5-8.5"/><circle cx="12" cy="8" r="6"/>',
  "compass": '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
  "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  "check": '<path d="M20 6 9 17l-5-5"/>',
  "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  "git-compare": '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>',
  "list-checks": '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  "trophy": '<path d="M6 4h12v8a6 6 0 0 1-6 6 6 6 0 0 1-6-6Z"/><path d="M12 18v2"/><path d="M8 22h8"/><path d="M6 4H4v2a4 4 0 0 0 4 4"/><path d="M18 4h2v2a4 4 0 0 1-4 4"/>',
  "file-stack": '<path d="M21 8H13a2 2 0 0 1-2-2V2"/><path d="M21 8v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7z"/><path d="M8 12h6"/><path d="M8 16h6"/>',
  "chart-bar": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-7"/>',
  "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 7.9l-6.9 7a2.1 2.1 0 0 1-3-3l7-6.9a6 6 0 0 1 7.9-8z"/>',
  "route": '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  "sigma": '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
  "history": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  "video": '<path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.17 1.17 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  "brain-circuit": '<path d="M12 5a3 3 0 1 0-6 .1A4 4 0 0 0 3.5 11a4 4 0 0 0 .5 6.5A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 6 .1A4 4 0 0 1 20.5 11a4 4 0 0 1-.5 6.5A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/>',
  "landmark": '<line x1="2" x2="22" y1="9" y2="9"/><line x1="2" x2="22" y1="20" y2="20"/><path d="M4 9v11"/><path d="M20 9v11"/><path d="M8 9v11"/><path d="M12 9v11"/><path d="M16 9v11"/><path d="m3 5 9-3 9 3v4H3z"/>',
  "school": '<path d="m2 9 10-5 10 5"/><path d="M4 9v10"/><path d="M20 9v10"/><path d="M2 9v2h20V9"/><rect width="6" height="7" x="9" y="10" rx="1"/>',
  "boxes": '<path d="M2.9 12.9a2 2 0 0 0 0 3.4l3 1.8a2 2 0 0 0 2 0L12 16v-6l-4-2.3a2 2 0 0 0-2 0z"/><path d="m7 16-4 2.3"/><path d="m7 16 4 2.3"/><path d="M11 13.8 7 16"/><path d="M21.1 12.9a2 2 0 0 1 0 3.4l-3 1.8a2 2 0 0 1-2 0L12 16v-6l4-2.3a2 2 0 0 1 2 0z"/><path d="m17 16 4 2.3"/><path d="m17 16-4 2.3"/><path d="M13 13.8 17 16"/><path d="M12 13V7.9l4.5-2.6a2 2 0 0 1 2 0l3 1.8a2 2 0 0 1 1 1.7v3.2"/>',
  "globe": '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  "bot": '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "quote": '<path d="M3 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6c0 1.3.7 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1v3Z"/><path d="M15 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6c0 1.3.7 2 2 2h1c0 2.3.2 4-3 4v3Z"/>',
  "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7"/>',
  "phone": '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  "instagram": '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  "copy": '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  "heart": '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  "badge-check": '<path d="M3.9 8.6a4 4 0 0 1 4.8-4.8 4 4 0 0 1 6.7 0 4 4 0 0 1 4.8 4.8 4 4 0 0 1 0 6.7 4 4 0 0 1-4.8 4.8 4 4 0 0 1-6.7 0 4 4 0 0 1-4.8-4.8 4 4 0 0 1 0-6.7Z"/><path d="m9 12 2 2 4-4"/>',
  "flame": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  "timer": '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  "printer": '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" x2="15.4" y1="13.5" y2="17.5"/><line x1="15.4" x2="8.6" y1="6.5" y2="10.5"/>',
  "building-2": '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  "monitor-smartphone": '<path d="M18 21V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13"/><path d="M2 17h18"/><path d="M14 21v-4"/><rect width="8" height="7" x="14" y="14" rx="2"/>',
  "refresh-cw": '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
  "circle-help": '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  "milestone": '<path d="M18 6v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6"/><path d="M6 6h12"/><path d="m9 6 1-4h4l1 4"/><path d="M10 12h4"/><path d="M12 14v4"/>',
  "workflow": '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  "keyboard": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/>',
  "hand-coins": '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.9-1.9c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.6a2 2 0 1 0-2.8-2.9l-3.5 3.6"/><path d="M2 16h6"/><path d="M18 3h4v6"/>',
  "network": '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
  "mouse-pointer-click": '<path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>'
};
var FILLED_ICONS = { "heart": 1, "quote": 1 };

function ic(name, size) {
  var body = ICONS[name] || ICONS["circle-help"];
  var fill = FILLED_ICONS[name] ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var style = size ? ' style="width:' + size + 'px;height:' + size + 'px"' : "";
  return '<svg class="ic"' + style + ' viewBox="0 0 24 24" ' + fill + ' aria-hidden="true">' + body + "</svg>";
}
function hydrateIcons(root) {
  (root || document).querySelectorAll("[data-ic]").forEach(function (el) {
    var size = el.getAttribute("data-ics") || undefined;
    el.innerHTML = ic(el.getAttribute("data-ic"), size);
    el.removeAttribute("data-ic");
    el.removeAttribute("data-ics");
    el.removeAttribute("data-icfill");
    el.style.display = el.classList.contains("heart-beat") ? "inline-block" : "flex";
  });
}
function $(id) { return document.getElementById(id); }
function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* ---------------- DATA: agents ---------------- */
var AGENTS = [
  { id: "mock-exam-builder", icon: "layers", name: "Mock Exam Builder", role: "Generate",
    short: "Generates full mock papers that follow each exam's real pattern.",
    long: "The Mock Exam Builder assembles complete papers calibrated to the official blueprint of your exam — sections, question counts, time limits and negative marking included. It draws from a 10-year PYQ bank with frequency counts, so the papers you practise mirror what the exam actually asks, not a generic question pool.",
    capabilities: ["Official pattern fidelity — sections, timing, marking", "10-year PYQ bank with shift tags", "Frequency-weighted question selection", "Full-length and topic-level papers"],
    feeds: ["Gap Analyser", "Progress Tracker", "Study Planner"], metric: { label: "Pattern fidelity", value: "17+ exams" } },
  { id: "syllabus-weightage", icon: "chart-pie", name: "Syllabus Weightage", role: "Plan",
    short: "Shows which chapters carry the most marks so you plan smarter.",
    long: "Not every chapter is worth the same marks. Syllabus Weightage maps your syllabus against historical paper data to show exactly where the marks concentrate — so you spend time where the return is, and consciously spend less where it isn't.",
    capabilities: ["Chapter-level mark mapping", "Trend shifts across recent years", "High-yield vs low-yield tagging", "Exam-day time allocation guidance"],
    feeds: ["Mock Exam Builder", "Study Planner", "Career Coach"], metric: { label: "Chapter coverage", value: "100% mapped" } },
  { id: "gap-analyser", icon: "target", name: "Gap Analyser", role: "Diagnose",
    short: "Finds the exact topics where your score is leaking.",
    long: "A single percentage hides the story. The Gap Analyser breaks every mock down to topic level, identifies exactly which topics are leaking marks, ranks them by score-gain potential, and hands the queue to the YouTube Fixer — so every result ends in a next action, not a shrug.",
    capabilities: ["Topic-level score decomposition", "Weak-topic ranking by gain potential", "Slippage detection across tests", "3PL IRT latent-ability (θ) tracking"],
    feeds: ["YouTube Fixer", "Study Planner", "Progress Tracker"], metric: { label: "Diagnostic depth", value: "Topic level" } },
  { id: "youtube-fixer", icon: "play-circle", name: "YouTube Fixer", role: "Fix",
    short: "Surfaces a targeted video for every weak topic.",
    long: "Every weak topic the Gap Analyser finds gets matched to a targeted, time-efficient video resource — chosen for concept clarity on that exact topic, not a generic playlist. The fix cycle ends only when the topic climbs on your next mock.",
    capabilities: ["Exact-topic video matching", "Zero-fluff, time-boxed recommendations", "Fix queue that clears as topics climb", "Retake verification loop"],
    feeds: ["Progress Tracker", "Doubt Solver"], metric: { label: "Fix turnaround", value: "Same day" } },
  { id: "study-planner", icon: "calendar-days", name: "Study Planner", role: "Schedule",
    short: "Builds a day-by-day plan around your exam date.",
    long: "The Study Planner turns your exam date, syllabus weightage and live gap queue into a realistic day-by-day plan. It rebalances automatically as your mocks change the picture — because a plan that doesn't adapt to your actual progress is just a calendar.",
    capabilities: ["Exam-date countdown planning", "Weightage-aware topic sequencing", "Auto-rebalance after every mock", "Daily targets with rest days"],
    feeds: ["Mock Exam Builder", "Progress Tracker"], metric: { label: "Plan horizon", value: "Day-by-day" } },
  { id: "progress-tracker", icon: "trending-up", name: "Progress Tracker", role: "Measure",
    short: "Tracks topic strength across every test you take.",
    long: "The Progress Tracker keeps a running history of every topic across every test — strong, slipping, or climbing. It surfaces the trend lines so you can see weak topics becoming strong ones, and catch a strong topic before it quietly slips.",
    capabilities: ["Cross-test topic trend lines", "Slippage early-warning", "Milestone streaks and badges", "Score projection to exam day"],
    feeds: ["Study Planner", "Gap Analyser"], metric: { label: "Trend history", value: "Every test" } },
  { id: "doubt-solver", icon: "message-circle-question", name: "Doubt Solver", role: "Explain",
    short: "Explains answers step by step, any time of day.",
    long: "Every question comes with a syllabus-grounded, step-by-step explanation — not just the right answer but the reasoning that gets you there. Ask follow-ups any time of day; the Doubt Solver is grounded by EduScope guardrails so answers map to the syllabus, with zero generic hallucination.",
    capabilities: ["Step-by-step solution walkthroughs", "Socratic follow-up questioning", "Syllabus-grounded (EduScope) answers", "Multi-tier AI fallback — always on"],
    feeds: ["Gap Analyser", "Exam Pattern Guide"], metric: { label: "Availability", value: "24 × 7" } },
  { id: "exam-pattern-guide", icon: "book-open-check", name: "Exam Pattern Guide", role: "Orient",
    short: "Explains format, marking and sections for each exam.",
    long: "Before you prepare, orient. The Exam Pattern Guide lays out each exam's structure — sections, marking scheme, negative marking, cut-off trends and timing strategy — so you walk into the paper knowing exactly how it is set.",
    capabilities: ["Section and marking breakdowns", "Negative-marking strategy", "Cut-off trend context", "Timing plans per section"],
    feeds: ["Mock Exam Builder", "Admissions Advisor"], metric: { label: "Exams documented", value: "17+" } },
  { id: "admissions-advisor", icon: "graduation-cap", name: "Admissions Advisor", role: "Advise",
    short: "Guides university choices and application steps.",
    long: "Your prep connects to where you are heading. The Admissions Advisor maps your score trajectory to realistic university and programme options, and lays out the application steps, deadlines and documents — so the exam is a means, not an end.",
    capabilities: ["Score-to-college mapping", "Application timeline guidance", "Programme-fit recommendations", "India & abroad pathways"],
    feeds: ["Scholarship Finder", "Career Coach"], metric: { label: "Pathways mapped", value: "India + abroad" } },
  { id: "scholarship-finder", icon: "award", name: "Scholarship Finder", role: "Reward",
    short: "Matches your profile with scholarships worth applying for.",
    long: "Merit often goes unclaimed simply because nobody looks. The Scholarship Finder matches your profile, score band and target programmes with scholarships genuinely worth your application effort — with eligibility notes and deadlines in one place.",
    capabilities: ["Profile-matched scholarship list", "Eligibility and deadline tracking", "Merit and need-based coverage", "Application-effort ranking"],
    feeds: ["Admissions Advisor", "Career Coach"], metric: { label: "Match basis", value: "Your profile" } },
  { id: "career-coach", icon: "compass", name: "Career Coach", role: "Direct",
    short: "Connects your strengths to career paths you can act on.",
    long: "The Career Coach reads your topic-strength signature — not just a score — and connects it to career paths where those strengths compound. You get direction you can act on: fields, roles, and the next step to take this month.",
    capabilities: ["Strength-signature career mapping", "Field and role exploration", "Actionable next-step guidance", "Long-horizon direction beyond the exam"],
    feeds: ["Admissions Advisor", "Scholarship Finder"], metric: { label: "Direction basis", value: "Strengths" } }
];
var AGENT_BY_ID = {}; AGENTS.forEach(function (a) { AGENT_BY_ID[a.id] = a; });
var AGENT_BY_NAME = {}; AGENTS.forEach(function (a) { AGENT_BY_NAME[a.name] = a; });
function incomingOf(id) {
  return AGENTS.filter(function (a) {
    return a.feeds.some(function (f) { return AGENT_BY_NAME[f] && AGENT_BY_NAME[f].id === id; });
  });
}

/* ---------------- DATA: exams ---------------- */
var EXAMS = [
  { id: "upsc-cse", name: "UPSC CSE", full: "Civil Services Examination (Prelims)", cat: "graduate", q: "100", mins: "120", marks: "200", mark: "+2.0 · −0.66",
    body: "Union Public Service Commission", mode: "Offline · OMR", attempts: "1 attempt / year",
    sections: ["Paper I — General Studies", "Paper II — CSAT (qualifying 33%)"],
    crew: ["exam-pattern-guide", "mock-exam-builder", "gap-analyser", "study-planner"],
    note: "SI maps the 10-year PYQ frequency of every GS topic, so your mocks weight current affairs and static portions exactly like the paper does — and the planner rebuilds your revision around what your gap report says, not what a timetable says." },
  { id: "upsc-csat", name: "UPSC CSAT", full: "Civil Services Aptitude Test", cat: "graduate", q: "80", mins: "120", marks: "200", mark: "+2.5 · −0.83",
    body: "Union Public Service Commission", mode: "Offline · OMR", attempts: "with CSE Prelims",
    sections: ["Comprehension", "Logical reasoning & analytics", "Basic numeracy", "Decision making"],
    crew: ["mock-exam-builder", "gap-analyser", "doubt-solver", "exam-pattern-guide"],
    note: "The qualifying-only trap is under-preparing Paper II. SI tracks your CSAT sectional accuracy across mocks and flags the exact reasoning patterns — seating arrangements, syllogisms, data interpretation — that put the 33% at risk." },
  { id: "upsc-cds", name: "UPSC CDS", full: "Combined Defence Services", cat: "graduate", q: "120", mins: "120", marks: "100", mark: "+0.83 · −0.27",
    body: "Union Public Service Commission", mode: "Offline · OMR", attempts: "2 attempts / year",
    sections: ["English", "General Knowledge", "Elementary Mathematics"],
    crew: ["mock-exam-builder", "syllabus-weightage", "gap-analyser", "exam-pattern-guide"],
    note: "Three different syllabuses, one badge. SI runs your English, GK and maths prep as separate strength curves, then blends them into a single SSB-ready mock series — so a 90-in-English profile doesn't hide a failing maths curve." },
  { id: "upsc-capf", name: "UPSC CAPF", full: "Central Armed Police Forces (AC)", cat: "graduate", q: "125", mins: "120", marks: "250", mark: "+2.0 · −0.66",
    body: "Union Public Service Commission", mode: "Offline · OMR", attempts: "1 attempt / year",
    sections: ["Paper I — General Ability & Intelligence", "Paper II — Descriptive (qualifying)"],
    crew: ["mock-exam-builder", "gap-analyser", "progress-tracker", "exam-pattern-guide"],
    note: "Objective Paper I decides the cut-off; the descriptive Paper II decides the interview. SI drills Paper I with frequency-weighted mocks and pairs every result with essay and comprehension practice for Paper II." },
  { id: "upsc-epfo", name: "UPSC EPFO", full: "Enforcement Officer / APFC", cat: "graduate", q: "120", mins: "120", marks: "100", mark: "+0.83 · −0.27",
    body: "Union Public Service Commission", mode: "Offline · OMR", attempts: "as notified",
    sections: ["General English (30% weight)", "General Studies — polity, economy, labour laws", "Accountancy & audit basics"],
    crew: ["mock-exam-builder", "syllabus-weightage", "gap-analyser", "study-planner"],
    note: "EPFO rewards precision on a narrow, odd syllabus — labour laws, industrial relations, accounting. SI's weightage engine shows exactly which pockets of the syllabus have historically decided the merit list." },
  { id: "ssc-cgl", name: "SSC CGL", full: "Combined Graduate Level (Tier 1)", cat: "graduate", q: "100", mins: "60", marks: "200", mark: "+2.0 · −0.50",
    body: "Staff Selection Commission", mode: "Computer-based test", attempts: "1 attempt / year",
    sections: ["General Intelligence & Reasoning", "General Awareness", "Quantitative Aptitude", "English Comprehension"],
    crew: ["mock-exam-builder", "gap-analyser", "youtube-fixer", "syllabus-weightage"],
    note: "100 questions in 60 minutes is a speed exam. SI times every section of your mock separately, finds where the seconds leak — a percentage problem, a vocab set — and drills only that until your per-question clock is under target." },
  { id: "ssc-cpo", name: "SSC CPO", full: "Central Police Organisation (SI)", cat: "graduate", q: "200", mins: "120", marks: "200", mark: "+1.0 · −0.25",
    body: "Staff Selection Commission", mode: "Computer-based test", attempts: "1 attempt / year",
    sections: ["Part A — Reasoning", "Part B — GK & Current Affairs", "Part C — Quantitative Aptitude", "Part D — English"],
    crew: ["mock-exam-builder", "gap-analyser", "progress-tracker", "youtube-fixer"],
    note: "200 questions with a light penalty rewards aggressive attempt strategy. SI simulates attempt-rate decisions — skip, guess, return — and scores your strategy itself, not just your answers." },
  { id: "jee-main", name: "JEE Main", full: "Joint Entrance Examination — Main", cat: "school", q: "90", mins: "180", marks: "300", mark: "+4.0 · −1.0",
    body: "National Testing Agency", mode: "Computer-based test", attempts: "2 sessions / year",
    sections: ["Physics", "Chemistry", "Mathematics", "MCQ + numerical (section B)"],
    crew: ["mock-exam-builder", "gap-analyser", "youtube-fixer", "progress-tracker"],
    note: "The mock engine mirrors NTA's interface — palette, mark-for-review, numerical keypad — and builds papers from the 10-year PYQ bank with frequency counts, so a Physics chapter that dominated recent shifts dominates your mock too." },
  { id: "jee-advanced", name: "JEE Advanced", full: "Joint Entrance Examination — Advanced", cat: "school", q: "54", mins: "180", marks: "360", mark: "partial marking",
    body: "IIT (rotating zonal)", mode: "Computer-based test", attempts: "1 attempt / year · 2 years max",
    sections: ["Paper 1 & Paper 2 — both mandatory", "Single + multiple correct", "Matrix match & numerical"],
    crew: ["mock-exam-builder", "syllabus-weightage", "gap-analyser", "doubt-solver"],
    note: "Partial marking punishes half-knowledge. SI trains your multi-select discipline question by question, and the Doubt Solver walks every wrong option — why each distractor was written, and what concept it tests." },
  { id: "neet-ug", name: "NEET UG", full: "National Eligibility cum Entrance Test", cat: "school", q: "180", mins: "200", marks: "720", mark: "+4.0 · −1.0",
    body: "National Testing Agency", mode: "Offline · OMR", attempts: "1 attempt / year",
    sections: ["Physics (45)", "Chemistry (45)", "Biology (90)"],
    crew: ["mock-exam-builder", "gap-analyser", "youtube-fixer", "doubt-solver"],
    note: "180 questions, zero shortcuts. SI's Gap Analyser breaks your Biology score into chapter-level leaks — Biomolecules over Genetics, say — ranks them by marks recoverable, and the YouTube Fixer clears the queue before your next mock." },
  { id: "gate", name: "GATE", full: "Graduate Aptitude Test in Engineering", cat: "graduate", q: "65", mins: "180", marks: "100", mark: "+1 / +2 · MCQ negative",
    body: "IISc & 7 IITs", mode: "Computer-based test", attempts: "1 attempt / year",
    sections: ["General Aptitude (10Q)", "Engineering Mathematics", "Core subject (55Q)"],
    crew: ["syllabus-weightage", "mock-exam-builder", "doubt-solver", "study-planner"],
    note: "Your branch's PYQ map decides your fate more than any guidebook. SI weightages every core-subject topic across 10 years of papers, so the 3-mark numericals that repeat actually show up in your mocks." },
  { id: "cat", name: "CAT", full: "Common Admission Test", cat: "graduate", q: "66", mins: "120", marks: "198", mark: "+3 · −1.0",
    body: "IIMs (rotating)", mode: "Computer-based test", attempts: "1 attempt / year",
    sections: ["VARC — Verbal & Reading Comprehension", "DILR — Data Interpretation & Logical Reasoning", "QA — Quantitative Ability"],
    crew: ["mock-exam-builder", "syllabus-weightage", "gap-analyser", "exam-pattern-guide"],
    note: "CAT is a sectional-time game — 40 minutes per section, no going back. SI simulates the exact sectional lock, then shows your accuracy-versus-attempt curve per section so you find your optimal strategy, not just your score." },
  { id: "gre", name: "GRE", full: "Graduate Record Examinations", cat: "undergrad", q: "54", mins: "105", marks: "340", mark: "section-adaptive",
    body: "ETS", mode: "Computer / at home", attempts: "every 21 days · 5 / year",
    sections: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing (1 essay)"],
    crew: ["mock-exam-builder", "doubt-solver", "admissions-advisor", "exam-pattern-guide"],
    note: "Section-adaptive means question 20 depends on question 1–19. SI's mocks adapt the same way, so your difficulty exposure trains the real branching, and the Admissions Advisor maps your 335-band trajectory to realistic programmes." },
  { id: "gmat", name: "GMAT", full: "Graduate Management Admission Test (Focus)", cat: "undergrad", q: "64", mins: "145", marks: "805", mark: "adaptive",
    body: "GMAC", mode: "Computer / at test centre", attempts: "every 16 days · 5 / year",
    sections: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
    crew: ["mock-exam-builder", "exam-pattern-guide", "gap-analyser", "admissions-advisor"],
    note: "The Data Insights section rewards chart-and-logic fluency most candidates skip. SI drills DI sets separately and pairs your score band with the Admissions Advisor's programme mapping — exam to application in one thread." },
  { id: "sat", name: "SAT", full: "Scholastic Assessment Test", cat: "undergrad", q: "154", mins: "180", marks: "1600", mark: "no negative",
    body: "College Board", mode: "Digital · adaptive modules", attempts: "7 sittings / year",
    sections: ["Reading & Writing", "Math (calculator allowed)"],
    crew: ["mock-exam-builder", "gap-analyser", "admissions-advisor", "scholarship-finder"],
    note: "No negative marking changes the strategy completely — every blank is a loss. SI trains full-attempt discipline, and the Scholarship Finder pairs your 1500-band trajectory with merit aid genuinely worth applying for." },
  { id: "ielts", name: "IELTS", full: "International English Language Testing System", cat: "undergrad", q: "4 modules", mins: "165", marks: "Band 9", mark: "band scoring",
    body: "British Council · IDP", mode: "Paper / computer + speaking", attempts: "multiple / month",
    sections: ["Listening", "Reading (Academic)", "Writing Task 1 & 2", "Speaking (3 parts)"],
    crew: ["doubt-solver", "mock-exam-builder", "progress-tracker", "admissions-advisor"],
    note: "Bands reward structure, not vocabulary flex. SI scores your Writing and Speaking against the four band descriptors — task response, coherence, lexical range, accuracy — and drills the weakest descriptor, not the whole module." },
  { id: "class-11-12", name: "Class 11 & 12", full: "Board foundations for JEE · NEET", cat: "school", q: "Chapter-wise", mins: "Adaptive", marks: "Weighted", mark: "syllabus-weighted",
    body: "School boards (CBSE · State · IB)", mode: "School + SI app", attempts: "continuous",
    sections: ["Chapter-wise tests", "Part tests (unit clusters)", "Full-syllabus boards"],
    crew: ["mock-exam-builder", "gap-analyser", "youtube-fixer", "syllabus-weightage"],
    note: "Boards and entrances pull the same chapters in different directions. SI runs one strength map per chapter and feeds both games — board-weighted revision for school marks, PYQ-weighted mocks for JEE/NEET." }
];
var EXAM_BY_ID = {}; EXAMS.forEach(function (e) { EXAM_BY_ID[e.id] = e; });
var CAT_DOT = { school: "#0ea5e9", undergrad: "#d4af37", graduate: "#0f766e" };
var CAT_LABEL = { school: "Class 11–12", undergrad: "Undergrad", graduate: "Graduate" };

/* ---------------- DATA: calibration questions ---------------- */
var SAMPLES = {
  "jee-main": { tag: "Physics · Units & Dimensions", question: "The dimensional formula of pressure is:",
    options: ["[M L⁻¹ T⁻²]", "[M L T⁻²]", "[M L⁻² T⁻¹]", "[M L² T⁻²]"], answer: 0,
    why: "Pressure = force ÷ area. Force carries [M L T⁻²] and area carries [L²], so pressure is [M L⁻¹ T⁻²]. Option B is force itself, option D is energy, and option C does not correspond to any standard derived quantity." },
  "neet-ug": { tag: "Biology · Cell Division", question: "Crossing over between homologous chromosomes occurs during which sub-stage of prophase I?",
    options: ["Leptotene", "Zygotene", "Pachytene", "Diplotene"], answer: 2,
    why: "Recombination nodules appear in pachytene — the longest sub-stage of prophase I — where the synapsed homologues (bivalents) physically exchange segments. Zygotene is where synapsis happens; in diplotene the chiasmata become visible, marking where crossing over already occurred." },
  "upsc-cse": { tag: "Polity · Constitutional Amendments", question: "Fundamental Duties were added to the Constitution of India by which amendment?",
    options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "73rd Amendment"], answer: 0,
    why: "The 42nd Amendment Act, 1976 inserted Part IVA (Article 51A) with ten Fundamental Duties on the recommendation of the Swaran Singh Committee. An eleventh duty — education of children — was added by the 86th Amendment in 2002. The 44th, 52nd and 73rd Amendments deal with other matters entirely." },
  "cat": { tag: "Quant · Profit & Loss", question: "A shopkeeper marks an item up by 25% and then offers a 20% discount. The net profit on the item is:",
    options: ["0%", "5% profit", "5% loss", "2.5% profit"], answer: 0,
    why: "Take cost = 100. The marked price becomes 125, and a 20% discount brings it to 125 × 0.8 = 100 — exactly back to cost. Successive +25% and −20% multiply to 1.25 × 0.8 = 1.00, so the net profit is precisely 0%." }
};
var DEFAULT_Q = { tag: "Reasoning · Clocks & Calendars", question: "Today is Wednesday. What day of the week will it be 61 days from today?",
  options: ["Monday", "Tuesday", "Saturday", "Sunday"], answer: 0,
  why: "61 ÷ 7 leaves a remainder of 5, so the weekday shifts five steps forward from Wednesday — Thu (1), Fri (2), Sat (3), Sun (4), Mon (5). It lands on a Monday." };

/* ---------------- DATA: how steps ---------------- */
var STEPS = [
  { id: "mock", n: "01", icon: "clipboard-list", title: "Take a mock test", desc: "An AI-built paper that mirrors the real exam — pattern, sections, marking and timing.", visual: "paper" },
  { id: "gaps", n: "02", icon: "target", title: "See your gaps", desc: "Topic-level analytics, not just one score. Know exactly where marks are leaking.", visual: "bars" },
  { id: "fix", n: "03", icon: "play-circle", title: "Watch the fix", desc: "A targeted video for the exact weak topic — a result always ends in a next action.", visual: "video" },
  { id: "improve", n: "04", icon: "trending-up", title: "Retake and improve", desc: "Track the same topics as they climb. Watch your weak areas become your strong ones.", visual: "chart" }
];

/* ---------------- DATA: pillars / engine / journey / voices / faq / audience / contact ---------------- */
var PILLARS = [
  { icon: "file-stack", title: "Real exam patterns", desc: "Mock papers follow how each exam is actually set, with syllabus weightage so you spend time where the marks are." },
  { icon: "chart-bar", title: "Topic-level analytics", desc: "Not just a percentage. You see which topics are strong, which are slipping, and what changed since your last test." },
  { icon: "wrench", title: "A fix for every gap", desc: "Each weak topic is paired with a targeted resource, so a result always ends in a next action." },
  { icon: "route", title: "Beyond the exam", desc: "Admissions, scholarships and career coaching live in the same place, so your prep connects to where you are heading." }
];
var ENGINE = [
  { icon: "sigma", title: "3PL IRT Psychometric Engine", desc: "Latent ability (θ) estimation adjusts question difficulty dynamically — item-response theory, not guesswork.", accent: "brand" },
  { icon: "history", title: "10-Year PYQ Bank", desc: "Past papers with shift tags and frequency counts. Practise what actually repeats.", accent: "gold" },
  { icon: "shield-check", title: "NTA UFM Proctoring", desc: "Anti-cheat browser lock, gaze drift detection and webcam telemetry for exam-honest practice.", accent: "brand" },
  { icon: "brain-circuit", title: "EduScope Guardrails", desc: "Syllabus-grounded answers with zero generic hallucinations — every solution maps to the syllabus.", accent: "gold" },
  { icon: "sparkles", title: "Multi-Tier AI Fallback", desc: "A resilience cascade across Z-AI, Groq Llama 3.3 and Google Gemini — if one tier slows, the next answers.", accent: "brand" },
  { icon: "lock", title: "Privacy & Security", desc: "Full privacy built in. Your data belongs to you — not to a training corpus.", accent: "gold" }
];
var MILESTONES = [
  { phase: "Chapter one", title: "The school corridors", accent: "corridors",
    copy: "Before the intelligence, there were schools — two hundred of them across India and the Gulf, running attendance, fees, exams and parent talk on a 25-module suite built from the inside out.",
    icon: "school", metric: { to: 200, suffix: "+", label: "global schools engaged" } },
  { phase: "Chapter two", title: "AI, shipped early", accent: "shipped early",
    copy: "Five AI school products followed — attendance intelligence, report narratives, communication that writes itself — each one learning inside real classrooms before “AI in education” was a headline.",
    icon: "boxes", metric: { to: 5, suffix: "", label: "AI school products built" } },
  { phase: "Chapter three", title: "The pattern engine", accent: "pattern engine",
    copy: "A decade of previous-year questions, distilled through a 3PL IRT psychometric engine — so a mock doesn’t just look like the exam, it measures ability the way the exam actually does.",
    icon: "sigma", metric: { to: 10, suffix: "-yr", label: "PYQ bank, calibrated" } },
  { phase: "Chapter four", title: "Eleven agents, one crew", accent: "one crew",
    copy: "Builder, diagnoser, planner, tracker — eleven specialised agents wired into a single Super Intelligence that never sleeps between a finished mock and the next step it demands.",
    icon: "bot", metric: { to: 11, suffix: "", label: "agents on the crew" } },
  { phase: "Chapter five", title: "Every exam on the table", accent: "Every exam",
    copy: "From JEE and NEET to UPSC, GATE, CAT and IELTS — seventeen patterns calibrated to their official blueprints, live today for India, Kuwait and the wider GCC.",
    icon: "globe", metric: { to: 17, suffix: "+", label: "exams calibrated live" } }
];
var VOICES = [
  { initials: "AN", name: "Ananya R.", role: "NEET dropper", place: "Hyderabad", tint: "linear-gradient(135deg,#0369a1,#0ea5e9)",
    quote: "The gap report told me Biomolecules was quietly costing me 24 marks a paper. Three weeks of targeted fixes later, my mock crossed 640 for the first time." },
  { initials: "RM", name: "Rohan M.", role: "JEE Main aspirant", place: "Delhi", tint: "linear-gradient(135deg,#0f766e,#14b8a6)",
    quote: "Every mock ends with an exact next step. I stopped guessing what to study — the fix queue is just there when I sit down every evening." },
  { initials: "KR", name: "Kavitha R.", role: "Principal, partner school", place: "Vijayawada", tint: "linear-gradient(135deg,#b8860b,#d4af37)",
    quote: "One system replaced three tools we were paying for. My teachers finally see topic-level truth, and parents get the report before I do." },
  { initials: "AS", name: "Aditya S.", role: "UPSC CSE aspirant", place: "Lucknow", tint: "linear-gradient(135deg,#7c2d12,#ea580c)",
    quote: "The PYQ frequency map changed how I revise. And the negative-marking strategy notes alone were worth the subscription." },
  { initials: "SN", name: "Suresh N.", role: "Parent", place: "Kuwait", tint: "linear-gradient(135deg,#4c1d95,#7c3aed)",
    quote: "From Kuwait we track everything — the Saturday report has become a family ritual. The plan adapts to her, not the other way around." }
];
var FAQS = [
  { q: "What exactly is “SI”?",
    a: "SI — Super Intelligence — is the engine Preparation AI runs on. It is not one chatbot but a crew of eleven specialised agents (mock builder, gap analyser, study planner, doubt solver and more) that share one brain. Every agent feeds what it learns into the others, so your mock result, your revision plan and your doubt queue are always working from the same picture of you." },
  { q: "Which exams are covered?",
    a: "Seventeen and counting — from Class 11 & 12 boards and JEE / NEET, through GATE, CAT, GMAT, GRE, SAT and IELTS, to the UPSC family (CSE, CSAT, CDS, CAPF, EPFO) and SSC CGL / CPO. Every exam follows its official pattern — sections, time limits, mark weights and negative marking — and you can compare any three side by side from the exam grid." },
  { q: "How are the mock papers built?",
    a: "The Mock Exam Builder assembles each paper from the official blueprint of your exam, drawing on a ten-year previous-year-question bank with frequency counts. A Physics chapter that dominated recent NEET shifts dominates your mock; a labour-law topic that historically decides the UPSC EPFO merit list shows up at the right weight. Full-length and topic-level papers both follow the same rule." },
  { q: "What happens after I submit a mock?",
    a: "The Gap Analyser breaks your score into chapter-level leaks and ranks them by marks recoverable, the 3PL IRT psychometric engine calibrates difficulty to your ability curve, and the YouTube Fixer queues targeted resources for exactly the weak topics. The Study Planner then rebuilds your week around the gap report — from a test result to a clear next step, every single time." },
  { q: "Is it safe for schools and younger students?",
    a: "Yes — that is the environment it was built for. NTA-style UFM proctoring watches for unfair means during mocks, and EduScope guardrails keep every AI response inside educational bounds. Over 200 schools are engaged across the deployment footprint, with the suite already running in classrooms in India, Kuwait and the wider GCC." },
  { q: "What happens if an AI response fails?",
    a: "Nothing visible to you — the request quietly falls through a multi-tier fallback stack: the primary Z-AI engine, then Groq running Llama 3.3, then Google Gemini. The answer you see is the best one that came back, and the handover between tiers is seamless." },
  { q: "Can my school or coaching centre deploy this?",
    a: "Absolutely — Preparation AI ships as a full AI Educational Operating System, not a consumer app alone. Schools get the agent suite with their own branding, pattern-true mocks for every board and entrance their students sit, and teacher-side analytics. Reach out via the contact section and the founder will walk you through a deployment." }
];
var AUDIENCES = [
  { icon: "graduation-cap", title: "Students", desc: "Practise on realistic papers, see exactly which topics to fix, and plan the next step after the exam.",
    points: ["Pattern-true mocks", "Topic-level gap maps", "Targeted video fixes", "Progress you can see"], cta: "Start preparing", app: true },
  { icon: "school", title: "Schools & coaching centres", desc: "Give every student topic-level insight and targeted resources without adding to teachers' workload.",
    points: ["Batch analytics", "Zero teacher overhead", "Institutional access", "India · Kuwait · GCC"], cta: "Institutional access", href: "#contact" },
  { icon: "hand-coins", title: "Partners & investors", desc: "A modular foundation built to scale across exams, institutions and markets in India and the Gulf.",
    points: ["Modular architecture", "Multi-exam engine", "Proven field adoption", "Founder-led"], cta: "Talk to the founder", href: "#contact" }
];
var CONTACTS = [
  { icon: "mail", label: "Email", note: "Replies personally", kind: "email" },
  { icon: "phone", label: "Phone", note: "IST (UTC+5:30)", kind: "phone" },
  { icon: "linkedin", label: "LinkedIn", note: "Founder of Preparation AI", kind: "linkedin" },
  { icon: "instagram", label: "Instagram", note: "Follow the journey", kind: "instagram" },
  { icon: "globe", label: "Preparation AI", note: "SI for every exam", kind: "site" },
  { icon: "map-pin", label: "Based in", note: "Field-tested in 200+ schools", kind: "place" }
];
var MARQUEE_EXAMS = ["JEE Main", "JEE Advanced", "NEET", "UPSC CSE", "UPSC CSAT", "UPSC CDS", "UPSC CAPF", "UPSC EPFO", "SSC CGL", "SSC CPO", "GATE", "CAT", "GRE", "GMAT", "SAT", "IELTS", "Class 11 & 12"];
var SHORTCUTS = [
  { group: "Search & compare", rows: [
    [["⌘", "K"], "Summon the command palette — exams, sections, actions"],
    [["/"], "Jump into exam search"],
    [["c"], "Compare the exams you’ve picked, side by side"],
    [["Esc"], "Close any overlay, clear any search"]] },
  { group: "This sheet", rows: [
    [["?"], "Open the shortcuts sheet"],
    [["↑", "↓"], "Move through lists inside the palette"],
    [["↵"], "Run the highlighted item"]] }
];
/* ============================================================
   RENDERERS
   ============================================================ */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

/* ---- hero stats (countup on reveal) ---- */
var HERO_STATS = [
  { value: 17, suffix: "+", label: "Exams supported" },
  { value: 11, suffix: "", label: "Specialised agents" },
  { value: 200, suffix: "+", label: "Schools engaged" },
  { value: 10, suffix: "-yr", label: "PYQ bank" }
];
function renderHeroStats() {
  var host = $("heroStats");
  HERO_STATS.forEach(function (s) {
    var d = el("div", "stat-card glass-soft pill-hover g-card");
    d.innerHTML = '<span class="g-card-ring" aria-hidden="true"></span>' +
      '<dt class="sr-only">' + s.label + '</dt>' +
      '<dd class="v" data-count="' + s.value + '" data-suffix="' + s.suffix + '">0</dd>' +
      '<dd class="l">' + s.label + '</dd>';
    host.appendChild(d);
  });
}

/* ---- orbit ---- */
var N = AGENTS.length, STEP = 360 / N;
var orbitActive = 0, orbitHovered = false, orbitTiles = [];
function setLabelSide(i) {
  var o = $("orbit").getBoundingClientRect();
  var t = orbitTiles[i];
  if (!o || !t) return;
  var r = t.getBoundingClientRect();
  var onRight = r.left + r.width / 2 > o.left + o.width / 2;
  var onBottom = r.top + r.height / 2 > o.top + o.height / 2;
  t.classList.toggle("lr", onRight);
  t.classList.toggle("tb", onBottom);
}
function renderOrbit() {
  var rot = $("orbitRot");
  AGENTS.forEach(function (a, i) {
    var angle = (STEP * i).toFixed(3);
    var node = el("div", "node");
    node.style.transform = "rotate(" + angle + "deg)";
    var cr = el("div", "cr");
    var up = el("div", "up");
    up.style.transform = "rotate(" + (-angle) + "deg)";
    var tile = el("div", "tile");
    tile.setAttribute("data-n", a.name);
    tile.setAttribute("role", "button");
    tile.setAttribute("tabindex", "0");
    tile.setAttribute("aria-label", "Inspect the " + a.name + " agent");
    tile.innerHTML = ic(a.icon, 22);
    tile.addEventListener("mouseenter", function () {
      orbitActive = i; orbitHovered = true; setLabelSide(i);
      refreshOrbitStates();
    });
    tile.addEventListener("mouseleave", function () { orbitHovered = false; });
    tile.addEventListener("click", function () { openAgent(a); });
    tile.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAgent(a); }
    });
    up.appendChild(tile);
    cr.appendChild(up);
    node.appendChild(cr);
    rot.appendChild(node);
    orbitTiles.push(tile);
  });
  $("orbit").addEventListener("mouseenter", function () { orbitHovered = true; });
  $("orbit").addEventListener("mouseleave", function () { orbitHovered = false; });
  setInterval(function () {
    if (orbitHovered) return;
    orbitActive = (orbitActive + 1) % N;
    refreshOrbitStates();
    setLabelSide(orbitActive);
  }, 2600);
}
function refreshOrbitStates() {
  orbitTiles.forEach(function (t, i) {
    t.classList.toggle("on", i === orbitActive);
    var node = t.parentElement.parentElement.parentElement;
    node.classList.toggle("on", i === orbitActive);
  });
}

/* ---- marquee ---- */
function renderMarquee() {
  var track = $("marqueeTrack");
  var doubled = MARQUEE_EXAMS.concat(MARQUEE_EXAMS);
  doubled.forEach(function (exam, i) {
    var dotColor = i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#d4af37" : "#0e7490";
    var s = el("span", "exam-chip glass-soft pill-hover",
      '<span class="dot" style="background:' + dotColor + '"></span>' + exam);
    track.appendChild(s);
  });
}

/* ---- how it works ---- */
var howActive = 0, howPaused = false, howTimer = null;
function renderHow() {
  var steps = $("howSteps");
  STEPS.forEach(function (s, i) {
    var b = el("button", "how-step focus-ring glass-soft" + (i === 0 ? " on" : ""));
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.innerHTML =
      '<span class="n">' + s.n + '</span>' +
      '<span class="ic-box">' + ic(s.icon, 20) + '</span>' +
      '<span style="flex:1"><span class="tt">' + s.title + '</span><span class="dd hide-lg">' + s.desc + '</span></span>' +
      (i === 0 ? '<span class="glow" aria-hidden="true"></span>' : "");
    b.addEventListener("click", function () { setHow(i, true); });
    steps.appendChild(b);
  });
  var prog = el("div", "how-progress glass-soft");
  prog.innerHTML = '<span class="lbl" id="howLbl">Auto-tour running</span><div class="bar"><div class="fill" id="howFill"></div></div><span class="count" id="howCount">1/' + STEPS.length + '</span>';
  steps.appendChild(prog);
  var grid = $("howGrid");
  grid.addEventListener("mouseenter", function () { howPaused = true; });
  grid.addEventListener("mouseleave", function () { howPaused = false; });
  renderHowPanel();
  startHowTour();
}
function startHowTour() {
  if (howTimer) clearInterval(howTimer);
  howTimer = setInterval(function () {
    if (howPaused) return;
    setHow((howActive + 1) % STEPS.length, false);
  }, 5000);
}
function setHow(i, manual) {
  howActive = i;
  var btns = $("howSteps").querySelectorAll(".how-step");
  btns.forEach(function (b, bi) {
    b.classList.toggle("on", bi === i);
    b.classList.toggle("glass", bi === i);
    b.setAttribute("aria-pressed", bi === i ? "true" : "false");
    var glow = b.querySelector(".glow");
    if (bi === i && !glow) b.insertAdjacentHTML("beforeend", '<span class="glow" aria-hidden="true"></span>');
    if (bi !== i && glow) glow.remove();
  });
  $("howCount").textContent = (i + 1) + "/" + STEPS.length;
  $("howLbl").textContent = howPaused ? "Paused — hover to pause" : "Auto-tour running";
  renderHowPanel();
  if (manual) startHowTour();
  var fill = $("howFill");
  fill.style.transition = "none"; fill.style.width = "0%";
  void fill.offsetWidth;
  if (!howPaused) { fill.style.transition = "width 5s linear"; fill.style.width = "100%"; }
}
function renderHowPanel() {
  var s = STEPS[howActive];
  var body = $("howPanelBody");
  var html = '<div class="viz-fade">' +
    '<div class="how-panel-head"><span class="ic-mini">' + ic(s.icon, 18) + '</span><p class="t">' + s.title + '</p></div>';
  if (s.visual === "paper") {
    html += '<div class="viz-stack">' +
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div><p class="viz-title">NEET · Mock #08</p><p class="viz-sub">200 questions · 200 mins · 720 marks</p></div>' +
        '<span class="pill pill-cyan">Pattern set</span></div>';
    [["Physics", 45], ["Chemistry", 45], ["Biology", 90], ["Botany + Zoology", 20]].forEach(function (r) {
      html += '<div class="viz-row g-rail"><span class="l">' + ic("check", 14) + r[0] + '</span><span class="r">' + r[1] + ' Q</span></div>';
    });
    html += '</div>';
  } else if (s.visual === "bars") {
    html += '<div class="viz-stack" style="padding-top:4px">';
    [["Thermodynamics", 42, true], ["Optics", 78, false], ["Genetics", 86, false], ["Physiology", 66, false]].forEach(function (t) {
      html += '<div class="viz-bar-row"><div class="top"><span class="nm' + (t[2] ? " weak" : "") + '">' + t[0] + '</span><span class="pc">' + t[1] + '%</span></div>' +
        '<div class="track"><div class="fill ' + (t[2] ? "fill-bad" : "fill-good") + '" style="width:' + t[1] + '%"></div></div></div>';
    });
    html += '<div class="viz-leak"><span class="l">Marks leaking here</span><span class="r">fix queued</span></div></div>';
  } else if (s.visual === "video") {
    html += '<div class="viz-stack">' +
      '<div class="viz-video"><div class="stage wash-mock"><span class="viz-play">' + ic("play-circle", 28) + '</span></div>' +
      '<div class="cap"><p class="t">Thermodynamics · 12-min targeted fix</p><p class="s">Matched to your exact weak topic</p></div></div>' +
      '<div class="viz-trio"><span class="g-rail pill-hover">Zero fluff</span><span class="g-rail pill-hover">Exact topic</span><span class="g-rail pill-hover">Next step</span></div></div>';
  } else {
    html += '<div class="viz-stack">' +
      '<div class="viz-chart-head"><p class="viz-title">Topic climb</p><span class="viz-up">' + ic("trending-up", 14) + '+18%</span></div>' +
      '<svg viewBox="0 0 320 150" style="width:100%">' +
        '<defs><linearGradient id="climbFill' + howActive + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(58,79,184,0.22)"/><stop offset="100%" stop-color="rgba(58,79,184,0)"/></linearGradient>' +
        '<linearGradient id="climbLine' + howActive + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#191970"/><stop offset="70%" stop-color="#3a4fb8"/><stop offset="100%" stop-color="#c5a253"/></linearGradient></defs>' +
        [30, 60, 90, 120].map(function (y) { return '<line x1="10" x2="310" y1="' + y + '" y2="' + y + '" stroke="rgba(11,18,38,0.06)" stroke-dasharray="4 6"/>'; }).join("") +
        '<path d="M20 122 L75 108 L130 112 L185 78 L240 62 L295 30" fill="none" stroke="url(#climbLine' + howActive + ')" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M20 122 L75 108 L130 112 L185 78 L240 62 L295 30 L295 140 L20 140 Z" fill="url(#climbFill' + howActive + ')"/>' +
        [[20, 122], [75, 108], [130, 112], [185, 78], [240, 62], [295, 30]].map(function (p, i) {
          return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#fff" stroke="' + (i === 5 ? "#c5a253" : "#26338f") + '" stroke-width="2.5"/>';
        }).join("") +
      '</svg>' +
      '<div class="viz-x-labels"><span>Test 3</span><span>Test 5</span><span>Test 7</span><span>Test 9</span></div></div>';
  }
  html += '<p class="how-desc">' + s.desc + '</p></div>';
  body.innerHTML = html;
}

/* ---- agents grid ---- */
function renderAgents() {
  var host = $("agentsGrid");
  var core = el("div", "si-core-card glass rv");
  core.innerHTML =
    '<div class="si-core-glow" aria-hidden="true"></div>' +
    '<div class="si-core-row">' +
      '<span class="si-core-ic chip-grad">' + ic("network", 32) + '<span class="badge">12</span></span>' +
      '<div style="flex:1"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">' +
        '<h3 class="si-core-tt">SI Core</h3>' +
        '<span class="pill wash-chip" style="color:var(--chip-cyan-tx)">The hub</span></div>' +
        '<p class="si-core-p">The intelligence that binds the suite. Every agent reports into SI Core, so your mock paper, gaps, plan and progress stay in sync — one profile, one goal, zero repetition.</p></div>' +
      '<div class="si-core-chips"><span>Shared memory</span><span>Cross-learning</span><span>One profile</span></div>' +
    '</div>';
  host.appendChild(core);
  AGENTS.forEach(function (a) {
    var card = el("div", "agent-card glass g-card glass-lift agent-tile rv");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Inspect the " + a.name + " agent");
    card.innerHTML =
      '<span class="g-card-ring" aria-hidden="true"></span>' +
      '<div style="position:relative;z-index:2">' +
      '<div class="top"><span class="agent-icon chip-tint">' + ic(a.icon, 22) + '</span>' +
      '<span class="pill pill-cyan" style="letter-spacing:.12em">' + a.role + '</span></div>' +
      '<h3>' + a.name + '</h3><p class="sh">' + a.short + '</p>' +
      '<div class="foot"><span class="dots">' +
        '<i style="background:#191970"></i><i style="background:#3a4fb8"></i><i style="background:#c5a253"></i></span>' +
      '<span class="inspect">' + ic("mouse-pointer-click", 12) + ' Inspect agent</span></div></div>';
    card.addEventListener("click", function () { openAgent(a); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAgent(a); }
    });
    host.appendChild(card);
  });
}

/* ---- exams ---- */
var examTab = "all", examQuery = "", compare = [], compareOpen = false;
var COMPARE_KEY = "paip:compare";
function loadCompare() {
  try {
    var raw = JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(function (id) { return typeof id === "string" && EXAM_BY_ID[id]; }).slice(0, 3);
  } catch (e) { return []; }
}
function saveCompare() { try { localStorage.setItem(COMPARE_KEY, JSON.stringify(compare)); } catch (e) {} }
function renderExamTabs() {
  var tabs = [["all", "All exams"], ["school", "Class 11 & 12 · JEE · NEET"], ["undergrad", "Undergrad · Study abroad"], ["graduate", "Graduate · UPSC · SSC"]];
  var host = $("examTabs");
  tabs.forEach(function (t) {
    var b = el("button", "exam-tab glass-soft pill-hover focus-ring" + (t[0] === "all" ? " on btn-shine" : ""), t[1]);
    b.setAttribute("aria-pressed", t[0] === "all" ? "true" : "false");
    b.addEventListener("click", function () {
      examTab = t[0];
      host.querySelectorAll(".exam-tab").forEach(function (x) {
        var on = x === b;
        x.classList.toggle("on", on);
        x.classList.toggle("btn-shine", on);
        x.setAttribute("aria-pressed", on ? "true" : "false");
      });
      renderExamGrid();
    });
    host.appendChild(b);
  });
}
function examList() {
  var byTab = examTab === "all" ? EXAMS : EXAMS.filter(function (e) { return e.cat === examTab; });
  var q = examQuery.trim().toLowerCase();
  if (!q) return byTab;
  return byTab.filter(function (e) {
    return e.name.toLowerCase().indexOf(q) >= 0 || e.full.toLowerCase().indexOf(q) >= 0;
  });
}
function renderExamGrid() {
  var host = $("examGrid");
  host.innerHTML = "";
  var list = examList();
  list.forEach(function (e) {
    var inCmp = compare.indexOf(e.id) >= 0;
    var card = el("div", "exam-card glass g-card glass-lift corner-glow focus-ring" + (inCmp ? " in-compare" : ""));
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "View the full " + e.name + " pattern and SI crew");
    var catPill = e.cat === "school" ? "pill-cyan" : e.cat === "undergrad" ? "pill-gold" : "pill-teal";
    card.innerHTML =
      '<span class="g-card-ring" aria-hidden="true"></span>' +
      '<div style="position:relative;z-index:2">' +
      '<div class="hd"><div><h3>' + e.name + '</h3><p class="full">' + e.full + '</p></div>' +
      '<div class="side"><span class="pill ' + catPill + '">' + CAT_LABEL[e.cat] + '</span>' +
      '<button type="button" class="cmp-btn pill-hover focus-ring' + (inCmp ? " on" : "") + '" aria-pressed="' + inCmp + '" aria-label="' + (inCmp ? "Remove " : "Add ") + e.name + ' ' + (inCmp ? "from" : "to") + ' the comparison">' + ic("git-compare", 14) + '</button></div></div>' +
      '<div class="exam-stats">' +
        '<div class="exam-stat g-rail">' + ic("list-checks", 16) + '<p class="v">' + e.q + '</p><p class="l">Questions</p></div>' +
        '<div class="exam-stat g-rail">' + ic("clock", 16) + '<p class="v">' + e.mins + 'm</p><p class="l">Duration</p></div>' +
        '<div class="exam-stat g-rail">' + ic("trophy", 16) + '<p class="v">' + e.marks + '</p><p class="l">Marks</p></div>' +
      '</div>' +
      '<div class="ft"><span class="mark-chip">' + (e.mark || "official scheme") + '</span>' +
      '<span class="view-pattern">View full pattern ' + ic("arrow-right", 14) + '</span></div></div>';
    card.querySelector(".cmp-btn").addEventListener("click", function (ev) { ev.stopPropagation(); toggleCompare(e.id); });
    card.addEventListener("click", function () { openExam(e); });
    card.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openExam(e); }
    });
    host.appendChild(card);
  });
  var count = $("examCount");
  if (examQuery.trim()) {
    count.style.display = "block";
    count.innerHTML = list.length > 0
      ? '<b>' + list.length + '</b> ' + (list.length === 1 ? "exam" : "exams") + " matching “" + esc(examQuery.trim()) + "”"
      : "No exams match — try JEE, NEET, UPSC, GATE, CAT, GRE, SAT, IELTS…";
  } else count.style.display = "none";
}
function toggleCompare(id) {
  if (compare.indexOf(id) >= 0) compare = compare.filter(function (x) { return x !== id; });
  else {
    if (compare.length >= 3) { toast("Comparison holds three exams — remove one first."); return; }
    compare = compare.concat([id]);
  }
  saveCompare();
  renderExamGrid();
  renderCmpTray();
}
function renderCmpTray() {
  var tray = $("cmpTray");
  var chips = $("cmpChips");
  chips.innerHTML = "";
  if (compare.length === 0) { tray.style.display = "none"; tray.classList.remove("up"); return; }
  tray.style.display = "flex";
  requestAnimationFrame(function () { tray.classList.add("up"); });
  compare.forEach(function (id) {
    var e = EXAM_BY_ID[id];
    var c = el("span", "cmp-chip", e.name + ' <button type="button" aria-label="Remove ' + e.name + '">' + ic("x", 12) + '</button>');
    c.querySelector("button").addEventListener("click", function () { toggleCompare(id); });
    chips.appendChild(c);
  });
}

/* ---- why / journey / voices / faq / audience / contact ---- */
function renderWhy() {
  var pg = $("pillarsGrid");
  PILLARS.forEach(function (p) {
    var d = el("div", "gcard glass g-card glass-lift corner-glow rv");
    d.innerHTML = '<span class="g-card-ring" aria-hidden="true"></span><div style="position:relative;z-index:2">' +
      '<span class="chip-grad" style="width:44px;height:44px">' + ic(p.icon, 20) + '</span>' +
      '<h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
    pg.appendChild(d);
  });
  var eg = $("engineGrid");
  ENGINE.forEach(function (e) {
    var d = el("div", "gcard glass g-card glass-lift corner-glow rv" + (e.accent === "gold" ? " corner-glow-gold" : ""));
    d.innerHTML = '<span class="g-card-ring" aria-hidden="true"></span><div style="position:relative;z-index:2">' +
      '<div class="row"><span class="agent-icon ' + (e.accent === "gold" ? "chip-goldtint" : "chip-tint") + '" style="width:44px;height:44px">' + ic(e.icon, 20) + '</span>' +
      '<h4 style="font-family:var(--font-display);font-size:14.5px;font-weight:600;line-height:1.25;color:var(--ink)">' + e.title + '</h4></div>' +
      '<p style="margin-top:14px">' + e.desc + '</p></div>';
    eg.appendChild(d);
  });
}
function renderJourney() {
  var list = $("tlList");
  MILESTONES.forEach(function (m, i) {
    var li = el("li", "tl-item" + (i % 2 === 0 ? " left" : ""));
    var parts = m.title.split(m.accent);
    li.innerHTML =
      '<span class="tl-node" aria-hidden="true"><span class="journey-ping"></span>' +
      '<span class="disc glass"><span class="core">' + ic(m.icon, 13) + '</span></span></span>' +
      '<span class="tl-spacer" aria-hidden="true"></span>' +
      '<div class="tl-card glass g-card glass-lift corner-glow rv">' +
        '<span class="g-card-ring" aria-hidden="true"></span>' +
        '<div style="position:relative;z-index:2">' +
        '<div class="hd"><span class="ph">' + m.phase + '</span><span class="mini-rule" aria-hidden="true"></span></div>' +
        '<h3>' + parts[0] + '<span class="se text-gradient-brand">' + m.accent + '</span>' + (parts[1] || "") + '.</h3>' +
        '<p class="copy">' + m.copy + '</p>' +
        '<div class="metric-row"><p class="num" data-count="' + m.metric.to + '" data-suffix="' + (m.metric.suffix || "") + '">0</p>' +
        '<p class="cap">' + m.metric.label + '</p></div></div></div>';
    list.appendChild(li);
  });
}
var voiceIdx = 0, voicePaused = false, voiceTimer = null;
function renderVoices() {
  renderVoiceFig();
  var dots = $("voiceDots");
  dots.innerHTML = "";
  VOICES.forEach(function (v, i) {
    var b = el("button", "voice-dot focus-ring" + (i === 0 ? " on" : ""));
    b.setAttribute("aria-label", "Show voice " + (i + 1) + ": " + v.name + ", " + v.role);
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () { goVoice(i); });
    dots.appendChild(b);
  });
  $("voicePrev").addEventListener("click", function () { goVoice(voiceIdx - 1); });
  $("voiceNext").addEventListener("click", function () { goVoice(voiceIdx + 1); });
  $("voicesCard").addEventListener("mouseenter", function () { voicePaused = true; restartVoiceTimer(); });
  $("voicesCard").addEventListener("mouseleave", function () { voicePaused = false; restartVoiceTimer(); });
  restartVoiceTimer();
}
function restartVoiceTimer() {
  if (voiceTimer) clearInterval(voiceTimer);
  var fill = $("voiceProgressFill");
  fill.classList.remove("run");
  if (!voicePaused) {
    void fill.offsetWidth;
    fill.classList.add("run");
    voiceTimer = setInterval(function () { goVoice(voiceIdx + 1); }, 6000);
  }
}
function goVoice(i) {
  voiceIdx = (i + VOICES.length) % VOICES.length;
  renderVoiceFig();
  $("voiceDots").querySelectorAll(".voice-dot").forEach(function (d, di) {
    d.classList.toggle("on", di === voiceIdx);
    d.setAttribute("aria-pressed", di === voiceIdx ? "true" : "false");
  });
  restartVoiceTimer();
}
function renderVoiceFig() {
  var v = VOICES[voiceIdx];
  $("voiceStage").innerHTML =
    '<figure class="voice-fig"><blockquote class="voice-quote">' +
    ic("quote", 20).replace('class="ic"', 'class="ic q-ic"') +
    '<p>' + v.quote + '</p></blockquote>' +
    '<figcaption class="voice-cap"><span class="voice-ava" style="background:' + v.tint + '">' + v.initials + '</span>' +
    '<span><span class="nm">' + v.name + '</span><span class="rl">' + v.role + ' · ' + v.place + '</span></span></figcaption></figure>';
}
function renderFaq() {
  var host = $("faqList");
  FAQS.forEach(function (f, i) {
    var item = el("div", "faq-item glass corner-glow rv");
    item.innerHTML =
      '<button type="button" class="faq-q focus-ring" aria-expanded="false">' +
      '<span class="n">' + String(i + 1).padStart(2, "0") + '</span>' +
      '<span class="t">' + f.q + '</span>' +
      '<span class="faq-plus" aria-hidden="true"><span></span><span></span></span></button>' +
      '<div class="faq-a"><div><p>' + f.a + '</p></div></div>';
    item.querySelector(".faq-q").addEventListener("click", function () {
      var open = item.classList.toggle("open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
    host.appendChild(item);
  });
}
function renderAudience() {
  var host = $("audienceGrid");
  AUDIENCES.forEach(function (a) {
    var d = el("div", "aud-card glass g-card glass-lift rv");
    d.innerHTML = '<span class="g-card-ring" aria-hidden="true"></span><div style="position:relative;z-index:2">' +
      '<span class="chip-grad" style="width:52px;height:52px;border-radius:16px">' + ic(a.icon, 24) + '</span>' +
      '<h3 style="margin-top:20px;font-size:18px;font-weight:700;color:var(--ink)">' + a.title + '</h3>' +
      '<p style="margin-top:8px;font-size:13.5px;line-height:1.625;color:var(--mute)">' + a.desc + '</p>' +
      '<ul class="pts">' + a.points.map(function (p) { return '<li><i></i>' + p + '</li>'; }).join("") + '</ul>' +
      '<span class="link" role="button" tabindex="0">' + a.cta + ' ' + ic("arrow-up-right", 16) + '</span></div>';
    var link = d.querySelector(".link");
    var act = function () {
      if (a.app) openConsole();
      else document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };
    link.addEventListener("click", act);
    link.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    host.appendChild(d);
  });
}
function renderContact() {
  var host = $("contactGrid");
  CONTACTS.forEach(function (c) {
    var body;
    if (c.kind === "email") {
      body = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">' +
        '<a href="mailto:kkchalla@outlook.com" style="font-family:var(--font-display);font-size:15px;font-weight:600;color:var(--ink)">kkchalla@outlook.com</a>' +
        '<button type="button" class="copy-btn glass-soft pill-hover focus-ring" id="copyEmailBtn" aria-label="Copy email address">' + ic("copy", 12) + ' Copy</button></div>';
    } else if (c.kind === "phone") {
      body = '<div class="col"><a href="tel:+919515569545">+91 95155 69545</a><a href="tel:+918978152333">+91 89781 52333</a></div>';
    } else if (c.kind === "linkedin") {
      body = '<a class="link-arrow" href="https://www.linkedin.com/in/kiran-challa-9b3167359/" target="_blank" rel="noopener noreferrer">in/kiran-challa ' + ic("arrow-up-right", 14) + '</a>';
    } else if (c.kind === "instagram") {
      body = '<a class="link-arrow ig" href="https://www.instagram.com/preparation.ai/" target="_blank" rel="noopener noreferrer">@preparation.ai ' + ic("arrow-up-right", 14) + '</a>';
    } else if (c.kind === "site") {
      body = '<div class="col"><a class="link-arrow" href="https://preparationai.si" target="_blank" rel="noopener noreferrer">preparationai.si ' + ic("arrow-up-right", 14) + '</a>' +
        '<button type="button" class="link-arrow" id="contactOpenConsole" style="font-weight:600">Open the app console ' + ic("arrow-up-right", 14) + '</button></div>';
    } else {
      body = '<div class="col"><span>Hyderabad, India</span></div>';
    }
    var d = el("div", "contact-card glass g-card glass-lift rv");
    var insta = c.kind === "instagram";
    d.innerHTML = '<span class="g-card-ring" aria-hidden="true"></span><div style="position:relative;z-index:2">' +
      '<div class="row"><span class="ic-box ' + (insta ? "ic-insta" : "ic-cyan") + '">' + ic(c.icon, 20) + '</span>' +
      '<div><p class="lbl">' + c.label + '</p><div class="body">' + body + '</div></div></div>' +
      '<p class="note">' + c.note + '</p></div>';
    host.appendChild(d);
  });
  $("copyEmailBtn").addEventListener("click", function () {
    var btn = this;
    copyText("kkchalla@outlook.com").then(function () {
      toast("Email copied — kkchalla@outlook.com is on your clipboard.");
      btn.innerHTML = ic("check", 12) + " Copied";
      setTimeout(function () { btn.innerHTML = ic("copy", 12) + " Copy"; }, 2200);
    });
  });
  $("contactOpenConsole").addEventListener("click", function () { openConsole(); });
}
function renderFinalFacts() {
  var facts = [[17, "+", "exams ready"], [11, "", "agents on duty"], [200, "+", "schools in the field"]];
  var html = "";
  facts.forEach(function (f, i) {
    if (i > 0) html += '<span class="sep" aria-hidden="true"></span>';
    html += '<span><b data-count="' + f[0] + '" data-suffix="' + f[1] + '">0</b> ' + f[2] + '</span>';
  });
  $("finalFacts").innerHTML = html;
}
function renderShortcuts() {
  var host = $("scBody");
  host.innerHTML = SHORTCUTS.map(function (g) {
    return '<div class="sc-group"><p class="lbl">' + g.group + '</p><ul class="sc-rows">' +
      g.rows.map(function (r) {
        return '<li class="sc-row pill-hover"><span class="d">' + r[1] + '</span><span class="ks">' +
          r[0].map(function (k) { return '<span class="kbd-key">' + k + '</span>'; }).join("") + '</span></li>';
      }).join("") + '</ul></div>';
  }).join("");
}
/* ============================================================
   DIALOG MANAGER
   ============================================================ */
var openDlg = null, savedFocus = null;
function showDlg(id) {
  if (openDlg) closeDlg(true);
  savedFocus = document.activeElement;
  openDlg = id;
  var d = $(id);
  d.classList.add("open");
  $("dlgBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
  d.addEventListener("scroll", dlgScrollFade);
  var first = d.querySelector(".dlg-close");
  if (first) first.focus({ preventScroll: true });
}
function dlgScrollFade(e) {
  e.currentTarget.classList.toggle("dialog-scrolled", e.currentTarget.scrollTop > 8);
}
function closeDlg(instant) {
  if (!openDlg) return;
  var d = $(openDlg);
  d.classList.remove("open");
  d.removeEventListener("scroll", dlgScrollFade);
  if (!instant) {
    $("dlgBackdrop").classList.remove("open");
    document.body.style.overflow = "";
  }
  openDlg = null;
  if (savedFocus && savedFocus.focus) { try { savedFocus.focus({ preventScroll: true }); } catch (e) {} }
}
$("dlgBackdrop").addEventListener("click", function () { closeDlg(); });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (paletteOpen) { togglePalette(false); return; }
    if (scOpen) { toggleShortcuts(false); return; }
    if (sheetOpen) { toggleSheet(false); return; }
    if (openDlg) { closeDlg(); return; }
    if (document.activeElement === $("examSearch")) { $("examSearch").value = ""; onExamSearchInput(); }
  }
});

/* ---- agent dialog ---- */
function openAgent(a) {
  var carried = EXAMS.filter(function (e) { return e.crew.indexOf(a.id) >= 0; });
  var incoming = incomingOf(a.id);
  var visible = carried.slice(0, 8), hidden = carried.length - visible.length;
  var html =
    '<div class="dlg-band wash-hero">' +
      '<span class="halo1" aria-hidden="true"></span><span class="halo2" aria-hidden="true"></span>' +
      '<div class="dlg-head">' +
        '<span class="chip-grad" style="width:56px;height:56px">' + ic(a.icon, 28) + '</span>' +
        '<div style="flex:1;min-width:0"><p class="t">' + a.name + '</p>' +
        '<span class="pill pill-cyan pill-hover" style="margin-top:6px;letter-spacing:.14em">' + a.role + ' agent</span></div>' +
        '<span class="logo-blend" style="width:40px;height:40px;flex-shrink:0"><span class="logo-img"></span></span>' +
      '</div>' +
      '<p style="position:relative;margin-top:16px;font-size:14px;line-height:1.625;color:var(--soft)">' + a.long + '</p>' +
    '</div>' +
    '<div class="dlg-body">' +
      '<p class="dlg-label">Capabilities</p>' +
      '<ul class="cap-list">' + a.capabilities.map(function (c) {
        return '<li class="g-rail"><span class="ok">' + ic("check", 12) + '</span>' + c + '</li>';
      }).join("") + '</ul>' +
      '<div class="works-with"><p class="dlg-label">Works with</p><div class="ww-chips">' +
        a.feeds.map(function (f) { return '<span class="ww-chip">' + f + '</span>'; }).join("") +
        (incoming.length ? incoming.map(function (t) { return '<span class="ww-chip gold">' + t.name + ' →</span>'; }).join("") : "") +
      '</div></div>' +
      '<div class="carried"><p class="dlg-label">Carries these exams <span class="pill pill-cyan" style="margin-left:8px;font-family:ui-monospace,monospace;font-size:10px">' + carried.length + '</span></p>' +
      '<div class="carried-chips">' +
        visible.map(function (e) {
          var cls = e.cat === "school" ? "cc-cyan" : e.cat === "undergrad" ? "cc-gold" : "cc-teal";
          return '<span class="carried-chip ' + cls + '">' + e.name + '</span>';
        }).join("") +
        (hidden > 0 ? '<button type="button" class="carried-more focus-ring" id="carriedMore">+' + hidden + ' more</button>' : "") +
      '</div></div>' +
      '<div class="agent-metric-row">' +
        '<div class="metric-box g-rail"><p class="l">' + a.metric.label + '</p><p class="v text-gradient-brand">' + a.metric.value + '</p></div>' +
        '<div class="agent-actions">' +
          '<button type="button" class="cta sm btn-shine focus-ring" id="agentTryApp">Try it in the app ' + ic("arrow-right", 16) + '</button>' +
          '<div class="row2">' +
            '<button type="button" class="g-btn glass glass-lift pill-hover focus-ring" id="agentShare">' + ic("share-2", 16) + ' Share</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  $("agentDialogBody").innerHTML = html;
  $("agentDialog").scrollTop = 0;
  var more = $("carriedMore");
  if (more) more.addEventListener("click", function () {
    var chips = $("agentDialogBody").querySelector(".carried-chips");
    carried.forEach(function (e) {
      var cls = e.cat === "school" ? "cc-cyan" : e.cat === "undergrad" ? "cc-gold" : "cc-teal";
      chips.insertAdjacentHTML("afterbegin", '<span class="carried-chip ' + cls + '">' + e.name + '</span>');
    });
    more.remove();
  });
  $("agentTryApp").addEventListener("click", function () {
    closeDlg();
    setTimeout(function () { openConsole(); }, 280);
  });
  $("agentShare").addEventListener("click", function () {
    var text = a.name + " — the " + a.role + " agent of the Preparation AI Super Intelligence. " + a.short;
    copyText(text).then(function () { toast("Agent summary copied — paste it anywhere."); });
  });
  showDlg("agentDialog");
}

/* ---- exam dialog ---- */
function openExam(e) {
  var inCmp = compare.indexOf(e.id) >= 0;
  var catPill = e.cat === "school" ? "pill-cyan" : e.cat === "undergrad" ? "pill-gold" : "pill-teal";
  var html =
    '<div class="dlg-band wash-hero">' +
      '<span class="halo1" aria-hidden="true"></span><span class="halo2" aria-hidden="true"></span>' +
      '<div class="dlg-head"><div style="min-width:0;flex:1"><p class="t">' + e.name + '</p><p class="st">' + e.full + '</p></div>' +
      '<span class="pill ' + catPill + '">' + CAT_LABEL[e.cat] + '</span></div>' +
      '<div class="meta-pills">' +
        '<span class="meta-pill pill-hover">' + ic("building-2", 14) + e.body + '</span>' +
        '<span class="meta-pill pill-hover">' + ic("monitor-smartphone", 14) + e.mode + '</span>' +
        '<span class="meta-pill pill-hover">' + ic("refresh-cw", 14) + e.attempts + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="dlg-body">' +
      '<p class="dlg-label">Official pattern</p>' +
      '<div class="pattern-grid">' +
        '<div class="pattern-cell g-rail corner-glow">' + ic("list-checks", 16) + '<p class="v">' + e.q + '</p><p class="l">Questions</p></div>' +
        '<div class="pattern-cell g-rail corner-glow">' + ic("clock", 16) + '<p class="v">' + e.mins + 'm</p><p class="l">Duration</p></div>' +
        '<div class="pattern-cell g-rail corner-glow">' + ic("trophy", 16) + '<p class="v">' + e.marks + '</p><p class="l">Max marks</p></div>' +
        '<div class="pattern-cell g-rail corner-glow">' + ic("sigma", 16) + '<p class="v">' + e.mark + '</p><p class="l">Marking</p></div>' +
      '</div>' +
      '<p class="dlg-label" style="margin-top:24px">Structure</p>' +
      '<div class="section-pills">' + e.sections.map(function (s) { return '<span class="section-pill pill-hover">' + s + '</span>'; }).join("") + '</div>' +
      '<div class="crew-box wash-soft">' +
        '<p class="lbl">' + ic("sparkles", 14) + 'Your SI crew for ' + e.name + '</p>' +
        '<div class="crew-list">' + e.crew.map(function (id) {
          var a = AGENT_BY_ID[id];
          return '<div class="crew-row pill-hover"><span class="ic-box">' + ic(a.icon, 16) + '</span>' +
            '<div style="min-width:0"><p class="nm">' + a.name + '</p><p class="ds">' + a.short + '</p></div></div>';
        }).join("") + '</div>' +
      '</div>' +
      '<p class="exam-note">' + e.note + '</p>' +
      '<div class="dialog-actions">' +
        '<div class="row1"><button type="button" class="cta btn-shine focus-ring" id="examStartPrep">Start ' + e.name + ' prep ' + ic("arrow-right", 16) + '</button></div>' +
        '<div class="row2">' +
          '<button type="button" class="g-btn glass glass-lift pill-hover focus-ring" id="examShare">' + ic("share-2", 16) + ' Share</button>' +
          '<button type="button" class="g-btn glass glass-lift pill-hover focus-ring" id="examCmpToggle">' + ic("git-compare", 14) + (inCmp ? " In the comparison — tap to remove" : " Add to the side-by-side comparison") + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  $("examDialogBody").innerHTML = html;
  $("examDialog").scrollTop = 0;
  $("examStartPrep").addEventListener("click", function () {
    closeDlg();
    setTimeout(function () { openConsole(e.id); }, 280);
  });
  $("examShare").addEventListener("click", function () {
    var text = e.name + " — " + e.full + ". Official pattern: " + e.q + " questions · " + e.mins + " minutes · " + e.marks + " marks.";
    copyText(text).then(function () { toast("Pattern summary copied — paste it anywhere."); });
  });
  $("examCmpToggle").addEventListener("click", function () {
    toggleCompare(e.id);
    closeDlg();
    if (compare.length >= 2) setTimeout(openCmpDialog, 200);
  });
  showDlg("examDialog");
}

/* ---- compare dialog ---- */
function openCmpDialog() {
  var exams = compare.map(function (id) { return EXAM_BY_ID[id]; });
  if (!exams.length) return;
  var html = '<div class="dlg-band wash-hero" style="padding-bottom:20px">' +
    '<div class="dlg-head"><div><p class="t">Side by side</p><p class="st">Pick by the numbers that matter.</p></div></div></div>' +
    '<div class="dlg-body"><div class="cmp-cols">' +
    exams.map(function (e) {
      var catPill = e.cat === "school" ? "pill-cyan" : e.cat === "undergrad" ? "pill-gold" : "pill-teal";
      return '<div class="cmp-col g-rail corner-glow"><p class="nm">' + e.name + ' <span class="pill ' + catPill + '" style="vertical-align:middle">' + CAT_LABEL[e.cat] + '</span></p>' +
        '<p class="fl">' + e.full + '</p>' +
        '<div class="mini">' +
          '<div><span class="k">Questions</span><span class="v">' + e.q + '</span></div>' +
          '<div><span class="k">Duration</span><span class="v">' + e.mins + 'm</span></div>' +
          '<div><span class="k">Marks</span><span class="v">' + e.marks + '</span></div>' +
          '<div><span class="k">Marking</span><span class="v">' + e.mark + '</span></div>' +
          '<div><span class="k">Mode</span><span class="v">' + e.mode + '</span></div>' +
          '<div><span class="k">Attempts</span><span class="v">' + e.attempts + '</span></div>' +
        '</div></div>';
    }).join("") + '</div></div>';
  $("cmpDialogBody").innerHTML = html;
  showDlg("cmpDialog");
}
$("cmpOpen").addEventListener("click", function () {
  if (compare.length < 2) { toast("Pick two exams to compare — tap the compare icon on any card."); return; }
  openCmpDialog();
});
$("cmpClear").addEventListener("click", function () { compare = []; saveCompare(); renderExamGrid(); renderCmpTray(); });
["agentDialog", "examDialog", "cmpDialog", "consoleDialog"].forEach(function (id) {
  $(id + "Close").addEventListener("click", function () { closeDlg(); });
});

/* ============================================================
   APP CONSOLE
   ============================================================ */
var conExamId = "jee-main", conPicked = null, conElapsed = 0, conTimer = null;
var TARGET_SECONDS = 90;
function splitMarking(mark) {
  if (!mark || mark.indexOf("·") < 0) return {};
  var parts = mark.split("·");
  return { pos: parts[0].trim(), neg: parts[1].trim() };
}
function mmss(t) { return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); }
function greeting() {
  var h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function openConsole(examId) {
  if (examId) conExamId = examId;
  conPicked = null; conElapsed = 0;
  renderConsole();
  showDlg("consoleDialog");
  startConTimer();
}
function startConTimer() {
  if (conTimer) clearInterval(conTimer);
  conTimer = setInterval(function () {
    if (conPicked !== null) return;
    conElapsed++;
    var t = document.querySelector(".calib-top .timer span");
    if (t) {
      t.textContent = mmss(conElapsed);
      t.classList.toggle("warn", conElapsed > TARGET_SECONDS);
    }
  }, 1000);
}
function pickConsoleExam(id) {
  conExamId = id; conPicked = null; conElapsed = 0;
  renderConsole();
  startConTimer();
}
function renderConsole() {
  var exam = EXAM_BY_ID[conExamId] || EXAMS[0];
  var q = SAMPLES[exam.id] || DEFAULT_Q;
  var mk = splitMarking(exam.mark);
  var dateStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  var html =
    '<div class="console-chrome wash-soft">' +
      '<div class="lights" aria-hidden="true"><i style="background:#fda4af"></i><i style="background:#fcd34d"></i><i style="background:#86efac"></i></div>' +
      '<div class="mid"><span class="logo-blend"><span class="logo-img"></span></span><p class="t">Preparation<span class="text-gradient-brand">AI</span></p>' +
      '<span class="badge-si">SI console</span></div>' +
      '<span class="badge-preview"><span class="pulse-dot"><span class="ping journey-ping"></span><span class="dot"></span></span>Preview</span>' +
    '</div>' +
    '<div class="console-grid">' +
      '<div class="rail-pane">' +
        '<p class="rail-head"><span class="l">' + ic("list-checks", 14) + 'Your exams</span><span class="n">' + EXAMS.length + '</span></p>' +
        '<div class="rail-list" role="tablist" aria-label="Choose an exam">' +
          EXAMS.map(function (e) {
            return '<button type="button" role="tab" aria-selected="' + (e.id === exam.id) + '" class="rail-item g-rail' + (e.id === exam.id ? " on" : "") + '" data-exam="' + e.id + '">' +
              '<span class="cat-dot" style="background:' + CAT_DOT[e.cat] + '"></span>' + e.name + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<div class="session-pane wash-hero">' +
        '<div class="greet-row"><div><p class="g">' + greeting() + ' — the console is warm.</p>' +
        '<p class="d">' + ic("calendar-days", 14) + dateStr + '</p></div>' +
        '<span class="streak-pill pill-hover">' + ic("flame", 14) + '12-day streak</span></div>' +
        '<div class="exam-head"><p class="nm">' + exam.name + '</p><span class="pill pill-cyan">' + CAT_LABEL[exam.cat] + '</span><span class="fl">· ' + exam.full + '</span></div>' +
        '<div class="exam-chips">' +
          ['' + exam.q + ' questions', exam.mins + ' minutes', exam.marks + ' marks', exam.mark || 'official marking'].map(function (c) {
            return '<span>' + c + '</span>';
          }).join("") +
        '</div>' +
        '<div class="calib-box corner-glow">' +
          '<div class="calib-top">' +
            '<p class="tag">' + ic("sparkles", 14) + 'SI session — calibration</p>' +
            '<p class="timer">' + ic("timer", 14) + '<span class="' + (conElapsed > TARGET_SECONDS && conPicked === null ? "warn" : "") + '">' + mmss(conElapsed) + '</span><span style="color:var(--faint)">/ target ' + TARGET_SECONDS + 's</span></p>' +
          '</div>' +
          '<p class="calib-tag">' + q.tag + '</p>' +
          '<p class="calib-q">' + q.question + '</p>' +
          '<div class="opts" id="conOpts">' +
            q.options.map(function (opt, i) {
              return '<button type="button" class="opt g-opt focus-ring" data-i="' + i + '" aria-label="Option ' + "ABCD"[i] + ': ' + esc(opt) + '">' +
                '<span class="key">' + "ABCD"[i] + '</span><span style="line-height:1.325">' + opt + '</span></button>';
            }).join("") +
          '</div>' +
          '<div id="conVerdict"></div>' +
        '</div>' +
        '<div class="crew-strip"><p class="lbl">On duty for ' + exam.name + '</p>' +
        '<div class="chips">' + exam.crew.map(function (id) {
          var a = AGENT_BY_ID[id];
          return '<span class="pill-hover">' + ic(a.icon, 14) + a.name + '</span>';
        }).join("") + '</div></div>' +
      '</div>' +
    '</div>' +
    '<div class="console-foot">' +
      '<p class="note">You are inside the portfolio — this console is an interactive preview. It never takes you to another site.</p>' +
      '<button type="button" class="g-btn glass glass-lift pill-hover focus-ring" id="conMeetAgents">Meet the eleven agents ' + ic("arrow-right", 16) + '</button>' +
    '</div>';
  $("consoleBody").innerHTML = html;
  $("consoleBody").querySelectorAll(".rail-item").forEach(function (b) {
    b.addEventListener("click", function () { pickConsoleExam(b.getAttribute("data-exam")); });
  });
  $("conMeetAgents").addEventListener("click", function () {
    closeDlg();
    setTimeout(function () {
      document.getElementById("agents").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 340);
  });
  if (conPicked !== null) renderVerdict();
  $("conOpts").querySelectorAll(".opt").forEach(function (b) {
    b.addEventListener("click", function () {
      if (conPicked !== null) return;
      conPicked = parseInt(b.getAttribute("data-i"), 10);
      settleOptions();
      renderVerdict();
    });
  });
}
function settleOptions() {
  var q = SAMPLES[conExamId] || DEFAULT_Q;
  $("conOpts").querySelectorAll(".opt").forEach(function (b) {
    var i = parseInt(b.getAttribute("data-i"), 10);
    b.classList.add("settled");
    if (i === q.answer) { b.classList.add("correct"); b.querySelector(".key").innerHTML = ic("check", 14); }
    else if (i === conPicked) { b.classList.add("wrong"); b.querySelector(".key").innerHTML = ic("x", 14); }
    else b.classList.add("dimmed");
  });
}
function renderVerdict() {
  var exam = EXAM_BY_ID[conExamId] || EXAMS[0];
  var q = SAMPLES[exam.id] || DEFAULT_Q;
  var mk = splitMarking(exam.mark);
  var correct = conPicked === q.answer;
  $("conVerdict").innerHTML =
    '<div class="verdict">' +
      '<p class="verdict-pill ' + (correct ? "ok" : "no") + ' pill-hover">' + ic("badge-check", 16) +
        (correct ? "Correct" + (mk.pos ? " · " + mk.pos + " raw" : " — logged") : "Not quite" + (mk.neg ? " · " + mk.neg : "") + " — the topic is queued") + '</p>' +
      '<div class="why-box wash-soft">' +
        '<p class="lbl">Doubt Solver · step by step</p>' +
        '<p class="tx">' + q.why + '</p>' +
        '<p class="ft">Attempt recorded — the Gap Analyser re-weighs this topic and the Study Planner rebuilds tonight.</p>' +
      '</div>' +
      '<button type="button" class="run-again focus-ring pill-hover" id="conRunAgain">' + ic("rotate-ccw", 14) + 'Run the question again</button>' +
    '</div>';
  $("conRunAgain").addEventListener("click", function () {
    conPicked = null; conElapsed = 0;
    renderConsole();
    startConTimer();
  });
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
var paletteOpen = false, palSel = 0, palItems = [];
var RECENTS_KEY = "paip:palette-recent", RECENTS_MAX = 5;
function loadRecents() {
  try {
    var arr = JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
    return Array.isArray(arr) ? arr.filter(function (v) { return typeof v === "string"; }).slice(0, RECENTS_MAX) : [];
  } catch (e) { return []; }
}
function buildPaletteItems() {
  var SECTIONS = [
    ["top", "Back to top", "arrow-up"], ["how", "How it works", "workflow"], ["agents", "The eleven agents", "layers"],
    ["exams", "Exam coverage", "list-checks"], ["why", "Why SI", "shield-check"], ["journey", "The build story", "milestone"],
    ["voices", "Early voices", "quote"], ["faq", "Frequently asked", "circle-help"], ["contact", "Contact", "mail"]
  ];
  var items = [];
  SECTIONS.forEach(function (s) {
    items.push({ value: "go " + s[1], icon: s[2], label: s[1], hint: "jump", run: function () { goSection(s[0]); } });
  });
  EXAMS.forEach(function (e) {
    items.push({ value: "exam " + e.name + " " + e.full, icon: "list-checks", label: e.name, sub: e.full, hint: "pattern",
      run: function () { goSection("exams"); setTimeout(function () { openExam(e); }, 350); } });
  });
  AGENTS.forEach(function (a) {
    items.push({ value: "agent " + a.name + " " + a.role + " " + a.short, icon: a.icon, label: a.name, sub: a.role, hint: "agent",
      run: function () { goSection("agents"); setTimeout(function () { openAgent(a); }, 350); } });
  });
  items.push({ value: "open app application launch product console preview", icon: "play-circle", label: "Open the app console", hint: "launch", run: function () { openConsole(); } });
  items.push({ value: "compare exams side by side tray shortcut", icon: "git-compare", label: "Compare exams side by side", hint: "compare", run: function () { summonCompare(); } });
  items.push({ value: "theme night day dark light mode switch toggle", icon: "moon", label: "Switch to the " + (isNight() ? "day" : "night") + " edition", hint: "theme", run: function () { toggleTheme(); } });
  items.push({ value: "shortcuts keyboard keys help cheatsheet", icon: "arrow-up-right", label: "Keyboard shortcuts", hint: "help", run: function () { toggleShortcuts(true); } });
  items.push({ value: "share this page site link send", icon: "share-2", label: "Share this page", hint: "share", run: function () {
    copyText("Preparation AI — SI (Super Intelligence) for every exam. Eleven agents, 17+ exams, one system.").then(function () { toast("Site summary copied — paste it anywhere."); });
  } });
  items.push({ value: "copy email contact mail kkchalla", icon: "copy", label: "Copy email — kkchalla@outlook.com", hint: "clipboard", run: function () {
    copyText("kkchalla@outlook.com").then(function () { toast("kkchalla@outlook.com copied to clipboard."); });
  } });
  items.push({ value: "instagram social follow", icon: "instagram", label: "Follow @preparation.ai on Instagram", hint: "social", run: function () { window.open("https://www.instagram.com/preparation.ai/", "_blank", "noopener"); } });
  items.push({ value: "linkedin kiran challa social founder", icon: "linkedin", label: "Kiran Challa on LinkedIn", hint: "social", run: function () { window.open("https://www.linkedin.com/in/kiran-challa-9b3167359/", "_blank", "noopener"); } });
  return items;
}
function goSection(id) {
  togglePalette(false);
  requestAnimationFrame(function () {
    var t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: "smooth", block: id === "top" ? "start" : "start" });
  });
}
function palFiltered() {
  var s = $("palInput").value.toLowerCase().trim();
  var words = s ? s.split(/\s+/) : [];
  return palItems.filter(function (it) {
    var v = it.value.toLowerCase();
    return words.every(function (w) { return v.indexOf(w) >= 0; });
  });
}
function renderPalette() {
  var recents = loadRecents();
  var byValue = {}; palItems.forEach(function (i) { byValue[i.value] = i; });
  var recentItems = recents.map(function (v) { return byValue[v]; }).filter(Boolean);
  var list = $("palList");
  var html = "";
  var groups = [["Recent", recentItems, true], ["Jump to", palItems.filter(function (i) { return i.hint === "jump"; })],
    ["Exams", palItems.filter(function (i) { return i.hint === "pattern"; })],
    ["Agents", palItems.filter(function (i) { return i.hint === "agent"; })],
    ["Actions", palItems.filter(function (i) { return ["theme", "launch", "clipboard", "social", "compare", "help", "share"].indexOf(i.hint) >= 0; })]];
  var q = $("palInput").value.trim();
  var flat = [];
  groups.forEach(function (g) {
    var items = q ? g[1].filter(function (i) { return palFiltered().indexOf(i) >= 0; }) : g[1];
    if (!items.length) return;
    if (g[2] && q) return;
    html += '<div class="pal-group"><p class="pal-heading">' + g[0] + '</p>';
    items.forEach(function (it) {
      flat.push(it);
      html += '<div class="pal-item" role="option" data-v="' + esc(it.value) + '">' + ic(it.icon, 16) +
        '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + it.label +
        (it.sub ? '<span class="sub">' + it.sub + '</span>' : "") + '</span>' +
        '<span class="hint">' + (g[2] ? "recent" : it.hint) + '</span></div>';
    });
    html += '</div>';
  });
  if (!flat.length) html = '<p class="pal-empty">Nothing found — try “NEET”, “agents”, “night” or “email”.</p>';
  list.innerHTML = html;
  palFlat = flat;
  palSel = 0;
  highlightPal();
  list.querySelectorAll(".pal-item").forEach(function (d) {
    d.addEventListener("click", function () { runPaletteItem(d.getAttribute("data-v")); });
    d.addEventListener("mousemove", function () {
      var idx = -1;
      list.querySelectorAll(".pal-item").forEach(function (x, xi) { if (x === d) idx = xi; });
      if (idx >= 0 && idx !== palSel) { palSel = idx; highlightPal(); }
    });
  });
}
var palFlat = [];
function highlightPal() {
  $("palList").querySelectorAll(".pal-item").forEach(function (d, i) {
    d.setAttribute("aria-selected", i === palSel ? "true" : "false");
    if (i === palSel) d.scrollIntoView({ block: "nearest" });
  });
}
function runPaletteItem(value) {
  var item = palItems.filter(function (i) { return i.value === value; })[0];
  if (!item) return;
  try {
    var recents = loadRecents().filter(function (v) { return v !== value; });
    recents.unshift(value);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents.slice(0, RECENTS_MAX)));
  } catch (e) {}
  togglePalette(false);
  item.run();
}
function togglePalette(open) {
  paletteOpen = open;
  $("palettePanel").classList.toggle("open", open);
  $("palBackdrop").classList.toggle("open", open);
  if (open) {
    palItems = buildPaletteItems();
    $("palInput").value = "";
    $("palClear").style.display = "none";
    renderPalette();
    setTimeout(function () { $("palInput").focus(); }, 50);
  } else document.body.style.overflow = openDlg ? "hidden" : "";
}
$("palBackdrop").addEventListener("click", function () { togglePalette(false); });
$("palInput").addEventListener("input", function () {
  $("palClear").style.display = this.value ? "block" : "none";
  $("palEsc").style.display = this.value ? "none" : "block";
  renderPalette();
});
$("palClear").addEventListener("click", function () {
  $("palInput").value = "";
  $("palClear").style.display = "none";
  $("palEsc").style.display = "block";
  renderPalette();
  $("palInput").focus();
});
$("palShortcuts").addEventListener("click", function () { togglePalette(false); toggleShortcuts(true); });
$("palInput").addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") { e.preventDefault(); palSel = Math.min(palSel + 1, palFlat.length - 1); highlightPal(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); palSel = Math.max(palSel - 1, 0); highlightPal(); }
  else if (e.key === "Enter") { e.preventDefault(); if (palFlat[palSel]) runPaletteItem(palFlat[palSel].value); }
});

/* ---- shortcuts sheet ---- */
var scOpen = false;
function toggleShortcuts(open) {
  scOpen = open;
  $("scPanel").classList.toggle("open", open);
  $("scBackdrop").classList.toggle("open", open);
}
$("scBackdrop").addEventListener("click", function () { toggleShortcuts(false); });
$("scClose").addEventListener("click", function () { toggleShortcuts(false); });
$("scPal").addEventListener("click", function () { toggleShortcuts(false); togglePalette(true); });

/* ============================================================
   THEME · NAV · SCROLL · MISC INTERACTIONS
   ============================================================ */
function isNight() { return document.documentElement.classList.contains("dark"); }
function toggleTheme() {
  var night = !isNight();
  document.documentElement.classList.toggle("dark", night);
  try { localStorage.setItem("paip:theme", night ? "dark" : "light"); } catch (e) {}
  syncThemeUI();
}
function syncThemeUI() {
  var night = isNight();
  var btn = $("themeToggle");
  btn.setAttribute("aria-label", night ? "Switch to the day edition" : "Switch to the night edition");
  btn.setAttribute("aria-pressed", night ? "true" : "false");
  btn.title = night ? "Day edition" : "Night edition";
  btn.style.color = night ? "#f2c95c" : "var(--deep)";
  $("iconSun").style.cssText = "position:absolute;inset:0;transition:all .5s ease;opacity:" + (night ? "0" : "1") + ";transform:rotate(" + (night ? "90deg" : "0") + ") scale(" + (night ? "0.01" : "1") + ")";
  $("iconMoon").style.cssText = "position:absolute;inset:0;transition:all .5s ease;opacity:" + (night ? "1" : "0") + ";transform:rotate(" + (night ? "0" : "-90deg") + ") scale(" + (night ? "1" : "0.01") + ")";
}
$("themeToggle").addEventListener("click", toggleTheme);

/* nav scroll behaviour */
var lastY = 0;
function onScroll() {
  var y = window.scrollY;
  $("siteHeader").classList.toggle("hidden-down", y > lastY && y > 180);
  lastY = y;
  var scrolled = y > 24;
  var nav = $("siteNav");
  nav.classList.toggle("glass", scrolled);
  nav.classList.toggle("glass-soft", !scrolled);
  var max = document.documentElement.scrollHeight - window.innerHeight;
  var p = max > 0 ? Math.min(y / max, 1) : 0;
  $("progressBeam").style.transform = "scaleX(" + p + ")";
  $("backTop").classList.toggle("show", y > 600);
  $("bttFill").setAttribute("stroke-dashoffset", String(144.5 * (1 - p)));
  /* journey fill */
  var tl = $("timeline");
  if (tl) {
    var r = tl.getBoundingClientRect();
    var vh = window.innerHeight;
    var prog = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height * 0.7)));
    $("tlFill").style.setProperty("--fill", prog.toFixed(3));
    $("tlFill").style.transform = "translateX(-50%) scaleY(" + prog.toFixed(3) + ")";
  }
}
window.addEventListener("scroll", onScroll, { passive: true });

/* scroll spy */
function initSpy() {
  var ids = ["how", "agents", "exams", "why", "journey", "voices", "contact"];
  var links = {};
  ids.forEach(function (id) { links[id] = document.querySelector('.nav-link[href="#' + id + '"]'); });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        ids.forEach(function (id) {
          var on = id === en.target.id;
          links[id].classList.toggle("nav-link--on", on);
          var li = links[id].parentElement;
          var old = li.querySelector(".nav-dot");
          if (on && !old) li.insertAdjacentHTML("beforeend", '<span class="nav-dot" aria-hidden="true"></span>');
          if (!on && old) old.remove();
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ids.forEach(function (id) { var t = document.getElementById(id); if (t) obs.observe(t); });
}

/* reveal observer + countup */
function initReveal() {
  var counted = new WeakSet();
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      en.target.querySelectorAll("[data-count]").forEach(function (c) {
        if (counted.has(c)) return;
        counted.add(c);
        var to = parseInt(c.getAttribute("data-count"), 10);
        var suffix = c.getAttribute("data-suffix") || "";
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var v = Math.min((ts - t0) / 1800, 1);
          var eased = 1 - Math.pow(1 - v, 3);
          c.textContent = Math.round(to * eased) + suffix;
          if (v < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      obs.unobserve(en.target);
    });
  }, { rootMargin: "-70px 0px" });
  document.querySelectorAll(".rv").forEach(function (d) { obs.observe(d); });
}

/* mobile sheet */
var sheetOpen = false;
function toggleSheet(open) {
  sheetOpen = open;
  $("mobileSheet").classList.toggle("open", open);
  $("sheetBackdrop").classList.toggle("open", open);
  $("menuBtn").setAttribute("aria-expanded", open ? "true" : "false");
}
$("menuBtn").addEventListener("click", function () { toggleSheet(!sheetOpen); });
$("sheetBackdrop").addEventListener("click", function () { toggleSheet(false); });
document.querySelectorAll(".sheet-link").forEach(function (a) {
  a.addEventListener("click", function () { toggleSheet(false); });
});
$("sheetOpenApp").addEventListener("click", function () {
  toggleSheet(false);
  requestAnimationFrame(function () { openConsole(); });
});

/* open app buttons */
["openAppNav", "heroOpenApp", "faqOpenApp", "finalOpenApp"].forEach(function (id) {
  $(id).addEventListener("click", function () { openConsole(); });
});
$("searchPill").addEventListener("click", function () { togglePalette(true); });
$("searchIconBtn").addEventListener("click", function () { togglePalette(true); });

/* exam search */
function onExamSearchInput() {
  examQuery = $("examSearch").value;
  $("examSearchClear").style.display = examQuery ? "flex" : "none";
  $("examSearchKbd").style.display = examQuery ? "none" : "block";
  renderExamGrid();
}
$("examSearch").addEventListener("input", onExamSearchInput);
$("examSearchClear").addEventListener("click", function () {
  $("examSearch").value = "";
  onExamSearchInput();
  $("examSearch").focus();
});
if (window.matchMedia) {
  var kbdMq = window.matchMedia("(min-width: 640px)");
  var syncKbd = function () { $("examSearchKbd").style.display = kbdMq.matches && !examQuery ? "block" : "none"; };
  if (kbdMq.addEventListener) kbdMq.addEventListener("change", syncKbd);
  syncKbd();
}

/* keyboard shortcuts (global) */
document.addEventListener("keydown", function (e) {
  var target = e.target instanceof Element ? e.target : null;
  var typing = target && target.closest ? target.closest("input, textarea, [contenteditable]") : null;
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    togglePalette(!paletteOpen);
    return;
  }
  if (typing || paletteOpen) return;
  if (e.key === "?") { e.preventDefault(); toggleShortcuts(true); return; }
  if (e.key === "/") {
    e.preventDefault();
    $("examSearch").scrollIntoView({ behavior: "smooth", block: "center" });
    $("examSearch").focus();
    return;
  }
  if (e.key.toLowerCase() === "c" && !scOpen && !openDlg && !sheetOpen) { e.preventDefault(); summonCompare(); }
});
function summonCompare() {
  if (compare.length >= 2) { openCmpDialog(); return; }
  document.getElementById("exams").scrollIntoView({ behavior: "smooth" });
  toast(compare.length === 1
    ? "One more exam and the comparison opens — pick it below."
    : "Pick two exams to compare — tap the compare icon on any card.");
}

/* back to top */
$("backTop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

/* toast + clipboard */
function toast(msg) {
  var root = $("toastRoot");
  var t = el("div", "toast glass", ic("check", 16) + "<span>" + msg + "</span>");
  root.appendChild(t);
  setTimeout(function () {
    t.classList.add("out");
    setTimeout(function () { t.remove(); }, 380);
  }, 3200);
}
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () { toast(text); return Promise.resolve(); });
  }
  toast(text);
  return Promise.resolve();
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  hydrateIcons(document);
  renderHeroStats();
  renderOrbit();
  refreshOrbitStates();
  setLabelSide(0);
  renderMarquee();
  renderHow();
  renderAgents();
  renderExamTabs();
  compare = loadCompare();
  renderExamGrid();
  renderCmpTray();
  renderWhy();
  renderJourney();
  renderVoices();
  renderFaq();
  renderAudience();
  renderContact();
  renderFinalFacts();
  renderShortcuts();
  $("yearNow").textContent = String(new Date().getFullYear());
  syncThemeUI();
  onScroll();
  initSpy();
  initReveal();
  initFooterMark();
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      var id = a.getAttribute("href").slice(1);
      var t = document.getElementById(id);
      if (t) {
        ev.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
/* footer wordmark: a light sweeps through the letters every 5 seconds,
   alternating midnight and champagne; the cursor (or a tap) takes over */
function initFooterMark() {
  var mark = $("pfMark");
  if (!mark) return;
  var base = mark.querySelector(".base");
  var raf = 0, px = 0, py = 0, hovering = false, sweeping = false, visible = false, tone = "gold";
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fit() {
    mark.style.fontSize = "100px";
    var w = base.scrollWidth;
    if (w) mark.style.fontSize = Math.floor(100 * mark.clientWidth / w * 0.995) + "px";
  }
  function place(x, y) {
    mark.style.setProperty("--mx", x + "px");
    mark.style.setProperty("--my", y + "px");
  }
  function move(ev) {
    var r = mark.getBoundingClientRect();
    px = ev.clientX - r.left; py = ev.clientY - r.top;
    if (!raf) raf = requestAnimationFrame(function () { raf = 0; place(px, py); });
  }
  function sweep() {
    if (hovering || sweeping || !visible || document.hidden) return;
    tone = tone === "gold" ? "midnight" : "gold";
    mark.setAttribute("data-tone", tone);
    sweeping = true;
    mark.classList.add("lit");
    var w = mark.clientWidth, h = mark.clientHeight, t0 = performance.now(), dur = 2800;
    (function step(now) {
      if (hovering) { sweeping = false; return; }
      var k = Math.min(1, (now - t0) / dur);
      var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      place((-0.12 + 1.24 * e) * w, h * (0.62 - 0.18 * Math.sin(e * Math.PI)));
      if (k < 1) requestAnimationFrame(step);
      else { sweeping = false; mark.classList.remove("lit"); }
    })(t0);
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener("resize", fit);
  mark.addEventListener("pointerenter", function (ev) { if (ev.pointerType === "mouse") { hovering = true; mark.setAttribute("data-tone", "midnight"); } });
  mark.addEventListener("pointerleave", function () { hovering = false; mark.classList.remove("lit"); });
  mark.addEventListener("pointermove", move);
  mark.addEventListener("pointerdown", function (ev) {
    move(ev);
    if (ev.pointerType !== "mouse") {
      mark.classList.add("lit");
      setTimeout(function () { if (!sweeping) mark.classList.remove("lit"); }, 1400);
    }
  });
  if (still) return;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var was = visible;
      visible = entries[0].isIntersecting;
      if (visible && !was) setTimeout(sweep, 600);
    }, { threshold: 0.2 }).observe(mark);
  } else visible = true;
  setInterval(sweep, 5000);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

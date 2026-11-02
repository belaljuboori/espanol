// ===== Helpers =====
const $app = document.getElementById("app");
const AR_RE = /[؀-ۿ]/;
const STORE_KEY = "espanol-progress-v1";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const multiline = (s) => esc(s).replace(/\n/g, "<br>");
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (arr, n) => shuffle(arr).slice(0, n);
const hasArabic = (s) => AR_RE.test(s);
const dirClass = (s) => (hasArabic(s) ? "" : "es");
const round1 = (n) => Math.round(n * 10) / 10;
const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// أيقونة Font Awesome
const fa = (name) => `<i class="fa-solid ${name}"></i>`;

// نص إسباني قابل للنطق عند الضغط
const say = (text, cls = "") => `<span class="say es ${cls}" data-say="${esc(text)}">${esc(text)}</span>`;

// ===== Text-to-speech =====
let esVoices = [];
function pickVoices() {
  esVoices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("es"))
    .sort((a, b) => (b.lang === "es-ES") - (a.lang === "es-ES"));
}
if ("speechSynthesis" in window) {
  pickVoices();
  speechSynthesis.onvoiceschanged = pickVoices;
}
// speaker 0 = المتحدث الأول، 1 = الثاني (صوت أو طبقة مختلفة)
function utter(text, speaker = 0) {
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, "...").replace(/^—\s*/, ""));
  u.lang = "es-ES";
  u.rate = 0.85;
  if (esVoices.length) u.voice = esVoices[speaker % esVoices.length];
  if (speaker === 1 && esVoices.length < 2) u.pitch = 1.45;
  return u;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter(text));
}
function speakLines(lines) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  lines.forEach(([who, text]) => speechSynthesis.speak(utter(text, who === "A" ? 0 : 1)));
}
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-say]");
  if (el) speak(el.dataset.say);
});

// ===== Recorder (للتدرب على المحادثة) =====
const recorderHTML = () => `
  <div class="recorder">
    <button class="btn ghost rec-btn">${fa("fa-microphone")} سجّل صوتك</button>
    <audio controls hidden></audio>
  </div>`;
let mediaRec = null;
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".rec-btn");
  if (!btn) return;
  if (mediaRec && mediaRec.state === "recording") { mediaRec.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    const rec = new MediaRecorder(stream);
    mediaRec = rec;
    rec.ondataavailable = (ev) => chunks.push(ev.data);
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const audio = btn.parentElement.querySelector("audio");
      audio.src = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
      audio.hidden = false;
      btn.classList.remove("recording");
      btn.innerHTML = `${fa("fa-microphone")} سجّل مرة أخرى`;
      mediaRec = null;
    };
    rec.start();
    btn.classList.add("recording");
    btn.innerHTML = `${fa("fa-stop")} إيقاف التسجيل`;
  } catch {
    alert("لا يمكن الوصول إلى الميكروفون. اسمح للمتصفح باستخدامه، أو تدرّب بصوت عالٍ بدون تسجيل.");
  }
});

// ===== Progress (localStorage) =====
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function saveProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch { /* تخزين غير متاح */ }
}
let progress = loadProgress();

// المفاتيح: رقم الوحدة، "v:موضوع" للمفردات، "r:رقم" للقراءة، "l" للاستماع، exams لسجل الاختبارات
function mark(key, patch) {
  const cur = progress[key] || {};
  if (patch.best !== undefined) patch.best = Math.max(cur.best || 0, patch.best);
  progress[key] = { ...cur, ...patch };
  saveProgress();
  updateOverall();
}
const bestOf = (key) => (progress[key] || {}).best;

// الدرس 20% + البطاقات 20% + أفضل نتيجة في التمارين 60%
function unitPercent(id) {
  const p = progress[id] || {};
  return Math.round((p.lesson ? 20 : 0) + (p.cards ? 20 : 0) + (p.best || 0) * 0.6);
}
function topicPercent(id) {
  const p = progress["v:" + id] || {};
  return Math.round((p.cards ? 30 : 0) + (p.best || 0) * 0.7);
}
function updateOverall() {
  const pct = Math.round(UNITS.reduce((s, u) => s + unitPercent(u.id), 0) / UNITS.length);
  document.getElementById("overallFill").style.width = pct + "%";
  document.getElementById("overallText").textContent = pct + "%";
}

// ===== Theme =====
const themeBtn = document.getElementById("themeBtn");
function applyTheme(t) {
  if (t) document.documentElement.dataset.theme = t;
  const dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  themeBtn.innerHTML = fa(dark ? "fa-sun" : "fa-moon");
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("espanol-theme"); } catch {}
applyTheme(savedTheme);
themeBtn.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  try { localStorage.setItem("espanol-theme", next); } catch {}
  applyTheme(next);
});

// ===== Router =====
let exam = null;
let suppressRoute = false;

function route() {
  if (suppressRoute) { suppressRoute = false; return; }
  if (exam && location.hash !== "#/dele/exam") {
    if (!confirm("أنت في منتصف الاختبار التجريبي. إذا خرجت ستفقد تقدمك. هل تريد الخروج؟")) {
      suppressRoute = true;
      location.hash = "#/dele/exam";
      return;
    }
    abandonExam();
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  window.scrollTo(0, 0);

  const [, page, a, b] = location.hash.split("/");
  document.querySelectorAll("[data-nav]").forEach((l) => l.classList.toggle("active", l.dataset.nav === (page || "home")));

  if (page === "unit") {
    const unit = UNITS.find((u) => u.id === Number(a));
    if (unit) return renderUnit(unit, b || "lesson");
  }
  if (page === "vocab") {
    const topic = VOCAB_TOPICS.find((t) => t.id === a);
    return topic ? renderTopic(topic, b || "cards") : renderVocabHome();
  }
  if (page === "dele") return renderDele(a, b);
  renderHome();
}
window.addEventListener("hashchange", route);

const backLink = (href, label) => `<a class="back" href="${href}">${fa("fa-arrow-right")} ${label}</a>`;
const tabsHTML = (tabs, current, base) => `
  <nav class="tabs">
    ${tabs.map(([k, icon, label]) => `<a class="tab ${k === current ? "active" : ""}" href="${base}/${k}">${fa(icon)} ${label}</a>`).join("")}
  </nav>`;

// ===== Home =====
function renderHome() {
  const next = UNITS.find((u) => unitPercent(u.id) < 100) || UNITS[0];
  const started = UNITS.some((u) => progress[u.id]);
  const totalWords = VOCAB_TOPICS.reduce((s, t) => s + t.vocab.length, 0);
  $app.innerHTML = `
    <section class="hero">
      <h1>¡Bienvenido! أهلًا بك ${fa("fa-hand")}</h1>
      <p>تعلّم الإسبانية خطوة بخطوة من المستوى A1: اقرأ الدرس، احفظ الكلمات بالبطاقات، ثم اختبر نفسك.</p>
      <a class="continue" href="#/unit/${next.id}">${started ? "تابع التعلم" : "ابدأ الآن"} ${fa("fa-arrow-left")} الوحدة ${next.id}</a>
    </section>
    <div class="features">
      <a class="feature" href="#/dele">
        <div class="feature-icon">${fa("fa-award")}</div>
        <div><b>تحضير DELE A1</b><span>قراءة · استماع · كتابة · محادثة · اختبار تجريبي كامل</span></div>
      </a>
      <a class="feature" href="#/vocab">
        <div class="feature-icon">${fa("fa-spell-check")}</div>
        <div><b>بنك المفردات</b><span>${totalWords} كلمة في ${VOCAB_TOPICS.length} موضوعًا من مواضيع الاختبار</span></div>
      </a>
    </div>
    <h2 class="section-title">الوحدات</h2>
    <div class="units">
      ${UNITS.map((u) => itemCard(`#/unit/${u.id}`, u.icon, `الوحدة ${u.id}`, u.es, u.ar, unitPercent(u.id))).join("")}
    </div>`;
}

function itemCard(href, icon, small, es, ar, pct) {
  return `
    <a class="unit-card" href="${href}">
      <div class="unit-icon">${fa(icon)}</div>
      <div class="unit-info">
        <div class="unit-num">${small}</div>
        <div class="unit-es es">${esc(es)}</div>
        <div class="unit-ar">${esc(ar)}</div>
        ${pct !== undefined ? `<div class="mini-bar"><div style="width:${pct}%"></div></div>` : ""}
      </div>
      ${pct === 100 ? `<span class="done-badge">${fa("fa-circle-check")}</span>` : ""}
    </a>`;
}

// ===== Unit =====
const UNIT_TABS = [["lesson", "fa-book-open", "الدرس"], ["cards", "fa-layer-group", "البطاقات"], ["quiz", "fa-pen-to-square", "التمارين"]];

function renderUnit(unit, tab) {
  $app.innerHTML = `
    ${backLink("#/", "كل الوحدات")}
    <div class="unit-head">
      <div class="unit-icon">${fa(unit.icon)}</div>
      <div>
        <div class="unit-num">الوحدة ${unit.id}</div>
        <h1 class="es">${esc(unit.es)}</h1>
        <div class="unit-ar">${esc(unit.ar)}</div>
      </div>
    </div>
    <div class="goals">${unit.goals.map((g) => `<span class="goal">${esc(g)}</span>`).join("")}</div>
    ${tabsHTML(UNIT_TABS, tab, `#/unit/${unit.id}`)}
    <div id="tabBody"></div>`;
  const body = document.getElementById("tabBody");

  if (tab === "cards") {
    renderCards(body, unit.vocab, {
      onComplete: () => mark(unit.id, { cards: true }),
      nextHref: `#/unit/${unit.id}/quiz`, nextLabel: "جاهز؟ إلى التمارين"
    });
  } else if (tab === "quiz") {
    const nextUnit = UNITS.find((u) => u.id === unit.id + 1);
    runQuiz(body, () => [...unit.quiz, ...vocabQuestions(unit.vocab, 5, ["listen", "meaning", "reverse"])], {
      onDone: (pct) => mark(unit.id, { best: pct }),
      best: () => bestOf(unit.id),
      actions: (pct) => nextUnit && pct >= 70
        ? `<a class="btn" href="#/unit/${nextUnit.id}">الوحدة التالية ${fa("fa-arrow-left")}</a>`
        : `<a class="btn" href="#/unit/${unit.id}/lesson">راجع الدرس</a>`
    });
  } else {
    renderLesson(unit, body);
  }
}

// ----- Lesson -----
function cell(c, tag) {
  if (!c) return `<${tag}></${tag}>`;
  return `<${tag}>${tag === "td" && !hasArabic(c) ? say(c) : esc(c)}</${tag}>`;
}
function renderLesson(unit, body) {
  const sections = unit.lessons.map((l) => `
    <article class="card">
      <h3>${esc(l.title)}</h3>
      ${l.text ? `<p>${l.text}</p>` : ""}
      ${l.table ? `<div class="table-wrap"><table>
        <tr>${l.table[0].map((c) => cell(c, "th")).join("")}</tr>
        ${l.table.slice(1).map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("")}
      </table></div>` : ""}
      ${l.examples ? `<ul class="examples">${l.examples.map(([es, ar]) => `<li>${say(es)}<span class="ex-ar">${esc(ar)}</span></li>`).join("")}</ul>` : ""}
    </article>`).join("");

  const alphabet = unit.alphabet ? `
    <article class="card">
      <h3>الأبجدية — El alfabeto</h3>
      <p>اضغط على أي حرف لسماع اسمه. ثم جرّب تهجئة اسمك: <span class="es">¿Cómo se escribe?</span></p>
      <div class="alpha">${ALPHABET.map(([l, n]) => `<button class="letter" data-say="${esc(n.split(" / ")[0])}"><b>${l}</b><small class="es">${esc(n)}</small></button>`).join("")}</div>
    </article>` : "";

  body.innerHTML = sections + alphabet + `
    <div class="center-actions">
      <a class="btn" href="#/unit/${unit.id}/cards">انتهيت من الدرس ${fa("fa-arrow-left")} البطاقات</a>
    </div>`;
  mark(unit.id, { lesson: true });
}

// ===== Flashcards (مشتركة بين الوحدات والمفردات) =====
function renderCards(body, vocab, { onComplete, nextHref, nextLabel }) {
  let deck = vocab.slice();
  let i = 0;

  body.innerHTML = `
    <div class="flash-wrap">
      <div class="flash" id="flash">
        <div class="flash-inner">
          <div class="face front"><div class="word es" id="fFront"></div><div class="hint">اضغط لقلب البطاقة</div></div>
          <div class="face back"><div class="word" id="fBack"></div><div class="hint es" id="fBackEs"></div></div>
        </div>
      </div>
      <div class="flash-ctrl">
        <button class="btn ghost" id="prev" title="السابق">${fa("fa-arrow-right")}</button>
        <button class="btn ghost" id="hear" title="استمع">${fa("fa-volume-high")}</button>
        <span class="counter" id="counter"></span>
        <button class="btn ghost" id="shuf" title="خلط">${fa("fa-shuffle")}</button>
        <button class="btn ghost" id="next" title="التالي">${fa("fa-arrow-left")}</button>
      </div>
    </div>
    <h3 class="section-title" style="margin-top:28px">كل الكلمات (${vocab.length})</h3>
    <div class="vocab-list">${vocab.map(([es, ar]) => `<div class="vocab-item">${say(es)}<span>${esc(ar)}</span></div>`).join("")}</div>
    <div class="center-actions"><a class="btn" href="${nextHref}">${nextLabel} ${fa("fa-arrow-left")}</a></div>`;

  const flash = document.getElementById("flash");
  const show = () => {
    const [es, ar] = deck[i];
    flash.classList.remove("flipped");
    document.getElementById("fFront").textContent = es;
    document.getElementById("fBack").textContent = ar;
    document.getElementById("fBackEs").textContent = es;
    document.getElementById("counter").textContent = `${i + 1} / ${deck.length}`;
    if (i === deck.length - 1) onComplete();
  };
  flash.onclick = () => flash.classList.toggle("flipped");
  document.getElementById("next").onclick = () => { i = (i + 1) % deck.length; show(); };
  document.getElementById("prev").onclick = () => { i = (i - 1 + deck.length) % deck.length; show(); };
  document.getElementById("hear").onclick = () => speak(deck[i][0]);
  document.getElementById("shuf").onclick = () => { deck = shuffle(deck); i = 0; show(); };
  show();
}

// ===== Quiz (مشترك) =====
// أسئلة تُولّد من المفردات: meaning (إسباني ← عربي)، reverse (عربي ← إسباني)، listen (استماع)
function vocabQuestions(vocab, n, types = ["meaning", "reverse", "listen"]) {
  return sample(vocab, n).map(([es, ar], k) => {
    const type = types[k % types.length];
    const others = sample(vocab.filter((v) => v[0] !== es && v[1] !== ar), 2);
    if (type === "reverse") return { type, q: ar, options: [es, ...others.map((v) => v[0])], a: 0, speakText: es };
    return { type, q: es, options: [ar, ...others.map((v) => v[1])], a: 0, speakText: es };
  });
}

function shuffleOptions(q) {
  if (!q.options) return q;
  const correct = q.options[q.a];
  const options = shuffle(q.options);
  return { ...q, options, a: options.indexOf(correct) };
}

const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,;:]/g, "").replace(/\s+/g, " ").trim();
const noAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
function checkWritten(input, answers) {
  const v = norm(input);
  if (answers.some((a) => norm(a) === v)) return "ok";
  if (answers.some((a) => noAccents(norm(a)) === noAccents(v))) return "accent";
  return "bad";
}

const QUIZ_LABELS = { mc: "اختر الإجابة الصحيحة", write: "اكتب الإجابة", meaning: "ما معنى هذه الكلمة؟", reverse: "اختر الكلمة الإسبانية", listen: "استمع واختر المعنى" };
const ACCENTS = ["á", "é", "í", "ó", "ú", "ñ", "ü"];

function runQuiz(body, makeQuestions, { onDone, best, actions }) {
  const qs = shuffle(makeQuestions()).map(shuffleOptions);
  let idx = 0, score = 0;

  function questionText(q) {
    if (q.type === "listen") return `<button class="listen-btn" data-say="${esc(q.q)}">${fa("fa-volume-high")}</button>`;
    if (q.type === "meaning") return `<div class="q-text">${say(q.q)}</div>`;
    return `<div class="q-text ${dirClass(q.q)}">${esc(q.q)}</div>`;
  }

  function show() {
    const q = qs[idx];
    body.innerHTML = `
      <div class="quiz card">
        <div class="progress"><div style="width:${(idx / qs.length) * 100}%"></div></div>
        <div class="q-type">سؤال ${idx + 1} من ${qs.length} · ${QUIZ_LABELS[q.type]}</div>
        ${questionText(q)}
        ${q.type === "write" ? `
          <input class="write-input" id="ans" autocomplete="off" spellcheck="false" placeholder="اكتب هنا...">
          <div class="accents">${ACCENTS.map((c) => `<button data-ch="${c}">${c}</button>`).join("")}</div>
          <div class="quiz-actions"><button class="btn" id="check">تحقق</button></div>
        ` : `<div class="options">${q.options.map((o, k) => `<button class="option ${dirClass(o)}" data-k="${k}">${esc(o)}</button>`).join("")}</div>`}
        <div id="fb"></div>
      </div>`;

    if (q.type === "listen") setTimeout(() => speak(q.q), 250);

    if (q.type === "write") {
      const input = document.getElementById("ans");
      input.focus();
      body.querySelectorAll("[data-ch]").forEach((b) => b.onclick = () => { input.value += b.dataset.ch; input.focus(); });
      const submit = () => {
        if (!input.value.trim()) return;
        const r = checkWritten(input.value, q.a);
        input.disabled = true;
        document.getElementById("check").remove();
        if (r !== "bad") score++;
        feedback(r === "bad" ? "bad" : "ok",
          r === "ok" ? `${fa("fa-check")} أحسنت!` : r === "accent" ? `${fa("fa-check")} صحيح، لكن انتبه للعلامات: <span class="es">${esc(q.a[0])}</span>` : `${fa("fa-xmark")} الإجابة الصحيحة: ${say(q.a[0])}`);
      };
      document.getElementById("check").onclick = submit;
      input.onkeydown = (e) => { if (e.key === "Enter") submit(); };
    } else {
      body.querySelectorAll(".option").forEach((btn) => btn.onclick = () => {
        const k = Number(btn.dataset.k);
        body.querySelectorAll(".option").forEach((b) => { b.disabled = true; });
        body.querySelector(`[data-k="${q.a}"]`).classList.add("correct");
        if (k === q.a) { score++; feedback("ok", `${fa("fa-check")} أحسنت!`); }
        else { btn.classList.add("wrong"); feedback("bad", `${fa("fa-xmark")} الإجابة الصحيحة: <b class="${dirClass(q.options[q.a])}">${esc(q.options[q.a])}</b>`); }
        if (q.speakText) speak(q.speakText);
      });
    }
  }

  function feedback(kind, html) {
    document.getElementById("fb").innerHTML = `
      <div class="feedback ${kind}">${html}</div>
      <div class="quiz-actions"><button class="btn" id="nextQ">${idx === qs.length - 1 ? "النتيجة" : `التالي ${fa("fa-arrow-left")}`}</button></div>`;
    const nextBtn = document.getElementById("nextQ");
    nextBtn.focus();
    nextBtn.onclick = () => { idx++; idx < qs.length ? show() : finish(); };
  }

  function finish() {
    const pct = Math.round((score / qs.length) * 100);
    onDone(pct);
    const [icon, msg] = pct >= 90 ? ["fa-trophy", "¡Excelente! ممتاز"]
      : pct >= 70 ? ["fa-star", "¡Muy bien! جيد جدًا"]
      : pct >= 50 ? ["fa-dumbbell", "¡Bien! راجع وحاول مجددًا"]
      : ["fa-book-open", "لا بأس، راجع الدرس والبطاقات ثم أعد المحاولة"];
    body.innerHTML = `
      <div class="quiz card result">
        <div class="score-icon">${fa(icon)}</div>
        <div class="score">${pct}%</div>
        <h3 style="color:var(--text)">${msg}</h3>
        <p>${score} إجابة صحيحة من ${qs.length} · أفضل نتيجة لك: ${best() || pct}%</p>
        <div class="quiz-actions" style="justify-content:center">
          <button class="btn ghost" id="again">${fa("fa-rotate-right")} أعد المحاولة</button>
          ${actions(pct)}
        </div>
      </div>`;
    document.getElementById("again").onclick = () => runQuiz(body, makeQuestions, { onDone, best, actions });
  }

  show();
}

// ===== بنك المفردات =====
function renderVocabHome() {
  const total = VOCAB_TOPICS.reduce((s, t) => s + t.vocab.length, 0);
  $app.innerHTML = `
    ${backLink("#/", "الرئيسية")}
    <div class="page-head">
      <h1>بنك المفردات</h1>
      <p>${total} كلمة وعبارة موزعة على ${VOCAB_TOPICS.length} موضوعًا من مواضيع اختبار DELE A1. احفظ كل موضوع بالبطاقات ثم اختبر نفسك.</p>
    </div>
    <div class="units">
      ${VOCAB_TOPICS.map((t) => itemCard(`#/vocab/${t.id}`, t.icon, `${t.vocab.length} كلمة`, t.es, t.ar, topicPercent(t.id))).join("")}
    </div>`;
}

function renderTopic(topic, tab) {
  $app.innerHTML = `
    ${backLink("#/vocab", "كل المواضيع")}
    <div class="unit-head">
      <div class="unit-icon">${fa(topic.icon)}</div>
      <div>
        <div class="unit-num">${topic.vocab.length} كلمة</div>
        <h1 class="es">${esc(topic.es)}</h1>
        <div class="unit-ar">${esc(topic.ar)}</div>
      </div>
    </div>
    ${tabsHTML([["cards", "fa-layer-group", "البطاقات"], ["quiz", "fa-pen-to-square", "اختبر نفسك"]], tab, `#/vocab/${topic.id}`)}
    <div id="tabBody"></div>`;
  const body = document.getElementById("tabBody");
  const key = "v:" + topic.id;
  if (tab === "quiz") {
    const idx = VOCAB_TOPICS.indexOf(topic);
    const next = VOCAB_TOPICS[idx + 1];
    runQuiz(body, () => vocabQuestions(topic.vocab, 12), {
      onDone: (pct) => mark(key, { best: pct }),
      best: () => bestOf(key),
      actions: () => next ? `<a class="btn" href="#/vocab/${next.id}">الموضوع التالي ${fa("fa-arrow-left")}</a>` : ""
    });
  } else {
    renderCards(body, topic.vocab, {
      onComplete: () => mark(key, { cards: true }),
      nextHref: `#/vocab/${topic.id}/quiz`, nextLabel: "اختبر نفسك"
    });
  }
}

// ===== DELE A1 =====
function renderDele(sub, item) {
  if (sub === "reading") return item !== undefined ? renderReadingItem(Number(item)) : renderPracticeList("reading");
  if (sub === "listening") return renderListeningPractice();
  if (sub === "writing") return item !== undefined ? renderWritingItem(Number(item)) : renderPracticeList("writing");
  if (sub === "oral") return item !== undefined ? renderOralItem(Number(item)) : renderPracticeList("oral");
  if (sub === "exam") return exam ? null : renderExamIntro();
  renderDeleHome();
}

function examTable() {
  return `
    <div class="table-wrap"><table>
      <tr><th>الجزء</th><th>المدة</th><th>النقاط</th><th>المجموعة</th></tr>
      ${DELE_INFO.map((s) => `<tr><td>${fa(s.icon)} ${s.ar}<br><small class="es muted">${s.es}</small></td><td>${s.min} دقيقة</td><td>25</td><td>${s.group}</td></tr>`).join("")}
    </table></div>
    <p class="note">${fa("fa-circle-info")} النجاح: <b>60 من 100</b> على الأقل، مع <b>30 من 50</b> على الأقل في كل مجموعة. المجموعة 1 = القراءة + الكتابة، والمجموعة 2 = الاستماع + المحادثة.</p>`;
}

function renderDeleHome() {
  const exams = progress.exams || [];
  const sections = [
    ["reading", "fa-book-open", "فهم المقروء", `${DELE_READING.length} نصوص بأسلوب الاختبار`],
    ["listening", "fa-headphones", "فهم المسموع", `${DELE_LISTENING.length} مقاطع صوتية`],
    ["writing", "fa-pen-nib", "التعبير الكتابي", `${DELE_WRITING.length} مهام مع نماذج إجابات`],
    ["oral", "fa-microphone", "التعبير الشفهي", `${DELE_ORAL.length} مواضيع مع إجابات مسموعة`]
  ];
  $app.innerHTML = `
    ${backLink("#/", "الرئيسية")}
    <div class="page-head">
      <h1>${fa("fa-award")} تحضير DELE A1</h1>
      <p>تدرّب على كل جزء من أجزاء الاختبار الرسمي، ثم قِس مستواك باختبار تجريبي كامل بالوقت الحقيقي.</p>
    </div>
    <article class="card"><h3>بنية الاختبار</h3>${examTable()}</article>
    <h2 class="section-title">التدريب حسب المهارة</h2>
    <div class="units">
      ${sections.map(([k, icon, ar, sub]) => `
        <a class="unit-card" href="#/dele/${k}">
          <div class="unit-icon">${fa(icon)}</div>
          <div class="unit-info"><div class="unit-es">${ar}</div><div class="unit-ar">${sub}</div></div>
        </a>`).join("")}
    </div>
    <a class="exam-cta" href="#/dele/exam">
      <div class="feature-icon">${fa("fa-stopwatch")}</div>
      <div><b>الاختبار التجريبي الكامل</b><span>4 أجزاء · 105 دقائق · نتيجة من 100</span></div>
      ${fa("fa-arrow-left")}
    </a>
    ${exams.length ? `
      <h2 class="section-title">نتائجك السابقة</h2>
      <div class="table-wrap card"><table>
        <tr><th>التاريخ</th><th>قراءة</th><th>استماع</th><th>كتابة</th><th>محادثة</th><th>المجموع</th><th></th></tr>
        ${exams.map((x) => `<tr><td>${x.date}</td><td>${x.reading}</td><td>${x.listening}</td><td>${x.writing}</td><td>${x.oral}</td><td><b>${x.total}</b></td><td>${x.pass ? `<span class="pass">APTO</span>` : `<span class="fail">NO APTO</span>`}</td></tr>`).join("")}
      </table></div>` : ""}`;
}

function renderPracticeList(kind) {
  const conf = {
    reading: { title: "فهم المقروء", icon: "fa-book-open", items: DELE_READING, sub: (r, i) => bestOf("r:" + i) !== undefined ? `أفضل نتيجة: ${bestOf("r:" + i)}%` : `${r.questions.length} أسئلة` },
    writing: { title: "التعبير الكتابي", icon: "fa-pen-nib", items: DELE_WRITING, sub: (w) => w.type === "form" ? "تعبئة استمارة" : `رسالة قصيرة (${w.words[0]}–${w.words[1]} كلمة)` },
    oral: { title: "التعبير الشفهي", icon: "fa-microphone", items: DELE_ORAL, sub: (o) => o.tarea }
  }[kind];
  const intro = {
    reading: "في الاختبار الحقيقي 4 مهام قراءة: رسالة أو نص قصير، لافتات وإعلانات، ومطابقة أشخاص مع إعلانات. اقرأ الأسئلة أولًا ثم ابحث عن الجواب في النص.",
    writing: "في الاختبار مهمتان: تعبئة استمارة، وكتابة رسالة قصيرة (20–30 كلمة تقريبًا). اكتب إجابتك ثم قارنها بالنموذج وراجع قائمة التحقق.",
    oral: "في الاختبار 4 مهام: تقديم نفسك، الحديث عن موضوع، محادثة مع الممتحِن، وحوار في موقف يومي. استمع إلى النموذج، سجّل صوتك، وتدرّب على الأسئلة."
  }[kind];
  $app.innerHTML = `
    ${backLink("#/dele", "تحضير DELE")}
    <div class="page-head"><h1>${fa(conf.icon)} ${conf.title}</h1><p>${intro}</p></div>
    <div class="units">
      ${conf.items.map((it, i) => `
        <a class="unit-card" href="#/dele/${kind}/${i}">
          <div class="unit-icon num-icon">${i + 1}</div>
          <div class="unit-info"><div class="unit-es es">${esc(it.title)}</div><div class="unit-ar">${esc(it.ar && kind === "oral" ? it.ar + " · " + conf.sub(it, i) : conf.sub(it, i))}</div></div>
        </a>`).join("")}
    </div>`;
}

// ----- MC sets (قراءة واستماع) -----
function mcSetHTML(questions, prefix) {
  return questions.map((q, i) => `
    <div class="mcq" data-mcq="${prefix}-${i}">
      <div class="mcq-q"><span class="q-num">${i + 1}</span> <span class="${dirClass(q.q)}">${esc(q.q)}</span></div>
      <div class="mcq-opts">${q.options.map((o, k) => `<button class="opt ${dirClass(o)}" data-k="${k}">${esc(o)}</button>`).join("")}</div>
    </div>`).join("");
}
function bindMC(container) {
  container.addEventListener("click", (e) => {
    const b = e.target.closest(".opt");
    if (!b || b.disabled) return;
    b.parentElement.querySelectorAll(".opt").forEach((x) => x.classList.remove("selected"));
    b.classList.add("selected");
  });
}
// يصحّح الأسئلة ويرجع التفاصيل. reveal = إظهار الصح والخطأ في الصفحة
function gradeMC(container, questions, prefix, reveal = true) {
  return questions.map((q, i) => {
    const box = container.querySelector(`[data-mcq="${prefix}-${i}"]`);
    const sel = box.querySelector(".opt.selected");
    const k = sel ? Number(sel.dataset.k) : -1;
    box.querySelectorAll(".opt").forEach((b) => { b.disabled = true; });
    if (reveal) {
      box.querySelector(`[data-k="${q.a}"]`).classList.add("correct");
      if (sel && k !== q.a) sel.classList.add("wrong");
    }
    return { q: q.q, your: k >= 0 ? q.options[k] : "—", correct: q.options[q.a], ok: k === q.a };
  });
}

function readingTextHTML(r) {
  if (r.kind === "notices") return `<div class="notices">${r.notices.map((n, i) => `<div class="notice es"><span class="badge">${i + 1}</span>${multiline(n)}</div>`).join("")}</div>`;
  if (r.kind === "ads") return `<div class="ads">${r.ads.map(([l, t]) => `<div class="ad es"><span class="badge">${l}</span>${esc(t)}</div>`).join("")}</div>`;
  return `<div class="reading-text es">${multiline(r.text)}</div>`;
}

function renderReadingItem(i) {
  const r = DELE_READING[i];
  if (!r) return renderPracticeList("reading");
  const next = DELE_READING[i + 1];
  $app.innerHTML = `
    ${backLink("#/dele/reading", "نصوص القراءة")}
    <div class="page-head"><h1 class="es">${esc(r.title)}</h1><p>${esc(r.ar)}</p></div>
    <article class="card">${readingTextHTML(r)}</article>
    <article class="card" id="qs">${mcSetHTML(r.questions, "r")}
      <div class="quiz-actions"><button class="btn" id="check">${fa("fa-check-double")} صحّح إجاباتي</button></div>
      <div id="fb"></div>
    </article>`;
  const box = document.getElementById("qs");
  bindMC(box);
  document.getElementById("check").onclick = (e) => {
    const res = gradeMC(box, r.questions, "r");
    const ok = res.filter((x) => x.ok).length;
    const pct = Math.round((ok / res.length) * 100);
    mark("r:" + i, { best: pct });
    e.target.remove();
    document.getElementById("fb").innerHTML = `
      <div class="feedback ${pct >= 60 ? "ok" : "bad"}">${ok} من ${res.length} صحيحة (${pct}%)</div>
      <div class="quiz-actions">
        <button class="btn ghost" onclick="route()">${fa("fa-rotate-right")} أعد المحاولة</button>
        ${next ? `<a class="btn" href="#/dele/reading/${i + 1}">النص التالي ${fa("fa-arrow-left")}</a>` : `<a class="btn" href="#/dele/listening">إلى الاستماع ${fa("fa-arrow-left")}</a>`}
      </div>`;
  };
}

// ----- Listening -----
function listenItemsHTML(items, prefix, { maxPlays, transcript }) {
  return items.map((it, i) => `
    <div class="listen-item">
      <button class="play-btn" data-play="${i}" ${maxPlays ? `data-left="${maxPlays}"` : ""}>${fa("fa-play")} <span>${maxPlays ? `استمع (${maxPlays})` : "استمع"}</span></button>
      ${mcSetHTML([it], `${prefix}${i}`).replace('<span class="q-num">1</span>', `<span class="q-num">${i + 1}</span>`)}
      ${transcript ? `<details class="transcript"><summary>النص المكتوب</summary>${it.lines.map(([, t]) => `<div>— ${say(t)}</div>`).join("")}</details>` : ""}
    </div>`).join("");
}
function bindListening(container, items) {
  bindMC(container);
  container.addEventListener("click", (e) => {
    const b = e.target.closest(".play-btn");
    if (!b || b.disabled) return;
    speakLines(items[Number(b.dataset.play)].lines);
    if (b.dataset.left) {
      const left = Number(b.dataset.left) - 1;
      b.dataset.left = left;
      b.querySelector("span").textContent = `استمع (${left})`;
      if (left <= 0) b.disabled = true;
    }
  });
}
function gradeListening(container, items, prefix, reveal) {
  return items.flatMap((it, i) => gradeMC(container, [it], `${prefix}${i}`, reveal));
}

function renderListeningPractice() {
  $app.innerHTML = `
    ${backLink("#/dele", "تحضير DELE")}
    <div class="page-head"><h1>${fa("fa-headphones")} فهم المسموع</h1>
      <p>اقرأ السؤال أولًا، ثم استمع إلى المقطع واختر الإجابة. في الاختبار الحقيقي تسمع كل مقطع مرتين فقط. هنا يمكنك الاستماع بلا حدود وقراءة النص بعد الإجابة.</p>
    </div>
    <article class="card" id="qs">
      ${listenItemsHTML(DELE_LISTENING, "l", { transcript: true })}
      <div class="quiz-actions"><button class="btn" id="check">${fa("fa-check-double")} صحّح إجاباتي</button></div>
      <div id="fb"></div>
    </article>`;
  const box = document.getElementById("qs");
  bindListening(box, DELE_LISTENING);
  document.getElementById("check").onclick = (e) => {
    const res = gradeListening(box, DELE_LISTENING, "l", true);
    const ok = res.filter((x) => x.ok).length;
    const pct = Math.round((ok / res.length) * 100);
    mark("l", { best: pct });
    e.target.remove();
    document.getElementById("fb").innerHTML = `
      <div class="feedback ${pct >= 60 ? "ok" : "bad"}">${ok} من ${res.length} صحيحة (${pct}%) · أفضل نتيجة: ${bestOf("l")}%</div>
      <div class="quiz-actions"><button class="btn ghost" onclick="route()">${fa("fa-rotate-right")} أعد المحاولة</button></div>`;
  };
}

// ----- Writing -----
function writingTaskHTML(w, prefix) {
  if (w.type === "form") {
    return `<div class="form-grid">${w.fields.map(([label, model], i) => `
      <label class="es">${esc(label)}
        ${model.length > 40 ? `<textarea class="field es" data-f="${prefix}${i}" rows="2"></textarea>` : `<input class="field es" data-f="${prefix}${i}" autocomplete="off">`}
      </label>`).join("")}</div>`;
  }
  return `
    <ul class="points">${w.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    <textarea class="field es letter-box" data-f="${prefix}text" rows="7" placeholder="Escribe aquí..."></textarea>
    <div class="wordcount" data-wc="${prefix}">0 كلمة · المطلوب ${w.words[0]}–${w.words[1]}</div>`;
}
function bindWordCount(container, w, prefix) {
  if (w.type !== "text") return;
  const ta = container.querySelector(`[data-f="${prefix}text"]`);
  const wc = container.querySelector(`[data-wc="${prefix}"]`);
  ta.addEventListener("input", () => {
    const n = wordCount(ta.value);
    wc.textContent = `${n} كلمة · المطلوب ${w.words[0]}–${w.words[1]}`;
    wc.classList.toggle("ok", n >= w.words[0] && n <= w.words[1]);
  });
}
function writingModelHTML(w) {
  if (w.type === "form") {
    return `<div class="table-wrap"><table><tr><th>الحقل</th><th>نموذج إجابة</th></tr>
      ${w.fields.map(([l, m]) => `<tr><td class="es">${esc(l)}</td><td>${say(m)}</td></tr>`).join("")}</table></div>`;
  }
  return `<div class="reading-text es model">${multiline(w.model)}</div>
    <p class="muted">عدد كلمات النموذج: ${wordCount(w.model)}</p>`;
}

function renderWritingItem(i) {
  const w = DELE_WRITING[i];
  if (!w) return renderPracticeList("writing");
  const next = DELE_WRITING[i + 1];
  $app.innerHTML = `
    ${backLink("#/dele/writing", "مهام الكتابة")}
    <div class="page-head"><h1 class="es">${esc(w.title)}</h1><p>${esc(w.ar)}</p></div>
    <article class="card" id="task">
      ${writingTaskHTML(w, "w")}
      <div class="accents">${ACCENTS.map((c) => `<button data-ch="${c}">${c}</button>`).join("")}</div>
      <div class="quiz-actions"><button class="btn" id="compare">${fa("fa-scale-balanced")} قارن بالنموذج</button></div>
    </article>
    <div id="model"></div>`;
  const task = document.getElementById("task");
  bindWordCount(task, w, "w");
  let lastField = null;
  task.addEventListener("focusin", (e) => { if (e.target.matches(".field")) lastField = e.target; });
  task.querySelectorAll("[data-ch]").forEach((b) => b.onclick = () => { if (lastField) { lastField.value += b.dataset.ch; lastField.focus(); lastField.dispatchEvent(new Event("input")); } });
  document.getElementById("compare").onclick = () => {
    document.getElementById("model").innerHTML = `
      <article class="card">
        <h3>${fa("fa-lightbulb")} نموذج إجابة</h3>
        ${writingModelHTML(w)}
        <h3 style="margin-top:14px">${fa("fa-list-check")} قائمة التحقق</h3>
        <div class="checklist">${w.checklist.map((c) => `<label><input type="checkbox"> ${esc(c)}</label>`).join("")}</div>
        <p class="muted">إجابتك لا تحتاج أن تطابق النموذج. المهم أن تغطي كل المطلوب بجمل صحيحة.</p>
        <div class="quiz-actions">${next ? `<a class="btn" href="#/dele/writing/${i + 1}">المهمة التالية ${fa("fa-arrow-left")}</a>` : `<a class="btn" href="#/dele/oral">إلى المحادثة ${fa("fa-arrow-left")}</a>`}</div>
      </article>`;
    document.getElementById("model").scrollIntoView({ behavior: "smooth" });
  };
}

// ----- Oral -----
function renderOralItem(i) {
  const o = DELE_ORAL[i];
  if (!o) return renderPracticeList("oral");
  const next = DELE_ORAL[i + 1];
  $app.innerHTML = `
    ${backLink("#/dele/oral", "مواضيع المحادثة")}
    <div class="page-head"><h1 class="es">${esc(o.title)}</h1><p>${esc(o.ar)} · ${esc(o.tarea)}</p></div>
    <article class="card">
      <h3>${fa("fa-list-ul")} ماذا تقول؟</h3>
      <ul class="points">${o.guide.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
      <p class="muted">حضّر إجابتك ثم سجّل نفسك وأنت تتكلم، واستمع للتسجيل قبل أن تسمع النموذج.</p>
      ${recorderHTML()}
    </article>
    <article class="card">
      <h3>${fa("fa-volume-high")} النموذج</h3>
      <button class="btn ghost" id="playAll">${fa("fa-play")} استمع للنموذج كاملًا</button>
      <ul class="examples">${o.model.map((s) => `<li>${say(s)}</li>`).join("")}</ul>
    </article>
    <article class="card" id="stepper"></article>
    ${next ? `<div class="center-actions"><a class="btn" href="#/dele/oral/${i + 1}">الموضوع التالي ${fa("fa-arrow-left")}</a></div>` : ""}`;
  document.getElementById("playAll").onclick = () => speakLines(o.model.map((s, n) => [s.startsWith("—") && n % 2 ? "B" : "A", s]));

  let k = 0;
  const step = document.getElementById("stepper");
  const showQ = () => {
    const [q, a] = o.questions[k];
    step.innerHTML = `
      <h3>${fa("fa-comments")} تدرّب على الأسئلة (${k + 1} / ${o.questions.length})</h3>
      <p class="muted">استمع إلى السؤال وأجب بصوت عالٍ، ثم قارن إجابتك بالنموذج.</p>
      <div class="q-text">${say(q)}</div>
      ${recorderHTML()}
      <div id="ansBox"></div>
      <div class="quiz-actions">
        <button class="btn ghost" id="reveal">${fa("fa-eye")} أظهر الإجابة النموذجية</button>
        <button class="btn" id="nextQ">${k === o.questions.length - 1 ? `${fa("fa-rotate-right")} من البداية` : `التالي ${fa("fa-arrow-left")}`}</button>
      </div>`;
    setTimeout(() => speak(q), 250);
    document.getElementById("reveal").onclick = (e) => {
      document.getElementById("ansBox").innerHTML = `<div class="feedback ok">${say(a)}</div>`;
      speak(a);
      e.target.remove();
    };
    document.getElementById("nextQ").onclick = () => { k = (k + 1) % o.questions.length; showQ(); };
  };
  showQ();
}

// ===== الاختبار التجريبي =====
function renderExamIntro() {
  $app.innerHTML = `
    ${backLink("#/dele", "تحضير DELE")}
    <div class="page-head"><h1>${fa("fa-stopwatch")} الاختبار التجريبي الكامل</h1>
      <p>محاكاة لاختبار DELE A1 بنفس الأجزاء والأوقات ونظام النقاط.</p></div>
    <article class="card"><h3>بنية الاختبار</h3>${examTable()}</article>
    <article class="card">
      <h3>${fa("fa-circle-exclamation")} قبل أن تبدأ</h3>
      <ul class="points">
        <li>المدة الكلية حوالي <b>105 دقائق</b>. خصّص وقتًا بدون مقاطعة.</li>
        <li>لكل جزء مؤقت، وعند انتهاء الوقت ينتقل الاختبار تلقائيًا للجزء التالي.</li>
        <li>في الاستماع تسمع كل مقطع <b>مرتين فقط</b> كما في الاختبار الحقيقي.</li>
        <li>القراءة والاستماع تُصحّح تلقائيًا. الكتابة والمحادثة تقيّمها أنت بمعايير واضحة، فكن صادقًا مع نفسك.</li>
        <li>للمحادثة تحتاج ميكروفونًا للتسجيل، أو تكلّم بصوت عالٍ بدونه.</li>
        <li>لا تخرج من الصفحة أثناء الاختبار، وإلا ستفقد تقدمك.</li>
      </ul>
      <div class="quiz-actions"><button class="btn" id="start">${fa("fa-play")} ابدأ الاختبار</button></div>
    </article>`;
  document.getElementById("start").onclick = startExam;
}

function startExam() {
  exam = { section: 0, scores: {}, review: {}, timer: null };
  window.onbeforeunload = (e) => { e.preventDefault(); e.returnValue = ""; };
  runExamSection();
}
function stopTimer() { if (exam && exam.timer) { clearInterval(exam.timer); exam.timer = null; } }
function abandonExam() { stopTimer(); exam = null; window.onbeforeunload = null; }

function startTimer(seconds, onEnd) {
  const end = Date.now() + seconds * 1000;
  const tick = () => {
    const left = Math.max(0, Math.round((end - Date.now()) / 1000));
    const el = document.getElementById("timer");
    if (el) {
      el.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
      el.parentElement.classList.toggle("low", left <= 60);
    }
    if (left <= 0) { stopTimer(); onEnd(true); }
  };
  tick();
  exam.timer = setInterval(tick, 1000);
}

function examShell(info, bodyHTML, { timer = true, finishLabel = "إنهاء هذا الجزء" } = {}) {
  $app.innerHTML = `
    <div class="exam-bar">
      <div><small>الجزء ${exam.section + 1} من 4</small><b>${fa(info.icon)} ${info.ar}</b></div>
      ${timer ? `<div class="timer">${fa("fa-clock")} <span id="timer">--:--</span></div>` : `<div class="timer">${fa("fa-user-check")} تقييم ذاتي</div>`}
    </div>
    <div id="examBody">${bodyHTML}</div>
    <div class="center-actions"><button class="btn" id="finishSec">${finishLabel} ${fa("fa-arrow-left")}</button></div>`;
  window.scrollTo(0, 0);
}

function runExamSection() {
  const info = DELE_INFO[exam.section];
  const E = DELE_EXAM;

  if (info.key === "reading") {
    examShell(info, E.reading.map((r, ti) => `
      <article class="card">
        <h3 class="es">${esc(r.title)}</h3><p>${esc(r.ar)}</p>
        ${readingTextHTML(r)}
        <div class="exam-qs">${mcSetHTML(r.questions, "x" + ti)}</div>
      </article>`).join(""));
    const body = document.getElementById("examBody");
    bindMC(body);
    const finish = () => {
      stopTimer();
      const res = E.reading.flatMap((r, ti) => gradeMC(body, r.questions, "x" + ti, false));
      endAutoSection("reading", res);
    };
    document.getElementById("finishSec").onclick = () => confirmFinish(finish);
    startTimer(info.min * 60, finish);
  }

  if (info.key === "listening") {
    examShell(info, `<article class="card"><p>${fa("fa-circle-info")} اقرأ كل سؤال قبل الاستماع. يمكنك سماع كل مقطع مرتين فقط.</p>
      ${listenItemsHTML(E.listening, "xl", { maxPlays: 2 })}</article>`);
    const body = document.getElementById("examBody");
    bindListening(body, E.listening);
    const finish = () => {
      stopTimer();
      speechSynthesis.cancel();
      endAutoSection("listening", gradeListening(body, E.listening, "xl", false));
    };
    document.getElementById("finishSec").onclick = () => confirmFinish(finish);
    startTimer(info.min * 60, finish);
  }

  if (info.key === "writing") {
    examShell(info, E.writing.map((w, ti) => `
      <article class="card" data-task="${ti}">
        <h3 class="es">${esc(w.title)}</h3><p>${esc(w.ar)}</p>
        ${writingTaskHTML(w, "xw" + ti)}
      </article>`).join(""));
    const body = document.getElementById("examBody");
    E.writing.forEach((w, ti) => bindWordCount(body, w, "xw" + ti));
    const finish = () => {
      stopTimer();
      const answers = E.writing.map((w, ti) => w.type === "form"
        ? w.fields.map((_, fi) => body.querySelector(`[data-f="xw${ti}${fi}"]`).value.trim())
        : body.querySelector(`[data-f="xw${ti}text"]`).value.trim());
      selfAssessWriting(answers);
    };
    document.getElementById("finishSec").onclick = () => confirmFinish(finish);
    startTimer(info.min * 60, finish);
  }

  if (info.key === "oral") {
    examShell(info, E.oral.tasks.map((t) => `
      <article class="card">
        <h3 class="es">${esc(t.title)}</h3><p>${esc(t.ar)}</p>
        ${t.points ? `<ul class="points">${t.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        ${t.questions ? `<div class="exam-oral-qs">${t.questions.map((q, i) => `<button class="btn ghost" data-say="${esc(q)}">${fa("fa-volume-high")} السؤال ${i + 1}</button>`).join("")}</div>` : ""}
        ${recorderHTML()}
      </article>`).join(""));
    const finish = () => {
      stopTimer();
      speechSynthesis.cancel();
      // ننتظر حفظ التسجيل الجاري قبل الانتقال للتقييم
      if (mediaRec && mediaRec.state === "recording") { mediaRec.stop(); setTimeout(selfAssessOral, 400); }
      else selfAssessOral();
    };
    document.getElementById("finishSec").onclick = () => confirmFinish(finish);
    startTimer(info.min * 60, finish);
  }
}

function confirmFinish(fn) {
  if (confirm("هل تريد إنهاء هذا الجزء؟ لا يمكنك الرجوع إليه.")) fn(false);
}

function endAutoSection(key, res) {
  const ok = res.filter((x) => x.ok).length;
  exam.scores[key] = round1((ok / res.length) * 25);
  exam.review[key] = res;
  nextSection();
}

function nextSection() {
  exam.section++;
  if (exam.section < DELE_INFO.length) runExamSection();
  else showExamResults();
}

function rubricHTML(rubric, prefix, prechecked = []) {
  return `<div class="checklist rubric">${rubric.map(([t, pts], i) => `
    <label><input type="checkbox" data-r="${prefix}" data-pts="${pts}" ${prechecked.includes(i) ? "checked" : ""}> ${esc(t)} <span class="pts">${pts} نقاط</span></label>`).join("")}</div>`;
}
const rubricSum = (root, prefix) => [...root.querySelectorAll(`[data-r="${prefix}"]:checked`)].reduce((s, c) => s + Number(c.dataset.pts), 0);

function selfAssessWriting(answers) {
  const info = DELE_INFO[exam.section];
  examShell(info, `
    <article class="card"><p>${fa("fa-circle-info")} انتهى وقت الكتابة. قارن إجاباتك بالنموذج، ثم ضع علامة على كل معيار حققته. كن صادقًا: الهدف أن تعرف مستواك الحقيقي.</p></article>
    ${DELE_EXAM.writing.map((w, ti) => {
      const ans = answers[ti];
      const n = w.type === "text" ? wordCount(ans) : 0;
      const pre = w.type === "text" && n >= w.words[0] - 3 && n <= w.words[1] + 5 ? [1] : [];
      return `
      <article class="card">
        <h3 class="es">${esc(w.title)}</h3>
        <div class="compare">
          <div><h4>إجابتك</h4>${w.type === "form"
            ? `<div class="table-wrap"><table>${w.fields.map(([l], fi) => `<tr><td class="es">${esc(l)}</td><td class="es">${esc(ans[fi] || "—")}</td></tr>`).join("")}</table></div>`
            : `<div class="reading-text es">${multiline(ans || "—")}</div><p class="muted">${n} كلمة</p>`}</div>
          <div><h4>النموذج</h4>${writingModelHTML(w)}</div>
        </div>
        ${rubricHTML(w.rubric, "w" + ti, pre)}
      </article>`;
    }).join("")}`, { timer: false, finishLabel: "تأكيد التقييم" });
  document.getElementById("finishSec").onclick = () => {
    const body = document.getElementById("examBody");
    exam.scores.writing = DELE_EXAM.writing.reduce((s, _, ti) => s + rubricSum(body, "w" + ti), 0);
    nextSection();
  };
}

function selfAssessOral() {
  const info = DELE_INFO[exam.section];
  const recs = [...document.querySelectorAll(".recorder audio")].filter((a) => !a.hidden).map((a) => a.src);
  examShell(info, `
    <article class="card">
      <p>${fa("fa-circle-info")} استمع إلى تسجيلاتك${recs.length ? "" : " (لم تسجّل شيئًا، فقيّم نفسك حسب ما قلته)"} ثم ضع علامة على كل معيار حققته.</p>
      ${recs.map((src, i) => `<div class="rec-review"><span>تسجيل ${i + 1}</span><audio controls src="${src}"></audio></div>`).join("")}
    </article>
    <article class="card">${rubricHTML(DELE_EXAM.oral.rubric, "o")}</article>`, { timer: false, finishLabel: "تأكيد التقييم وعرض النتيجة" });
  document.getElementById("finishSec").onclick = () => {
    exam.scores.oral = rubricSum(document.getElementById("examBody"), "o");
    nextSection();
  };
}

function showExamResults() {
  const s = exam.scores;
  const g1 = round1(s.reading + s.writing);
  const g2 = round1(s.listening + s.oral);
  const total = round1(g1 + g2);
  const pass = total >= 60 && g1 >= 30 && g2 >= 30;
  const review = exam.review;
  progress.exams = [{ date: new Date().toLocaleDateString("ar"), reading: s.reading, listening: s.listening, writing: s.writing, oral: s.oral, total, pass }, ...(progress.exams || [])].slice(0, 10);
  saveProgress();
  abandonExam();

  const wrongList = (key, title) => {
    const wrong = review[key].filter((x) => !x.ok);
    if (!wrong.length) return `<p>${fa("fa-check")} ${title}: كل إجاباتك صحيحة!</p>`;
    return `<h4>${title}: ${wrong.length} أخطاء</h4>
      <div class="table-wrap"><table><tr><th>السؤال</th><th>إجابتك</th><th>الصحيح</th></tr>
      ${wrong.map((w) => `<tr><td class="es">${esc(w.q)}</td><td class="es wrong-txt">${esc(w.your)}</td><td class="es ok-txt">${esc(w.correct)}</td></tr>`).join("")}</table></div>`;
  };
  const tip = !pass ? (g1 < 30 ? "ركّز على القراءة والكتابة: اقرأ نصوصًا قصيرة كل يوم واكتب رسائل من 30 كلمة." : g2 < 30 ? "ركّز على الاستماع والمحادثة: استمع يوميًا وسجّل نفسك وأنت تجيب عن أسئلة الامتحان." : "أنت قريب! راجع الأجزاء الأضعف وأعد الاختبار بعد أسبوع.") : "مستواك جيد للاختبار. استمر في التدرب وأعد الاختبار التجريبي قبل موعد الاختبار الحقيقي.";

  $app.innerHTML = `
    ${backLink("#/dele", "تحضير DELE")}
    <article class="card result">
      <div class="score-icon">${fa(pass ? "fa-trophy" : "fa-chart-line")}</div>
      <div class="score">${total} / 100</div>
      <h2 class="${pass ? "pass" : "fail"} verdict">${pass ? "APTO — ناجح" : "NO APTO — لم تنجح بعد"}</h2>
      <p>${tip}</p>
    </article>
    <article class="card">
      <div class="table-wrap"><table>
        <tr><th>الجزء</th><th>النتيجة</th></tr>
        <tr><td>${fa("fa-book-open")} القراءة</td><td>${s.reading} / 25</td></tr>
        <tr><td>${fa("fa-pen-nib")} الكتابة</td><td>${s.writing} / 25</td></tr>
        <tr class="group-row ${g1 >= 30 ? "ok-row" : "bad-row"}"><td>المجموعة 1 (يلزم 30)</td><td>${g1} / 50</td></tr>
        <tr><td>${fa("fa-headphones")} الاستماع</td><td>${s.listening} / 25</td></tr>
        <tr><td>${fa("fa-microphone")} المحادثة</td><td>${s.oral} / 25</td></tr>
        <tr class="group-row ${g2 >= 30 ? "ok-row" : "bad-row"}"><td>المجموعة 2 (يلزم 30)</td><td>${g2} / 50</td></tr>
      </table></div>
      <p class="note">${fa("fa-circle-info")} نتيجة الكتابة والمحادثة مبنية على تقييمك الذاتي، فهي تقريبية.</p>
    </article>
    <article class="card">
      <h3>${fa("fa-magnifying-glass")} مراجعة الأخطاء</h3>
      ${wrongList("reading", "القراءة")}
      ${wrongList("listening", "الاستماع")}
    </article>
    <div class="center-actions">
      <a class="btn ghost" href="#/dele">العودة إلى DELE</a>
      <button class="btn" id="retry">${fa("fa-rotate-right")} أعد الاختبار</button>
    </div>`;
  document.getElementById("retry").onclick = renderExamIntro;
}

updateOverall();
route();

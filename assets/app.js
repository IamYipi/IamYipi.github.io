(() => {
  "use strict";

  const GH = window.GH;
  const C = window.CONTENT;
  const $ = (sel) => document.querySelector(sel);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lang = "es";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") lang = saved;
  } catch (_) { /* storage blocked: keep default */ }

  const t = (key) => C.i18n[lang][key] ?? C.i18n.es[key] ?? key;
  const fmt = (n) => new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-GB").format(n);
  const kfmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "")}k` : String(n));
  const pick = (obj, base) => (lang === "en" ? obj[`${base}En`] ?? obj[base] : obj[base]);

  // Tiny element builder: h("p", { class: "x" }, "text", child)
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }

  const fill = (sel, ...nodes) => $(sel).replaceChildren(...nodes.flat());

  function pips(counts, label) {
    const items = [];
    for (const [cls, n] of counts) for (let i = 0; i < n; i++) items.push(h("i", { class: cls }));
    return h("span", { class: "pips", role: "img", "aria-label": label }, items);
  }

  // ---------- static strings ----------
  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    const btn = $("#lang");
    btn.setAttribute("aria-label", t("hud.lang"));
    btn.querySelectorAll("[data-l]").forEach((s) => s.classList.toggle("on", s.dataset.l === lang));
    $("#sprite-toggle").textContent = t($("#sprite").classList.contains("hd") ? "title.px" : "title.hd");
  }

  // ---------- HUD + title ----------
  function renderHud() {
    $("#hud-login").textContent = GH.user.login;
    $("#hud-score").textContent = String(GH.totals.contributions).padStart(6, "0");
    $("#title-name").textContent = GH.user.name;
    $("#year-now").textContent = GH.generatedAt.slice(0, 4);
  }

  // ---------- Player ----------
  function renderPlayer() {
    $("#who-guild").textContent = C.guild;
    $("#who-base").textContent = C.base[lang];
    $("#who-since").textContent = GH.user.since.slice(0, 4);
    $("#who-profile").href = GH.user.url;

    const T = GH.totals;
    const rows = [
      ["stat.contributions", T.contributions],
      ["stat.orgCommits", T.orgCommits],
      ["stat.prs", T.prsAuthored],
      ["stat.ossMerged", T.ossMerged],
      ["stat.repos", T.reposWorked],
      ["stat.followers", GH.user.followers],
    ];
    fill("#stats", rows.map(([k, v]) => h("div", {}, h("dt", {}, t(k)), h("dd", {}, fmt(v)))));
  }

  // ---------- Inventory ----------
  function renderSkills() {
    const names = C.languageNames || {};
    fill("#bars", GH.languages.map((l) => {
      const on = Math.max(1, Math.round(l.pct / 5));
      const segs = Array.from({ length: 20 }, (_, i) => h("i", { class: i < on ? (i === on - 1 ? "on tip" : "on") : null }));
      const name = names[l.name] || l.name;
      return h("li", {},
        h("span", { class: "name" }, name),
        h("span", { class: "bar", role: "img", "aria-label": `${name} ${fmt(l.pct)} %` }, segs),
        h("span", { class: "pct" }, `${fmt(l.pct)}%`));
    }));

    const shown = new Set(GH.languages.map((l) => l.name));
    fill("#langs-extra", C.languagesExtra.filter((l) => !shown.has(l)).map((l) => h("li", { class: "chip" }, l)));

    fill("#stack", C.stack.map((g) => h("div", { class: "stack-group" },
      h("h4", { class: "sub" }, g[lang]),
      h("ul", { class: "chips" }, (lang === "en" && g.itemsEn ? g.itemsEn : g.items).map((i) => h("li", { class: "chip" }, i))))));
  }

  // ---------- Worlds ----------
  function renderWorlds() {
    fill("#worlds-list", C.worlds.map((w) => {
      const ids = w.ids || [w.id];
      const xp = ids.reduce((acc, id) => {
        const p = GH.projects[id];
        if (p) { acc.commits += p.commits; acc.prs += p.prs; }
        return acc;
      }, { commits: 0, prs: 0 });

      return h("article", { class: `win world${w.big ? " big" : ""}` },
        h("p", { class: "world-tags" },
          h("span", { class: "tag" }, w.funder),
          h("span", { class: "tag lock" }, t("worlds.private"))),
        h("h3", { class: "world-name" }, pick(w, "name")),
        h("p", { class: "world-desc" }, w[lang]),
        h("ul", { class: "chips" }, w.tech.map((x) => h("li", { class: "chip" }, x))),
        xp.commits ? h("div", { class: "xp" },
          h("p", {}, h("strong", {}, fmt(xp.commits)), t("worlds.commits")),
          xp.prs ? h("p", {}, h("strong", {}, fmt(xp.prs)), t("worlds.prs")) : null) : null);
    }));

    $("#own-private").textContent = GH.totals.ownPrivate;
    fill("#personal", C.personal.map((p) => h("li", {},
      h("span", { class: "label" }, `${p[lang]} (${p.n})`),
      pips([["", p.n]], `${p.n}`))));

    fill("#public", GH.public.map((r) => h("li", {},
      h("a", { href: r.url },
        h("span", { class: "cart-name" }, r.name),
        h("span", { class: "cart-lang" }, r.language || "Config"),
        r.description ? h("span", { class: "cart-desc" }, r.description) : null))));
  }

  // ---------- Open-source quests ----------
  function renderQuests() {
    const T = GH.totals;
    const score = (cls, n, key) => h("div", { class: `score ${cls}` }, h("strong", {}, n), h("span", {}, t(key)));
    fill("#scoreboard",
      score("", fmt(T.ossPRs), "quests.sent"),
      score("", fmt(T.ossMerged), "quests.merged"),
      score("", fmt(T.ossRepos), "quests.repos"),
      score("stars", `${kfmt(T.ossStars)}★`, "quests.stars"));

    const order = { merged: 0, open: 1, closed: 2 };
    fill("#quest-list", GH.oss.map((o) => {
      const prs = [...o.prs].sort((a, b) => order[a.state] - order[b.state] || b.date.localeCompare(a.date));
      const label = `${o.merged} ${t("quests.state.merged")}, ${o.open} ${t("quests.state.open")}, ${o.closed} ${t("quests.state.closed")}`;
      return h("li", { class: "win quest" },
        h("div", { class: "quest-head" },
          h("h3", { class: "quest-name" }, h("a", { href: o.url }, o.repo)),
          h("p", { class: "quest-meta" },
            h("span", { class: "star" }, `★ ${kfmt(o.stars)}`),
            o.language ? h("span", {}, o.language) : null)),
        o.description ? h("p", { class: "quest-desc" }, o.description) : null,
        pips([["", o.merged], ["open", o.open], ["closed", o.closed]], label),
        h("ul", { class: "prs" }, prs.map((p) => h("li", { class: p.state },
          h("span", { class: `state ${p.state}` }, t(`quests.state.${p.state}`)),
          h("a", { href: p.url }, p.title, " ", h("span", { class: "num" }, `#${p.number}`))))));
    }));
  }

  // ---------- Saves ----------
  function renderSaves() {
    const byYear = Object.fromEntries(GH.years.map((y) => [y.year, y.total]));
    fill("#timeline", C.timeline.map((s) => h("li", {},
      h("p", { class: "save-year" }, s.year,
        byYear[s.year] != null ? h("span", { class: "save-xp" }, `${fmt(byYear[s.year])} ${t("saves.contrib")}`) : null),
      h("p", { class: "save-text" }, s[lang]))));

    const cal = GH.calendar;
    $("#heat-total").textContent = `${fmt(cal.total)} ${t("saves.contrib")}`;
    const heat = $("#heat");
    heat.setAttribute("aria-label", `${fmt(cal.total)} ${t("saves.contrib")}, ${t("saves.heat").toLowerCase()}`);
    const cells = [];
    cal.weeks.forEach((week, wi) => {
      // First week may start mid-week: pad so weekdays stay in their rows.
      if (wi === 0) for (let i = 0; i < 7 - week.length; i++) cells.push(h("i", { style: "visibility:hidden" }));
      week.forEach(([date, count, level]) => cells.push(h("i", { class: `l${level}`, title: `${date}: ${count}` })));
    });
    heat.replaceChildren(...cells);
    const scroller = heat.parentElement;
    scroller.scrollLeft = scroller.scrollWidth;
  }

  function renderFooter() {
    const el = $("#generated");
    el.dateTime = GH.generatedAt;
    el.textContent = new Date(`${GH.generatedAt}T12:00:00`).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    if (C.links?.bisite) $("#link-bisite").href = C.links.bisite;
  }

  function render() {
    applyI18n();
    renderHud();
    renderPlayer();
    renderSkills();
    renderWorlds();
    renderQuests();
    renderSaves();
    renderFooter();
  }

  // ---------- Avatar: SNES-style mosaic on load, HD toggle on demand ----------
  const AVATAR = (size) => `${GH.user.avatar.split("?")[0]}?s=${size}&v=4`;
  const sprite = $("#sprite");

  function mosaicIn() {
    const steps = [6, 12, 24, 48];
    if (reduceMotion) { sprite.src = AVATAR(48); return; }
    steps.forEach((s) => { new Image().src = AVATAR(s); });
    steps.forEach((s, i) => setTimeout(() => { sprite.src = AVATAR(s); }, 160 * i));
  }

  $("#sprite-toggle").addEventListener("click", () => {
    const hd = sprite.classList.toggle("hd");
    sprite.src = AVATAR(hd ? 400 : 48);
    $("#sprite-toggle").textContent = t(hd ? "title.px" : "title.hd");
  });

  $("#lang").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    try { localStorage.setItem("lang", lang); } catch (_) { /* ignore */ }
    render();
  });

  // ---------- Highlight the section in view ----------
  const navLinks = [...document.querySelectorAll(".hud-nav a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute("aria-current", a.hash === `#${e.target.id}` ? "true" : "false"));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main > section").forEach((s) => io.observe(s));

  render();
  mosaicIn();
})();

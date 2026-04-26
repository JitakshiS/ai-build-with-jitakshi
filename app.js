/* =========================================================
   Build with AI — interactions
   ========================================================= */

/* ---------- Ambient canvas (subtle particle field) ---------- */
(function ambientCanvas() {
  const canvas = document.getElementById('ambient');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let particles = [];
  let intensity = 1; // tweakable
  let mouseX = -9999, mouseY = -9999;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  function init() {
    resize();
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.2 + 0.4) * dpr,
        hue: Math.random() < 0.15 ? 'rose' : 'ink',
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    if (intensity === 0) { requestAnimationFrame(draw); return; }
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8ff00';

    for (let p of particles) {
      p.x += p.vx * intensity;
      p.y += p.vy * intensity;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = p.hue === 'rose' ? 'rgba(255, 91, 138, 0.5)' : 'rgba(10,10,10,0.45)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // connect close ones
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx*dx + dy*dy;
        const lim = (110 * dpr) ** 2;
        if (d2 < lim) {
          const op = (1 - d2/lim) * 0.12;
          ctx.strokeStyle = `rgba(10, 10, 10, ${op})`;
          ctx.lineWidth = dpr * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', init);
  init(); draw();

  window.__setAmbientIntensity = (v) => { intensity = v; };
})();


/* ---------- Reveal on scroll ---------- */
(function reveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();


/* ---------- Scene 2: Lovable typing prompt ---------- */
(function lovableBuild() {
  const promptEl = document.querySelector('.lovable .prompt .typed');
  const previewEl = document.querySelector('.lovable .preview');
  if (!promptEl || !previewEl) return;

  const text = "Build me a vacation request tracker — employees submit a request, managers approve, with a calendar view and email notifications.";
  let started = false;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        let i = 0;
        const tick = () => {
          if (i <= text.length) {
            promptEl.textContent = text.slice(0, i);
            i++;
            setTimeout(tick, 22 + Math.random() * 30);
          } else {
            // reveal preview
            setTimeout(() => previewEl.classList.add('fade-in'), 400);
          }
        };
        tick();
      }
    });
  }, { threshold: 0.3 });
  io.observe(promptEl.closest('.scene'));
})();


/* ---------- Scene 3: Claude Code terminal lines ---------- */
(function terminalLines() {
  const term = document.querySelector('.terminal');
  if (!term) return;
  const lines = term.querySelectorAll('.line');
  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        lines.forEach((l, i) => {
          setTimeout(() => {
            l.style.transition = 'opacity .3s, transform .3s';
            l.style.opacity = '1';
            l.style.transform = 'translateY(0)';
          }, i * 280);
        });
      }
    });
  }, { threshold: 0.3 });
  io.observe(term);
})();


/* ---------- Scene 4: Deploy rows progressive check ---------- */
(function deployFlow() {
  const rows = document.querySelectorAll('.deploy .row .check.pending');
  if (!rows.length) return;
  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        rows.forEach((c, i) => {
          setTimeout(() => {
            c.classList.remove('pending');
            c.textContent = '✓';
          }, 600 + i * 700);
        });
      }
    });
  }, { threshold: 0.3 });
  io.observe(document.querySelector('.deploy'));
})();


/* ---------- Use case department switcher ---------- */
(function useCases() {
  const tabs = document.querySelectorAll('.use-tab');
  const grid = document.getElementById('use-grid');
  if (!tabs.length || !grid) return;

  const data = {
    HR: [
      { role: "PEOPLE OPS", built: "Onboarding companion bot", desc: "New hires get a Slack-native chatbot that answers benefits, IT, and policy questions trained on your handbook.", stack: ["Lovable", "Claude API"] },
      { role: "RECRUITING", built: "Resume triage assistant", desc: "Pre-screens applications against a role rubric, flags top 10%, drafts tailored interview questions per candidate.", stack: ["Claude Code", "Airtable"] },
      { role: "L&D", built: "Performance review summarizer", desc: "Synthesizes 360 feedback into a coaching-ready 1-pager. Cuts review prep from 3 hrs to 15 min.", stack: ["Lovable", "Claude"] },
    ],
    Finance: [
      { role: "FP&A", built: "Invoice categorizer", desc: "Pulls vendor invoices from inbox, categorizes against your chart of accounts, drafts journal entries for review.", stack: ["Claude Code", "n8n"] },
      { role: "ACCOUNTING", built: "Month-end variance explainer", desc: "Compares actuals to budget, generates plain-English explanations of every line item moving more than 10%.", stack: ["v0", "Claude API"] },
      { role: "CONTROLLER", built: "Expense policy bot", desc: "Employees ask 'can I expense X?' — bot answers from your policy, escalates edge cases. Cut policy questions 80%.", stack: ["Lovable", "Slack"] },
    ],
    Design: [
      { role: "BRAND", built: "Brand voice linter", desc: "Paste copy, get inline suggestions matching your voice guide. Fed by your tone-of-voice doc.", stack: ["v0", "Claude"] },
      { role: "PRODUCT", built: "Design QA reviewer", desc: "Drops a screenshot, gets a spec-vs-build diff. Catches misaligned padding, off-brand color, missed states.", stack: ["Claude API", "Lovable"] },
      { role: "RESEARCH", built: "Interview transcriber & themer", desc: "Upload user interview audio. Get synced transcripts + theme clusters across the whole study.", stack: ["Claude Code"] },
    ],
    Marketing: [
      { role: "CONTENT", built: "Briefing-to-draft engine", desc: "Marketers fill a brief, get a first draft in your voice with internal links, asset suggestions, and CTAs.", stack: ["Lovable", "Claude"] },
      { role: "SEO", built: "Topic-cluster researcher", desc: "Enter a seed topic, get cluster maps, gap analysis vs. competitors, and prioritized briefs.", stack: ["Claude Code"] },
      { role: "EMAIL", built: "Cohort-level personalizer", desc: "Splits your list into intent cohorts, writes variant copy per cohort, schedules sends.", stack: ["v0", "Claude API"] },
    ],
    Operations: [
      { role: "OPS", built: "SOP automator", desc: "Paste a 14-step SOP, get a runnable workflow with prompts at each branch. Ops team owns and edits without dev.", stack: ["Claude Code", "n8n"] },
      { role: "VENDOR MGMT", built: "Contract clause extractor", desc: "Drag in vendor contracts, get auto-flagged renewal dates, liability caps, IP clauses, in a dashboard.", stack: ["Claude API", "Lovable"] },
      { role: "PROCUREMENT", built: "RFP response composer", desc: "Pulls from your past responses + product docs, drafts an 80%-done RFP for the team to polish.", stack: ["Lovable"] },
    ],
  };

  function render(dept) {
    const items = data[dept];
    grid.innerHTML = '';
    items.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'use-card';
      card.innerHTML = `
        <div class="role">${it.role}</div>
        <div class="built">${it.built}</div>
        <div class="desc">${it.desc}</div>
        <div class="stack">${it.stack.map(s => `<span>${s}</span>`).join('')}</div>
      `;
      grid.appendChild(card);
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      render(t.dataset.dept);
    });
  });

  render('HR');
})();


/* ---------- Time in nav ---------- */
(function clock() {
  const el = document.getElementById('nav-time');
  if (!el) return;
  function tick() {
    const now = new Date();
    const utc = now.toISOString().slice(11, 19);
    el.textContent = utc + ' UTC';
  }
  tick();
  setInterval(tick, 1000);
})();

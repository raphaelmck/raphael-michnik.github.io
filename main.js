const LAST_UPDATED = "Mar 2026";

const content = document.getElementById("content");
const tabs = Array.from(document.querySelectorAll(".tab"));

const pages = {
  home: () => `
    <p>
      I'm an undergraduate student at McGill University, studying Computer Science and Mathematics. I'm currently involved in competitive programming at my school, and machine learning research. I also enjoy working out, playing chess, learning languages, and travelling.
    </p>
  `,
  work: () => `
    <div class="work-intro">
      <p>
        Things I've been working on and learning.
      </p>
    </div>

    <details class="projects-section">
      <summary class="projects-toggle">
        <h2 style="display: inline; margin: 0; font-size: 18px; font-weight: 650;">Projects</h2>
      </summary>
      <div class="projects-content">
        <div>
          <div class="projects-grid">
            <div class="project-card">
              <a href="#" class="project-link" aria-label="View repository">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
              </a>
              <div class="project-header">
                <h3>blufish</h3>
              </div>
              <p class="project-desc">A CFR (Counterfactual Regret Minimization) engine for poker written in C++.</p>
              <div class="project-tags">
                <span class="tag">C++</span>
                <span class="tag">Game Theory</span>
              </div>
            </div>
            
            <div class="project-card">
              <a href="#" class="project-link" aria-label="View repository">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
              </a>
              <div class="project-header">
                <h3>autodiff</h3>
              </div>
              <p class="project-desc">An automatic differentiation engine in Rust using only the standard library, no external dependencies.</p>
              <div class="project-tags">
                <span class="tag">Rust</span>
                <span class="tag">Numerical Computing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>

    <details class="courses-section">
      <summary class="courses-toggle">
        <h2 style="display: inline; margin: 0; font-size: 18px; font-weight: 650;">Courses</h2>
      </summary>
      <div class="courses-content">
        <div>
          <div class="courses-list">
            <div class="semester-group">
              <p class="semester-label">Winter 2026</p>
              <div class="course-item">
                <a href="https://mcgill.courses/course/comp-595" target="_blank" rel="noopener" class="course-code">COMP 595</a>
                <span class="course-name">Advanced Problem Solving for Competitive Programming</span>
              </div>
              <div class="course-item">
                <a href="https://mcgill.courses/course/comp-551" target="_blank" rel="noopener" class="course-code">COMP 551</a>
                <span class="course-name">Applied Machine Learning</span>
              </div>
              <div class="course-item">
                <a href="https://mcgill.courses/course/comp-310" target="_blank" rel="noopener" class="course-code">COMP 310</a>
                <span class="course-name">Operating Systems</span>
              </div>
              <div class="course-item">
                <a href="https://mcgill.courses/course/comp-252" target="_blank" rel="noopener" class="course-code">COMP 252</a>
                <span class="course-name">Algorithms and Data Structures</span>
              </div>
              <div class="course-item">
                <a href="https://mcgill.courses/course/math-387" target="_blank" rel="noopener" class="course-code">MATH 387</a>
                <span class="course-name">Numerical Analysis</span>
              </div>
              <div class="course-item">
                <a href="https://mcgill.courses/course/math-251" target="_blank" rel="noopener" class="course-code">MATH 251</a>
                <span class="course-name">Algebra II</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
  `,
  misc: () => `
    <h1>misc</h1>
    <p>
      A place for things that don't fit in the other sections.
    </p>
  `,
};

function currentRoute() {
  const hash = (location.hash || "#home").replace("#", "");
  return pages[hash] ? hash : "home";
}

function render() {
  const route = currentRoute();
  content.innerHTML = pages[route]();
  content.focus({ preventScroll: true });

  tabs.forEach(t => {
    const on = t.dataset.route === route;
    t.setAttribute("aria-current", on ? "page" : "false");
  });

  content.querySelectorAll("details").forEach(setupDetailsAnimation);
}

window.addEventListener("hashchange", render);
render();

const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

function setupDetailsAnimation(details) {
  if (details.dataset.animated) return;
  details.dataset.animated = "true";

  const inner = details.querySelector(".contact-list > div, .courses-content > div, .projects-content > div");
  if (inner) {
    details.addEventListener("toggle", () => {
      if (details.open) {
        const height = inner.scrollHeight;
        inner.style.height = "0px";
        requestAnimationFrame(() => {
          inner.style.height = height + "px";
        });
      } else {
        inner.style.height = inner.scrollHeight + "px";
        requestAnimationFrame(() => {
          inner.style.height = "0px";
        });
      }
    });

    inner.addEventListener("transitionend", () => {
      if (details.open) {
        inner.style.height = "auto";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  const allDetails = document.querySelectorAll("details");
  allDetails.forEach(setupDetailsAnimation);

  document.getElementById("last-updated").textContent = "updated " + LAST_UPDATED;
});

const content = document.getElementById("content");
const tabs = Array.from(document.querySelectorAll(".tab"));

const pages = {
  home: () => `
    <p class="muted">Short one-liner about what you do.</p>
    <p>
      I'm interested in <a href="#work">probability</a>, theoretical CS, and quantum information.
    </p>
  `,
  work: () => `
    <h1>Work</h1>
    <p class="muted">A sentence or two about your research and projects.</p>

    <ul class="list">
      <li>
        <div class="item-title"><a href="#">Project or paper title</a></div>
        <div class="item-meta">2026 · Description or collaborators</div>
      </li>
      <li>
        <div class="item-title"><a href="#">Another work item</a></div>
        <div class="item-meta">2025 · Description</div>
      </li>
    </ul>

    <details class="courses-section">
      <summary class="courses-toggle">
        <h2 style="display: inline; margin: 0;">Courses</h2>
      </summary>
      <div class="courses-content">
        <p class="muted">Winter 2026</p>
        <ul class="list">
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/comp-595" target="_blank" rel="noopener">COMP 595</a></div>
            <div class="item-meta">Advanced Problem Solving for Competitive Programming</div>
          </li>
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/comp-551" target="_blank" rel="noopener">COMP 551</a></div>
            <div class="item-meta">Applied Machine Learning</div>
          </li>
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/comp-310" target="_blank" rel="noopener">COMP 310</a></div>
            <div class="item-meta">Operating Systems</div>
          </li>
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/comp-252" target="_blank" rel="noopener">COMP 252</a></div>
            <div class="item-meta">Algorithms and Data Structures</div>
          </li>
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/math-387" target="_blank" rel="noopener">MATH 387</a></div>
            <div class="item-meta">Numerical Analysis</div>
          </li>
          <li>
            <div class="item-title"><a href="https://mcgill.courses/course/math-251" target="_blank" rel="noopener">MATH 251</a></div>
            <div class="item-meta">Algebra II</div>
          </li>
        </ul>
      </div>
    </details>
  `,
  mistk: () => `
    <h1>mistk</h1>
    <p class="muted">Description of mistk.</p>
    <p>
      Content about mistk goes here.
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
}

window.addEventListener("hashchange", render);
render();

// Theme switching - initialize immediately
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

// Wait for DOM to be ready
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
});

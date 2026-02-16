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

    <h2>Courses</h2>
    <p class="muted">Winter 2026</p>
    <ul class="list">
      <li>
        <div class="item-title"><a href="https://www.mcgill.ca/study/2024-2025/courses/comp-251" target="_blank" rel="noopener">COMP 251</a></div>
        <div class="item-meta">Algorithms and Data Structures</div>
      </li>
      <li>
        <div class="item-title"><a href="https://www.mcgill.ca/study/2024-2025/courses/comp-330" target="_blank" rel="noopener">COMP 330</a></div>
        <div class="item-meta">Theory of Computation</div>
      </li>
      <li>
        <div class="item-title"><a href="https://www.mcgill.ca/study/2024-2025/courses/math-240" target="_blank" rel="noopener">MATH 240</a></div>
        <div class="item-meta">Discrete Structures</div>
      </li>
    </ul>
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

const content = document.getElementById("content");
const tabs = Array.from(document.querySelectorAll(".tab"));

const pages = {
  home: () => `
    <p>
      I'm an undergraduate student at McGill University, studying Computer Science and Mathematics. I'm currently involved in competitive programming at my school, and machine learning research. I also enjoy working out, playing chess, learning languages, and travelling.
    </p>
  `,
  work: () => `
    <h1>Work</h1>
    <details class="courses-section">
      <summary class="courses-toggle">
        <h1 style="display: inline; margin: 0; font-size: 20px; font-weight: 650;">Courses</h1>
      </summary>
      <div class="courses-content">
        <div>
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
}

window.addEventListener("hashchange", render);
render();

const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

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

  function setupDetailsAnimation(details) {
    if (details.dataset.animated) return;
    details.dataset.animated = "true";

    const content = details.querySelector(".contact-list > div, .courses-content > div");
    if (content) {
      details.addEventListener("toggle", () => {
        if (details.open) {
          const height = content.scrollHeight;
          content.style.height = "0px";
          requestAnimationFrame(() => {
            content.style.height = height + "px";
          });
        } else {
          content.style.height = content.scrollHeight + "px";
          requestAnimationFrame(() => {
            content.style.height = "0px";
          });
        }
      });

      content.addEventListener("transitionend", () => {
        if (details.open) {
          content.style.height = "auto";
        }
      });
    }
  }

  const allDetails = document.querySelectorAll("details");
  allDetails.forEach(setupDetailsAnimation);

  const observer = new MutationObserver(() => {
    const dynamicDetails = document.querySelectorAll("details");
    dynamicDetails.forEach(setupDetailsAnimation);
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

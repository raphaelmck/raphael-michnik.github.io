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
              <div class="project-header">
                <h3>Project Name</h3>
                <span class="project-year">2026</span>
              </div>
              <p class="project-desc">A brief description of what this project does and why it matters.</p>
              <div class="project-tags">
                <span class="tag">Python</span>
                <span class="tag">ML</span>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-header">
                <h3>Another Project</h3>
                <span class="project-year">2025</span>
              </div>
              <p class="project-desc">Another interesting thing I built, explained simply.</p>
              <div class="project-tags">
                <span class="tag">JavaScript</span>
                <span class="tag">Web</span>
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

  // Setup animations for newly rendered details elements
  const dynamicDetails = content.querySelectorAll("details");
  dynamicDetails.forEach(details => {
    if (!details.dataset.animated) {
      setupDetailsAnimation(details);
    }
  });
}

window.addEventListener("hashchange", render);
render();

const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);

function setupDetailsAnimation(details) {
  if (details.dataset.animated) return;
  details.dataset.animated = "true";

  const content = details.querySelector(".contact-list > div, .courses-content > div, .projects-content > div");
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

  const observer = new MutationObserver(() => {
    const dynamicDetails = document.querySelectorAll("details");
    dynamicDetails.forEach(setupDetailsAnimation);
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

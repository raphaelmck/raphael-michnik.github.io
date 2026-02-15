const content = document.getElementById("content");
const tabs = Array.from(document.querySelectorAll(".tab"));

const pages = {
  home: () => `
    <h1>Hi, I'm Raphaël.</h1>
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

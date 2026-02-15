const content = document.getElementById("content");
const tabs = Array.from(document.querySelectorAll(".tab"));

const pages = {
	home: () => `
    <h1>Hi, I'm Raphaël.</h1>
    <p class="muted">Short one-liner about what you do.</p>
    <p>
      I’m interested in <a href="#research">probability</a>, theoretical CS, and quantum information.
    </p>
  `,
	research: () => `
    <h1>Research</h1>
    <p class="muted">A sentence or two about your research direction.</p>

    <ul class="list">
      <li>
        <div class="item-title"><a href="#">Paper title one</a></div>
        <div class="item-meta">2026 · with Coauthor</div>
      </li>
      <li>
        <div class="item-title"><a href="#">Paper title two</a></div>
        <div class="item-meta">2025 · preprint</div>
      </li>
    </ul>
  `,
	projects: () => `
    <h1>Projects</h1>
    <ul class="list">
      <li>
        <div class="item-title"><a href="#">Project name</a></div>
        <div class="item-meta">One-line description.</div>
      </li>
      <li>
        <div class="item-title"><a href="#">Another project</a></div>
        <div class="item-meta">One-line description.</div>
      </li>
    </ul>
  `,
	colophon: () => `
    <h1>Colophon</h1>
    <p class="muted">How this site is built.</p>
    <p>
      Built with plain HTML/CSS/JS. Hosted on GitHub Pages.
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

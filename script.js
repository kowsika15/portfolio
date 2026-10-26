const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-cta");
const sections = document.querySelectorAll("main section[id]");
const backToTop = document.querySelector(".back-to-top");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

menuToggle.addEventListener("click", () => {
	const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
	navLinks.classList.toggle("is-open", !isOpen);
});

navItems.forEach((item) => {
	item.addEventListener("click", () => {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open menu");
		navLinks.classList.remove("is-open");
	});
});

const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		navItems.forEach((item) => {
			item.classList.toggle("is-active", item.getAttribute("href") === `#${entry.target.id}`);
		});
	});
}, { rootMargin: "-36% 0px -54% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("is-visible");
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.12 });

	document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
	document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const updateBackToTop = () => {
	backToTop.classList.toggle("is-visible", window.scrollY > 460);
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateBackToTop();
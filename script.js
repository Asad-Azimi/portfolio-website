// ========================= DOM References =========================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section");
const yearElement = document.querySelector("#year");

// ====================== Footer Year Update ========================
if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

// ====================== Mobile Navigation =========================
function closeMobileMenu() {
	if (!navToggle || !navMenu) return;

	navToggle.classList.remove("active");
	navMenu.classList.remove("active");
	document.body.classList.remove("menu-open");
	navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && navMenu) {
	navToggle.addEventListener("click", () => {
		const isOpen = navMenu.classList.toggle("active");

		navToggle.classList.toggle("active", isOpen);
		document.body.classList.toggle("menu-open", isOpen);
		navToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		closeMobileMenu();
	});
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && navMenu?.classList.contains("active")) {
		closeMobileMenu();
	}
});

// ==================== Scroll Reveal Observer ======================
// Revealed elements animate in once when they enter the viewport.
const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add("visible");
			observer.unobserve(entry.target);
		});
	},
	{
		threshold: 0.16,
		rootMargin: "0px 0px -80px 0px",
	}
);

revealElements.forEach((element) => {
	revealObserver.observe(element);
});

// ===================== Active Nav Observer ========================
// Highlights the nav item for the section currently in view.
const sectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			const activeId = entry.target.getAttribute("id");

			navLinks.forEach((link) => {
				const linkTarget = link.getAttribute("href")?.replace("#", "");
				link.classList.toggle("active", linkTarget === activeId);
			});
		});
	},
	{
		threshold: 0.45,
	}
);

sections.forEach((section) => {
	sectionObserver.observe(section);
});

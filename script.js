// ============================================
// SMOOTH SCROLL FUNCTIONS
// ============================================

function scrollToSection(sectionId) {
	const section =
		document.getElementById(sectionId);
	if (section) {
		section.scrollIntoView({
			behavior: "smooth",
		});
	}
}

function scrollToContact() {
	scrollToSection("contact");
}

function scrollToFeatures() {
	scrollToSection("features");
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener(
	"DOMContentLoaded",
	function () {
		const mobileMenuToggle =
			document.getElementById("mobileMenuToggle");
		const mobileMenu =
			document.getElementById("mobileMenu");
		const mobileNavLinks =
			document.querySelectorAll(
				".mobile-nav-links a"
			);

		// Toggle mobile menu
		mobileMenuToggle.addEventListener(
			"click",
			function () {
				mobileMenuToggle.classList.toggle(
					"active"
				);
				mobileMenu.classList.toggle("active");
			}
		);

		// Close mobile menu when a link is clicked
		mobileNavLinks.forEach((link) => {
			link.addEventListener("click", function () {
				mobileMenuToggle.classList.remove(
					"active"
				);
				mobileMenu.classList.remove("active");
			});
		});

		// Close mobile menu when clicking outside
		document.addEventListener(
			"click",
			function (event) {
				const isClickInside =
					mobileMenu.contains(event.target) ||
					mobileMenuToggle.contains(event.target);
				if (
					!isClickInside &&
					mobileMenu.classList.contains("active")
				) {
					mobileMenuToggle.classList.remove(
						"active"
					);
					mobileMenu.classList.remove("active");
				}
			}
		);

		// Close mobile menu on scroll
		let lastScrollTop = 0;
		window.addEventListener(
			"scroll",
			function () {
				let scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop;

				if (scrollTop > lastScrollTop) {
					// Scrolling down
					if (
						mobileMenu.classList.contains(
							"active"
						)
					) {
						mobileMenuToggle.classList.remove(
							"active"
						);
						mobileMenu.classList.remove("active");
					}
				}

				lastScrollTop =
					scrollTop <= 0 ? 0 : scrollTop;
			}
		);
	}
);

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("in-view");
				observer.unobserve(entry.target);
			}
		});
	},
	observerOptions
);

// Observe all feature cards and other elements
document.addEventListener(
	"DOMContentLoaded",
	function () {
		const observableElements =
			document.querySelectorAll(
				".feature-card, .community-card, .testimonial-card, .stat-card"
			);

		observableElements.forEach((element) => {
			observer.observe(element);
		});

		// Add animation delays
		document
			.querySelectorAll(".feature-card")
			.forEach((card, index) => {
				card.style.setProperty(
					"--delay",
					`${index * 0.1}s`
				);
			});
	}
);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
	let scrollTop =
		window.pageYOffset ||
		document.documentElement.scrollTop;

	if (scrollTop > 100) {
		navbar.style.boxShadow =
			"0 2px 20px rgba(0, 212, 255, 0.15)";
	} else {
		navbar.style.boxShadow = "none";
	}

	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(
	element,
	target,
	duration = 2000
) {
	let current = 0;
	const increment = target / (duration / 16);

	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			element.textContent =
				target.toLocaleString();
			clearInterval(timer);
		} else {
			element.textContent =
				Math.floor(current).toLocaleString();
		}
	}, 16);
}

// Animate stat numbers when they come into view
const statObserver = new IntersectionObserver(
	function (entries) {
		entries.forEach((entry) => {
			if (
				entry.isIntersecting &&
				!entry.target.classList.contains(
					"animated"
				)
			) {
				entry.target.classList.add("animated");

				const statNumber =
					entry.target.querySelector(
						".stat-number"
					);
				if (statNumber) {
					const text = statNumber.textContent;
					// Extract numeric values
					if (text.includes("+")) {
						const num = parseInt(
							text.replace(/[^0-9]/g, "")
						);
						animateCounter(statNumber, num);
					}
				}
			}
		});
	},
	{ threshold: 0.5 }
);

document.addEventListener(
	"DOMContentLoaded",
	function () {
		document
			.querySelectorAll(".stat-card")
			.forEach((card) => {
				statObserver.observe(card);
			});
	}
);

// ============================================
// LEADERBOARD ANIMATIONS
// ============================================

const leaderboardObserver =
	new IntersectionObserver(
		function (entries) {
			entries.forEach((entry) => {
				if (
					entry.isIntersecting &&
					!entry.target.classList.contains(
						"animated"
					)
				) {
					entry.target.classList.add("animated");

					// Animate table rows
					const rows =
						entry.target.querySelectorAll(
							"tbody tr"
						);
					rows.forEach((row, index) => {
						row.style.animation = `slideInLeft 0.6s ease forwards`;
						row.style.animationDelay = `${
							index * 0.1
						}s`;
					});
				}
			});
		},
		{ threshold: 0.3 }
	);

document.addEventListener(
	"DOMContentLoaded",
	function () {
		const leaderboardTable =
			document.querySelector(
				".leaderboard-table"
			);
		if (leaderboardTable) {
			leaderboardObserver.observe(
				leaderboardTable
			);
		}
	}
);

// ============================================
// MOBILE MENU TOGGLE (if needed)
// ============================================

function toggleMobileMenu() {
	const navLinks =
		document.querySelector(".nav-links");
	if (navLinks) {
		navLinks.classList.toggle("active");
	}
}

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

// Add hover effects to buttons
document
	.querySelectorAll(".btn")
	.forEach((button) => {
		button.addEventListener(
			"mouseenter",
			function () {
				this.style.transform = "translateY(-3px)";
			}
		);

		button.addEventListener(
			"mouseleave",
			function () {
				this.style.transform = "translateY(0)";
			}
		);
	});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener("load", function () {
	document.body.classList.add("loaded");
});

// ============================================
// PARALLAX EFFECT (optional)
// ============================================

let ticking = false;

function updateParallax() {
	const scrollY = window.pageYOffset;
	const heroVisual = document.querySelector(
		".hero-visual"
	);

	if (heroVisual) {
		heroVisual.style.transform = `translateY(${
			scrollY * 0.5
		}px)`;
	}

	ticking = false;
}

window.addEventListener(
	"scroll",
	function () {
		if (!ticking) {
			window.requestAnimationFrame(
				updateParallax
			);
			ticking = true;
		}
	},
	{ passive: true }
);

// ============================================
// DYNAMIC LEADERBOARD UPDATE SIMULATION
// ============================================

function simulateLeaderboardUpdate() {
	const leaderboardRows =
		document.querySelectorAll(
			".leaderboard-table tbody tr"
		);

	leaderboardRows.forEach((row) => {
		const savedCell = row.querySelector(".saved");
		if (savedCell) {
			// Simulate occasional updates
			if (Math.random() > 0.7) {
				const currentValue = parseInt(
					savedCell.textContent.replace(
						/[^0-9]/g,
						""
					)
				);
				const newValue =
					currentValue +
					Math.floor(Math.random() * 1000);
				savedCell.textContent =
					"$" + newValue.toLocaleString();
				savedCell.style.animation =
					"pulse 0.5s ease";
			}
		}
	});
}

// Uncomment to enable periodic leaderboard updates
// setInterval(simulateLeaderboardUpdate, 10000);

// ============================================
// FORM HANDLING (if contact form is added)
// ============================================

function handleContactForm(event) {
	if (event) {
		event.preventDefault();
	}
	// Add your contact form logic here
	console.log("Contact form submitted");
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener(
	"keydown",
	function (event) {
		// Alt + H: Hero section
		if (event.altKey && event.key === "h") {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}

		// Alt + F: Features section
		if (event.altKey && event.key === "f") {
			scrollToFeatures();
		}

		// Alt + C: Contact section
		if (event.altKey && event.key === "c") {
			scrollToContact();
		}
	}
);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if implemented
if ("IntersectionObserver" in window) {
	const imageObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.classList.add("loaded");
					observer.unobserve(img);
				}
			});
		}
	);

	document
		.querySelectorAll("img[data-src]")
		.forEach((img) => imageObserver.observe(img));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener(
	"DOMContentLoaded",
	function () {
		console.log(
			"CoinQuest Landing Page loaded successfully"
		);

		// Add any additional initialization code here
		initializeElementAnimations();
	}
);

function initializeElementAnimations() {
	// Add animation classes to elements
	const animatedElements =
		document.querySelectorAll(
			".hero-title, .hero-subtitle, .hero-cta, .game-window"
		);

	animatedElements.forEach((element, index) => {
		element.style.opacity = "0";
		element.style.animation = `slideInLeft 0.8s ease forwards`;
		element.style.animationDelay = `${
			index * 0.2
		}s`;
	});
}

// Define slideInLeft animation in CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .in-view {
        animation: slideInLeft 0.6s ease forwards !important;
    }
`;

document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================

document.addEventListener(
	"DOMContentLoaded",
	function () {
		const observerOptions = {
			threshold: 0.15,
			rootMargin: "0px 0px -50px 0px",
		};

		const animatedElements = new Set();

		const observer = new IntersectionObserver(
			function (entries) {
				entries.forEach((entry) => {
					if (
						entry.isIntersecting &&
						!animatedElements.has(entry.target)
					) {
						animatedElements.add(entry.target);
						entry.target.classList.add("animate");
						observer.unobserve(entry.target);
					}
				});
			},
			observerOptions
		);

		// Observe all scroll animation elements
		const elements = document.querySelectorAll(
			".scroll-fade-in, .scroll-slide-up"
		);
		elements.forEach((element) => {
			observer.observe(element);
		});
	}
);

// Navigation mobile (menu burger)
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const icon = toggle ? toggle.querySelector("use") : null;
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("flex");
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (icon) icon.setAttribute("href", isOpen ? "#icon-close" : "#icon-menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Filtres de la galerie Portfolio
function initPortfolioFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      buttons.forEach((btn) => {
        const isActive = btn === button;
        btn.setAttribute("aria-pressed", String(isActive));
        btn.classList.toggle("bg-willow-green", isActive);
        btn.classList.toggle("text-midnight-violet", isActive);
        btn.classList.toggle("bg-white/70", !isActive);
        btn.classList.toggle("text-midnight-violet/70", !isActive);
      });

      cards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const show = filter === "tous" || categories.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

// Animation d'apparition douce au scroll
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("animate-fadeUp"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeUp");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

// Marque le lien de navigation actif selon la page courante
function initActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("text-midnight-violet", "after:w-full");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Formulaire de contact — envoi via Web3Forms (https://web3forms.com), sans backend.
// La clé publique est dans le champ caché "access_key" du formulaire (contact.html).
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const confirmation = document.querySelector("[data-contact-confirmation]");
  const errorBox = document.querySelector("[data-contact-error]");
  if (!form || !confirmation) return;

  const endpoint = form.getAttribute("action") || "https://api.web3forms.com/submit";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const label = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Envoi en cours…";
    }
    if (errorBox) errorBox.classList.add("hidden");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        form.classList.add("hidden");
        confirmation.classList.remove("hidden");
        confirmation.focus();
      } else {
        throw new Error(data.message || "Échec de l'envoi");
      }
    } catch (err) {
      if (errorBox) {
        errorBox.classList.remove("hidden");
      } else {
        window.alert(
          "L'envoi a échoué. Merci de nous écrire directement sur WhatsApp ou à kreaprorun@gmail.com."
        );
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initPortfolioFilters();
  initScrollReveal();
  initActiveNavLink();
  initContactForm();
});

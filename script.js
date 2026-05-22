"use strict";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const ContactForm = (() => {
  const form = document.getElementById("contactForm");

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone.replace(/\D/g, "").length >= 10);
  }

  function showMessage(message, type = "success") {
    const messageEl = document.createElement("div");
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
      padding: 12px 16px;
      margin-bottom: 16px;
      border-radius: 6px;
      background: ${type === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"};
      color: ${type === "success" ? "#22c55e" : "#ef4444"};
      border: 1px solid ${type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"};
      animation: slideInUp 0.3s ease;
    `;

    const existingMessage = form.querySelector(".form-message");
    if (existingMessage) existingMessage.remove();

    form.insertBefore(messageEl, form.firstChild);
    setTimeout(() => messageEl.remove(), 5000);
  }

  async function executeRecaptcha() {
    return new Promise((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {
              action: "contact_form",
            })
            .then((token) => {
              document.getElementById("recaptchaToken").value = token;
              resolve(token);
            });
        });
      } else {
        resolve(null);
      }
    });
  }

  function init() {
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const phone = form.querySelector("#phone").value.trim();
      const equipment = form.querySelector("#equipment").value;
      const message = form.querySelector("#message").value.trim();

      // Validação
      if (!name || name.length < 3) {
        showMessage("Por favor, digite um nome válido", "error");
        return;
      }

      if (!validateEmail(email)) {
        showMessage("Por favor, digite um email válido", "error");
        return;
      }

      if (!validatePhone(phone)) {
        showMessage("Por favor, digite um telefone válido", "error");
        return;
      }

      if (!equipment) {
        showMessage("Por favor, selecione um tipo de equipamento", "error");
        return;
      }

      if (!message || message.length < 10) {
        showMessage(
          "Por favor, descreva seu problema com mais detalhes (mín. 10 caracteres)",
          "error",
        );
        return;
      }

      // Se chegou aqui, form é válido
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Enviando...</span>";

      try {
        // Executar reCAPTCHA v3
        await executeRecaptcha();

        // Evento de conversão no GA4
        if (window.gtag) {
          gtag("event", "generate_lead", {
            currency: "BRL",
            value: 1.0,
          });
        }

        // FormSpree vai enviar automaticamente quando submitBtn ativar
        // Podemos deixar o formulário fazer submit normalmente
        form.submit();
      } catch (error) {
        showMessage(
          "Erro ao processar. Tente novamente ou use WhatsApp.",
          "error",
        );
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  return { init };
})();

const Navbar = (() => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks ? navLinks.querySelectorAll("a") : [];

  let isOpen = false;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  function toggleMenu() {
    isOpen = !isOpen;
    hamburger.classList.toggle("open", isOpen);
    navLinks.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  }

  function init() {
    if (!navbar) return;

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (hamburger) {
      hamburger.addEventListener("click", toggleMenu);
    }

    links.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (isOpen && !navbar.contains(e.target)) {
        closeMenu();
      }
    });
  }

  return { init };
})();

const SmoothScroll = (() => {
  function init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-height",
          ) || "72",
        );

        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  return { init };
})();

const ScrollReveal = (() => {
  let observer;

  function init() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay) || 0;

            setTimeout(() => {
              el.classList.add("visible");
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
  }

  return { init };
})();

const Counters = (() => {
  let counterObserver;
  let started = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = current.toLocaleString("pt-BR");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString("pt-BR");
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    const statSection = document.querySelector(".stats-grid");
    if (!statSection) return;

    counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            document
              .querySelectorAll(".stat-num[data-target]")
              .forEach((el) => {
                animateCounter(el);
              });
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    counterObserver.observe(statSection);
  }

  return { init };
})();

const Parallax = (() => {
  const heroContent = document.getElementById("heroContent");
  const heroGrid = document.querySelector(".hero-grid");
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const limit = window.innerHeight;

        if (scrollY < limit) {
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.22}px)`;
            heroContent.style.opacity = String(1 - scrollY / (limit * 0.8));
          }
          if (heroGrid) {
            heroGrid.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
        }

        ticking = false;
      });

      ticking = true;
    }
  }

  function init() {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  return { init };
})();

const FAQ = (() => {
  function init() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        items.forEach((other) => {
          if (other !== item && other.classList.contains("open")) {
            other.classList.remove("open");
            other.querySelector(".faq-answer").style.maxHeight = "0";
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          answer.style.maxHeight = "0";
        } else {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  return { init };
})();

const TestiSlider = (() => {
  const slider = document.getElementById("testiSlider");
  const prevBtn = document.getElementById("testiPrev");
  const nextBtn = document.getElementById("testiNext");
  const dotsWrapper = document.getElementById("testiDots");

  let currentIndex = 0;
  let cards = [];
  let dotsArray = [];
  let autoInterval = null;
  let cardWidth = 0;
  let visibleCount = 2;

  function getVisibleCount() {
    if (window.innerWidth <= 900) return 1;
    return 2;
  }

  function buildDots(total) {
    if (!dotsWrapper) return;
    dotsWrapper.innerHTML = "";
    dotsArray = [];

    const groups = Math.ceil(total / getVisibleCount());

    for (let i = 0; i < groups; i++) {
      const dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrapper.appendChild(dot);
      dotsArray.push(dot);
    }
  }

  function updateDots() {
    const groupIndex = Math.floor(currentIndex / visibleCount);
    dotsArray.forEach((dot, i) => {
      dot.classList.toggle("active", i === groupIndex);
    });
  }

  function updateSlider() {
    visibleCount = getVisibleCount();

    if (!slider) return;

    cards.forEach((card, i) => {
      const isVisible = i >= currentIndex && i < currentIndex + visibleCount;
      card.style.display = isVisible ? "" : "none";
    });

    updateDots();
  }

  function goTo(groupIndex) {
    const maxIndex = cards.length - visibleCount;
    currentIndex = clamp(groupIndex * visibleCount, 0, maxIndex);
    updateSlider();
    resetAuto();
  }

  function next() {
    const maxGroup = Math.ceil(cards.length / visibleCount) - 1;
    const currentGroup = Math.floor(currentIndex / visibleCount);
    const nextGroup = currentGroup >= maxGroup ? 0 : currentGroup + 1;
    goTo(nextGroup);
  }

  function prev() {
    const maxGroup = Math.ceil(cards.length / visibleCount) - 1;
    const currentGroup = Math.floor(currentIndex / visibleCount);
    const prevGroup = currentGroup <= 0 ? maxGroup : currentGroup - 1;
    goTo(prevGroup);
  }

  function startAuto() {
    autoInterval = setInterval(next, 5000);
  }

  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  function init() {
    if (!slider) return;

    cards = Array.from(slider.querySelectorAll(".testi-card"));
    if (!cards.length) return;

    visibleCount = getVisibleCount();

    buildDots(cards.length);
    updateSlider();

    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        prev();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        next();
      });

    let touchStartX = 0;
    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );

    slider.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
        }
      },
      { passive: true },
    );

    startAuto();

    window.addEventListener("resize", () => {
      visibleCount = getVisibleCount();
      buildDots(cards.length);
      currentIndex = 0;
      updateSlider();
    });
  }

  return { init };
})();

const GalleryFilter = (() => {
  function init() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        galleryItems.forEach((item) => {
          const category = item.dataset.category;

          if (filter === "all" || category === filter) {
            item.style.display = "";

            item.classList.remove("visible");
            setTimeout(() => item.classList.add("visible"), 20);
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  return { init };
})();

const BackToTop = (() => {
  const btn = document.getElementById("backToTop");

  function init() {
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true },
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  return { init };
})();

const ActiveNav = (() => {
  function init() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              link.classList.toggle("active-nav", href === `#${id}`);
            });
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));
  }

  return { init };
})();

const HeroAnimation = (() => {
  function init() {
    const titleLines = document.querySelectorAll(".title-line");

    titleLines.forEach((line) => {
      if (!line.querySelector("span")) {
        const text = line.textContent;
        line.textContent = "";
        const span = document.createElement("span");
        span.textContent = text;
        line.appendChild(span);
      }
    });
  }

  return { init };
})();

const CardStagger = (() => {
  function init() {
    const cards = document.querySelectorAll(".service-card.reveal");
    cards.forEach((card, i) => {
      if (!card.hasAttribute("data-delay")) {
        card.setAttribute("data-delay", String((i % 4) * 100));
      }
    });
  }

  return { init };
})();

function checkReducedMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--trans-fast", "0s");
    document.documentElement.style.setProperty("--trans-base", "0s");
    document.documentElement.style.setProperty("--trans-slow", "0s");

    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }
}

function updateNavHeight() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const h = navbar.offsetHeight;
    document.documentElement.style.setProperty("--nav-height", h + "px");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkReducedMotion();
  updateNavHeight();

  Navbar.init();
  SmoothScroll.init();
  HeroAnimation.init();
  CardStagger.init();
  ScrollReveal.init();
  Counters.init();
  Parallax.init();
  FAQ.init();
  TestiSlider.init();
  GalleryFilter.init();
  BackToTop.init();
  ActiveNav.init();
  ContactForm.init();

  window.addEventListener("resize", updateNavHeight, { passive: true });

  // Rastrear cliques em CTAs principais
  const ctaButtons = document.querySelectorAll(
    ".btn-primary, .nav-btn, .cta-actions a",
  );
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.gtag) {
        gtag("event", "click_cta", {
          button_text: btn.textContent.trim(),
          button_class: btn.className,
        });
      }
    });
  });

  // Rastrear visualizações de seções
  const sections = document.querySelectorAll("section[id]");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.gtag) {
          gtag("event", "view_section", {
            section_id: entry.target.id,
          });
        }
      });
    },
    { threshold: 0.5 },
  );
  sections.forEach((section) => sectionObserver.observe(section));

  console.log(
    "%c JRK Usinagem ",
    "background:#FFB800;color:#000;font-weight:bold;padding:4px 12px;border-radius:4px;",
    "— Site carregado com sucesso!",
  );
});

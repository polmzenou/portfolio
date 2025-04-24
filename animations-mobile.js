// animations-mobile.js — version optimisée mobile sans animations lourdes

document.addEventListener("DOMContentLoaded", function () {
  console.log("Mode mobile activé : version allégée en cours");

  document.querySelectorAll('.project-card').forEach(el => {
    el.classList.remove('hidden');
    el.classList.add('show');
  });
  
  // Menu mobile (conservé)
  const menuBtn = document.getElementById("menu-btn");
  const menuItems = document.getElementById("menu-items");
  if (menuBtn && menuItems) {
    menuBtn.addEventListener("click", () => {
      menuItems.classList.toggle("hidden");
    });
  }

  // Scroll progress bar (conservé car utile et léger)
  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    document.querySelector(".progress-bar").style.width = progress + "%";

    const backToTopBtn = document.getElementById("back-to-top");
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Tabs (garde le switching simple des compétences)
  const tabs = document.querySelectorAll(".tab-btn");
  const skills = document.querySelectorAll(".skill-card");
  if (tabs.length > 0 && skills.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active", "bg-green-500", "text-black"));
        tab.classList.add("active", "bg-green-500", "text-black");
        const category = tab.getAttribute("data-category");
        skills.forEach((skill) => {
          if (skill.classList.contains(category)) {
            skill.classList.remove("hidden");
          } else {
            skill.classList.add("hidden");
          }
        });
      });
    });
    tabs[0].click();
  }

  // Typewriter simplifié (optionnel)
  function typeWriter(text, i, element) {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(text, i, element), 100);
    }
  }
  const typewriterElement = document.querySelector(".typewriter");
  if (typewriterElement) {
    const text = typewriterElement.innerHTML;
    typewriterElement.innerHTML = "";
    setTimeout(() => typeWriter(text, 0, typewriterElement), 1000);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor");
  const cursorTrail = document.querySelector(".custom-cursor-trail");
  let cursorVisible = true;
  let cursorEnlarged = false;

  // Mouse movement
  document.addEventListener("mousemove", (e) => {
    if (cursorVisible) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Trail follows with delay
      setTimeout(() => {
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
      }, 80);
    }
  });

  // Cursor hover effects
  document
    .querySelectorAll("a, button, .project-card, .flip-card, .social-icon")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
        cursorEnlarged = true;
      });

      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
        cursorEnlarged = false;
      });
    });

  // Hide cursor when leaving window
  document.addEventListener("mouseout", () => {
    cursor.style.opacity = "0";
    cursorTrail.style.opacity = "0";
    cursorVisible = false;
  });

  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "1";
    cursorTrail.style.opacity = "1";
    cursorVisible = true;
  });

  // Mobile Menu
  const menuBtn = document.getElementById("menu-btn");
  const menuItems = document.getElementById("menu-items");

  if (menuBtn && menuItems) {
    menuBtn.addEventListener("click", () => {
      menuItems.classList.toggle("hidden");
    });
  }

  // Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    document.querySelector(".progress-bar").style.width = progress + "%";

    // Show/hide back to top button
    const backToTopBtn = document.getElementById("back-to-top");
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Back to Top button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all elements with fade-in class
  document
    .querySelectorAll(".fade-in, .project-card, .section-title")
    .forEach((el) => {
      observer.observe(el);
    });

  // Tab Switching for Skills
  const tabs = document.querySelectorAll(".tab-btn");
  const skills = document.querySelectorAll(".skill-card");

  if (tabs.length > 0 && skills.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        tabs.forEach((t) =>
          t.classList.remove("active", "bg-green-500", "text-black")
        );
        tab.classList.add("active", "bg-green-500", "text-black");

        // Show relevant skills
        const category = tab.getAttribute("data-category");
        skills.forEach((skill) => {
          if (skill.classList.contains(category)) {
            skill.classList.remove("hidden");
            setTimeout(() => {
              skill.classList.add("show");
            }, 100);
          } else {
            skill.classList.add("hidden");
            skill.classList.remove("show");
          }
        });
      });
    });

    // Activate first tab by default
    tabs[0].click();
  }

  // Initialize Particles.js
  if (
    window.innerWidth > 768 &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#00ff96",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00ff96",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 0.8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
  }

  // Initialize Three.js for hero section
  if (
    window.innerWidth > 768 &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    if (typeof THREE !== "undefined") {
      const canvas = document.getElementById("hero-canvas");

      if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create a grid of particles
        const geometry = new THREE.BufferGeometry();
        const count = 1500;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 10;
          positions[i + 1] = (Math.random() - 0.5) * 10;
          positions[i + 2] = (Math.random() - 0.5) * 10;

          colors[i] = 0; // R
          colors[i + 1] = Math.random(); // G
          colors[i + 2] = Math.random() * 0.5; // B
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.05,
          sizeAttenuation: true,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        camera.position.z = 5;

        // Animation
        const animate = () => {
          requestAnimationFrame(animate);

          points.rotation.x += 0.001;
          points.rotation.y += 0.002;

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      }
    }
  }

  // GSAP animations if available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.from(".hero-section .glitch-text", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(".hero-section .typewriter", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".hero-section a", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 1,
      ease: "power3.out",
    });

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section, i) => {
      gsap.from(section.querySelector("h2"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    // Animate project cards
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });
  }

  // Typewriter effect for hero section text
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

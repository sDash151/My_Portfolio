document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling
  const navLinks = document.querySelector(".nav-links");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove("active");
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById("theme");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navLinks && menuToggle) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    }
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      const submitBtn = contactForm.querySelector("button");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Step 1: Send email using EmailJS
      emailjs.sendForm("service_fhs5ofa", "template_1j7mqfv", e.target)
          .then(() => {
            console.log("Email sent via EmailJS");

            // Step 2: Send data to backend to store in DB
            return fetch("http://localhost:8080/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
              })
            });
          })
          .then((res) => {
            if (res.ok) {
              alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
              contactForm.reset();
            } else {
              alert("Form email sent, but saving to database failed.");
            }
          })
          .catch((error) => {
            alert("An error occurred while sending the form. Please try again.");
            console.error("Form submission error:", error);
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          });
    });

  }

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});

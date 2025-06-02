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

    // Step 1: Send to EmailJS
    emailjs.sendForm("service_fhs5ofa", "template_1j7mqfv", e.target)
      .then(() => {
        console.log("Email sent via EmailJS");

        // Step 2: Send to Spring Boot backend
        return fetch("https://portfolio-deployment-latest.onrender.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });
      })
      .then((response) => {
        if (!response.ok) throw new Error("Server error");
        alert(`Thank you for your message, ${name}! Your message has been saved and emailed.`);
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Submission error:", error);
        alert("Error sending message. Please try again.");
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

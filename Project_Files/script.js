document.addEventListener("DOMContentLoaded", () => {
  // Handle password confirmation validation
  const signupForm = document.querySelector("form[action='/register']");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;
      const errorMessage = document.getElementById("confirmPasswordError");

      if (password !== confirmPassword) {
        e.preventDefault();
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
      } else {
        errorMessage.style.display = "none";
      }
    });
  }

  // Password visibility toggle functionality
  const togglePasswordVisibility = (inputId, toggleButtonId) => {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleButtonId);

    if (input && toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const type = input.type === "password" ? "text" : "password";
        input.type = type;
        toggleBtn.textContent = type === "password" ? "Show" : "Hide";
      });
    }
  };

  document.querySelectorAll('.toggle-password').forEach((toggleBtn) => {
    const inputId = toggleBtn.getAttribute('data-input');
    togglePasswordVisibility(inputId, toggleBtn.id);
  });

  // Dynamic form field based on user role
  const roleSelect = document.getElementById("role");
  const additionalFields = document.getElementById("additionalFields");

  if (roleSelect) {
    roleSelect.addEventListener("change", () => {
      const selectedRole = roleSelect.value;
      additionalFields.style.display = selectedRole === "admin" ? "block" : "none";
    });
  }

  // Display success message after registration
  const urlParams = new URLSearchParams(window.location.search);
  const successMessage = urlParams.get("success") === "true" ? "Registration successful! You can now log in." : null;

  if (successMessage) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('success-message');
    messageContainer.textContent = successMessage;
    document.body.insertBefore(messageContainer, document.body.firstChild);
  }

  // Email validation
  const emailField = document.getElementById("email");
  if (emailField) {
    emailField.addEventListener("input", () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const emailError = document.getElementById("emailError");

      if (!emailRegex.test(emailField.value)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
      } else {
        emailError.style.display = "none";
      }
    });
  }

  // Scroll-triggered pop animation
  const popSection = document.getElementById("popSection");
  if (popSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            popSection.classList.add("visible");
            popSection.classList.remove("hidden");
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(popSection);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  
  // Keyboard shortcut: Ctrl + Shift + L to focus login email
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
      const loginEmail = document.getElementById("email");
      if (loginEmail) loginEmail.focus();
    }
  });
});

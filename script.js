document.addEventListener("DOMContentLoaded", () => {
  // Menu icon functionality
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll(".navbar a");

  // Mobile menu toggle
  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      });
    });
  }

  // Application Form Reset Functionality
  const applicationForm = document.getElementById('applicationForm');
  const resetBtn = applicationForm?.querySelector('.reset-btn');
  
  if (resetBtn && applicationForm) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default reset behavior
      
      if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        // Reset all form fields
        applicationForm.reset();
        
        // Reset file inputs (they don't get cleared by form.reset())
        const fileInputs = applicationForm.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
          input.value = '';
        });
        
        // Reset select elements to first option
        const selects = applicationForm.querySelectorAll('select');
        selects.forEach(select => {
          select.selectedIndex = 0;
        });
        
        // Uncheck checkboxes
        const checkboxes = applicationForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        
        // Scroll to top of form
        applicationForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Resource Hub Functionality
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.querySelector(".search-btn");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const resourceItems = document.querySelectorAll(".resource-item");

  if (searchBtn && searchInput) {
    // Filter resources by category
    function filterResources(category) {
      resourceItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        item.style.display = category === "all" || itemCategory === category ? "block" : "none";
      });
    }

    // Search resources by text
    function searchResources() {
      const searchText = searchInput.value.toLowerCase();
      resourceItems.forEach((item) => {
        const title = item.querySelector("h4").textContent.toLowerCase();
        const description = item.querySelector("p").textContent.toLowerCase();
        item.style.display = title.includes(searchText) || description.includes(searchText) ? "block" : "none";
      });
    }

    // Add event listeners
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((button) => button.classList.remove("active"));
        btn.classList.add("active");
        filterResources(btn.getAttribute("data-category"));
      });
    });

    searchBtn.addEventListener("click", searchResources);
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") searchResources();
    });
  }
});

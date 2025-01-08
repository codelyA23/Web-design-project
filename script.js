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

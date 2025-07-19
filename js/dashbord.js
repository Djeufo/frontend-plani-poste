const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const menuBtn = document.getElementById("menuBtn");

function toggleSidebar() {
  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    // Closing the sidebar
    sidebar.classList.remove("open");
    main.classList.remove("shift");
    if (window.innerWidth >= 768) {
      // On desktop, apply desktop-close state
      sidebar.classList.remove("desktop-open");
      main.classList.remove("desktop-shift");
      menuBtn.classList.add("desktop-show");
    }
  } else {
    // Opening the sidebar
    sidebar.classList.add("open");
    main.classList.add("shift");
    if (window.innerWidth >= 768) {
      // On desktop, remove hide menu button
      sidebar.classList.add("desktop-open");
      main.classList.add("desktop-shift");
      menuBtn.classList.remove("desktop-show");
    }
  }
}

// Load default content on initial page load
window.addEventListener("DOMContentLoaded", () => {
  loadSection("/sections/home.html");
});

// On load, initialize state
window.addEventListener("load", () => {
  if (window.innerWidth >= 768) {
    // Desktop: show sidebar, hide menu button
    sidebar.classList.add("desktop-open");
    main.classList.add("desktop-shift");
    menuBtn.classList.remove("desktop-show");
  } else {
    // Mobile: hide sidebar, show menu button
    sidebar.classList.remove("open");
    main.classList.remove("shift");
    menuBtn.style.display = "block";
  }
});

// Optional: Adjust on resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    if (!sidebar.classList.contains("desktop-open")) {
      menuBtn.classList.add("desktop-show");
    }
  } else {
    sidebar.classList.remove("open", "desktop-open");
    main.classList.remove("shift", "desktop-shift");
    menuBtn.style.display = "block";
  }
});

// Existing loadSection function...

document.getElementById("toggleSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");

  sidebar.classList.toggle("closed");

  // Change icon based on sidebar state
  if (sidebar.classList.contains("closed")) {
    toggleBtn.textContent = "☰"; // Menu icon
  } else {
    toggleBtn.textContent = "<"; // Arrow icon
  }
});

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll("main#content section").forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  const selected = document.getElementById(sectionId);
  if (selected) {
    selected.style.display = "block";
  }
}

// Show Home by default on page load
window.addEventListener("DOMContentLoaded", () => {
  showSection("home");
});

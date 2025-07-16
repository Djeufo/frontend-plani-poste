function loadSection(file) {
  fetch(file)
    .then((response) => {
      if (!response.ok)
        throw new Error("HTTP " + response.status + ": " + file);
      return response.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => {
      document.getElementById(
        "content"
      ).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

// Load default content on initial page load
window.addEventListener("DOMContentLoaded", () => {
  loadSection("/sections/home.html");
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
    toggleBtn.textContent = "←"; // Arrow icon
  }
});

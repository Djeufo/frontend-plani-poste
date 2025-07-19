document.addEventListener("DOMContentLoaded", () => {
  // This code runs only when the entire web page (HTML, CSS, images) has finished loading.
  // It's a good practice to put your JavaScript here to ensure all elements are available.

  try {
    // --- Data Storage ---
    // This is where we store our example data. In a real application, this might come from a server.

    // An array of post objects, each with details like user, content, and images.
    const postsData = [
      {
        id: 1,
        user: "John Doe",
        userImg: "https://randomuser.me/api/portraits/men/1.jpg",
        date: "2025-07-18",
        content:
          "Just finished my morning run! Feeling energized and ready to take on the day.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        liked: false,
      },
      {
        id: 2,
        user: "Jane Smith",
        userImg: "https://randomuser.me/api/portraits/women/2.jpg",
        date: "2025-07-17",
        content:
          "Loving this new recipe I tried out today. Healthy and delicious!",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        liked: false,
      },
      {
        id: 3,
        user: "Alex Johnson",
        userImg: "https://randomuser.me/api/portraits/men/3.jpg",
        date: "2025-07-16",
        content:
          "Excited about my upcoming trip to the mountains. Nature, here I come!",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
        liked: false,
      },
      {
        id: 4,
        user: "Emily White",
        userImg: "https://randomuser.me/api/portraits/women/4.jpg",
        date: "2025-07-15",
        content:
          "Starting a new book today. Any recommendations for thrillers?",
        image: null, // No image for this post
        liked: true,
      },
      {
        id: 5,
        user: "David Lee",
        userImg: "https://randomuser.me/api/portraits/men/5.jpg",
        date: "2025-07-14",
        content: "Just adopted a new puppy! Welcome to the family, Max!",
        image:
          "https://images.unsplash.com/photo-1543465145-d60233a016f4?auto=format&fit=crop&w=600&q=80",
        liked: false,
      },
    ];

    // Dummy user data for the profile section. This can be updated by the user.
    let currentUser = {
      name: "Djeaoufo Yannick",
      username: "DjeaoufoYannick",
      email: "yannick.djeaoufo@example.com",
      profileImg: "https://randomuser.me/api/portraits/men/34.jpg",
    };

    // --- Get Elements from the HTML ---
    // We select HTML elements by their IDs so we can interact with them using JavaScript.
    const postsContainer = document.getElementById("posts");
    const searchInput = document.getElementById("searchInput");
    const mainSearchBar = document.getElementById("main-search-bar");
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    const overlay = document.getElementById("overlay"); // Used for darkening the background when sidebar is open

    // Get all sections of content and all navigation links.
    const allContentSections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Elements related to the user profile display.
    const profileImgDisplay = document.getElementById("profile-img-display");
    const profileNameDisplay = document.getElementById("profile-name-display");
    const profileUsernameDisplay = document.getElementById(
      "profile-username-display"
    );
    const profileEmailDisplay = document.getElementById(
      "profile-email-display"
    );
    const updateFieldButtons = document.querySelectorAll(".update-field-btn");

    // Elements for the modal (a pop-up window) used to update profile info.
    const updateModal = document.getElementById("update-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalInput = document.getElementById("modal-input");
    const modalSaveBtn = document.getElementById("modal-save-btn");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    // A variable to remember which profile field (name, email, etc.) we are currently updating.
    let currentFieldToUpdate = "";

    // --- Helper Functions ---
    // These functions perform specific, small tasks that are reused in different parts of the code.

    /**
     * Formats a date string into a more readable format (e.g., "July 18, 2025").
     * @param {string} dateString - The date string to format (e.g., "2025-07-18").
     * @returns {string} The formatted date string.
     */
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    /**
     * Handles the 'like' action for a post.
     * Toggles the 'liked' status of a post and re-renders all posts to update the display.
     * @param {number} postId - The ID of the post to like/unlike.
     */
    function handleLikePost(postId) {
      const post = postsData.find((p) => p.id === postId); // Find the post by its ID
      if (post) {
        post.liked = !post.liked; // Flip the 'liked' status (true to false, false to true)
        renderPosts(postsData); // Re-draw all posts to show the updated like status
      }
    }

    /**
     * Handles the 'share' action for a post.
     * Attempts to use the Web Share API or falls back to a custom message box.
     * @param {number} postId - The ID of the post to share.
     */
    function handleSharePost(postId) {
      const post = postsData.find((p) => p.id === postId);
      if (post) {
        // Check if the Web Share API is available in the user's browser
        if (navigator.share) {
          // If available, use it to share the post title, content, and current URL
          navigator
            .share({
              title: `Post by ${post.user}`,
              text: post.content.substring(0, 100) + "...", // Share a snippet of the content
              url: window.location.href, // Share the current page's URL
            })
            .catch((error) => console.error("Error sharing", error)); // Log any errors during sharing
        } else {
          // If Web Share API is not supported, show a custom message
          showMessageBox(
            `Sharing post by ${post.user}:\n"${post.content.substring(
              0,
              80
            )}..."\n(Share API not supported)`
          );
        }
      }
    }

    /**
     * Displays a custom message box (instead of a simple alert).
     * This provides a more consistent look and feel for messages.
     * @param {string} message - The message to display in the box.
     */
    function showMessageBox(message) {
      const messageBox = document.createElement("div"); // Create a new div element
      messageBox.className = "custom-message-box"; // Assign a CSS class for styling
      messageBox.innerHTML = `
        <div class="message-content">
          <p>${message}</p>
          <button class="message-ok-button">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox); // Add the message box to the end of the body

      // Add basic inline styles for the message box to make it appear as an overlay
      messageBox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
        align-items: center; z-index: 2000; backdrop-filter: blur(5px);
      `;
      messageBox.querySelector(".message-content").style.cssText = `
        background: white; padding: 30px; border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); text-align: center;
        max-width: 400px; width: 90%; font-family: 'Segoe UI', sans-serif;
      `;
      messageBox.querySelector("p").style.cssText = `
        margin-bottom: 20px; font-size: 1.1rem; color: #333;
      `;
      const okButton = messageBox.querySelector(".message-ok-button");
      okButton.style.cssText = `
        background: #0a72e8; color: white; border: none; padding: 10px 20px;
        border-radius: 25px; cursor: pointer; font-size: 1rem; transition: background 0.3s ease;
      `;
      okButton.onmouseover = () => (okButton.style.background = "#054a91"); // Change color on hover
      okButton.onmouseout = () => (okButton.style.background = "#0a72e8"); // Restore color on mouse out

      // When the "OK" button is clicked, remove the message box from the page
      okButton.onclick = () => {
        document.body.removeChild(messageBox);
      };
    }

    /**
     * Updates the displayed user profile information in the "User Profile" section.
     */
    function updateProfileDisplay() {
      profileImgDisplay.src = currentUser.profileImg; // Set the profile image
      profileNameDisplay.textContent = currentUser.name; // Set the user's name
      profileUsernameDisplay.textContent = currentUser.username; // Set the username
      profileEmailDisplay.textContent = currentUser.email; // Set the email
    }

    /**
     * Shows a specific content section and hides all other content sections.
     * Also manages the visibility of the search bar based on the active section.
     * @param {string} sectionId - The ID of the section to show (e.g., "dashboard-section").
     */
    function showContentSection(sectionId) {
      // Hide all content sections first
      allContentSections.forEach((section) => {
        section.classList.remove("active-content"); // Remove the class that makes it visible
      });

      // Show the target section by adding the 'active-content' class
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active-content");
      }

      // Control search bar visibility: show only on the dashboard
      if (sectionId === "dashboard-section") {
        mainSearchBar.style.display = "flex"; // Make the search bar visible
        searchInput.value = ""; // Clear any previous search text
        renderPosts(postsData); // Show all posts when returning to dashboard
      } else {
        mainSearchBar.style.display = "none"; // Hide the search bar
      }

      // If the user profile section is being shown, update its content
      if (sectionId === "user-profile-section") {
        updateProfileDisplay();
      }
    }

    /**
     * Opens the sidebar menu on mobile screens.
     */
    function openSidebar() {
      sidebar.classList.remove("closed"); // Remove 'closed' class
      sidebar.classList.add("open"); // Add 'open' class
      overlay.classList.add("active"); // Show the dark overlay
      hamburger.classList.add("active"); // Change hamburger icon
      document.body.style.overflow = "hidden"; // Prevent scrolling of main content
      document.body.style.paddingRight = getScrollbarWidth() + "px"; // Adjust body padding to prevent content shift when scrollbar disappears
    }

    /**
     * Closes the sidebar menu on mobile screens.
     */
    function closeSidebar() {
      sidebar.classList.add("closed"); // Add 'closed' class
      sidebar.classList.remove("open"); // Remove 'open' class
      overlay.classList.remove("active"); // Hide the dark overlay
      hamburger.classList.remove("active"); // Restore hamburger icon
      document.body.style.overflow = ""; // Allow scrolling of main content again
      document.body.style.paddingRight = ""; // Remove padding adjustment
    }

    /**
     * Calculates the width of the browser's scrollbar. This is used to prevent layout shifts
     * when the sidebar opens and the main content's scrollbar might disappear.
     * @returns {number} The width of the scrollbar in pixels.
     */
    function getScrollbarWidth() {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // Force scrollbar to appear
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth; // Calculate the difference
      outer.parentNode.removeChild(outer); // Clean up the temporary div
      return scrollbarWidth;
    }

    /**
     * Opens the modal for updating user profile fields.
     * @param {string} field - The name of the field to update (e.g., "name", "email").
     */
    function openModal(field) {
      currentFieldToUpdate = field; // Store which field we're updating
      modalTitle.textContent = `Update ${
        field.charAt(0).toUpperCase() + field.slice(1) // Capitalize the first letter for the title
      }`;
      modalInput.value = currentUser[field]; // Pre-fill the input with the current value
      updateModal.classList.add("active"); // Show the modal
    }

    /**
     * Closes the modal for updating user profile fields.
     */
    function closeModal() {
      updateModal.classList.remove("active"); // Hide the modal
      modalInput.value = ""; // Clear the input field
      currentFieldToUpdate = ""; // Reset the field tracker
    }

    // --- Core Rendering Functions ---

    /**
     * Renders a list of posts into the 'postsContainer' element.
     * Clears existing posts and creates new HTML elements for each post.
     * @param {Array<Object>} posts - An array of post objects to display.
     */
    function renderPosts(posts) {
      postsContainer.innerHTML = ""; // Clear any posts currently displayed

      // If there are no posts to show, display a message.
      if (posts.length === 0) {
        postsContainer.innerHTML =
          '<p style="text-align:center; color:#666; font-size:1.2rem; padding: 2rem;">No posts found matching your search.</p>';
        return; // Stop the function here
      }

      // Loop through each post in the provided 'posts' array
      posts.forEach((post) => {
        const postCard = document.createElement("article"); // Create a new HTML <article> element for each post
        postCard.className = "post-card"; // Assign a CSS class for styling

        // Build the inner HTML for the post card using a template literal (backticks ``).
        // This makes it easy to include JavaScript variables directly in the HTML structure.
        postCard.innerHTML = `
          <div class="post-header">
            <img src="${post.userImg}" alt="${
          post.user
        } profile photo" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/48x48/cccccc/333333?text=User';" />
            <div>
              <div class="post-user">${post.user}</div>
              <div class="post-date">${formatDate(post.date)}</div>
            </div>
          </div>
          <div class="post-content">${post.content}</div>
          ${
            // This is a conditional (ternary) operator: if post.image exists, show the image; otherwise, show an empty string.
            post.image
              ? `<img class="post-image" src="${post.image}" alt="Post image for ${post.user}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x300/cccccc/333333?text=Image+Not+Found';" />`
              : ""
          }
          <div class="post-actions">
            <button class="btn like-btn ${
              post.liked ? "liked" : "" // Add 'liked' class if the post is liked
            }" aria-pressed="${post.liked}" aria-label="Like post by ${
          post.user
        }" data-id="${post.id}">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              Like
            </button>
            <button class="btn share-btn" aria-label="Share post by ${
              post.user
            }" data-id="${post.id}">
              <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.6 2.6 0 000-1.39L16 7.13a2.5 2.5 0 101.92 1.85zm-6-9.75a2.5 2.5 0 11-2.5 2.5 2.5 2.5 0 012.5-2.5z"/></svg>
              Share
            </button>
          </div>
        `;
        postsContainer.appendChild(postCard); // Add the newly created post card to the container
      });

      // After all posts are rendered, attach event listeners to their buttons.
      // We re-select them each time posts are rendered to ensure new buttons get listeners.
      document.querySelectorAll(".like-btn").forEach((btn) => {
        // When a like button is clicked, get its post ID and call handleLikePost
        btn.onclick = () => handleLikePost(+btn.dataset.id); // The '+' converts the string ID to a number
      });

      document.querySelectorAll(".share-btn").forEach((btn) => {
        // When a share button is clicked, get its post ID and call handleSharePost
        btn.onclick = () => handleSharePost(+btn.dataset.id);
      });
    }

    // --- Event Listeners and Initial Setup ---
    // These lines of code set up how the page responds to user actions and how it looks when it first loads.

    // 1. Navigation Links:
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Stop the link from acting like a normal link (i.e., don't navigate to a new page)

        // Remove the 'active' class from all navigation links
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        // Add the 'active' class to the link that was just clicked
        link.classList.add("active");

        // Get the ID of the content section associated with this link
        const targetSectionId = link.dataset.target; // 'data-target' is a custom HTML attribute
        if (targetSectionId) {
          showContentSection(targetSectionId); // Show the corresponding content section
        }

        // On smaller screens, close the sidebar after a link is clicked
        if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
          closeSidebar();
        }
      });
    });

    // 2. Search Input:
    searchInput.addEventListener("input", () => {
      // 'input' event fires whenever the value of the input field changes (as the user types)
      // Only filter posts if the dashboard section is currently visible.
      if (
        document
          .getElementById("dashboard-section")
          .classList.contains("active-content")
      ) {
        const query = searchInput.value.toLowerCase().trim(); // Get the search text, convert to lowercase, and remove extra spaces
        // Filter the original postsData based on whether user or content includes the search query
        const filtered = postsData.filter(
          (post) =>
            post.user.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query)
        );
        renderPosts(filtered); // Re-render posts with only the filtered results
      }
    });

    // 3. Sidebar Toggle (Hamburger menu and Overlay):
    hamburger.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) {
        closeSidebar(); // If sidebar is open, close it
      } else {
        openSidebar(); // If sidebar is closed, open it
      }
    });

    overlay.addEventListener("click", () => {
      closeSidebar(); // Close the sidebar when the overlay is clicked
    });

    // 4. Keyboard Shortcuts:
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // If the Escape key is pressed
        if (sidebar.classList.contains("open")) {
          closeSidebar(); // Close the sidebar if it's open
        }
        if (updateModal.classList.contains("active")) {
          closeModal(); // Close the modal if it's open
        }
      }
    });

    // 5. Initial Setup for Sidebar and Content Sections:

    /**
     * Sets the initial state of the sidebar based on screen width
     * and re-evaluates it when the window is resized.
     */
    function setSidebarStateOnLoadAndResize() {
      if (window.innerWidth <= 768) {
        // For mobile/tablet screens
        closeSidebar(); // Ensure sidebar is closed by default
      } else {
        // For desktop screens
        sidebar.classList.remove("closed", "open"); // Ensure sidebar is neither 'closed' nor 'open' classes (it's just visible by default CSS)
        overlay.classList.remove("active"); // Hide overlay
        hamburger.classList.remove("active"); // Reset hamburger icon
        document.body.style.overflow = ""; // Allow scrolling
        document.body.style.paddingRight = ""; // Remove padding
      }
    }

    setSidebarStateOnLoadAndResize(); // Call this function once when the page loads

    // Re-run the sidebar state check whenever the browser window is resized
    window.addEventListener("resize", setSidebarStateOnLoadAndResize);

    // Set the initial active content section when the page loads.
    const initialActiveLink = document.querySelector(".nav-links a.active"); // Find the link with the 'active' class
    if (initialActiveLink) {
      const initialTargetId = initialActiveLink.dataset.target;
      if (initialTargetId) {
        showContentSection(initialTargetId); // Show the section linked to this active nav item
      }
    } else {
      // If no link has the 'active' class, default to showing the dashboard.
      showContentSection("dashboard-section");
      // And make sure the dashboard link itself gets the 'active' class.
      document
        .querySelector('.nav-links a[data-target="dashboard-section"]')
        .classList.add("active");
    }

    // --- Modal Logic for Profile Update ---
    // These handlers control the behavior of the profile update pop-up.

    // Attach event listeners to all buttons that open the update modal.
    updateFieldButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const field = button.dataset.field; // Get the name of the field to update from the button's data attribute
        openModal(field); // Open the modal for that specific field
      });
    });

    modalCloseBtn.addEventListener("click", closeModal); // Close the modal when the close button is clicked

    // Close the modal if the user clicks on the dark overlay (outside the modal content)
    updateModal.addEventListener("click", (e) => {
      if (e.target === updateModal) {
        closeModal();
      }
    });

    // Handle saving the updated profile information
    modalSaveBtn.addEventListener("click", () => {
      const newValue = modalInput.value.trim(); // Get the new value from the input, remove leading/trailing spaces
      if (newValue) {
        currentUser[currentFieldToUpdate] = newValue; // Update the currentUser object with the new value
        updateProfileDisplay(); // Refresh the profile display on the page
        closeModal(); // Close the modal
        showMessageBox(
          `Your ${currentFieldToUpdate} has been updated to "${newValue}"!`
        );
      } else {
        showMessageBox("Please enter a valid value."); // Tell the user if the input is empty
      }
    });
  } catch (e) {
    // --- Error Handling ---
    // This block catches any unexpected errors that occur in the JavaScript.
    console.error("An error occurred during script execution:", e); // Log the error to the browser's console
    // Display a user-friendly error message on the page.
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      background: #ffcccc; color: #cc0000; padding: 15px 25px;
      border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      font-family: sans-serif; z-index: 9999;
    `;
    errorMessageDiv.textContent =
      "Oops! Something went wrong loading the dashboard. Please try refreshing the page.";
    document.body.appendChild(errorMessageDiv); // Add the error message to the page
  }
}); // End of DOMContentLoaded event listener

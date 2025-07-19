document.addEventListener("DOMContentLoaded", () => {
  try {
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
        userImg:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        date: "2025-07-15",
        content:
          "Starting a new book today. Any recommendations for thrillers?",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80", // No image for this post
        liked: true,
      },
      {
        id: 5,
        user: "David Lee",
        userImg: "https://randomuser.me/api/portraits/men/5.jpg",
        date: "2025-07-14",
        content: "Just adopted a new puppy! Welcome to the family, Max!",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        liked: false,
      },
    ];

    const postsContainer = document.getElementById("posts");
    const searchInput = document.getElementById("searchInput");
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    const overlay = document.getElementById("overlay");

    // Helper to format dates
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Render posts function
    function renderPosts(posts) {
      postsContainer.innerHTML = ""; // Clear existing posts
      if (posts.length === 0) {
        postsContainer.innerHTML =
          '<p style="text-align:center; color:#666; font-size:1.2rem; padding: 2rem;">No posts found matching your search.</p>';
        return;
      }
      posts.forEach((post) => {
        const postCard = document.createElement("article");
        postCard.className = "post-card";
        postCard.innerHTML = `
                <div class="post-header">
                  <img src="${post.userImg}" alt="${
          post.user
        } profile photo" loading="lazy" />
                  <div>
                    <div class="post-user">${post.user}</div>
                    <div class="post-date">${formatDate(post.date)}</div>
                  </div>
                </div>
                <div class="post-content">${post.content}</div>
                ${
                  post.image
                    ? `<img class="post-image" src="${post.image}" alt="Post image for ${post.user}" loading="lazy" />`
                    : ""
                }
                <div class="post-actions">
                  <button class="btn like-btn ${
                    post.liked ? "liked" : ""
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
        postsContainer.appendChild(postCard);
      });

      // Add event listeners for like buttons (delegation or re-attach)
      document.querySelectorAll(".like-btn").forEach((btn) => {
        btn.onclick = () => {
          const postId = +btn.dataset.id;
          const post = postsData.find((p) => p.id === postId);
          if (post) {
            post.liked = !post.liked;
            renderPosts(postsData); // Re-render to update UI
          }
        };
      });

      // Add event listeners for share buttons
      document.querySelectorAll(".share-btn").forEach((btn) => {
        btn.onclick = () => {
          const postId = +btn.dataset.id;
          const post = postsData.find((p) => p.id === postId);
          if (post) {
            // Using Web Share API if available, fallback to alert
            if (navigator.share) {
              navigator
                .share({
                  title: `Post by ${post.user}`,
                  text: post.content.substring(0, 100) + "...",
                  url: window.location.href, // Or a specific post URL
                })
                .catch((error) => console.error("Error sharing", error));
            } else {
              alert(
                `Sharing post by ${post.user}:\n"${post.content.substring(
                  0,
                  80
                )}..."\n(Share API not supported)`
              );
            }
          }
        };
      });
    }

    // Initial render of all posts
    renderPosts(postsData);

    // Search filter functionality
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      const filtered = postsData.filter(
        (post) =>
          post.user.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
      renderPosts(filtered);
    });

    // Sidebar toggle logic
    function openSidebar() {
      sidebar.classList.remove("closed");
      sidebar.classList.add("open");
      overlay.classList.add("active");
      hamburger.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent main content scroll
      document.body.style.paddingRight = getScrollbarWidth() + "px"; // Prevent content reflow
    }

    function closeSidebar() {
      sidebar.classList.add("closed");
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = ""; // Restore scroll
      document.body.style.paddingRight = ""; // Remove padding
    }

    // Function to get scrollbar width to prevent layout shift
    function getScrollbarWidth() {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forcing scrollbar to appear
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      return scrollbarWidth;
    }

    hamburger.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    overlay.addEventListener("click", () => {
      closeSidebar();
    });

    // Close sidebar on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("open")) {
        closeSidebar();
      }
    });

    // Initial sidebar state on load and resize
    function setSidebarStateOnLoadAndResize() {
      if (window.innerWidth <= 768) {
        // On mobile, ensure sidebar is closed by default
        closeSidebar();
      } else {
        // On desktop, ensure sidebar is open by default
        sidebar.classList.remove("closed", "open");
        overlay.classList.remove("active");
        hamburger.classList.remove("active"); // Ensure hamburger is not active on desktop
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    }

    // Set initial state
    setSidebarStateOnLoadAndResize();

    // Re-evaluate sidebar state on window resize
    window.addEventListener("resize", setSidebarStateOnLoadAndResize);
  } catch (e) {
    console.error("An error occurred during script execution:", e);
    // Optionally, display a user-friendly error message
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: #ffcccc; color: #cc0000; padding: 15px 25px;
            border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            font-family: sans-serif; z-index: 9999;
          `;
    errorMessageDiv.textContent =
      "Oops! Something went wrong loading the dashboard. Please try refreshing the page.";
    document.body.appendChild(errorMessageDiv);
  }
}); // End DOMContentLoaded

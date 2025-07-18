const posts = [
  {
    title: "Post A",
    status: "scheduled",
    likes: 100,
    comments: 20,
    shares: 15,
    engagement: 0.45,
    date: "2024-01-01",
  },
  {
    title: "Post B",
    status: "published",
    likes: 50,
    comments: 10,
    shares: 5,
    engagement: 0.3,
    date: "2024-02-15",
  },
  {
    title: "Post C",
    status: "draft",
    likes: 200,
    comments: 50,
    shares: 40,
    engagement: 0.8,
    date: "2024-03-10",
  },
  {
    title: "Post D",
    status: "published",
    likes: 75,
    comments: 25,
    shares: 10,
    engagement: 0.6,
    date: "2024-03-20",
  },
  {
    title: "Post E",
    status: "scheduled",
    likes: 90,
    comments: 30,
    shares: 22,
    engagement: 0.55,
    date: "2024-04-05",
  },
  {
    title: "Post F",
    status: "draft",
    likes: 30,
    comments: 5,
    shares: 3,
    engagement: 0.15,
    date: "2024-04-22",
  },
  {
    title: "Post G",
    status: "published",
    likes: 180,
    comments: 40,
    shares: 20,
    engagement: 0.75,
    date: "2024-05-10",
  },
  {
    title: "Post H",
    status: "scheduled",
    likes: 60,
    comments: 12,
    shares: 8,
    engagement: 0.35,
    date: "2024-06-01",
  },
  {
    title: "Post I",
    status: "draft",
    likes: 110,
    comments: 22,
    shares: 18,
    engagement: 0.5,
    date: "2024-06-15",
  },
  {
    title: "Post J",
    status: "published",
    likes: 95,
    comments: 28,
    shares: 17,
    engagement: 0.68,
    date: "2024-07-01",
  },
];
function renderPosts(postsList) {
  const container = document.getElementById("postCards");
  container.innerHTML = ""; // clear previous

  postsList.forEach((post) => {
    const card = document.createElement("div");
    card.className = `post-card`;
    card.dataset.title = post.title.toLowerCase();
    card.dataset.status = post.status.toLowerCase();
    card.dataset.likes = post.likes;
    card.dataset.date = post.date;

    card.innerHTML = `
          <div class="status ${post.status.toLowerCase()}">${post.status}</div>
          <h3>${post.title}</h3>
          <div class="metrics">
            <span>Likes: ${post.likes}</span>
            <span>Comments: ${post.comments}</span>
            <span>Shares: ${post.shares}</span>
            <span>Engagement: ${post.engagement}</span>
            <span>Date: ${post.date}</span>
          </div>
        `;

    container.appendChild(card);
  });
}

function filterCards() {
  const titleFilter = document
    .getElementById("filterTitle")
    .value.toLowerCase();
  const statusFilter = document
    .getElementById("filterStatus")
    .value.toLowerCase();
  const likesFilter =
    parseInt(document.getElementById("filterLikes").value) || 0;
  const dateFilter = document.getElementById("filterDate").value;

  const filtered = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(titleFilter) &&
      (statusFilter === "" || post.status.toLowerCase() === statusFilter) &&
      post.likes >= likesFilter &&
      (dateFilter === "" || post.date === dateFilter)
    );
  });

  // Sort filtered posts by descending date
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderPosts(filtered);
}

window.onload = function () {
  renderPosts([...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
};

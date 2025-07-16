// Sample data simulating `${socialMediaList}`
const socialMediaList = [
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    connected: true,
  },
  {
    name: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    connected: false,
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
    connected: true,
  },
];

const tbody = document.getElementById("socialMediaBody");

socialMediaList.forEach((media) => {
  const row = document.createElement("tr");

  const logoCell = document.createElement("td");
  const img = document.createElement("img");
  img.src = media.logo;
  img.alt = "Logo";
  img.style.width = "40px";
  img.style.height = "40px";
  img.style.objectFit = "contain";
  logoCell.appendChild(img);

  const nameCell = document.createElement("td");
  nameCell.textContent = media.name;

  const statusCell = document.createElement("td");
  const statusSpan = document.createElement("span");
  if (media.connected) {
    statusSpan.textContent = "Linked";
    statusSpan.className = "status-linked";
  } else {
    statusSpan.textContent = "Link Now";
    statusSpan.className = "status-unlinked";
  }
  statusCell.appendChild(statusSpan);

  row.appendChild(logoCell);
  row.appendChild(nameCell);
  row.appendChild(statusCell);

  tbody.appendChild(row);
});

let sortDirection = {};

function sortTable(column) {
  const table = document.getElementById("postTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  const columnIndex = {
    title: 0,
    likes: 1,
    comments: 2,
    shares: 3,
    avgEngagement: 4,
    publishedDate: 5,
  }[column];

  const direction = (sortDirection[column] = !sortDirection[column]);

  rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].innerText.trim();
    let cellB = b.cells[columnIndex].innerText.trim();

    if (column === "likes" || column === "comments" || column === "shares") {
      cellA = parseInt(cellA);
      cellB = parseInt(cellB);
    } else if (column === "avgEngagement") {
      cellA = parseFloat(cellA);
      cellB = parseFloat(cellB);
    } else if (column === "publishedDate") {
      cellA = new Date(cellA);
      cellB = new Date(cellB);
    }

    return direction ? (cellA > cellB ? 1 : -1) : cellA < cellB ? 1 : -1;
  });

  rows.forEach((row) => tbody.appendChild(row)); // re-add sorted rows
}

function filterTable() {
  const filterTitle = document
    .getElementById("filterTitle")
    .value.toLowerCase();
  const filterLikes = document.getElementById("filterLikes").value;
  const filterComments = document.getElementById("filterComments").value;
  const filterShares = document.getElementById("filterShares").value;
  const filterEngagement = document.getElementById("filterEngagement").value;
  const filterDate = document.getElementById("filterDate").value.toLowerCase();

  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach((row) => {
    const cells = row.cells;

    const match =
      cells[0].innerText.toLowerCase().includes(filterTitle) &&
      cells[1].innerText.includes(filterLikes) &&
      cells[2].innerText.includes(filterComments) &&
      cells[3].innerText.includes(filterShares) &&
      cells[4].innerText.includes(filterEngagement) &&
      cells[5].innerText.toLowerCase().includes(filterDate);

    row.style.display = match ? "" : "none";
  });
}

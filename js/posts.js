let sortDirection = {};

function sortTable(column) {
  const table = document.getElementById("postTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  const columnIndex = {
    title: 0,
    status: 1,
    likes: 2,
    comments: 3,
    shares: 4,
    avgEngagement: 5,
    publishedDate: 6,
  }[column];

  const direction = (sortDirection[column] = !sortDirection[column]);

  rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].innerText.trim().toLowerCase();
    let cellB = b.cells[columnIndex].innerText.trim().toLowerCase();

    if (["likes", "comments", "shares"].includes(column)) {
      cellA = parseInt(cellA);
      cellB = parseInt(cellB);
    } else if (column === "avgEngagement") {
      cellA = parseFloat(cellA);
      cellB = parseFloat(cellB);
    } else if (column === "publishedDate") {
      cellA = new Date(cellA);
      cellB = new Date(cellB);
    } else if (column === "status") {
      const statusOrder = { draft: 1, scheduled: 2, published: 3 };
      cellA = statusOrder[cellA] || 0;
      cellB = statusOrder[cellB] || 0;
    }

    return direction ? (cellA > cellB ? 1 : -1) : (cellA < cellB ? 1 : -1);
  });

  rows.forEach((row) => tbody.appendChild(row)); // re-add sorted rows
}

function filterTable() {
  const filterTitle = document.getElementById("filterTitle").value.toLowerCase();
  const filterStatus = document.getElementById("filterStatus").value.toLowerCase();
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
      cells[1].innerText.toLowerCase().includes(filterStatus) &&
      cells[2].innerText.includes(filterLikes) &&
      cells[3].innerText.includes(filterComments) &&
      cells[4].innerText.includes(filterShares) &&
      cells[5].innerText.includes(filterEngagement) &&
      cells[6].innerText.toLowerCase().includes(filterDate);

    row.style.display = match ? "" : "none";
  });
}


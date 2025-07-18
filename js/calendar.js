const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Scheduled jobs with real dates
const scheduledJobs = [
  {
    date: "2025-07-14T09:00:00",
    description: "Schedule Instagram Post",
    status: "scheduled",
  },
  {
    date: "2025-07-16T12:00:00",
    description: "Facebook Live Event",
    status: "published",
  },
  {
    date: "2025-07-18T15:00:00",
    description: "Twitter Thread",
    status: "scheduled",
  },
  {
    date: "2025-07-15T18:00:00",
    description: "LinkedIn Update",
    status: "published",
  },
  {
    date: "2025-07-20T20:00:00",
    description: "YouTube Video Upload",
    status: "scheduled",
  },
];

let currentWeekStart = getSunday(new Date());

function getSunday(date) {
  const day = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);
  sunday.setHours(0, 0, 0, 0);
  return sunday;
}

function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function formatHour(hour) {
  let suffix = hour >= 12 ? "PM" : "AM";
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;
  return `${displayHour} ${suffix}`;
}

function changeWeek(offset) {
  currentWeekStart.setDate(currentWeekStart.getDate() + offset * 7);
  loadWeeklyCalendar();
  loadJobList();

  // Update the year and month dropdowns to match the new currentWeekStart
  yearSelect.value = currentWeekStart.getFullYear();
  monthSelect.value = currentWeekStart.getMonth();

  // Re-render the monthly calendar to update the highlighted week
  renderMonthCalendar(
    currentWeekStart.getFullYear(),
    currentWeekStart.getMonth()
  );

  // Scroll the calendar into view smoothly (optional polish)
  monthCalendar.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function loadWeeklyCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  // Header row
  calendar.appendChild(createCell("", "header"));
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentWeekStart);
    day.setDate(currentWeekStart.getDate() + i);
    calendar.appendChild(createCell(`${days[i]} ${formatDate(day)}`, "header"));
  }

  // 24-hour rows
  for (let hour = 0; hour < 24; hour++) {
    calendar.appendChild(createCell(formatHour(hour), "hour-cell"));

    for (let i = 0; i < 7; i++) {
      const cellDate = new Date(currentWeekStart);
      cellDate.setDate(currentWeekStart.getDate() + i);
      cellDate.setHours(hour, 0, 0, 0);

      const job = scheduledJobs.find((j) => {
        const jobDate = new Date(j.date);
        return (
          jobDate.getFullYear() === cellDate.getFullYear() &&
          jobDate.getMonth() === cellDate.getMonth() &&
          jobDate.getDate() === cellDate.getDate() &&
          jobDate.getHours() === hour
        );
      });

      const jobCell = createCell("", "job-cell");
      if (job) {
        const jobDiv = document.createElement("div");
        jobDiv.className = "job " + job.status;
        jobDiv.title = `${job.description} (${job.status})`;
        jobDiv.textContent = job.description;
        jobCell.appendChild(jobDiv);
      }

      calendar.appendChild(jobCell);
    }
  }
}

function loadJobList() {
  const list = document.getElementById("job-list");
  list.innerHTML = "";

  const weekStart = new Date(currentWeekStart);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const weekJobs = scheduledJobs.filter((j) => {
    const date = new Date(j.date);
    return date >= weekStart && date <= weekEnd;
  });

  const sorted = weekJobs.sort((a, b) => new Date(a.date) - new Date(b.date));

  sorted.forEach((job) => {
    const li = document.createElement("li");
    const date = new Date(job.date);
    const day = days[date.getDay()];
    const hour = formatHour(date.getHours());

    li.textContent = `${day} ${formatDate(date)} ${hour} — ${job.description}`;

    const badge = document.createElement("span");
    badge.className = "status " + job.status;
    badge.textContent =
      job.status.charAt(0).toUpperCase() + job.status.slice(1);
    li.appendChild(badge);

    list.appendChild(li);
  });
}

function createCell(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  return div;
}

/*POPUP*/

// Popup elements
const popupOverlay = document.getElementById("popup-overlay");
const popupModal = document.getElementById("popup-modal");
const popupContent = document.getElementById("popup-content");
const popupClose = document.getElementById("popup-close");

// Close popup function
function closePopup() {
  popupOverlay.style.display = "none";
  popupContent.textContent = "";
}

// Close when clicking close button
popupClose.addEventListener("click", closePopup);

// Close when clicking outside the modal
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});

// Add click handler to job cells after calendar is loaded
function addJobCellClickHandlers() {
  const jobCells = document.querySelectorAll(".job-cell");
  jobCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      const jobDiv = cell.querySelector(".job");
      if (jobDiv) {
        // Job exists, show its title in popup
        popupContent.textContent = jobDiv.title || jobDiv.textContent;
      } else {
        // No job, show a clickable button
        popupContent.innerHTML = `<button id="create-post-btn">Create New Post</button>`;
        // Add click handler for the button
        const createBtn = document.getElementById("create-post-btn");
        createBtn.addEventListener("click", () => {
          // Change the URL below to your create post page or action
          window.location.href = "/create-post"; //TODO new link
        });
      }
      popupOverlay.style.display = "flex";
    });
  });
}

// Call addJobCellClickHandlers every time the calendar loads
const originalLoadWeeklyCalendar = loadWeeklyCalendar;
loadWeeklyCalendar = function () {
  originalLoadWeeklyCalendar();
  addJobCellClickHandlers();
};

// Initial call for the first load
addJobCellClickHandlers();

/*POPUP*/

/*pickup calender */
const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");
const monthCalendar = document.getElementById("month-calendar");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Fill year dropdown (current year ±5 years)
function populateYearSelect() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

// Fill month dropdown
function populateMonthSelect() {
  monthNames.forEach((m, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = m;
    monthSelect.appendChild(option);
  });
}

// Render monthly calendar grid
function renderMonthCalendar(year, month) {
  monthCalendar.innerHTML = "";

  // Add day names header
  dayNames.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("day-name");
    monthCalendar.appendChild(dayDiv);
  });

  // Get first day of month and days count
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    monthCalendar.appendChild(emptyDiv);
  }

  // Add day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = d;
    dayDiv.tabIndex = 0; // make focusable
    dayDiv.setAttribute("role", "button");
    dayDiv.setAttribute(
      "aria-label",
      `Select day ${d} ${monthNames[month]} ${year}`
    );
    dayDiv.classList.add("day-cell");

    // Highlight selected day if it matches currentWeekStart
    const cellDate = new Date(year, month, d);
    if (
      cellDate >= currentWeekStart &&
      cellDate < new Date(currentWeekStart.getTime() + 7 * 24 * 3600 * 1000)
    ) {
      dayDiv.classList.add("selected-day");
    }

    // Click handler for day
    dayDiv.addEventListener("click", () => {
      currentWeekStart = getSunday(cellDate);
      loadWeeklyCalendar();
      loadJobList();
      renderMonthCalendar(year, month); // re-render to update selected day
    });

    monthCalendar.appendChild(dayDiv);
  }
}

// Initialize selects and calendar with current week start date
function initDatePicker() {
  populateYearSelect();
  populateMonthSelect();

  yearSelect.value = currentWeekStart.getFullYear();
  monthSelect.value = currentWeekStart.getMonth();

  yearSelect.addEventListener("change", () => {
    renderMonthCalendar(
      parseInt(yearSelect.value),
      parseInt(monthSelect.value)
    );
  });

  monthSelect.addEventListener("change", () => {
    renderMonthCalendar(
      parseInt(yearSelect.value),
      parseInt(monthSelect.value)
    );
  });

  renderMonthCalendar(
    currentWeekStart.getFullYear(),
    currentWeekStart.getMonth()
  );
}

// Run on page load
initDatePicker();

/*pickup calender*/

// Load initial week
loadWeeklyCalendar();
loadJobList();

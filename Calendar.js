const weekDatesContainer = document.getElementById("weekDates");
const currentWeekDisplay = document.getElementById("currentWeek");
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const calendarTableBody = document.getElementById("calendarTableBody");

let currentDate = new Date();

// Hardcoded users (you can fetch from API as needed)
const users = [
    "John Doe", "Jane Smith", "Chris Johnson", "Patricia Lee", "Michael Brown",
    "Linda Davis", "James Wilson", "Sarah Moore", "David Harris", "Laura Clark"
];

// Get start of the week
function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(date.setDate(diff));
}

// Render week dates
function renderWeek() {
    const startOfWeek = getStartOfWeek(new Date(currentDate));
    const weekDates = [];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    weekDatesContainer.innerHTML = ""; // Clear previous

    // Add the Users column to the first column
    const usersColumn = document.createElement("div");
    usersColumn.classList.add("date");
    usersColumn.textContent = "Users";
    weekDatesContainer.appendChild(usersColumn);

    // Add the dates for Monday to Sunday
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekDates.push(date);

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        dateDiv.textContent = `${date.getDate()} ${monthNames[date.getMonth()]}`;
        if (
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
        ) {
            dateDiv.classList.add("today");
        }

        weekDatesContainer.appendChild(dateDiv);
    }

    const startMonth = monthNames[weekDates[0].getMonth()];
    const startYear = weekDates[0].getFullYear();
    const endMonth = monthNames[weekDates[6].getMonth()];
    const endYear = weekDates[6].getFullYear();
    currentWeekDisplay.textContent = 
        startYear === endYear
            ? `${startMonth} ${weekDates[0].getDate()} - ${endMonth} ${weekDates[6].getDate()}, ${startYear}`
            : `${startMonth} ${weekDates[0].getDate()}, ${startYear} - ${endMonth} ${weekDates[6].getDate()}, ${endYear}`;
}

// Render calendar rows for users
function renderCalendarRows() {
    calendarTableBody.innerHTML = ""; // Clear previous rows
    const startOfWeek = getStartOfWeek(new Date(currentDate));

    // Loop through each user and render their row
    users.forEach(user => {
        const row = document.createElement("tr");

        // Add user name in the first column
        const nameCell = document.createElement("td");
        nameCell.textContent = user;
        row.appendChild(nameCell);

        // Add date cells (7 columns for Monday-Sunday)
        for (let i = 0; i < 7; i++) {
            const dateCell = document.createElement("td");
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dateCell.textContent = date.getDate(); // Display the day of the month
            row.appendChild(dateCell);
        }

        calendarTableBody.appendChild(row);
    });
}

prevWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 7);
    renderWeek();
    renderCalendarRows();
});

nextWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 7);
    renderWeek();
    renderCalendarRows();
});

// Initial rendering
renderWeek();
renderCalendarRows();

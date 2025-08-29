document.addEventListener('DOMContentLoaded', () => {
    // Define events
    const events = [
        {
            date: '2025-09-15',
            title: 'FCI/IGP World Championship',
            type: 'competition',
            color: '#FFD580' // pastel yellow
        },
        {
            date: '2025-09-28',
            title: 'POA - Regional Events',
            type: 'competition',
            color: '#FFD580'
        },
        {
            date: '2025-09-28',
            title: 'RSV Global Latin America - Anniversary',
            type: 'competition',
            color: '#FFD580'
        },
        {
            date: '2025-10-03',
            title: 'RSV2000 World Championship',
            type: 'competition',
            color: '#FFD580'
        }
    ];

    const calendarContainer = document.getElementById('calendar-container');
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    function renderCalendar() {
        calendarContainer.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.id = 'calendar-header';
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <h2>${monthNames[currentMonth]} ${currentYear}</h2>
            <button id="next-month">&gt;</button>
        `;
        calendarContainer.appendChild(header);

        // Table
        const table = document.createElement('table');
        table.id = 'calendar-table';

        const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let firstDay = new Date(currentYear, currentMonth, 1);
        let startingDay = firstDay.getDay();
        let monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < startingDay) {
                    cell.textContent = '';
                } else if (date > monthLength) {
                    cell.textContent = '';
                } else {
                    const cellDate = new Date(currentYear, currentMonth, date);
                    const dateString = `${cellDate.getFullYear()}-${(cellDate.getMonth()+1).toString().padStart(2,'0')}-${cellDate.getDate().toString().padStart(2,'0')}`;
                    cell.textContent = date;

                    // Check if there's an event on this day
                    events.forEach(event => {
                        if (event.date === dateString) {
                            cell.style.backgroundColor = event.color;
                            cell.setAttribute('title', `${event.title} (${event.type})`);
                        }
                    });

                    // Today
                    const today = new Date();
                    if (cellDate.getFullYear() === today.getFullYear() &&
                        cellDate.getMonth() === today.getMonth() &&
                        cellDate.getDate() === today.getDate()) {
                        cell.classList.add('today');
                    }

                    date++;
                }
                weekRow.appendChild(cell);
            }
            tbody.appendChild(weekRow);
        }
        table.appendChild(tbody);
        calendarContainer.appendChild(table);

        // Month navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }

    renderCalendar();
});
document.addEventListener('DOMContentLoaded', () => {
    // Define events
    const events = [
        {
            date: '2025-09-15',
            title: 'FCI/IGP World Championship',
            type: 'competition',
            color: '#FFD580' // pastel yellow
        },
        {
            date: '2025-09-28',
            title: 'POA - Regional Events',
            type: 'competition',
            color: '#FFD580'
        },
        {
            date: '2025-09-28',
            title: 'RSV Global Latin America - Anniversary',
            type: 'competition',
            color: '#FFD580'
        },
        {
            date: '2025-10-03',
            title: 'RSV2000 World Championship',
            type: 'competition',
            color: '#FFD580'
        }
    ];

    const calendarContainer = document.getElementById('calendar-container');
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    function renderCalendar() {
        calendarContainer.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.id = 'calendar-header';
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <h2>${monthNames[currentMonth]} ${currentYear}</h2>
            <button id="next-month">&gt;</button>
        `;
        calendarContainer.appendChild(header);

        // Table
        const table = document.createElement('table');
        table.id = 'calendar-table';

        const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let firstDay = new Date(currentYear, currentMonth, 1);
        let startingDay = firstDay.getDay();
        let monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < startingDay) {
                    cell.textContent = '';
                } else if (date > monthLength) {
                    cell.textContent = '';
                } else {
                    const cellDate = new Date(currentYear, currentMonth, date);
                    const dateString = `${cellDate.getFullYear()}-${(cellDate.getMonth()+1).toString().padStart(2,'0')}-${cellDate.getDate().toString().padStart(2,'0')}`;
                    cell.textContent = date;

                    // Check if there's an event on this day
                    events.forEach(event => {
                        if (event.date === dateString) {
                            cell.style.backgroundColor = event.color;
                            cell.setAttribute('title', `${event.title} (${event.type})`);
                        }
                    });

                    // Today
                    const today = new Date();
                    if (cellDate.getFullYear() === today.getFullYear() &&
                        cellDate.getMonth() === today.getMonth() &&
                        cellDate.getDate() === today.getDate()) {
                        cell.classList.add('today');
                    }

                    date++;
                }
                weekRow.appendChild(cell);
            }
            tbody.appendChild(weekRow);
        }
        table.appendChild(tbody);
        calendarContainer.appendChild(table);

        // Month navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }

    renderCalendar();
});

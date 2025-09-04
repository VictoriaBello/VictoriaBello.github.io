document.addEventListener('DOMContentLoaded', () => {
    // Events with ranges and lighter colors
    const events = [
        {
            startDate: '2025-09-15',
            endDate: '2025-09-21',
            title: 'FCI/IGP World Championship',
            type: 'International',
            color: '#FFDEB4' // light brown
        },
        {
            startDate: '2025-09-28',
            endDate: '2025-09-29',
            title: 'POA - Regional Events',
            type: 'National',
            color: '#A8D5BA' // light green
        },
        {
            startDate: '2025-09-28',
            endDate: '2025-09-29',
            title: 'RSV Global Latin America - Anniversary',
            type: 'National',
            color: '#C1E1C1' // softer green
        },
        {
            startDate: '2025-10-03',
            endDate: '2025-10-05',
            title: 'RSV2000 World Championship',
            type: 'International',
            color: '#F5CBA7' // soft brown
        }
    ];

    const calendarContainer = document.getElementById('calendar-container');
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    function renderCalendar() {
        calendarContainer.innerHTML = '';
        calendarContainer.style.display = 'flex';
        calendarContainer.style.flexDirection = 'column';
        calendarContainer.style.alignItems = 'center';
        calendarContainer.style.marginTop = '40px';

        // Calendar header
        const header = document.createElement('div');
        header.id = 'calendar-header';
        header.style.width = '600px';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.margin = '0 0 10px';
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <h2 style="margin:0;">${monthNames[currentMonth]} ${currentYear}</h2>
            <button id="next-month">&gt;</button>
        `;
        calendarContainer.appendChild(header);

        // Calendar table
        const table = document.createElement('table');
        table.id = 'calendar-table';
        table.style.width = '600px';
        table.style.borderCollapse = 'collapse';
        table.style.textAlign = 'center';

        const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            th.style.padding = '5px';
            th.style.borderBottom = '1px solid #ccc';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let firstDay = new Date(currentYear, currentMonth, 1);
        let startingDay = firstDay.getDay();
        let monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();

        let date = 1;
        for(let i=0;i<6;i++){
            const weekRow = document.createElement('tr');
            for(let j=0;j<7;j++){
                const cell = document.createElement('td');
                cell.style.padding = '8px';
                cell.style.height = '40px';
                cell.style.border = '1px solid #eee';
                if(i===0 && j<startingDay){
                    cell.textContent = '';
                } else if(date>monthLength){
                    cell.textContent = '';
                } else {
                    const cellDate = new Date(currentYear,currentMonth,date);
                    cell.textContent = date;

                    // Check events
                    events.forEach(event=>{
                        const eventStart = new Date(event.startDate);
                        const eventEnd = new Date(event.endDate);
                        eventEnd.setDate(eventEnd.getDate() + 1);

                        if(cellDate >= eventStart && cellDate < eventEnd){
                            cell.style.backgroundColor = event.color;
                            cell.dataset.title = event.title;
                            cell.dataset.type = event.type;
                            cell.dataset.start = event.startDate;
                            cell.dataset.end = event.endDate;
                        }
                    });

                    // Today
                    const today = new Date();
                    if(cellDate.getFullYear()===today.getFullYear() &&
                       cellDate.getMonth()===today.getMonth() &&
                       cellDate.getDate()===today.getDate()){
                        cell.style.border = '2px solid #333';
                    }

                    date++;
                }
                weekRow.appendChild(cell);
            }
            tbody.appendChild(weekRow);
        }
        table.appendChild(tbody);
        calendarContainer.appendChild(table);

        // Tooltip
        let tooltip = document.getElementById('calendar-tooltip');
        if(!tooltip){
            tooltip = document.createElement('div');
            tooltip.id = 'calendar-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.padding = '6px 10px';
            tooltip.style.background = 'rgba(0,0,0,0.75)';
            tooltip.style.color = '#fff';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.display = 'none';
            tooltip.style.zIndex = 1000;
            document.body.appendChild(tooltip);
        }

        // Hover
        const cells = table.querySelectorAll('td');
        cells.forEach(cell=>{
            if(cell.dataset.title){
                cell.addEventListener('mouseover',(e)=>{
                    tooltip.innerHTML = `<strong>${cell.dataset.title}</strong><br>Type: ${cell.dataset.type}<br>${cell.dataset.start} → ${cell.dataset.end}`;
                    tooltip.style.display='block';
                    tooltip.style.left = e.pageX + 10 + 'px';
                    tooltip.style.top = e.pageY + 10 + 'px';
                });
                cell.addEventListener('mousemove',(e)=>{
                    tooltip.style.left = e.pageX + 10 + 'px';
                    tooltip.style.top = e.pageY + 10 + 'px';
                });
                cell.addEventListener('mouseout',()=>{
                    tooltip.style.display='none';
                });
            }
        });

        // Month navigation
        document.getElementById('prev-month').addEventListener('click',()=>{
            currentMonth--;
            if(currentMonth<0){ currentMonth=11; currentYear--; }
            renderCalendar();
        });
        document.getElementById('next-month').addEventListener('click',()=>{
            currentMonth++;
            if(currentMonth>11){ currentMonth=0; currentYear++; }
            renderCalendar();
        });
    }

    renderCalendar();
});

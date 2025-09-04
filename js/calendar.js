document.addEventListener('DOMContentLoaded', () => {
    // Eventos con rangos y colores más claros
    const events = [
        {
            startDate: '2025-09-15',
            endDate: '2025-09-21',
            title: 'Campeonato Mundial FCI/IGP',
            type: 'internacional',
            color: '#FFDEB4' // marrón claro
        },
        {
            startDate: '2025-09-28',
            endDate: '2025-09-29',
            title: 'POA - Regionales',
            type: 'nacional',
            color: '#A8D5BA' // verde claro
        },
        {
            startDate: '2025-09-28',
            endDate: '2025-09-29',
            title: 'RSV Global Latinoamérica - Aniversario',
            type: 'nacional',
            color: '#C1E1C1' // verde más suave
        },
        {
            startDate: '2025-10-03',
            endDate: '2025-10-05',
            title: 'Campeonato Mundial RSV2000',
            type: 'internacional',
            color: '#F5CBA7' // marrón suave
        }
    ];

    const calendarContainer = document.getElementById('calendar-container');
    const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    function renderCalendar() {
        calendarContainer.innerHTML = '';
        calendarContainer.style.display = 'flex';
        calendarContainer.style.flexDirection = 'column';
        calendarContainer.style.alignItems = 'center';
        calendarContainer.style.marginTop = '40px'; // espacio más amplio antes del calendario

        // Header del calendario
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

        // Tabla del calendario
        const table = document.createElement('table');
        table.id = 'calendar-table';
        table.style.width = '600px';
        table.style.borderCollapse = 'collapse';
        table.style.textAlign = 'center';

        const daysOfWeek = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
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

                    // Revisar si hay eventos en rango
                    events.forEach(event=>{
                        const eventStart = new Date(event.startDate);
                        const eventEnd = new Date(event.endDate);
                        eventEnd.setDate(eventEnd.getDate() + 1); // incluir último día

                        if(cellDate >= eventStart && cellDate < eventEnd){
                            cell.style.backgroundColor = event.color;
                            cell.dataset.title = event.title;
                            cell.dataset.type = event.type;
                            cell.dataset.start = event.startDate;
                            cell.dataset.end = event.endDate;
                        }
                    });

                    // Hoy
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

        // Tooltip dinámico
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

        // Hover en celdas con evento
        const cells = table.querySelectorAll('td');
        cells.forEach(cell=>{
            if(cell.dataset.title){
                cell.addEventListener('mouseover',(e)=>{
                    tooltip.innerHTML = `<strong>${cell.dataset.title}</strong><br>${cell.dataset.type}<br>${cell.dataset.start} → ${cell.dataset.end}`;
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

        // Navegación meses
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

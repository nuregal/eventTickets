async function fetchEvents() {
    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();
    console.log(data)

    if(data.success) {
        let eventsList = document.querySelector('.event-list');
        eventsList.innerHTML = data.events.map((event) => eventTemplate(event)).join('');
    }
}


function eventTemplate(event) {
    return `
        <a href = "/buy/${event.id}"
        class = "event ${(event.total - event.bought) > 0 ? '' : 'prevent-click'}">
            <div class="event__date">
                <span>${event.day}</span>
                <span class="pris">${event.month}</span>
            </div>
            <div class="event__content">
                <h1>${event.title}</h1>
                <p>${event.where}</p>
                <h5>
                    <span>${event.start} - ${event.end}</span>
                    <span class="left">Left: ${event.total - event.bought}</span>
                    <span class="pris">${event.price}</span>
                </h5>
            </div>
        </a>
    
    `
}

fetchEvents();


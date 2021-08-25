const url = window.location.href
const segments = url.split('/')
const id = segments[segments.length - 1];

const title = document.getElementById('title');
const place = document.getElementById('where');
const when = document.getElementById('when');
const timeStart = document.getElementById('timeStart');
const timeEnd = document.getElementById('timeEnd');
const ticketId = document.getElementById('ticketId');

async function getTicket() {
    const response = await fetch(`http://localhost:3000/api/tickets/${id}`);
    const data = await response.json();
    console.log(data);

    if(data.success) {
            const response1 = await fetch(`http://localhost:3000/api/events/${data.ticket.eventId}`);
            const data1 = await response1.json();
            console.log(data1);

            title.innerHTML = data1.event.title
            place.innerHTML = data1.event.where
            when.innerHTML = data1.event.day +' '+ data1.event.month
            timeStart.innerHTML = data1.event.start
            timeEnd.innerHTML = data1.event.end
            ticketId.innerHTML = id
    }
}

getTicket()
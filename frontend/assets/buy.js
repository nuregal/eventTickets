const url = window.location.href
const segments = url.split('/')
const id = segments[segments.length-1];
const buyButton = document.getElementById('buy');

async function fetchTicket(id)  {
    const response = await fetch(`http://localhost:3000/api/events/${id}`);
    const data = await response.json();
    console.log(data)

    if(data.event) {

        const title = document.getElementById('title');
        const place = document.getElementById('where');
        const price = document.getElementById('price');
        title.innerHTML= data.event.title;
        place.innerHTML= data.event.where;
        price.innerHTML= data.event.price;
        console.log(title)
    }
};

buyButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        },
        body: JSON.stringify({eventId: id})
    })
    const data = await response.json();
    if(data.success) {
        location.href = 'http://localhost:3000/tickets/'+ data.id
    }else {
        buyButton.innerHTML = 'SLUTSÅLD';

    }
});



fetchTicket(id)

function getToken() {
    return sessionStorage.getItem('token');
}

async function checkLoginStatus() {
    const token = getToken();
    const response = await fetch('http://localhost:3000/api/staff/loggedin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    if (!data.loggedIn) {
        location.href = 'http://localhost:3000/staff/login';
    }
}

const ticketInput = document.getElementById('ticketInput');
const verifyButton = document.getElementById('verifyButton');

verifyButton.addEventListener('click',async () => {
    const token = getToken();
    const response = await fetch(`http://localhost:3000/api/staff/verify`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({id: ticketInput.value})
    });
    const data = await response.json();
    console.log(data);
    if(data.success) {
        alert('This ticket is valid')
    } else {
        alert('Invalid Ticket!!!')
    }
})

checkLoginStatus()
function getToken() {
    return sessionStorage.getItem('token');
}

async function isLoggedIn() {
    const token = getToken();
    const response = await fetch('http://localhost:3000/api/staff/loggedin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    if(data.loggedIn) {
        location.href = 'http://localhost:3000/staff/verify';
    }}


const userInput = document.getElementById('userInput')
const passwordInput = document.getElementById('passwordInput')
const loginButton = document.getElementById('loginButton')



async function login(username,password) {
    const response = await fetch('http://localhost:3000/api/staff/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({username: username,password: password})
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
        return data.token
    } 
    return false;
}

function saveToken(token) {
    return new Promise((resolve, reject) => {
         sessionStorage.setItem('token', token);
         resolve('Done');
    })
}

loginButton.addEventListener('click',async () => {
   const token = await login(userInput.value,passwordInput.value);
   if(token) {
       await saveToken(token)
       location.href = 'http://localhost:3000/staff/verify';
   }else {
       alert('Wrong username or password!!!')
   }

})

isLoggedIn()
// js code for the login and signup container

// the container themselves
let Login_container = document.querySelector('.Login')
let Signup_container = document.querySelector('.Signup')
/*
few notes
the error message of both containers is the top paragraph 
try and make the error message dynamic
make the border of the inputs red whenever an error occurs

use regular expression generator
*/ 

// the close icons the containers
let Login_close = document.querySelector('.Login-close')
let Signup_close = document.querySelector('.Signup-close')

// already have an account or
// dont have an account
let alternate_login = document.querySelector('.alternate-login')
let alternate_signup = document.querySelector('.alternate-signup')

// the form on the signup container
let login_form = document.querySelectorAll('.Login-form form > *')
let form_signup = document.querySelectorAll('.Signup-form form > *')

let email_login = login_form[0].value
let psword_login = login_form[1].value
const data = {
    "email": email_login,
    "psword": psword_login
}

login_form[2].addEventListener('click', e =>{
    e.preventDefault()
    login_request()
    // authenticate the login regex and whatnot
})

function login_request(){
    const url = 'http://127.0.0.1:8080/Ecommerce-Website/PHP/login.php'
    // const url = '../PHP/login.php'

    fetch(url, {
        method: "POST",
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // return response.json()
        console.log(response);
    })
    .then(data => {
        // console.log(data);
        login_form[0].value = data.response
    })
    // let x = JSON.parse(result) 
    // login_form[0].value  = result['fullName']
}


Login_close.addEventListener('click', (e) => {
    Login_container.style.display = 'none'    
})

Signup_close.addEventListener('click', (e) => {
    Signup_container.style.display = 'none'
})

alternate_login.addEventListener('click', (e) => {
    e.preventDefault();
    Login_container.style.display = 'flex'
    Signup_container.style.display = 'none'
})

alternate_signup.addEventListener('click', (e) => {
    e.preventDefault();
    Login_container.style.display = 'none'
    Signup_container.style.display = 'flex'
})



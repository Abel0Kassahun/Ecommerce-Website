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
let form_signup = document.querySelectorAll('.Signup-form form > *')



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



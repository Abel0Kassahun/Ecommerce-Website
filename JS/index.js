// the login and signup button on the nav bar
let login_button = document.querySelector('.login-button')
let signup_button = document.querySelector('.signup-button')

// the form on the welcome page
let form_welcome_page = document.querySelectorAll('.join-us-today > *')


login_button.addEventListener('click', (e) => {
    e.preventDefault();
    Login_container.style.display = 'flex'
    Signup_container.style.display = 'none'
})

signup_button.addEventListener('click', (e) => {
    Signup_container.style.display = 'flex'
    Login_container.style.display = 'none'
})


form_welcome_page[1].addEventListener('click', (e) => {
    e.preventDefault()
    // the email input on the signup container
    signup_form[1].value = form_welcome_page[0].value

    form_welcome_page[0].value = ''
    
    Signup_container.style.display = 'flex'

})


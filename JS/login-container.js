
// js code for the login container

// the container 
let Login_container = document.querySelector('.Login')

// the close icons the containers
let Login_close = document.querySelector('.Login-close')

// already have an account or
// dont have an account
let alternate_signup = document.querySelector('.alternate-signup')

// the form on the signup container
let login_form = document.querySelectorAll('.Login-form form > *')

// the error message on bothe the signup and login container
let error_login = document.querySelector('.Login-error-msg')
const login_msg_original = error_login.innerHTML

// to close the login container 
Login_close.addEventListener('click', (e) => {
    Login_container.style.display = 'none'    
})

// to close login and open signup
alternate_signup.addEventListener('click', (e) => {
    e.preventDefault();
    Login_container.style.display = 'none'
    Signup_container.style.display = 'flex'
})


// when the user presses the login button
login_form[2].addEventListener('click', e =>{
    e.preventDefault()
    // getting the email and password from the form    
    let email_login = login_form[0].value
    let psword_login = login_form[1].value
    // a regular expression for the email
    const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/
    
    // if the email is of a correct pattern
    if(email_pattern.test(email_login)){
        // resetting any style changes that had been made
        login_form[0].style.border = 'none'
        error_login.innerHTML = login_msg_original
        error_login.style.color = 'black'
        
        // getting the response from the request and using it to validate the user input 
        login_request(email_login, psword_login).then(returned =>{
            console.log(returned);
            if(returned.response === "Email not found, try signing up"){
                on_failure(login_form[0], error_login, returned.response)
            }
            else{
                if(returned.response === "Incorrect Password, Try again"){
                    on_failure(login_form[1], error_login, returned.response);
                }
                else if(returned.response === "Email has been found, password is correct"){
                    error_login.innerHTML = `Welcome ${returned.fullName}, you have succesfully logged in, <br> you will be redirected soon`
                    error_login.style.color = ' #48c9b0 '
                    login_form[0].style.border = '3px solid #a3e4d7'
                    login_form[1].style.border = '3px solid #a3e4d7'
                    
                    // redirect after 4 seconds 
                    // pass the email and fullname to the next page 
                    setTimeout(() => {
                        // Code to be executed after 4 seconds
                        redirect('../HTML/home-page.html', login_form[0].value, returned.fullName)
                    }, 4000);
                }
            }
        })
    }
    else{
        on_failure(login_form[0], error_login, "Invalid email format, try again");
    }
})

// a style to indicate an input error from the user  
function on_failure(textbox, errorElt, errorMsg){
    textbox.style.border = '2px solid red';
    errorElt.innerHTML = errorMsg;
    errorElt.style.color = 'red';
}

// to make an post http request to the xampp apache server(localhost) 
async function login_request(email_login, psword_login){
    let login_data = {
        email: email_login,
        psword: psword_login
    }
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/login.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login_data)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object =  await response.json()
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}





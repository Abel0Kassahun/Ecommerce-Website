// the container itself
let Signup_container = document.querySelector('.Signup')

// the close button atop of the container 
let Signup_close = document.querySelector('.Signup-close')

// already have an account anchor tag 
let alternate_login = document.querySelector('.alternate-login')

// the form on the container
let signup_form = document.querySelectorAll('.Signup-form form > *')

// the error messsage and its original text 
let error_signup = document.querySelector('.Signup-error-msg')
const signup_msg_original = error_signup.innerHTML

Signup_close.addEventListener('click', (e) => {
    Signup_container.style.display = 'none'
})

alternate_login.addEventListener('click', (e) => {
    e.preventDefault();
    Login_container.style.display = 'flex'
    Signup_container.style.display = 'none'
})


signup_form[5].addEventListener('click', (e)=>{
    event.preventDefault()
    reset_error_effect()

    const fullName_pattern = /^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/;
    const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.com$/
    const phoneNo_pattern = /^(09)[0-9]{8}$/;

    let empty = false;
    for(let i = 0; i < 5 && !empty; i++){
        empty = check_if_empty(signup_form[i], error_signup)
    }
    if(!empty){
        if(!(fullName_pattern.test(signup_form[0].value))){
            on_failure(signup_form[0], error_signup, 
                'Incorrect full name format <br> try again (eg. Julius Ceasar)')
        }
        else if(!(email_pattern.test(signup_form[1].value))){
            on_failure(signup_form[1], error_signup, 
                'Invalid email format, try again')
        }
        else if(!(phoneNo_pattern.test(signup_form[2].value))){
            on_failure(signup_form[2], error_signup, 'Phone number should start <br> with 09 and 10 digits in total')
        }
        else if(signup_form[3].value.length <= 6){
            on_failure(signup_form[3], error_signup, 'Password should be longer than 6 characters')        
        }
        else if(signup_form[4].value != signup_form[3].value){
            on_failure(signup_form[4], error_signup, 'Password doesn\'t match the previous password input, <br> try again')        
        }
        else{
            signup_request(signup_form).then(returned =>{
                if(returned.response === 'Signup Successful'){
                    error_signup.innerHTML = `Welcome ${signup_form[0].value}, you have succesfully signed up, <br> you will be redirected soon`
                    error_signup.style.color = '#48c9b0'
                    for(let i = 0; i < 5; i++){
                        signup_form[i].style.border = 'none'
                    }
                    // redirect after 4 seconds
                    // pass the email and the fullname to the next page
                    setTimeout(() => {
                        // Code to be executed after 4 seconds
                        redirect('../HTML/home-page.html', returned.uid, signup_form[0].value)
                    }, 4000);
                }
                else{
                    on_failure(signup_form[1], error_signup, returned.response)
                }
            })
        }
    }
})

function redirect(url, uid, fname){
    /* If you want to navigate to a new URL without replacing 
    the current page in the browser history,
    you can use the window.location.replace() method instead.
    */
    window.location.href = `${url}?uid=${uid}&fname=${fname}` 
}


async function signup_request(signup_form){
    let signup_data = {
        fullName: signup_form[0].value,
        email: signup_form[1].value,
        phoneNo: signup_form[2].value,
        psword: signup_form[3].value
    }
    console.log('sent-data-----',signup_data);
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/signup.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signup_data)
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

function check_if_empty(input_tag, error_signup){
    if(input_tag.value.length == 0){
        error_signup.innerHTML = 'Please fill out this field'
        error_signup.style.color = 'red'
        input_tag.style.border = '3px solid red'
        return true 
    }
    return false
}

function reset_error_effect(){
    // resetting any style changes that had been made
    for(let i = 0; i < 5; i++){
        signup_form[i].style.border = 'none'
    }
}

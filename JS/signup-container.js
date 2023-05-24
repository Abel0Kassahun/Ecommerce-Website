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
                'First name and Last name should start <br> with a capital letter, try again')
        }
        else if(!(email_pattern.test(signup_form[1].value))){
            on_failure(signup_form[1], error_signup, 
                'Invalid email format, try again')
        }
        else if(!(phoneNo_pattern.test(signup_form[2].value))){
            on_failure(signup_form[2], error_signup, 'Phone number should start <br> with 09 with 10 digits total')
        }
        else if(signup_form[3].value.length <= 6){
            on_failure(signup_form[3], error_signup, 'Password should be longer than 6 characters')        
        }
        else if(signup_form[4].value != signup_form[3].value){
            on_failure(signup_form[4], error_signup, 'Password doesn\'t match the previous password input, <br> try again')        
        }
        else{
            signup_request(signup_form).then(returned =>{
                console.log(returned);
                if(returned.response === 'Email already exists, try signing in'){
                    on_failure(signup_form[1], error_signup, returned.response)
                }
                else if(returned.response === 'Signup Successful'){
                    error_signup.innerHTML = `Welcome ${returned.fullName}, you have succesfully signed up, <br> you will be redirected soon`
                    error_signup.style.color = '#48c9b0'
                    for(let i = 0; i < 5; i++){
                        signup_form[i].style.border = 'none'
                    }
                    // redirect after 4 seconds
                    // pass the email to the next page 
                }
            })
        }
    }
})


async function signup_request(signup_form){
    let signup_data = {
        fullName: signup_form[0],
        email: signup_form[1],
        phoneNo: signup_form[2],
        psword: signup_form[3]
    }
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/signup.php'
    try{
        const resposne = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signup_data)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object =  await resposne.json()
        console.log("yoyoyoyo", returned_object.fullName);
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

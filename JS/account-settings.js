// URLSearchParams object represents the query parameters in the current URL.
const urlParams = new URLSearchParams(window.location.search);

// get() method of the URLSearchParams object is used to retrieve the value of a 
// specific query parameter by passing its name as an argument.
const user_id = urlParams.get('uid');
const fname = urlParams.get('fname');

let messages_button = document.querySelector('.msgs');
let message_display = document.querySelector('.messages');

let chatroom = document.querySelector('.chat-room');

let send_text_field = chatroom.querySelector('form input');
let send_text = chatroom.querySelector('form a');

let selection = document.querySelectorAll('.selection button')

let bought_items_container = document.querySelector('.Bought-items');
let items_posted_container = document.querySelector('.Items-posted');
let liked_items_container = document.querySelector('.Liked-items');


let texts = document.querySelector('.texts');

messages_button.addEventListener('click', (e) => {
    bought_items_container.style.display = "none";
    liked_items_container.style.display = "none";
    items_posted_container.style.display = "none";

    message_display.style.display = 'flex';
    load_chats().then(returned => {
        if(returned.response === 'All good'){
            for(let i = 0; i < returned.chats.length; i++){
                create_chats(returned.chats[i].chat_id, returned.chats[i].fullName,
                returned.chats[i].profile_picture)
            }
        }
        else{
            alert(returned.response);
        }
    })
})

function create_chats(chat_id, fullname, profile_picture){
    // Create a new div element with the normal-msgs class
    const normal_msg = document.createElement('div');
    normal_msg.classList.add('normal-msgs');

    // Create the inner elements and content
    const image = document.createElement('img');
    image.src = profile_picture;
    image.style.backgroundSize = 'cover';
    // image.style.backgroundPosition = 'center';

    const msg_information = document.createElement('div');
    msg_information.classList.add('msg-information');

    const user_name = document.createElement('p');
    user_name.innerHTML = fullname;
        
    // Append the inner elements to the new div element
    msg_information.appendChild(user_name);


    normal_msg.appendChild(image);
    normal_msg.appendChild(msg_information);

    // Append the new div element to the page
    message_display.appendChild(normal_msg);

    // add an event listener to every message
    normal_msg.addEventListener('click', (e) => {
        // pass the chat_id (span) 
        // you set the display of chat room flex box 
        // you send a post request
        chatroom.style.display = 'flex';
        
        load_texts(parseInt(chat_id))
        .then(returned => {
            // get all the texts with that chat id ordered by thier timestamp
            // if the user id matches the sender id create an elt with class outgoing-texts
            // if the user id matches the recipient id create an elt with class incoming-texts
            // assign a sent recieved time (you need methods to work with timestamp )
            // DESC

            if(response.returned === 'All good'){
                for(let i = 0; i < resturned.texts.length; i++){
                    create_texts(returned.texts[i].message, returned.texts[i].timestamp, 
                    returned.texts[i].recipient, returned.texts[i].sender);
                }
            }
            else{
                alert(returned.response);
            }
        })
    });
}

setTimeout(() => {
    // Code to be executed after 4 seconds
    chatroom.addEventListener('load', (e) => {
        // clear all the loaded texts 
        load_texts(parseInt(chat_id))
        .then(returned => {
            // get all the texts with that chat id ordered by thier timestamp
            // if the user id matches the sender id create an elt with class outgoing-texts
            // if the user id matches the recipient id create an elt with class incoming-texts
            // assign a sent recieved time (you need methods to work with timestamp )
            // DESC
            if(response.returned === 'All good'){
                for(let i = 0; i < resturned.texts.length; i++){
                    create_texts(returned.texts[i].message, returned.texts[i].timestamp, 
                    returned.texts[i].recipient, returned.texts[i].sender);
                }
            }
            else{
                alert(returned.response);
            }
        })
    })
}, 2000);


send_text_field.addEventListener('keydown', (e) => {
    let now = new Date();
    let timestamp = Math.floor(now.getTime() / 1000); 
    if(e.keyCode === 13){
        if(send_text_field.value != ''){
            send_text().then(returned => {
                // if(returned.response === 'Message saved successfully')
                create_texts(send_text_field.value, timestamp, null, user_id)        
                // else
                // alert(returned.response)
            })
        }        
    }
})

send_text.addEventListener('click', (e) => {
    let now = new Date();
    let timestamp = Math.floor(now.getTime() / 1000); 
    if(send_text_field.value != ''){
        create_texts(send_text_field.value, timestamp, null, user_id)
    }
})




function create_texts(message, timestamp, recipient, sender){
    let dateObj = new Date(timestamp);
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    if(recipient === user_id){        
        const text_msg_box = document.createElement('div');
        text_msg_box.classList.add('text-msg');
        text_msg_box.classList.add('incoming-texts');

        const text_itself = document.createElement('p');
        text_itself.classList.add('text-itself');
        text_itself.innerHTML = message;

        const sent_recieved_time = document.createElement('p');
        sent_recieved_time.classList.add('sent-recieved-time');
        sent_recieved_time.innerHTML = hour + ':' + minute;

        text_msg_box.appendChild(text_itself);
        text_msg_box.appendChild(sent_recieved_time);

        texts.appendChild(text_msg_box);

    }
    else if(sender === user_id){
        const text_msg_box = document.createElement('div');
        text_msg_box.classList.add('text-msg');
        text_msg_box.classList.add('outgoing-texts');

        const text_itself = document.createElement('p');
        text_itself.classList.add('text-itself');
        text_itself.innerHTML = message;

        const sent_recieved_time = document.createElement('p');
        sent_recieved_time.classList.add('sent-recieved-time');
        sent_recieved_time.innerHTML = hour + ':' + minute;

        text_msg_box.appendChild(text_itself);
        text_msg_box.appendChild(sent_recieved_time);

        texts.appendChild(text_msg_box);
    }
}

async function send_texts(chat_id, message, sender, recipient, timestamp){
    let sent_text = {
        chat_id: chat_id,
        msg: message,
        sender: sender,
        recipient: recipient,
        timestamp: timestamp
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/send_texts.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sent_text)
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


async function load_texts(chat_id){
    let load = {
        chat_id: chat_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_texts.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(load)
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


async function load_chats(){
    let load = {
        user_id: user_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_chats.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(load)
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

async function load_bought_items(){
    let load = {
        user_id: user_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_bought_items.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(load)
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

async function load_posted_items(){
    let load = {
        user_id: user_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_posted_items.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(load)
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

async function load_liked_items(){
    let load = {
        user_id: user_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_liked_items.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(load)
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

// bought items selection
selection[2].addEventListener('click', (e) => {
    message_display.style.display = "none";
    liked_items_container.style.display = "none";
    items_posted_container.style.display = "none";

    while (bought_items_container.firstChild) {
        bought_items_container.removeChild(bought_items_container.firstChild);
    }
    
    bought_items_container.style.display = "flex";
    load_bought_items().then(returned => {
        if(returned.response != "Success"){
            alert(returned.response);
        }
        else{
            for(let i = 0; i < returned.product.length; i++){
                add_bought_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, bought_items_container);
            }
        }
        
    })
})

// posted items selection
selection[3].addEventListener('click', (e) => {
    message_display.style.display = "none";
    liked_items_container.style.display = "none";
    bought_items_container.style.display = "none";


    while (items_posted_container.firstChild) {
        items_posted_container.removeChild(items_posted_container.firstChild);
    }
    
    items_posted_container.style.display = "flex";
    load_posted_items().then(returned => {
        if(returned.response != "Success"){
            alert(returned.response);
        }
        else{
            for(let i = 0; i < returned.product.length; i++){
                add_bought_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, items_posted_container);
            }
        }
    })
})

// liked items selection
selection[4].addEventListener('click', (e) => {
    message_display.style.display = "none";
    bought_items_container.style.display = "none";
    items_posted_container.style.display = "none";
    
    while (liked_items_container.firstChild) {
        liked_items_container.removeChild(liked_items_container.firstChild);
    }
    
    liked_items_container.style.display = "flex";
    load_liked_items().then(returned => {
        if(returned.response != "Success"){
            alert(returned.response);
        }
        else{
            for(let i = 0; i < returned.product.length; i++){
                add_bought_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, liked_items_container);
            }
        }
        
    })
})

function add_bought_items(pr_id, pr_image, pr_name, pr_price, container){
    let single_item = document.createElement('div');
    single_item.classList.add('single-item');

    let img = document.createElement('img');
    img.src = pr_image;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';

    let information = document.createElement('div');
    information.classList.add('bought-items-info');

    let product_name = document.createElement('p');
    product_name.innerHTML = pr_name;

    let product_price = document.createElement('p');
    product_price.innerHTML = pr_price;

    information.appendChild(product_name);
    information.appendChild(product_price);

    single_item.appendChild(img);
    single_item.appendChild(information);

    container.appendChild(single_item);

    single_item.addEventListener('click', (e) => {
        window.open(`../HTML/product.html?pr_id=${pr_id}&uid=${user_id}`, '_blank');
    })
}



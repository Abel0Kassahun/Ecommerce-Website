// URLSearchParams object represents the query parameters in the current URL.
const urlParams = new URLSearchParams(window.location.search);

// get() method of the URLSearchParams object is used to retrieve the value of a 
// specific query parameter by passing its name as an argument.
const user_id = urlParams.get('uid');
const fname = urlParams.get('fname');


let selection = document.querySelectorAll('.selection button')

let bought_items_container = document.querySelector('.Bought-items');
let items_posted_container = document.querySelector('.Items-posted');
let liked_items_container = document.querySelector('.Liked-items');


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
selection[0].addEventListener('click', (e) => {
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
                add_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, bought_items_container);
            }
        }
        
    })
})

// posted items selection
selection[1].addEventListener('click', (e) => {
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
                add_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, items_posted_container);
            }
        }
    })
})

// liked items selection
selection[2].addEventListener('click', (e) => {
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
                add_items(returned.product[i].pr_id, returned.product[i].pr_image, returned.product[i].pr_name, returned.product[i].pr_price, liked_items_container);
            }
        }
        
    })
})

function add_items(pr_id, pr_image, pr_name, pr_price, container){
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



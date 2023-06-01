const urlParams = new URLSearchParams(window.location.search);

const user_id = urlParams.get('uid');
const product_id = urlParams.get('pr_id');

let pr_detail = document.querySelector('.product');
let seller = document.querySelector('.seller');
let buy = document.querySelector('.buttons .btn button');
let dm_me = document.querySelector('.dm_seller');
let add_to_cart = document.querySelector('.add-to-cart');

let confirm_buy = document.querySelector('.confirm_buy');
let confirmation = confirm_buy.querySelectorAll('.confirmation button')

var total_price;


window.addEventListener('load', (e) => {
    fetch_product().then(returned =>{
        fill_product_details(returned.pr_name, returned.pr_price, returned.pr_image, returned.pr_description);
        total_price = returned.pr_price;
        if(returned.item_in_cart){
            add_to_cart.innerHTML = "Remove from cart";
        }
        else{
            add_to_cart.innerHTML = "Add to cart";
        }
    });
})

function fill_product_details(p_name, p_price, p_image, p_description){
    pr_detail.querySelector('.product_detail .p_name p').textContent = p_name;
    pr_detail.querySelector('.product_detail .p_price p').textContent = p_price + ' Birr';
    pr_detail.querySelector('.p_image').style.backgroundImage = `url(${p_image})`;
    pr_detail.querySelector('.p_image').style.backgroundSize = "cover";
    pr_detail.querySelector('.p_image').style.backgroundPosition = "center";
    seller.querySelector('textarea').value = p_description;
}

buy.addEventListener('click', (e) => {
    confirm_buy.style.display = "flex";
})

confirmation[0].addEventListener('click', (e) => {
    confirm_buy.style.display = "none";
    alert('You are about to be redirected to chappa\'s payment page');
    checkout_fn().then(returned => {
        if(returned.status === "success"){
            // redirecting the user to the chekcout page of chappa
            window.open(returned.data.checkout_url, '_blank')

            // after the user finished payment in chappa's checkout url
            // we check if the payment to us was successful

            // the code below should have executed in our callback url
            verify_payment(returned.tx_ref_custom).then(returned => {
                // set this to true if you want to bypass payment
                if(returned.message === "Payment not paid yet"){ 
                    // clear the cart items 
                    // delete products that have been bought
                    // and store those products in bought items
                    clear_cart().then(returned => {
                        if(returned.response === "Success"){
                            alert('You have succesfully bought an item');
                            confirm_buy.style.display = "none";
                            // display none all the buttons (buy, add to cart, dm me)
                        }
                        else{
                            confirm_buy.style.display = "none";
                            alert('you\'re ',returned.response);
                        }
                    })
                }
                else{
                    confirm_buy.style.display = "none";
                    alert('Please finish the payment if you want to checkout your cart items');
                }
            })
        }
        else{
            confirm_buy.style.display = "none";
            // this alert is not for the user but for debugging purposes
            alert('Something went wrong initializing payment');
        }
    })
})

confirmation[1].addEventListener('click', (e) => {
    confirm_buy.style.display = "none";
})
// let confirm_buy = document.querySelector('.confirm_buy');
// let confirmation = confirm_buy.querySelector('.confirmation')


dm_me.addEventListener('click', (e) => {

})

add_to_cart.addEventListener('click', (e) => {
    if(add_to_cart.innerHTML === "Remove from cart"){
        // remove from cart
        remove_item_from_cart().then(returned => {
            if(returned === "Success"){
                alert('Item removed from cart');
                add_to_cart.innerHTML = "Add to cart";
            }
            else{
                alert(returned);
            }
        });
    }
    else{
        add_to_cart_fn().then(returned => {
            if(returned.response === "Success"){
                alert('Item to added to your cart');  
                add_to_cart.innerHTML = "Remove from cart"
                add_to_cart.style.fontSize = "10px";          
            }
            else{
                alert(returned.response);
            }
        })
    }
})

async function remove_item_from_cart(){
    let remove_from_cart = {
        user_id: user_id,
        product_id: product_id
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/remove_item_from_cart.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(remove_from_cart)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object = await response.json()
        console.log(returned_object);
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}


async function add_to_cart_fn(){
    let addtocart = {
        user_id: user_id,
        product_id: product_id
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/add_to_cart.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addtocart)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object = await response.json()
        console.log(returned_object);
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}


async function checkout_fn(){
    let load = {
        user_id: user_id,
        total_price: total_price
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/checkout.php'
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
        const returned_object = await response.json()
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function verify_payment(tx_ref){
    let verify = {
        tx_ref: tx_ref
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/verify_payment.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(verify)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object = await response.json()
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function clear_cart(){
    let clr_cart = {
        user_id: user_id,
        from_buy: true,
        product_id: product_id
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/clear_cart.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clr_cart)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object = await response.json()
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetch_product(){
    let product = {
        user_id: user_id,
        product_id: product_id
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/product.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object =  await response.json()
        console.log(returned_object);
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}
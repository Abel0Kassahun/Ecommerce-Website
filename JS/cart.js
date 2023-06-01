let cart_btn = document.querySelector('.cart_btn');

let cart = document.querySelector('.cart');
let close_cart = cart.querySelector('.close-cart button');
let cart_of_products = cart.querySelector('.cart-of-products');

let checkout = cart.querySelector('.checkout_btn');

let confirm_checkout = document.querySelector('.confirm-checkout');
let checkout_price = confirm_checkout.querySelector('checkout-price'); 

let yes_checkout = confirm_checkout.querySelector('.yes-checkout');
let cancel_checkout = confirm_checkout.querySelector('.cancel-checkout');

let total_amount = document.querySelector('.checkout-price');

var total_price;
var cart_items_exist ;

cart_btn.addEventListener('click', (e) => {
    cart.style.display = 'flex';
    
    while (cart_of_products.firstChild) {
        cart_of_products.removeChild(cart_of_products.firstChild);
    }

    load_cart_items().then(returned => {
        if(returned.response === 'Success'){
            for(let i = 0; i< returned.products.length; i++){
                add_items(returned.products[i].pr_id, returned.products[i].pr_name, returned.products[i].pr_price, returned.products[i].pr_image);
            }
            total_price = returned.total_price;
            total_amount.innerHTML = returned.total_price;

            cart_items_exist = true;
        }
        else{
            alert(returned.response); 
            cart_items_exist = false;
        }
    })
})

close_cart.addEventListener('click', (e) => {
    cart.style.display = 'none';
    confirm_checkout.style.display = 'none';

})


function add_items(pr_id, pr_name, pr_price, pr_image){
    const cart_product = document.createElement('div');
    cart_product.classList.add('cart-product');

    const img = document.createElement('img');
    img.src = pr_image;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';

    const information = document.createElement('div');
    information.classList.add('information');

    const name = document.createElement('p');
    const price = document.createElement('p');
    name.innerHTML = 'Product Name:';
    price.innerHTML = 'Price:';

    const p_name = document.createElement('p');
    p_name.classList.add('pr_name');
    p_name.innerHTML = pr_name

    const p_price = document.createElement('p');
    p_price.classList.add('pr_name');
    p_price.innerHTML = pr_price;

    information.appendChild(name);
    information.appendChild(p_name);
    information.appendChild(price);
    information.appendChild(p_price);

    cart_product.appendChild(img);
    cart_product.appendChild(information);

    cart_of_products.appendChild(cart_product);

    cart_product.addEventListener('click', (e) => {
        // for the time being its window.location
        // but it should be account.style.display = flex
        window.open(`../HTML/product.html?pr_id=${pr_id}&uid=${user_id}`, '_blank');
        cart.style.display = 'none';
    })
}


async function load_cart_items(){
    let load = {
        user_id: user_id,
    };

    const url = 'http://localhost:8080/Ecommerce-Website/PHP/load_cart_items.php'
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


checkout.addEventListener('click', (e) => {
    // checkout_price.innerHTML = total_price;
    if(cart_items_exist){
        if(total_price <= 100000){
            confirm_checkout.style.display = 'unset';
            alert('The items in your cart exceed the maximum spending amount (100,000) \n try again');
        }
    }
    else{
        alert('There are no items in your cart');
    }

})

// let yes_checkout = confirm_checkout.querySelector('.yes-checkout');
// let cancel_checkout 

cancel_checkout.addEventListener('click', (e) => {
    confirm_checkout.style.display = 'none';
})

yes_checkout.addEventListener('click', (e) => {
    // before you close the confirm checkout pop up and clear all the cart items 
    // you need to wait for the confirmation of payment
    
    // when the payment is confirmed 
    // close the confirm checkout
    // clear the cart items 
    // delete products that have been bought
    // and store those products in bought items 


    confirm_checkout.style.display = 'none';

    alert('You are about to be redirected to chappa\'s payment page');
    checkout_fn().then(returned => {
        if(returned.status === "success"){
            // redirecting the user to the chekcout page of chappa
            window.open(returned.data.checkout_url, '_blank')

            // after the user finished payment in chappa's checkout url
            // we check if the payment to us was successful

            // the code below should have executed in our callback url
            verify_payment(returned.tx_ref_custom).then(returned => {
                if(returned.message === "Payment not paid yet"){ // set this to true if you want to bypass payment
                    // clear the cart items 
                    // delete products that have been bought
                    // and store those products in bought items
                    clear_cart().then(returned => {
                        if(returned.response === "Success"){
                            alert('You have succesfully checkedout');
                            cart.style.display = 'none';
                            // clear the cart
                        }
                        else{
                            alert(returned.response);
                        }
                    })
                }
                else{
                    alert('Please finish the payment if you want to checkout your cart items');
                }
            })
        }
        else{
            // this alert is not for the user but for debugging purposes
            alert('Something went wrong initializing payment, try again later');
        }
    })
})

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
        console.log('from checkout',returned_object);
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
        from_buy: false
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

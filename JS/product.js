const urlParams = new URLSearchParams(window.location.search);

const user_id = urlParams.get('uid');
const product_id = urlParams.get('pr_id');

let pr_detail = document.querySelector('.product');
let seller = document.querySelector('.seller');
let buy = document.querySelector('.buttons .btn button');
let dm_me = document.querySelector('.dm_seller');


window.addEventListener('load', (e) => {
    fetch_product(product_id).then(returned =>{
        fill_product_details(returned.pr_name, returned.pr_price, returned.pr_image, returned.pr_description);
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
    alert('buy');
})


dm_me.addEventListener('click', (e) => {

})


async function fetch_product(pr_id){
    let product = {
        pr_id: pr_id,
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
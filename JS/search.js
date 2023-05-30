const urlParams = new URLSearchParams(window.location.search);
const cat_name = urlParams.get('cat');
const searched_product = urlParams.get('searched_pr');
const user_id = urlParams.get('uid');


let price_range = document.querySelectorAll('.filter-by-price input');
let category_dropdown = document.querySelector('#category-dropdown');
let search_input = document.querySelector('.searchbar input');
let search_button = document.querySelector('.search-button');
// the container that holds the search results
let container = document.querySelector('.search-results');
// Get the value of the selected option
// const selectedValue = dropdown.value;

// Search error
let search_error = document.querySelector('.search-error');

window.addEventListener('load', (e) => {
    if(cat_name){
        for (let i = 0; i < category_dropdown.options.length; i++) {
            let option = category_dropdown.options[i];
            if (option.text === cat_name) {
                option.selected = true;
                break;
            }
        }

    }
    if(searched_product){
        search_input.value = searched_product;
    }
})

search_input.addEventListener('keydown', (e) =>{
    let min = price_range[0].value;
    let max = price_range[1].value;
    let drp_down = category_dropdown.options[category_dropdown.selectedIndex].text;


    if(e.keyCode === 13){
        // Loop over all child elements and remove them
        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if(drp_down === "--Select an option--"){
            console.log(drp_down);
            search_error.innerHTML = "Please choose a category";
        }
        else{
            search_error.innerHTML = "";
            search(search_input.value, drp_down, min, max)
            .then(returned => {
                // if the retuned length is above a certain point we use this shit -> 1 | 2 | 3 ... | 5 
                for(let i = 0; i < returned.length; i++){
                    create_element(returned[i].product_id, returned[i].product_name, returned[i].product_price, returned[i].product_image, returned[i].product_cat);
                }
            });
        }
    }
})

search_button.addEventListener('click', (e) => {
    e.preventDefault();
    // Loop over all child elements and remove them
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let min = price_range[0].value;
    let max = price_range[1].value;
    let drp_down = category_dropdown.options[category_dropdown.selectedIndex].text;
    
    if(drp_down === "--Select an option--"){
        console.log(drp_down);
        search_error.innerHTML = "Please choose a product category";
    }
    else{
        search_error.innerHTML = "";
        search(search_input.value, drp_down, min, max)
        .then(returned => {
            // if the retuned length is above a certain point we use this shit -> 1 | 2 | 3 ... | 5 
            for(let i = 0; i < returned.length; i++){
                create_element(returned[i].product_id, returned[i].product_name, returned[i].product_price, returned[i].product_image, returned[i].product_cat);
            }
        });
    }
})

async function search(search_input, category_name, min_price, max_price){
    let search_data = {
        pr_name: search_input,
        c_name: category_name,
        min_pr: min_price,
        max_pr: max_price
    };
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/search.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(search_data)
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

function create_element(pr_id, pr_name, pr_price, pr_image, c_name){
    // Create a new div element with the single-result class
    const newResult = document.createElement('div');
    newResult.classList.add('single-result');

    // Create the inner elements and content
    const image = document.createElement('img');
    image.src = pr_image;
    image.style.backgroundSize = 'cover';
    image.style.backgroundPosition = 'center';

    const information = document.createElement('div');
    information.classList.add('information');

    const productName = document.createElement('span');
    productName.textContent = 'Product Name';
    const productNameValue = document.createElement('p');
    productNameValue.textContent = pr_name;

    const category = document.createElement('span');
    category.textContent = 'Category';

    const categoryValue = document.createElement('p');
    categoryValue.textContent = c_name;

    const price = document.createElement('span');
    price.textContent = 'Price';

    const priceValue = document.createElement('p');
    priceValue.textContent = pr_price;

    // Append the inner elements to the new div element
    information.appendChild(productName);
    information.appendChild(productNameValue);
    information.appendChild(category);
    information.appendChild(categoryValue);
    information.appendChild(price);
    information.appendChild(priceValue);

    newResult.appendChild(image);
    newResult.appendChild(information);

    // Append the new div element to the page
    container.appendChild(newResult);
    newResult.addEventListener('click', (e) => {
        window.location.href = `../HTML/product.html?pr_id=${pr_id}&uid=${user_id}`;
    });
}

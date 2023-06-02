// URLSearchParams object represents the query parameters in the current URL.
const urlParams = new URLSearchParams(window.location.search);

// get() method of the URLSearchParams object is used to retrieve the value of a 
// specific query parameter by passing its name as an argument.
const user_id = urlParams.get('uid');
const fname = urlParams.get('fname');


// getting the search bar 
let search_bar = document.querySelector('.search input');

// getting all the categories
let category = document.querySelectorAll('.category');

// the a tags on all the small navbars
let small_navbar_atags = document.querySelectorAll('.nav-bar-two a');

// the sell btn
let sell_btn = document.querySelector('.sell_btn');
let sell_container = document.querySelector('.sell-wrapper');

// the account a tag
let account = document.querySelector('.account');


window.addEventListener('load', () => {    
    fyp().then(returned =>{
        console.log(returned);
        // array of 5 random categories name out of 17 from the api
        const list_of_categories = Object.keys(returned);
        console.log(list_of_categories);

        for(let i = 0; i < 5; i++){ // should iterate 5 times
            
            // .c${i+1} is just to be careful, code might be still work without it 
            category[i].querySelector(`.c${i+1} .titles h3`).innerHTML = list_of_categories[i];
            
            // setting the href of all the view all's
            category[i].querySelector(`.c${i+1} .titles a`).addEventListener('click', (e) => {
                window.open(`../HTML/search.html?cat=${list_of_categories[i]}&uid=${user_id}`, '_blank');
            })

            // calling a method that will set the a tags backgroung image and thier hrefs
            href_and_images(category[i].querySelectorAll(`.c${i+1} .category_imgs .cat-slideshow a`),
            returned[list_of_categories[i]].pr_imgs, returned[list_of_categories[i]].pr_ids)
        }
    })
    for(let i = 0; i < 9; i++){
        small_navbar_atags[i].setAttribute("href", `../HTML/search.html?cat=${small_navbar_atags[i].textContent}&uid=${user_id}`);
    }
});


search_bar.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        window.open(`../HTML/search.html?searched_pr=${search_bar.value}&uid=${user_id}`, '_blank');
    }
});

sell_btn.addEventListener('click', (e) => {
    sell_container.style.display = "flex";
})

account.addEventListener('click', (e) => {
    window.open(`../HTML/account.html?uid=${user_id}&fname=${fname}`, '_blank');
})

function href_and_images(a_tags, pr_images, pr_id){
    for(let i = 0; i < 5; i++){
        a_tags[i].addEventListener('click', (e) => {
            window.open(`../HTML/product.html?pr_id=${pr_id[i]}&uid=${user_id}`, '_blank');
        })
        a_tags[i].querySelector('img').setAttribute("src", pr_images[i]);
        a_tags[i].style.backgroundSize = "cover";
        a_tags[i].style.backgroundPosition = "center";
    }
}

async function fyp(){
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/home-page-fyp.php'
    try{
        const response = await fetch(url, {
            method: "GET",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object =  await response.json();
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}


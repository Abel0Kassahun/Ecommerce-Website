// URLSearchParams object represents the query parameters in the current URL.
const urlParams = new URLSearchParams(window.location.search);

// get() method of the URLSearchParams object is used to retrieve the value of a 
// specific query parameter by passing its name as an argument.
const email = urlParams.get('email');
const fname = urlParams.get('fname');
console.log(email); 
console.log(fname); 

// getting the search bar 
let search_bar = document.querySelector('.search input');

// getting all the categories
let category = document.querySelectorAll('.category');

// object of objects from the api
let mko

// array of 5 random categories name out of 17 from the api
let list_of_categories;



window.addEventListener('load', () => {
    for(let i = 0; i < 5; i++){
        // .c${i+1} is just to be careful, code might be still work without it 
        category[i].querySelector(`.c${i+1} .titles h3`).value = list_of_categories[i];
        // setting the href of all the view all's
        category[i].querySelector(`.c${i+1} .titles a`)
        .setAttribute("href", `../HTML/search.html?cat=${list_of_categories[i]}`);
        // calling a method that will set the a tags backgroung image  and thier hrefs
        href_and_images(category[i].querySelectorAll(`.c${i+1} .category_imgs .cat-slideshow a`),
        mko.list_of_categories[i].pr_images, mko.list_of_categories[i].pr_id)
    }
});

search_bar.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        window.location.href = `../HTML/search.html?cat=${search_bar.value}`;
    }
});

function href_and_images(a_tags, pr_images, pr_id){
    for(let i = 0; i < 5; i++){
        a_tags[i].setAttribute("href", `../HTML/products.html?pr_id=${pr_id[0]}`);
        a_tags[i].style.backgroundImage = `url('${pr_images[i]}')`;
        a_tags[i].style.backgroundSize = "cover";
    }
}


// const mko = {
//     cat: {
//         pr_n:[1, 2, 3],
//         pr_i:[4, 5, 6]
//     },
//     dog: {
//         pr_n:[1, 2, 3],
//         pr_i:[4, 5, 6]
//     }
// };
// let list_of_cats = Object.keys(mko) 
// console.log(list_of_cats); 
// console.log(mko.list_of_cats[0].pr_n[0]);

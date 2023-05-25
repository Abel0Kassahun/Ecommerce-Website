// URLSearchParams object represents the query parameters in the current URL.
const urlParams = new URLSearchParams(window.location.search);

// get() method of the URLSearchParams object is used to retrieve the value of a 
// specific query parameter by passing its name as an argument.
const email = urlParams.get('email');
const fname = urlParams.get('fname');
console.log(email); 
console.log(fname); 

// getting the search bar 
let search_bar = document.querySelector('.search input')

window.addEventListener('load', () => {

})

search_bar.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        window.location.href = `../HTML/search.html?cat=${search_bar.value}`;
    }
})


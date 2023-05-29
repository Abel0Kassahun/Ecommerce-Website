const urlParams = new URLSearchParams(window.location.search);

const user_id = urlParams.get('uid');
const fname = urlParams.get('fname');


const fileInput = document.querySelector('.uploading input');
const postBtn = document.querySelector('.post');
const imagePreview = document.querySelector('.uploading .img');
let selectedFile = null;

let category_dropdown = document.querySelector('#category-dropdown');
let product_name = document.querySelector('.input .name input');
let product_price = document.querySelector('.input .price input');
let desc = document.querySelector('.uploading .description textarea');

let ext = document.querySelector('nav .exit img');
let success_msg = document.querySelector('.wrapper nav .success')
// Filter file types
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        alert('Please select a valid image file.');
    }
    else{
        selectedFile = file;
        const reader = new FileReader();
        console.log('dodododod', reader.result);
        reader.onload = function() {
            imagePreview.style.backgroundImage = `url(${reader.result})`;
            imagePreview.style.backgroundSize = 'cover';
        }
        reader.readAsDataURL(file);
    }
});

postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let drp_down = category_dropdown.options[category_dropdown.selectedIndex].text;
    
    if(drp_down === "--Select an option--"){
        alert("Please choose a category");
    }
    else{
        if (!selectedFile) {
            alert('Please select an image file.');
        }
        else{
            const formData = new FormData();
            formData.append('image', selectedFile, selectedFile.name);
            formData.append('category', drp_down);

            // Send file to server
            fetch(`http://localhost:8080/Ecommerce-Website/PHP/upload-image.php?`, {
                method: 'POST',
                // mode: 'no-cors',
                body: formData,
            })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(`Image saved as ${data.filename}`);
                // Send file to server
                if(data.response == 'Image Uploaded Successfully, you will be redirected soon'){
                    let sell_data = {
                        pr_name: product_name.value,
                        pr_price: product_price.value,
                        pr_image: `../PHP/product_images/${drp_down}/${data.filename}`,
                        posted_by: user_id,
                        pr_description: desc.value,
                        category: drp_down
                    }

                    sell(sell_data).then(returned => {
                        if(returned.response === 1){
                            alert('You have succcesfully posted an item for sale')
                            // success();
                        }
                        else{
                            alert(returned.response);
                        }
                    })
                }
                else{
                    alert(data.response);
                }
            })
            // .catch(error => {
            //     console.error(error);
            // });
        }
    }
});

function success(){
    success_msg.innerHTML = 'You have succcesfully posted an item for sale, \n You will be redirected soon';
    success_msg.style.color = '#76d7c4';
    setTimeout(() => {
        // Code to be executed after 4 seconds
        window.location.href = `./home-page.html?uid=${user_id}&fname=${fname}`;
    }, 4000);
}

ext.addEventListener('click', (e) => {
    window.location.href = `../HTML/home-page.html?uid=${user_id}&fname=${fname}`;
})

async function sell(sell_Data){
    const url = 'http://localhost:8080/Ecommerce-Website/PHP/sell.php'
    try{
        const response = await fetch(url, {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sell_Data)
        })
        // console.log(response.status);
        // console.log(response.headers.get('Content-Type'));
        const returned_object =  await response.json()
        return returned_object;0
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}
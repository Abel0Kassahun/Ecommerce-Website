const urlParams = new URLSearchParams(window.location.search);

const user_id = urlParams.get('uid');


const fileInput = document.querySelector('.uploading input');
const postBtn = document.querySelector('.post');
const imagePreview = document.querySelector('.uploading .img');
let selectedFile = null;

let category_dropdown = document.querySelector('#category-dropdown');
let product_name = document.querySelector('.input .name input');
let product_price = document.querySelector('.input .price input');
let desc = document.querySelector('.uploading .description textarea');

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

postBtn.addEventListener('click', () => {
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
        
            // Send file to server
            fetch('http://localhost:8080/Ecommerce-Website/PHP/upload-image.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(`Image saved as ${data.filename}`);
                // Send file to server
                if(data.response == 'Product Upload Successfully, you will be redirected soon'){
                    let sell_data = {
                        pr_name: product_name.value,
                        pr_price: product_price.value,
                        pr_description: desc.value,
                        category: drp_down,
                        posted_by: user_id,
                        pr_image: `../PHP/product_images/${data.filename}`
                    }
                    sell(sell_data).then(returned => {
                        if(returned.response === 1){
                            window.location.href = `../HTML/home-page.html?uid=${user_id}`;
                        }
                        else{
                            alert('Something went wrong, try again later');
                        }
                    })
                }
                else{
                    alert(data.response);
                }
        
            })
            .catch(error => {
                console.error(error);
            });
        
        }
    }


    
});

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
        return returned_object;
    }
    catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
}
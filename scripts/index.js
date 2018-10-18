const landingImage = document.querySelector('[data-landing]');
const gallery = document.querySelector('[data-gallery]');
const keyWord = `landscape`;
const imageArray = [];
// change landing photo on click

// logic for interactive photo gallery
function getImages(){
    fetch(`https://api.unsplash.com/photos/random?client_id=${USKey}`)
    .then(r => r.json())
    .then(keepImage);
}

function drawImages(obj){
    let img = document.createElement('img');
    img.setAttribute('src', obj.urls.raw);
    gallery.appendChild(img);
}

function keepImage(obj){
    if(obj.location !== undefined){
        drawImages(obj);
    }
}
    // Google vision for captions 
    // Display metadata onclick

// logic for map plotting based on image location information

// logic for passing location information from maps/image to weather 
getImages();
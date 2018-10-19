// change landing photo on click
const landingImage = document.querySelector('[data-landing]');
const gallery = document.querySelector('[data-gallery]');
const body = document.querySelector('body');
const urls = [];
const searchForm = document.querySelector('[data-form]');
// logic for interactive photo gallery
// let userSearch = prompt('What would you  like to see? ');
// let userSearch = 'landscape';


// extract urls from each result
function getUrls(obj){
    for (item of obj.results){
        urls.push(item.urls.raw);
    }
    return obj.results;
}

function drawImages(){
    for(imageSrc of urls){
        let img = document.createElement('img');
        img.setAttribute('src', imageSrc);
        img.addEventListener('click', imageData);
        gallery.appendChild(img);
    }

}

function handleSubmit(event){
    event.preventDefault();
    console.log('Submit successful.');
    let inputs = event.target.elements;
    let userSearch = inputs.search.value;
    loadImages(userSearch);
}

searchForm.addEventListener('submit', handleSubmit);

function loadImages(userSearch){
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${userSearch}&client_id=${USKey}`)
    .then(r => r.json())
    .then(getUrls)
    .then(drawImages);
}

function imageData(event){
    console.log(event.target);
}
// Google vision for captions 
// Display metadata onclick

// logic for map plotting based on image location information

// logic for passing location information from maps/image to weather 

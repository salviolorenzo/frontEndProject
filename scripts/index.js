// ====================================
// FIRST DRAFT
// NO LONGER BEING USED
// ====================================

// change landing photo on click
const landingImage = document.querySelector("[data-landing]");
const gallery = document.querySelector("[data-gallery]");
const body = document.querySelector("body");
const urls = [];
const longitudes = [];
const latitudes = [];
const searchForm = document.querySelector("[data-form]");
const img = document.querySelector("[data-image]");
const modal = document.querySelector("[data-modal]");
const left = document.querySelector("[data-arrowLeft]");
const right = document.querySelector("[data-arrowRight]");
const mapSection = document.querySelector("[data-map-container]");
// logic for interactive photo gallery
// let userSearch = prompt('What would you  like to see? ');
// let userSearch = 'landscape';

// extract urls from each result
function getUrls(obj) {
	for (item of obj.results) {
		urls.push(item.urls.raw);
	}
}

let index = 0;
function drawImages() {
	img.setAttribute("src", urls[index]);
	img.addEventListener("click", imageData);
	modal.appendChild(img);
}

function handleSubmit(event) {
	event.preventDefault();
	console.log("Submit successful.");
	let inputs = event.target.elements;
	let userSearch = inputs.search.value;
	gallery.classList.remove("gallery-hidden");
	mapSection.classList.remove("map-weather-hidden");
	loadImages(userSearch);
}

function goRight() {
	if (index === urls.length - 1) {
		index = 0;
	} else {
		index++;
	}
	img.src = urls[index];
}
function goLeft() {
	if (index === 0) {
		index = urls.length - 1;
	} else {
		index--;
	}
	img.src = urls[index];
}

left.addEventListener("click", goLeft);
right.addEventListener("click", goRight);
window.addEventListener("keydown", function (event) {
	if (event.keyCode === 37) {
		goLeft();
	}
	if (event.keyCode === 39) {
		goRight();
	}
});

searchForm.addEventListener("submit", handleSubmit);

function loadImages(userSearch) {
	fetch(
		`https://api.unsplash.com/search/photos?page=1&query=${userSearch}&client_id=${USKey}`
	)
		.then(r => r.json())
		.then(getUrls)
		.then(drawImages);
}

function imageData(event) {
	console.log(event.target);
}
// Google vision for captions
// Display metadata onclick

// logic for map plotting based on image location information

// logic for passing location information from maps/image to weather

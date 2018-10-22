// get photos by search ==>
// extract IDs ==>
// display to screen in scrollable gallery // 20 photos per search
// get location and meta data ==>
// when image is clicked ==> place point on map and display weather ==>
// show location info?

// search variable
const searchForm = document.querySelector("[data-form]");

// image related variables
const img = document.querySelector("[data-image]");
const modal = document.querySelector("[data-modal]");
const gallery = document.querySelector("[data-gallery]");

// map variable
const mapContainer = document.querySelector("[data-map]");

// const searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickKey}&text=${userSearch}&format=json&nojsoncallback=1`;
// Photo source URL = https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// const geoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1&auth_token=72157702427492494-a9c8f90feb96e087&api_sig=bd0421e2863ae103eb5608fabb9a70dd`;
// get MetaData
// const exifUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1`;


// ===================================================================
// What to do when the search for is submitted
// ===================================================================
function handleSubmit(event) {
	event.preventDefault();
	console.log("Submit successful.");
	let inputs = event.target.elements;
	let userSearch = inputs.search.value;
	// gallery.classList.remove("gallery-hidden");
	// mapSection.classList.remove("map-weather-hidden");
	getPhotos(userSearch);
}

searchForm.addEventListener("submit", handleSubmit);

// ======================================================================
// retrieves images, calls functions to manipulate data and draw to screen
// ======================================================================

function getPhotos(userSearch) {
	fetch(
		`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickKey}&text=${userSearch}&sort=interestingness-desc&privacy_filter=1&accuracy=16+&has_geo=1&format=json&nojsoncallback=1`
	)
		.then(r => r.json())
		.then(j => j.photos)
		.then(getPhotoStats)
		.then(drawImages);
}



// ======================================================================
// gets location as promises
// ======================================================================
function getLocation(object) {
	return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${flickKey}&photo_id=${object.id}&format=json&nojsoncallback=1`)
		.then(r => r.json())
		.then(k => k.photo.location);

}
// ======================================================================
// gets images and assigns locations 
// ======================================================================

function getPhotoStats(obj) {
	let imagesArray = obj.photo;
	let statArray = [];
	let locationPromises = [];
	for (image of imagesArray) {
		let imageObj = {
			'id': image.id,
			'src': `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`,
		};
		let locationPromise = getLocation(image);
		locationPromises.push(locationPromise);
		// imageObj['location']
		statArray.push(imageObj);
	}
	return Promise.all(locationPromises)
		.then(locationArray => {
			locationArray.forEach(function (loc, index) {
				statArray[index]['location'] = loc;
			});
			console.log(statArray);
			return statArray;
		});
}


function drawImages(arr) {
	for (obj of arr) {
		let image = document.createElement('img');
		let index = arr.indexOf(obj);
		image.setAttribute('src', arr[index].src);
		gallery.appendChild(image);
	}
}

let map;
function initMap() {
	map = new google.maps.Map(mapContainer, {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 8
	});
}

function addMarker(object) {
	let LatLng = {
		'lat': object.location.latitude,
		'long': object.location.longitude
	};
	map.center = LatLng;
	map.zoom = 8;
}
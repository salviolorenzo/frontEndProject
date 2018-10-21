// get photos by search ==>
// extract IDs ==>
// display to screen in scrollable gallery // 20 photos per search
// get location and meta data ==>
// when image is clicked ==> place point on map and display weather ==>
// show location info?

const mapContainer = document.querySelector("[data-map]");

// get collection of photos using flickr.photos.search
// const searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickKey}&text=${userSearch}&format=json&nojsoncallback=1`;
// push IDs to an array
// IDs = obj.photos[index].id;
// Photo source URL = https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//  geolocation
// const geoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1&auth_token=72157702427492494-a9c8f90feb96e087&api_sig=bd0421e2863ae103eb5608fabb9a70dd`;
// get MetaData
// const exifUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1`;

// function handleSubmit(event) {
// 	event.preventDefault();
// 	console.log("Submit successful.");
// 	let inputs = event.target.elements;
// 	let userSearch = inputs.search.value;
// 	// gallery.classList.remove("gallery-hidden");
// 	// mapSection.classList.remove("map-weather-hidden");
// 	getPhotos(userSearch);
// }
;

function getPhotos(userSearch) {
	fetch(
		`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickKey}&text=${userSearch}&sort=interestingness-desc&privacy_filter=1&accuracy=16+&has_geo=1&format=json&nojsoncallback=1`
	)
		.then(r => r.json())
		.then(j => j.photos)
		.then(getPhotoStats)
		.then(getLocation)
		.then(console.log);
}



// function handleSubmit(event) {
// 	event.preventDefault();
// 	console.log("Submit successful.");
// 	let inputs = event.target.elements;
// 	let userSearch = inputs.search.value;
// 	// gallery.classList.remove("gallery-hidden");
// 	// mapSection.classList.remove("map-weather-hidden");
// 	getPhotos(userSearch);
// }

// takes original object, return array of objects photo id and image url
function getPhotoStats(obj) {
	let imagesArray = obj.photo;
	let statArray = [];
	for (image of imagesArray) {
		let imageObj = {
			'id': image.id,
			'src': `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
		};
		statArray.push(imageObj);
	}
	return statArray;
}


function getLocation(array) {
	for (object of array) {
		fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${flickKey}&photo_id=${object.id}&format=json&nojsoncallback=1`)
			// .then(r => r.json())
			.then(r => r.photo.location.longitude)


	}
	return array;
}

const img = document.querySelector("[data-image]");
const modal = document.querySelector("[data-modal]");
const gallery = document.querySelector("[data-gallery]");

function drawImages(arr) {
	for (obj of arr) {
		let image = document.createElement('img');
		let index = arr.indexOf(obj);
		image.setAttribute('src', arr[index].src);
		gallery.appendChild(image);
	}
}

const searchForm = document.querySelector("[data-form]");
// searchForm.addEventListener("submit", handleSubmit);





// creating first map instance

// function initMap() {
// 	let map = new google.maps.Map(mapContainer, {
// 		center: { lat: -34.397, lng: 150.644 },
// 		zoom: 8,
// 		// mapTypeId: 'satellite'
// 	});

// }
// console.log(initMap());

getPhotos('city');
// get photos by search ==>
// extract IDs ==>
// display to screen in scrollable gallery // 20 photos per search
// get location and meta data ==>
// when image is clicked ==> place point on map and display weather ==>
// show location info?

const mapConatiner = document.querySelector("[data-map]");

// get collection of photos using flickr.photos.search
const searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickKey}&text=${userSearch}&format=json&nojsoncallback=1`;
// push IDs to an array
IDs = obj.photos[index].id;
//  geolocation
const geoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1&auth_token=72157702427492494-a9c8f90feb96e087&api_sig=bd0421e2863ae103eb5608fabb9a70dd`;
// get MetaData
const exifUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${flickKey}&photo_id=${photoID}&format=json&nojsoncallback=1`;

// creating first map instance
map = new google.maps.Map(mapContainer, {
	center: { lat: -34.397, lng: 150.644 },
	zoom: 8
});

// logic for weather component
// not refactored or tailored for receiving input

const userCity = "atlanta";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${OWKey}`;

// get and display temperature
function getWeather() {
	fetch(url)
		.then(r => r.json())
		.then(drawName)
		.then(drawTemp)
		.then(drawHum)
		.then(drawPress)
		.then(weather)
		.catch(loadCache);
}
const body = document.querySelector("body");
const display = document.querySelector("[data-display]");
const cityName = document.querySelector("[data-name]");
const weatherCond = document.querySelector("[data-weather]");
const widget = document.querySelector("[data-widget]");

function drawName(obj) {
	cityName.textContent = obj.name;
	localStorage.setItem("cityName", obj.name);
	return obj;
}

function drawTemp(obj) {
	let temperature = document.createElement("li");
	let temp = obj.main.temp;
	temp = (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
	localStorage.setItem("temperature", temp);
	temperature.textContent = `Temperature: ${temp} °F`;
	display.appendChild(temperature);
	return obj;
}

function drawPress(obj) {
	let pressure = document.createElement("li");
	localStorage.setItem("pressure", obj.main.pressure);
	pressure.textContent = `Pressure: ${obj.main.pressure} hPa.`;
	display.appendChild(pressure);
	return obj;
}

function drawHum(obj) {
	let humidity = document.createElement("li");
	localStorage.setItem("humidity", obj.main.humidity);
	humidity.textContent = `Humidity: ${obj.main.humidity}%`;
	display.appendChild(humidity);
	return obj;
}

function weather(obj) {
	let weatherObj = obj.weather[0];
	let img = document.createElement("img");
	let iconID = weatherObj.icon;
	img.setAttribute("src", `http://openweathermap.org/img/w/${iconID}.png`);
	let weatherHeader = document.createElement("h5");
	weatherHeader.textContent = `${weatherObj.description}`;
	localStorage.setItem("weather", weatherHeader.textContent);
	weatherCond.appendChild(img);
	weatherCond.appendChild(weatherHeader);
}

function loadCache() {
	cityName.textContent = localStorage.getItem("cityName");

	let weatherHeader = document.createElement("h5");
	weatherHeader.textContent = localStorage.getItem("weather");

	let temperature = document.createElement("li");
	temperature.textContent = `Temperature: ${localStorage.getItem(
		"temperature"
	)} °F`;
	let humidity = document.createElement("li");
	humidity.textContent = `Humidity: ${localStorage.getItem("humidity")} %`;
	let pressure = document.createElement("li");
	pressure.textContent = `Pressure: ${localStorage.getItem("pressure")} hPa`;

	display.appendChild(temperature);
	display.appendChild(humidity);
	display.appendChild(pressure);
}

getWeather();

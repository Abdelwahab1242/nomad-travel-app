import "babel-polyfill";
/*
*
**
/* Functions to GET Web API Data and POST it in the Back-end //
**
*
*/

// Function to get longtitude and latitude from Geonames API
const getGeoName = async location => {
  const geoNamesUrl = "http://api.geonames.org/searchJSON?q=";
  const response = await fetch(
    `${geoNamesUrl}${location}&maxRows=1&username=${process.env.GEONAMES_KEY}`
  );
  try {
    if (response.ok) {
      let jsonResponse = await response.json();
      const city = {
        cityName: jsonResponse.geonames[0].name,
        country: jsonResponse.geonames[0].countryName,
        latitude: jsonResponse.geonames[0].lat,
        longitude: jsonResponse.geonames[0].lng
      };

      return city;
    }
  } catch (error) {
    console.log("Error!", error);
  }
};

// Dark Sky API GET request
const getForecast = async (latitude, longitude, checkIn) => {
  const darkSkyUrl = "https://api.darksky.net/forecast/";
  const seconds = Date.parse(checkIn) / 1000;
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/${darkSkyUrl}${process.env.DARK_SKY_API}/${latitude},${longitude},${seconds}?exclude=currently,flags`
  );
  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      let forecastData = {
        summary: jsonResponse.daily.data[0].summary,
        icon: jsonResponse.daily.data[0].icon,
        tempHigh: jsonResponse.daily.data[0].temperatureHigh,
        tempLow: jsonResponse.daily.data[0].temperatureLow
      };

      console.log(forecastData);
      return forecastData;
    }
  } catch (error) {
    console.log("Error!", error);
  }
};

/* Function to get 5 images of the city from Pixabay API */
const getImages = async cityName => {
  const pixabayURL = "https://pixabay.com/api/?key=";
  const response = await fetch(
    `${pixabayURL}${process.env.PIXABAY_API_KEY}&q=${cityName}&image_type=photo&category=places&pretty=true&orientation=horizontal`
  );
  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      let images = [
        {
          image: jsonResponse.hits[0].largeImageURL
        }
      ];
      return images;
    }
  } catch (error) {
    console.log("Error!", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to Calculate the remaining days till the departure
const remainingDays = checkIn => {
  let today = Date.now();
  const checkInSeconds = Date.parse(checkIn);
  let remaining = (checkInSeconds - today) / (1000 * 60 * 60 * 24);
  return Math.floor(remaining);
};

// Function to Calculate the Trip Duration
const tripDuration = (checkIn, checkOut) => {
  const checkInSeconds = Date.parse(checkIn);
  const checkOutSeconds = Date.parse(checkOut);
  let duration = (checkOutSeconds - checkInSeconds) / (1000 * 60 * 60 * 24);
  return Math.floor(duration);
};

// Function to Calculate the distance between the user's location and the destination location
const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // Distance is in statute miles (default)
    if (unit == "K") {
      //'K' is kilometers
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      //'N' is nautical miles
      dist = dist * 0.8684;
    }
    return Math.round(dist);
  }
};

/* getWebData main function */
const addTrip = async (location, destination, checkIn, checkOut) => {
  let city = await getGeoName(destination);
  let forecast = await getForecast(city.latitude, city.longitude, checkIn);
  let cityImages = await getImages(destination);
  let currentLocation = await getGeoName(location);
  let remaining = remainingDays(checkIn);
  let duration = tripDuration(checkIn, checkOut);
  let distance = calculateDistance(
    currentLocation.latitude,
    currentLocation.longitude,
    city.latitude,
    city.longitude,
    "K"
  );
  let id = Math.floor(Math.random() * 1000 + 1);

  let newTrip = {
    tripId: id,
    checkIn: checkIn,
    checkOut: checkOut,
    city: city.cityName,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    summary: forecast.summary,
    icon: forecast.icon,
    tempHigh: forecast.tempHigh,
    tempLow: forecast.tempLow,
    images: cityImages,
    remainingDays: remaining,
    tripDuration: duration,
    distance: distance
  };
  console.log(newTrip);
  return newTrip;
};

export {
  getGeoName,
  getForecast,
  getImages,
  postData,
  remainingDays,
  tripDuration,
  calculateDistance,
  addTrip
};

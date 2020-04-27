let glide = new Glider(document.querySelector(".glider"), {
  slidesToShow: 2,
  slidesToScroll: 2,
  //exactWidth: true,
  draggable: true,
  arrows: {
    prev: ".prev-arrow",
    next: ".next-arrow"
  }
});

// Function to create a main Trip Card
const createCard = (data = {}) => {
  const gliderCarousel = document.querySelector("#tripsCarousel");
  const newTrip = document.createElement("div");
  newTrip.setAttribute("class", "trip-card");
  let tripContent = `<div class="trip-image">
                <img src="${data.images[0].image}" />
              </div>
              <div class="trip-content">
                <h2>${data.city}, ${data.country}</h2>
                <p>
                  ${data.checkIn} &emsp; &#9679; &middot; &middot; &middot;
                  &middot; &middot; &middot; &#9679; &emsp; ${data.checkOut}
                </p>
                <div class="button-wrapper">
                  <button class="show-btn" onclick="showFacts(${data.tripId})">
                    Show Info
                  </button>
                </div>
              </div>`;
  newTrip.innerHTML = tripContent;
  glide.addItem(newTrip);
};

// Function to call the Skycons library
const showIcon = (newIcon, iconId) => {
  let skycons = new Skycons({ color: "white" });
  switch (newIcon) {
    case "clear-day":
      skycons.add(iconId, Skycons.CLEAR_DAY);
      break;
    case "clear-night":
      skycons.add(iconId, Skycons.CLEAR_NIGHT);
      break;
    case "partly-cloudy-day":
      skycons.add(iconId, Skycons.PARTLY_CLOUDY_DAY);
      break;
    case "partly_cloudy_night":
      skycons.add(iconId, Skycons.PARTLY_CLOUDY_NIGHT);
      break;
    case "cloudy":
      skycons.add(iconId, Skycons.CLOUDY);
      break;
    case "rain":
      skycons.add(iconId, Skycons.RAIN);
      break;
    case "sleet":
      skycons.add(iconId, Skycons.SLEET);
      break;
    case "snow":
      skycons.add(iconId, Skycons.SNOW);
      break;
    case "wind":
      skycons.add(iconId, Skycons.WIND);
      break;
    case "fog":
      skycons.add(iconId, Skycons.FOG);
      break;
    default:
      skycons.add(iconId, Skycons.CLEAR_DAY);
  }
  skycons.play();
};

// Create Trip Facts div and fill it
const createTripFacts = (data = {}) => {
  const tripsPage = document.getElementById("trips-page");
  const tripFactsContainer = document.createElement("div");
  tripFactsContainer.setAttribute("class", "trip-facts fade-in slide-in-top");
  tripFactsContainer.setAttribute("id", `${data.tripId}`);
  let tripFactsContent = `<div class="weather-info">
  <canvas id="icon${data.tripId}" width="128" height="128"></canvas>
  <p id="forecast-data">
    ${data.summary}<br />
    ${data.tempHigh}°F High, ${data.tempLow}°F Low
  </p>
</div>

<p>
  <span class="counter">${data.tripDuration} Nights</span
  ><br />
  Trip Duration
</p>

<p>
  <span class="counter">${data.remainingDays} Days</span
  ><br />
  Remaining until the trip
</p>

<p>
  <span class="counter">${Math.round(data.distance)} km</span><br />
  Far away
</p>`;

  tripFactsContainer.innerHTML = tripFactsContent;
  tripsPage.appendChild(tripFactsContainer);
  showIcon(data.icon, `icon${data.tripId}`);
};

// main function to render all that UI
const renderUI = async () => {
  const request = await fetch("/allTrips");
  try {
    const tripData = await request.json();
    if (tripData.length > 0) {
      for (let trip of tripData) {
        createCard(trip);
        createTripFacts(trip);
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export { renderUI, createCard, createTripFacts, showIcon, glide };

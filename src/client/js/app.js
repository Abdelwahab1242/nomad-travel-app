import { addTrip, postData } from "./getWebData";

const performAction = async () => {
  let location = document.getElementById("currentLocation").value;
  let splittedLocation = location.split(",");
  let destination = document.getElementById("destination").value;
  let splittedDestination = destination.split(",");
  let checkInDate = document.getElementById("checkInDate").value;
  let checkOutDate = document.getElementById("checkOutDate").value;
  // Validate User Input
  if (
    (location, destination, checkInDate == "") ||
    (location, destination, checkInDate == null)
  ) {
    alert("Please fill in the form");
  } else {
    addTrip(
      splittedLocation[0],
      splittedDestination[0],
      checkInDate,
      checkOutDate
    )
      .then(newTrip => {
        postData("/addTrip", newTrip);
      })
      .then(
        setTimeout(() => {
          document.querySelector(".alert").style.display = "block";
        }, 1000)
      );
  }
};

export { performAction };

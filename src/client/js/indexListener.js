import { performAction } from "./app";
import { desinationInput } from "./home";

const destination = document.getElementById("destination");
const currentLocation = document.getElementById("currentLocation");

document.getElementById("form-submit").addEventListener("submit", e => {
  e.preventDefault();
  performAction();
});

window.addEventListener("load", e => {
  desinationInput(destination, currentLocation);
});

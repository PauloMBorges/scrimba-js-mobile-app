/* --------------- Firebase  --------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-d1923-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

/* --------------- Elements  --------------- */
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

/* --------------- Event Listeners  --------------- */

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputField();
  addItemToList(inputValue);
  
});

/* --------------- Functions  --------------- */

function clearInputField() {
  inputFieldEl.value = "";
}

function addItemToList(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}

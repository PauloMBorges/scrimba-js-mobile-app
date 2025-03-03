/* --------------- Firebase  --------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = `<p class="no-items">Sem itens por aqui... ainda!</p>`;
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputField() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}

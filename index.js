import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://dummmie-s-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputField = document.getElementById("inputfield");
const addBtn = document.getElementById("addbtn");
const shoppingEl = document.getElementById("shopping-list");

addBtn.addEventListener("click", function () {
  let inputValue = inputField.value;

  push(shoppingListInDb, inputValue);
});

onValue(shoppingListInDb, function (snapshot) {
  if (snapshot.exists()) {
    let Feed = Object.entries(snapshot.val());
    clear();

    for (let i = 0; i < Feed.length; i++) {
      let currentItem = Feed[i];
      addList(currentItem);
    }
  } else {
    shoppingEl.innerHTML = "No items here.....yet:(";
  }
});

function clear() {
  inputField.value = "";
  shoppingEl.innerHTML = "";
}
function addList(items) {
  let itemsID = items[0];
  let itemsValue = items[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemsValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocation = ref(database, `shoppingList/${itemsID}`);
    remove(exactLocation);
  });

  shoppingEl.append(newEl);
}

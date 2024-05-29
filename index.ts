type arrayObject = {
  task: string;
  id: number;
};

//getting items from the local storage or array .
const itemArray = JSON.parse(localStorage.getItem("user")!) || [];
var arrayLength = Number(itemArray.length);
let itemCount1 = document.getElementById("TotalItemCount");
let itemCount2 = document.getElementById("markedCount");
//creating unorderlist
let inputValue = document.getElementById("add-item") as HTMLInputElement;
var unorderList = document.createElement("ul") as HTMLUListElement;
unorderList.id = "tasks";
//appending unorderlist to the body
document.body.appendChild(unorderList);
//looping through array items ,calling the function which will add listitems to the orderlist and display
itemArray.forEach(function (val: arrayObject) {
  additem(val);
});
function updateCount() {
  const markedItemsCount = document.querySelectorAll(".checked").length;
  const unmarkedItemsCount = arrayLength - markedItemsCount;

  // Display counts
  const markedCountElement = document.getElementById("markedCount");
  const unmarkedCountElement = document.getElementById("unmarkedCount");
  if (markedCountElement)
    markedCountElement.textContent = "Marked: " + markedItemsCount;
  if (unmarkedCountElement)
    unmarkedCountElement.textContent = "Unmarked: " + unmarkedItemsCount;
  if (itemCount1) itemCount1.textContent = "TotalCount: " + arrayLength;
}

// Call updateCount initially to display initial counts
updateCount();

// Add a "checked" symbol when clicking on a list item
var list1 = document.querySelector("UL") as HTMLUListElement;
list1.addEventListener("click", function (event) {
  if (event.target !== null) {
    if ((event.target as HTMLInputElement)!.tagName === "LI") {
      (event.target as HTMLInputElement)!.classList.toggle("checked");
      updateCount();
    }
  }
});

//adding hideButton event listner
const hideButton = document.getElementById("hideButton") as HTMLInputElement;
hideButton.addEventListener("click", () => {
  const markedItems = document.querySelectorAll(".checked");
  markedItems.forEach((item) => {
    if (hideButton.checked) {
      (item as HTMLElement).style.display = "none";
    } else {
      (item as HTMLElement).style.display = "block";
    }
  });
});

//adding each task to the div item and appedning it to the individual Li element ,appending the LI to unorderList
function additem(val: arrayObject) {
  var toDO = val.task;
  var toDOId = val.id;
  var listContainer = document.createElement("LI") as HTMLLIElement;
  listContainer.id = String(toDOId);
  listContainer.className = "listItem";
  unorderList.appendChild(listContainer);
  var item = document.createElement("DIV") as HTMLDivElement;
  item.id = "taskItem";
  item.textContent = toDO;
  listContainer.appendChild(item);
  //addingdelete button to  each individual div
  var delButton = document.createElement("span") as HTMLSpanElement;
  var symbol = document.createTextNode("\u00D7");
  delButton.id = String(toDOId);
  delButton.className = "delButton";
  delButton.appendChild(symbol);
  listContainer.appendChild(delButton);

  // adding delete functionality to the button
  delButton.onclick = function (event) {
    if (event.target !== null) {
      let ul = document.getElementById("tasks") as HTMLUListElement;
      let del = document.getElementById(
        (event.target as HTMLInputElement)!.id
      ) as HTMLElement;
      ul.removeChild(del);
      let index = itemArray.findIndex((val: arrayObject) => val.id === toDOId);
      itemArray.splice(index, 1);
      arrayLength = arrayLength - 1;
      updateCount();
      save();
    }
  };
}

//adding eventlistner to the input element
const addItem = document.getElementById("add-item") as HTMLInputElement;
addItem.addEventListener("keypress", (e: KeyboardEvent) => {
  let val1 = inputValue.value;
  if (e.key === "Enter" && val1 !== "") {
    console.log("enter clicked");
    arrayLength = arrayLength + 1;
    let x = {
      task: val1,
      id: arrayLength,
    };
    //pushing new array items to the array
    itemArray.push(x);
    inputValue.value = "";
    additem(x);
    updateCount();
    save();
  }
});
//setting items to the local storage
function save() {
  localStorage.setItem("user", JSON.stringify(itemArray));
}

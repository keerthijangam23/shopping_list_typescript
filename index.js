//getting items from the local storage or array .
var itemArray = JSON.parse(localStorage.getItem("user")) || [];
var arrayLength = Number(itemArray.length);
var oldValue = arrayLength;
var markedArray = [];
var itemCount1 = document.getElementById("TotalItemCount");
var itemCount2 = document.getElementById("markedCount");
appendText();
function removeText() {
    itemCount1.textContent = "";
}
function appendText() {
    itemCount1.append("TotalCount: " + String(arrayLength));
}
//creating unorderlist
var inputValue = document.getElementById("add-item");
var unorderList = document.createElement("ul");
unorderList.id = "tasks";
//appending unorderlist to the body
document.body.appendChild(unorderList);
//looping through array items ,calling the function which will add listitems to the orderlist and display
itemArray.forEach(function (val) {
    additem(val);
});
// Add a "checked" symbol when clicking on a list item
var list1 = document.querySelector("UL");
list1.addEventListener("click", function (event) {
    if (event.target !== null) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }
});
//adding each task to the div item and appedning it to the individual Li element ,appending the LI to unorderList
function additem(val) {
    var toDO = val.task;
    var toDOId = val.id;
    var listContainer = document.createElement("LI");
    listContainer.id = String(toDOId);
    listContainer.className = "listItem";
    unorderList.appendChild(listContainer);
    var item = document.createElement("DIV");
    item.id = "taskItem";
    item.textContent = toDO;
    listContainer.appendChild(item);
    //addingdelete button to  each individual div
    var delButton = document.createElement("span");
    var symbol = document.createTextNode("\u00D7");
    delButton.id = String(toDOId);
    delButton.className = "delButton";
    delButton.appendChild(symbol);
    listContainer.appendChild(delButton);
    removeText();
    appendText();
    // adding delete functionality to the button
    delButton.onclick = function (event) {
        if (event.target !== null) {
            var ul = document.getElementById("tasks");
            var del = document.getElementById(event.target.id);
            ul.removeChild(del);
            var index = itemArray.findIndex(function (val) { return val.id === toDOId; });
            itemArray.splice(index, 1);
            arrayLength = arrayLength - 1;
            removeText();
            appendText();
            save();
        }
    };
}
//adding eventlistner to the button
var addItem = document.getElementById("add-item");
addItem.addEventListener("keypress", function (e) {
    // let keyboardEvent = <KeyboardEvent>e;
    var val1 = inputValue.value;
    if (e.key === "Enter" && val1 !== "") {
        console.log("enter clicked");
        arrayLength = arrayLength + 1;
        var x = {
            task: val1,
            id: arrayLength,
        };
        //pushing new array items to the array
        itemArray.push(x);
        inputValue.value = "";
        additem(x);
        save();
    }
});
//setting items to the local storage
function save() {
    localStorage.setItem("user", JSON.stringify(itemArray));
}

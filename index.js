//getting items from the local storage or array .
var itemArray = JSON.parse(localStorage.getItem("user")) || [];
var arrayLength = Number(itemArray.length);
var itemCount1 = document.getElementById("TotalItemCount");
var itemCount2 = document.getElementById("markedCount");
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
function updateCount() {
    var markedItemsCount = document.querySelectorAll(".checked").length;
    var unmarkedItemsCount = arrayLength - markedItemsCount;
    // Display counts
    var markedCountElement = document.getElementById("markedCount");
    var unmarkedCountElement = document.getElementById("unmarkedCount");
    if (markedCountElement)
        markedCountElement.textContent = "Marked: " + markedItemsCount;
    if (unmarkedCountElement)
        unmarkedCountElement.textContent = "Unmarked: " + unmarkedItemsCount;
    if (itemCount1)
        itemCount1.textContent = "TotalCount: " + arrayLength;
}
// Call updateCount initially to display initial counts
updateCount();
// Add a "checked" symbol when clicking on a list item
var list1 = document.querySelector("UL");
list1.addEventListener("click", function (event) {
    if (event.target !== null) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
            updateCount();
        }
    }
});
//adding hideButton event listner
var hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", function () {
    var markedItems = document.querySelectorAll(".checked");
    markedItems.forEach(function (item) {
        if (hideButton.checked) {
            item.style.display = "none";
        }
        else {
            item.style.display = "block";
        }
    });
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
    // adding delete functionality to the button
    delButton.onclick = function (event) {
        if (event.target !== null) {
            var ul = document.getElementById("tasks");
            var del = document.getElementById(event.target.id);
            ul.removeChild(del);
            var index = itemArray.findIndex(function (val) { return val.id === toDOId; });
            itemArray.splice(index, 1);
            arrayLength = arrayLength - 1;
            updateCount();
            save();
        }
    };
}
//adding eventlistner to the input element
var addItemElement = document.getElementById("add-item");
addItemElement.addEventListener("keypress", function (e) {
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
        updateCount();
        save();
    }
});
//setting items to the local storage
function save() {
    localStorage.setItem("user", JSON.stringify(itemArray));
}

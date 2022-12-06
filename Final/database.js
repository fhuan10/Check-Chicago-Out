// Features
var createButton = document.querySelector(".create-note-button")
var displayCreateNote = document.querySelector("#create-note-window");

// User create a note in another screen 'creation screen'
createButton.addEventListener("click", (event) => {
  console.log("Works")
  displayCreateNote.style.display = "block";
})

// User can exit the creation screen by clicking outside of it
window.onclick = function(event) {
  if (event.target == displayCreateNote) {
    displayCreateNote.style.display = "none";

    // Erase the user's input
    document.querySelector("#user-name-entry").value="";
    document.querySelector("#user-body-entry").value="";
  }
}

// DATABASE BELOW
class Note {
  constructor(name, body) {
    this.name = name;
    this.body = body;
  }
}

var database = new Dexie("ReviewDatabase")

// DB with a single table "notes" with primary key "id" and
// indexes on properties "title" and "body"
// Auto-incrememnted primary key (id)
database.version(1).stores({
  notes: '++id, name, body',
});


// //TEST
// // Add existing values "notes" into the database (for testing purposes)
// database.notes.bulkPut([
//   {name: "TODO LIST", body: "1. Feed the cats"},
//   {name: "Favorite Food", body: "Blueberries, strawberries, cherries"}
// ])

// Add a note
function addNote(data) {
  database.notes.add(data)
    .then(result => console.log(result))
    .catch(error => console.log(error));
}


// Print an array of objects (notes)
database.notes.toArray()
  .then(arr => console.log(arr))

// Print every object (note) from an array
database.notes.toArray()
  .then(arr => arr.forEach(item => {
    console.log(item.id)
  }));

console.log("What is going on")

// Populate the records into the review list (for the first time)
database.notes.toArray()
  .then(arr => arr.forEach(record => {

    // Create a new note item (creating the HTML elements)
    let noteItem = document.createElement("li")
    noteItem.setAttribute("id", "note-item" + record.id)
    noteItem.setAttribute("class", "mdc-list-item note-list-item")
    noteItem.setAttribute("style", "border-bottom:solid; border-top:solid; border-color:white;")

    let noteRipple = document.createElement("span");
    noteRipple.setAttribute("class", "mdc-list-item__ripple")

    let noteText = document.createElement("span")
    noteText.setAttribute("class", "mdc-list-item__text")

    let noteNameText = document.createElement("span")
    noteNameText.setAttribute("class", "mdc-list-item__primary-text")
    noteNameText.setAttribute("style", "font-size:1.5em; font-weight:bold;")
    noteNameText.innerHTML = record.name + " said:";

    let noteBodyText = document.createElement("span")
    noteBodyText.setAttribute("class", "mdc-list-item__secondary-text")
    noteBodyText.setAttribute("style", "text-overflow: ellipsis; overflow: hidden; width:60em;")
    noteBodyText.innerHTML = record.body;

    // Append the HTML contents in the note item
    noteText.appendChild(noteNameText)
    noteText.appendChild(noteBodyText)
    noteItem.appendChild(noteRipple)
    noteItem.appendChild(noteText)

    // Append the note item to the list
    document.querySelector(".mdc-list--two-line").appendChild(noteItem)

    // Click on the item to view the item in full detail (in another screen)
    noteItem.addEventListener("click", (event) => {
      // Set the contents
      document.querySelector(".user-name").innerHTML = record.name + " said:";
      document.querySelector(".user-body").innerHTML = record.body;

      // Switch screens
      document.querySelector("#div3").style.display = "none";
      document.querySelector("#div5").style.display = "block";
    })
  }));

// When the user create a note, the note will be added to the list
let submitBtn = document.querySelector(".submit-note-button")
submitBtn.addEventListener("click", (event) => {
  
  // Get the user's inputs
  let name_entry = document.querySelector("#user-name-entry")
  let body_entry = document.querySelector("#user-body-entry")

  if (name_entry.value != "" && body_entry.value != "") {
    // Close the creation modal screen
    displayCreateNote.style.display = "none";
    
    // Create a new note item (creating the HTML elements)
    let noteItem = document.createElement("li");
    noteItem.setAttribute("class", "mdc-list-item note-list-item")
    noteItem.setAttribute("style", "border-bottom:solid; border-top:solid; border-color:white;")

    let noteRipple = document.createElement("span");
    noteRipple.setAttribute("class", "mdc-list-item__ripple")
    noteItem.appendChild(noteRipple)

    let noteText = document.createElement("span");
    noteText.setAttribute("class", "mdc-list-item__text")

    let noteNameText = document.createElement("span")
    noteNameText.setAttribute("class", "mdc-list-item__primary-text")
    noteNameText.setAttribute("style", "font-size:1.5em; font-weight:bold;")
    noteNameText.innerHTML = name_entry.value + " said:";

    let noteBodyText = document.createElement("span")
    noteBodyText.setAttribute("class", "mdc-list-item__secondary-text")
    noteBodyText.setAttribute("style", "text-overflow: ellipsis; overflow: hidden; width:60em;")
    noteBodyText.innerHTML = body_entry.value;

    // Prepare the new note entry for the database
    var newNote = new Note;
    newNote.name = name_entry.value;
    newNote.body = body_entry.value;

    // Get the id number of the new note entry
    let noteIdNum = 0;

    // Add the new note entry to the database
    database.notes.add(newNote)
    .then(result => {
      console.log("Added to the database sucessfully")
      
      // Set the id to the note item
      noteItem.setAttribute("id", "note-item" + result)
    })
    .catch(error => console.log(error))


    // Append the HTML contents to the note item
    noteText.appendChild(noteNameText)
    noteText.appendChild(noteBodyText)
    noteItem.appendChild(noteRipple)
    noteItem.appendChild(noteText)

    // Append the note item to the list
    document.querySelector(".mdc-list--two-line").appendChild(noteItem)

    // Erase the user's inputs once done
    document.querySelector("#user-name-entry").value="";
    document.querySelector("#user-body-entry").value=""; 

    // Click on the item to view the item in full detail (in another screen)
    noteItem.addEventListener("click", (event) => {
      // Set the contents
      document.querySelector(".user-name").innerHTML = name_entry.value + " said:";
      document.querySelector(".user-body").innerHTML = body_entry.value;

      // Switch screens
      document.querySelector("#div3").style.display = "none";
      document.querySelector("#div5").style.display = "block";
    })
    
  } else {
    // Alert the user that they must fill both the textfields
    alert("At least one of the textfields is empty. Please double check if you fill both of them out.")
  }
  console.log(name_entry.value)
})

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


// Update every note from the notes database
function updateNote(data) {
  database.notes.toArray()
    .then(arr => arr.forEach(record => {
      if (record.id == data.id) {  // Find matching id, in order to make changes
        database.notes.update(record.id, { "name": data.name, "body": data.body })
          .then(function(updated) {  // Check if the note is updated or not
            if (updated) {
              console.log("It is updated")
            } else {
              console.log("It is NOT updated")
            }
          })
      }
    }))
}

console.log("What is going on")

// Populate the records into the review list (for the first time)
database.notes.toArray()
  .then(arr => arr.forEach(record => {
    console.log("Heee")
    console.log(record.id)

    // Create a new note item (creating the HTML elements)
    let noteItem = document.createElement("li")
    noteItem.setAttribute("id", "note-item" + record.id)
    noteItem.setAttribute("class", "mdc-list-item note-list-item")

    let noteRipple = document.createElement("span");
    noteRipple.setAttribute("class", "mdc-list-item__ripple")

    let noteText = document.createElement("span")
    noteText.setAttribute("class", "mdc-list-item__text")

    let noteNameText = document.createElement("span")
    noteNameText.setAttribute("class", "mdc-list-item__primary-text")
    noteNameText.innerHTML = record.name;

    let noteBodyText = document.createElement("span")
    noteBodyText.setAttribute("class", "mdc-list-item__secondary-text")
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
      document.querySelector(".user-name").innerHTML = record.name;
      document.querySelector(".user-body").innerHTML = record.body;

      // Switch screens
      document.querySelector("#div3").style.display = "none";
      document.querySelector("#div5").style.display = "block";
    })
  }));

// When the user create a note, the note will be added to the list

// database.notes.toArray()
//   .then(arr => arr.forEach(record => {
//     log.console("Making a list note")

//     // Create a new note item (creating the HTML elements)
//     let noteItem = document.createElement("li")
//     noteItem.setAttribute("class", "mdc-list-item note-list-item")
//     noteItem.setAttribute("id", "note-item" + record.id)

//     let noteRipple = document.createElement("span");
//     noteRipple.setAttribute("class", "mdc-list-item__ripple")
//     noteItem.appendChild(noteRipple)

//     let noteText = document.createElement("span");
//     noteText.setAttribute("class", "mdc-list-item__text")

//     let noteNameText = document.createElement("span")
//     noteTitleText.setAttribute("class", "mdc-list-item__primary-text")

//     let noteBodyText = document.createElement("span")
//     noteBodyText.setAttribute("class", "mdc-list-item__secondary-text")

//     noteText.appendChild(noteNameText)
//     noteText.appendChild(noteBodyText)
//     noteItem.appendChild(noteText)

//     // Insert the title and body info
//     noteItem.querySelector(".mdc-list-item__primary-text").innerHTML = record.name;
//     noteItem.querySelector(".mdc-list-item__secondary-text").innerHTML = record.body;

//     // Append the note item to the list screen
//     document.querySelector("review-list.mdc-list.mdc-list--two-line").appendChild(noteItem);
//     console.log(noteItem);

//     // Click on the item to switch screens
//     // in order, to view note in full
//     noteItem.addEventListener("click", (event) => {
//       document.querySelector("#div3").style.display = "none;"
//         document.querySelector("#div5").style.display = "block;"
//     })
//   }));










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
  }
}


// let list = document.querySelector(".mdc-list--two-line")
// list.addEventListener("click", (event) => {
//   document.querySelector("#div3").style.display = "none";
//   document.querySelector("#div5").style.display = "block";
// })
let dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let ratingArr = ["NR", "PG", "PG-13", "G"]

var dayClass = "day-checkbox"
var dayId = "movie-day"
var ratingClass = "rating-checkbox"
var ratingId = "movie-rating"

// Create the checkbox
function createCheckBox(arr, id, classString) {
  arr.forEach(record => {
    let checkbox = document.createElement("div")
    checkbox.setAttribute("class", "mdc-checkbox")

    let checkboxInput = document.createElement("input")
    checkboxInput.setAttribute("id", record)
    checkboxInput.setAttribute("type", "checkbox")
    checkboxInput.setAttribute("class", "mdc-checkbox__native-control " + classString)
    checkboxInput.setAttribute("name", classString)
    checkboxInput.setAttribute("value", record)

    let checkboxBackground = document.createElement("div")
    checkboxBackground.setAttribute("class", "mdc-checkbox__background")

    let checkboxLabel = document.createElement("label")
    checkboxLabel.setAttribute("for", record)
    checkboxLabel.setAttribute("style", "font-size: 2em; font-family: 'Courier New', Courier, monospace;")
    checkboxLabel.innerText = record;

    // Append
    checkbox.appendChild(checkboxInput)
    checkbox.appendChild(checkboxBackground)

    document.querySelector("." + id).appendChild(checkbox)
    document.querySelector("." + id).appendChild(checkboxLabel)

  })
}

function createDropDown() {
  let dropDown = document.createElement("select")
  dropDown.setAttribute("id", "movie-location")
  dropDown.setAttribute("name", "movie-location")
  dropDown.setAttribute("style", "padding:10px; width:100%; font-size:2em; font-family: 'Courier New', Courier, monospace;")

  // Have to fetch API
  let movieURL = "https://data.cityofchicago.org/resource/7piw-z6r6.json"

  // Create an option for none
  var newOption = document.createElement("option")
  newOption.setAttribute("value", "")
  dropDown.appendChild(newOption)

  fetch(movieURL)
    .then((response) => { return response.json() })
    .then((data) => {
      data.forEach((record) => {
        if (record.title != "My Favorite Wife") {
          var newOption = document.createElement("option")
          newOption.setAttribute("value", record.park)
          newOption.innerText = record.park

          dropDown.appendChild(newOption)
        }
      })
    })

  document.querySelector(".movie-location").appendChild(dropDown)
}

createCheckBox(dayArr, dayId, dayClass)
createCheckBox(ratingArr, ratingId, ratingClass)
createDropDown();

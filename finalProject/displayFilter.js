let dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let ratingArr = ["NR", "PG", "PG-13", "G"]

var dayClass = "day-checkbox"
var dayId = "movie-day"
var ratingClass = "rating-checkbox"
var ratingId = "movie-rating"


function createCheckBox(arr, id, classString) {
  arr.forEach(record => {
    let checkbox = document.createElement("div")
    checkbox.setAttribute("class", "mdc-checkbox")

    let checkboxInput = document.createElement("input")
    checkboxInput.setAttribute("id", record)
    checkboxInput.setAttribute("type", "checkbox")
    checkboxInput.setAttribute("class", "mdc-checkbox__native-control " + classString)

    let checkboxBackground = document.createElement("div")
    checkboxBackground.setAttribute("class", "mdc-checkbox__background")

    let checkboxLabel = document.createElement("label")
    checkboxLabel.setAttribute("for", record)
    checkboxLabel.innerText = record;

    // Append
    checkbox.appendChild(checkboxInput)
    checkbox.appendChild(checkboxBackground)

    document.querySelector("." + id).appendChild(checkbox)
    document.querySelector("." + id).appendChild(checkboxLabel)
    
  })
}

createCheckBox(dayArr, dayId, dayClass)
createCheckBox(ratingArr, ratingId, ratingClass)

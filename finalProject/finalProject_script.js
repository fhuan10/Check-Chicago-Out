const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

const formField = new mdc.formField.MDCFormField(document.querySelector('.mdc-form-field'));
const checkbox = new mdc.checkbox.MDCCheckbox(document.querySelector('.mdc-checkbox'));
formField.input = checkbox;


// const drawer = new mdc.drawer.MDCDrawer(document.querySelector('.mdc-drawer'));

// document.querySelectorAll("a").forEach(item => {
//   console.log(item);
// })

// Homepage Buttons
let articleBtn = document.querySelector(".article-button")
articleBtn.addEventListener("click", (event) => {
  document.querySelector("#div1").style.display = "none";
  document.querySelector("#div2").style.display = "block";
})

let placeBtn = document.querySelector(".place-button")
placeBtn.addEventListener("click", (event) => {
  document.querySelector("#div1").style.display = "none";
  document.querySelector("#div3").style.display = "block";
})

let movieBtn = document.querySelector(".movie-button")
movieBtn.addEventListener("click", (event) => {
  document.querySelector("#div1").style.display = "none";
  document.querySelector("#div4").style.display = "block";
})

// Switch screens (TEMP)
document.querySelectorAll(".div-screen").forEach(item => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    let screen = event.target.getAttribute("data-screen");
    console.log(screen);

    document.querySelectorAll("main.screen").forEach(screen => screen.style.display = "none")

    document.querySelector("#" + screen).style.display = "block";
  })
})
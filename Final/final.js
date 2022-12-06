const drawer = new mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));


// Open the navigation drawer from the top app bar
document.querySelector(".mdc-top-app-bar__navigation-icon").addEventListener("click", (event) => {
  drawer.open = true;
})

// Close the navigation drawer by clicking anywhere but itself
document.querySelectorAll(".screen").forEach(item => {
  item.addEventListener("click", (event) => {
    drawer.open = false;
  })
})

document.querySelector(".mdc-top-app-bar__section").addEventListener("click", (event) => {
  drawer.open = false;
})

// This is the page the user sees first
document.querySelector("#div1").style.display = "block";

console.log(document.querySelectorAll(".mdc-list-item"))

// Switch screens from the navigation drawer by looping through
// the mdc-list-items where all have an even listener added to it
document.querySelectorAll(".mdc-list-item.nav-tab").forEach(item => {
  item.addEventListener("click", (event) => {

    event.preventDefault();

    let screen = event.target.getAttribute("data-screen");
    console.log(screen);

    document.querySelectorAll("main.screen").forEach(screen => screen.style.display = "none")

    document.querySelector("#" + screen).style.display = "block";

    drawer.open = false;  // Close the navigation drawer
  })
})
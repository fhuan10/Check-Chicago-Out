const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

const drawer = new mdc.drawer.MDCDrawer(document.querySelector('.mdc-drawer'));

// document.querySelectorAll("a").forEach(item => {
//   console.log(item);
// })

// Switch screens
document.querySelectorAll("a").forEach(item => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    let screen = event.target.getAttribute("data-screen");
    console.log(screen);

    document.querySelectorAll("div.screen").forEach(screen => screen.style.display = "none")

    document.querySelector("#" + screen).style.display = "block";
  })
})
// Instantiate MDC Drawer
const drawerEl = document.querySelector('.mdc-drawer');
const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);

// Instantiate MDC Top App Bar (required)
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

topAppBar.setScrollTarget(document.querySelector('.main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

var list = document.querySelectorAll(".mdc-drawer .mdc-list .mdc-list-item");
console.log(list);

list.forEach(item => {
    item.addEventListener("click", (event) => {
      console.log(event.target.id);

        event.preventDefault();

        let screen = event.target.getAttribute("data-screen");
        console.log(screen);

        document.querySelectorAll("div.screen").forEach(screen => screen.style.display = "none")

        document.querySelector("#" + screen).style.display = "block";

        drawer.open = false;

      })
})

// topAppBar.addEventListener("click", (event) => {
//   document.querySelector(".mdc-list-item").forEach(item => {
//     item.addEventListener("click", (event) => {

//         event.preventDefault();

//         let screen = event.target.getAttribute("data-screen");
//         console.log(screen);

//         document.querySelectorAll("div.screen").forEach(screen => screen.style.display = "none")

//         document.querySelector("#" + screen).style.display = "block";

//       })
//   })
// })
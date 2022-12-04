let map;

function initMap() {
  const chicagoLocation = { lat: 41.8781, lng: -87.623177 };

  // When you open the map, it show the Chicago area
  map = new google.maps.Map(document.getElementById("map"), {
    center: chicagoLocation,
    zoom: 12,
  });

  // Add markers to show where the movies are taking place at
  var moviePlaceURL = "https://data.cityofchicago.org/resource/7piw-z6r6.json"

  var output = []; // Store results from filters
  var markers = []; // Store the markers on the map

  // Intitalize map with markers
  //Fetch data based on the filters
  fetch(moviePlaceURL)
    .then((response) => { return response.json() })
    .then((data) => {
      data.forEach((record) => {
        if (record.title != "My Favorite Wife") {
          output.push(record)
        }
      })

      // Populate the map with markers for the first time
      output.forEach((record) => {
        // Get the location's latitude and longitude
        let locationLat = record.location.latitude;
        let locationLong = record.location.longitude;

        var newLatLong = new google.maps.LatLng(locationLat, locationLong);

        // Create a marker for the location
        var marker = new google.maps.Marker({
          position: newLatLong,
          map,
        });

        // Tells information about the location
        let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

        // Create the info window, setting the content to the locationContentString
        var infowindow = new google.maps.InfoWindow({
          content: locationContentString,
        });

        // User clicks on the marker to view content
        marker.addListener("click", (event) => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        })

        // Store the marker
        markers.push(marker)
      })


      // When the user click the filter button, filter the result
      const submitBttn = document.querySelector(".submit-button")

      submitBttn.addEventListener("click", (event) => {
        // Make all the markers hidden
        markers.forEach((marker) => {
          marker.setMap(null);
        })

        // Remove all the markers
        markers = [];
        
        // Get all day filters the user clicks on
        let dayCheckBoxes = document.querySelectorAll('input[name="day-checkbox"]:checked');

        // Get all rating filters the user clicks on
        let ratingCheckBoxes = document.querySelectorAll('input[name="rating-checkbox"]:checked');

        let movieLocationOption = document.querySelector("#movie-location").value;
        console.log(movieLocationOption)

        // Start filtering the data
        output.forEach((record) => {
          // No filter
          if (dayCheckBoxes.length == 0 && ratingCheckBoxes.length == 0 && movieLocationOption == "") {
            // Get the location's latitude and longitude
            let locationLat = record.location.latitude;
            let locationLong = record.location.longitude;

            var newLatLong = new google.maps.LatLng(locationLat, locationLong);

            // Create a marker for the location
            var marker = new google.maps.Marker({
              position: newLatLong,
              map,
            });

            // Tells information about the location
            let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

            // Create the info window, setting the content to the locationContentString
            var infowindow = new google.maps.InfoWindow({
              content: locationContentString,
            });

            // User clicks on the marker to view content
            marker.addListener("click", (event) => {
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
              });
            })

            // Store the marker
            markers.push(marker)

          }  // Only day filter
          else if (dayCheckBoxes.length != 0 && ratingCheckBoxes.length == 0 && movieLocationOption == "") {
            dayCheckBoxes.forEach((dayBox) => {
              if (record.day == dayBox.value) {
                // Create a marker
                // Get the location's latitude and longitude
                let locationLat = record.location.latitude;
                let locationLong = record.location.longitude;

                var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                // Create a marker for the location
                var marker = new google.maps.Marker({
                  position: newLatLong,
                  map,
                });

                // Tells information about the location
                let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                // Create the info window, setting the content to the locationContentString
                var infowindow = new google.maps.InfoWindow({
                  content: locationContentString,
                });

                // User clicks on the marker to view content
                marker.addListener("click", (event) => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                })

                // Store the marker
                markers.push(marker)
              }
            })
          }  // Only rating filter
          else if (dayCheckBoxes.length == 0 && ratingCheckBoxes.length != 0 && movieLocationOption == "") {
            ratingCheckBoxes.forEach((ratingBox) => {
              if (record.rating == ratingBox.value) {
                // Create a marker
                // Get the location's latitude and longitude
                let locationLat = record.location.latitude;
                let locationLong = record.location.longitude;

                var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                // Create a marker for the location
                var marker = new google.maps.Marker({
                  position: newLatLong,
                  map,
                });

                // Tells information about the location
                let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                // Create the info window, setting the content to the locationContentString
                var infowindow = new google.maps.InfoWindow({
                  content: locationContentString,
                });

                // User clicks on the marker to view content
                marker.addListener("click", (event) => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                })

                // Store the marker
                markers.push(marker)
              }
            })

          }  // Both day and rating filters
          else if (dayCheckBoxes.length != 0 && ratingCheckBoxes.length != 0 && movieLocationOption == "") {
            dayCheckBoxes.forEach((dayBox) => {
              ratingCheckBoxes.forEach((ratingBox) => {
                if (record.day == dayBox.value && record.rating == ratingBox.value) {
                  // Get the location's latitude and longitude
                  let locationLat = record.location.latitude;
                  let locationLong = record.location.longitude;

                  var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                  // Create a marker for the location
                  var marker = new google.maps.Marker({
                    position: newLatLong,
                    map,
                  });

                  // Tells information about the location
                  let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                  // Create the info window, setting the content to the locationContentString
                  var infowindow = new google.maps.InfoWindow({
                    content: locationContentString,
                  });

                  // User clicks on the marker to view content
                  marker.addListener("click", (event) => {
                    infowindow.open({
                      anchor: marker,
                      map,
                      shouldFocus: false,
                    });
                  })

                  // Store the marker
                  markers.push(marker)
                }
              })
            })
          }  // Only the movie location filter
          else if (dayCheckBoxes.length == 0 && ratingCheckBoxes.length == 0 && movieLocationOption == record.park) {
            // Get the location's latitude and longitude
            let locationLat = record.location.latitude;
            let locationLong = record.location.longitude;

            var newLatLong = new google.maps.LatLng(locationLat, locationLong);

            // Create a marker for the location
            var marker = new google.maps.Marker({
              position: newLatLong,
              map,
            });

            // Tells information about the location
            let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

            // Create the info window, setting the content to the locationContentString
            var infowindow = new google.maps.InfoWindow({
              content: locationContentString,
            });

            // User clicks on the marker to view content
            marker.addListener("click", (event) => {
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
              });
            })

            // Store the marker
            markers.push(marker)
            
            
          } // Rating and movie location filters
          else if (dayCheckBoxes.length == 0 && ratingCheckBoxes.length != 0 && movieLocationOption == record.park) {
            ratingCheckBoxes.forEach((ratingBox) => {
              if (record.rating == ratingBox.value) {
                // Create a marker
                // Get the location's latitude and longitude
                let locationLat = record.location.latitude;
                let locationLong = record.location.longitude;

                var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                // Create a marker for the location
                var marker = new google.maps.Marker({
                  position: newLatLong,
                  map,
                });

                // Tells information about the location
                let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                // Create the info window, setting the content to the locationContentString
                var infowindow = new google.maps.InfoWindow({
                  content: locationContentString,
                });

                // User clicks on the marker to view content
                marker.addListener("click", (event) => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                })

                // Store the marker
                markers.push(marker)
              }
            })
          } // Day and movie location filters
          else if (dayCheckBoxes.length != 0 && ratingCheckBoxes.length == 0 && movieLocationOption == record.park) {
            dayCheckBoxes.forEach((dayBox) => {
              if (record.day == dayBox.value) {
                // Create a marker
                // Get the location's latitude and longitude
                let locationLat = record.location.latitude;
                let locationLong = record.location.longitude;

                var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                // Create a marker for the location
                var marker = new google.maps.Marker({
                  position: newLatLong,
                  map,
                });

                // Tells information about the location
                let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                // Create the info window, setting the content to the locationContentString
                var infowindow = new google.maps.InfoWindow({
                  content: locationContentString,
                });

                // User clicks on the marker to view content
                marker.addListener("click", (event) => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                })

                // Store the marker
                markers.push(marker)
              }
            })
            
          }  // All three filters
          else if (dayCheckBoxes.length != 0 && ratingCheckBoxes.length != 0 && movieLocationOption == record.park) {
            dayCheckBoxes.forEach((dayBox) => {
              ratingCheckBoxes.forEach((ratingBox) => {
                if (record.day == dayBox.value && record.rating == ratingBox.value) {
                  // Get the location's latitude and longitude
                  let locationLat = record.location.latitude;
                  let locationLong = record.location.longitude;

                  var newLatLong = new google.maps.LatLng(locationLat, locationLong);

                  // Create a marker for the location
                  var marker = new google.maps.Marker({
                    position: newLatLong,
                    map,
                  });

                  // Tells information about the location
                  let locationContentString = "<h5>" + record.title + "</h5><b><u>Movie Rating:</u></b> " + record.rating + "<br><br><b><u>When:</u></b> " + record.date.substring(0, 10) + "<br><br><b><u>Place:</u></b> " + record.park + "<br><b><u>Address:</u></b> " + record.park_address + "<br><b><u>Phone Number:</u></b> " + record.park_phone;

                  // Create the info window, setting the content to the locationContentString
                  var infowindow = new google.maps.InfoWindow({
                    content: locationContentString,
                  });

                  // User clicks on the marker to view content
                  marker.addListener("click", (event) => {
                    infowindow.open({
                      anchor: marker,
                      map,
                      shouldFocus: false,
                    });
                  })

                  // Store the marker
                  markers.push(marker)
                }
              })
            })
            
          }
          

        })

      })

    })

}

// Executes the initMap function, in order to display the map
window.initMap = initMap;
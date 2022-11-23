// @ts-nocheck TODO remove when fixed

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
import {EVENT_LOCATION_KEY, CREATE_TYPE, CREATE_TYPE_CREATE, CREATE_TYPE_EDIT} from '../model/keys.js'
function initAutocomplete() {

  const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    let userPos =GeolocationCoordinates;
    let endpoint = {}

  if (navigator.geolocation) {
    console.log("ma ass");
    navigator.geolocation.getCurrentPosition(
      (position = GeolocationCoordinates) => {
        console.log(position.coords)
        userPos = position;
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const marker = new google.maps.Marker({
          position: pos,
          map: map,
        });

        map.setCenter(pos);
        directionsRenderer.setMap(map);

      
      }
    );
  }
  const map = new google.maps.Map(
    document.getElementById("map"),

    {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 15,
      mapTypeId: "roadmap",
    }
  );
  let infoWindow = google.maps.InfoWindow;

  const locationButton = document.createElement("button");

  locationButton.textContent = "";
  locationButton.classList.add("custom-map-control-button");

  const locate_img = document.getElementById("local-img")

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locate_img.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position = GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // const marker = new google.maps.Marker({
          //   position: pos,
          //   map: map,
          // });

          // infoWindow.setPosition(pos)

          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, !map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, !map.getCenter());
    }
  });

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  const submitButton = document.getElementById("submit-img");
  submitButton.addEventListener("click", () =>{
    if(endpoint.lat == undefined ){
      alert('choose a location')
      return
    }
    let lcteStr = JSON.stringify(endpoint)
    console.log(lcteStr)
    sessionStorage.setItem(EVENT_LOCATION_KEY, lcteStr)

    console.log(sessionStorage.getItem(CREATE_TYPE))
    if(sessionStorage.getItem(CREATE_TYPE) == CREATE_TYPE_CREATE){
      window.location = '../create_event/createEvent.html';
    }else if(sessionStorage.getItem(CREATE_TYPE) == CREATE_TYPE_EDIT){
      window.location = '../edit_event/editEvent.html';
    }
  })
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    console.log()

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      console.log(place)
      endpoint = {
        title: place.name,
        img: ' '|| place.business_status.icon ,
        address:place.formatted_address,
        lat:place.geometry.location.lat(),
        lng:place.geometry.location.lng()
      }
      calculateAndDisplayRoute(directionsService, directionsRenderer, userPos, endpoint);

      (document.getElementById("mode")).addEventListener(
        "change",
        () => {
          calculateAndDisplayRoute(directionsService, directionsRenderer, userPos);
        }
      );
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function calculateAndDisplayRoute(
  directionsService,
  directionsRenderer,
  locationCurrent, 
  endpoint
) {
  const selectedMode = (document.getElementById("mode"))
    .value;

  directionsService
    .route({
      origin: { lat: locationCurrent.coords.latitude, lng: locationCurrent.coords.longitude }, // Haight.
      destination: { lat: endpoint.lat, lng: endpoint.lng }, // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}



function handleLocationError(
  browserHasGeolocation = boolean,
  infoWindow = google.maps.InfoWindow,
  pos = google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initAutocomplete = initAutocomplete;
export {};



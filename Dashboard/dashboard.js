import { event, getDate, getTime } from "../model/event.js";
import {EVENTID, token, BASE_URL, URL_EVENTS, URL_SIGNIN} from "../model/keys.js"
import { user } from "../model/user.js";

$(document).ready(function () {
  let obj = {};

  
  let userid = JSON.parse(sessionStorage.getItem(token));

 
    $("#user-nav").html(userid.username);

    console.log(`Bearer ${userid.token}`)
  $.ajax({

    type: "GET",
    url: URL_EVENTS,
    mode:'cors',
  //   contentType:'application/json',
    headers: {
       'Authorization': 'Bearer ' + userid.token,
       'Access-Control-Allow-Origin': '*',
       'Accept': 'application/json',

      //  'Content-Type': 'application/json'
        
       

  }
 
  }).done(function (data, msg) {
    console.log(data);
    $.each(data, function (indexInArray, valueOfElement) {
      makeGrid(valueOfElement);
    });

    $('.submit').click(function (e) { 
      e.preventDefault();
      // e.stopPropagation
      console.log(e.target.id)
      sessionStorage.setItem(EVENTID,JSON.stringify(e.target.id));
      window.location = '/eventPage/event.html'
      
    });
  });

  function makeGrid(i) {
    // let container = document.getElementById("event-wrapper");
    
    $('#event-wrapper').append(
        `
      <div class="event-card" id = "${i.eventID}">

      <img src="../resources/img/pexels-burst-374780.jpg"  alt="" class="wrap_img">
      <div class="event-card-details">
          <h3 class="event-head">${i.eventName}</h3>
          <p class="event-time">${getDate(i.startDate, "month")} ${getDate(
          i.startDate,
          "day"
        )}, ${i.startTime}</p>
      
          <p class="event-host">${i.organiser.firstName}</p>
          <div class="form-bo">
      
          <input type="button" class="submit" value="see details" id="${i.eventID}">
      </div>

      </div>
    
     
  </div>`);


        // container.append(cell);
  }
    
  

  let slideIndex = 0;
  // showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slideimg");
    //   let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    //   for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    //   }
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 10000); // Change image every 2 seconds
  }

  $("#create-event").click(function (e) {
    e.preventDefault();

    window.location = "../create_event/createEvent.html";
  });

  $("#check-events").click(function (e) {
    e.preventDefault();
    window.location = "../EventListPage/EventList.html";
  });
});

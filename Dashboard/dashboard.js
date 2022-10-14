import { event, getDate, getTime } from "../model/event.js";
import {EVENTID} from "../model/keys.js"

$(document).ready(function () {
  let obj = {};

  let userid = localStorage.getItem("userid");
  console.log(userid);

  $.ajax({
    method: "GET",
    url: `http://localhost:3000/users/${userid}`,
  }).done(function (data, msg) {
    obj = data;
    console.log(obj.id + " " + obj.firstname);
    $("#user-nav").html(obj.firstname + " " + obj.lastname);
  });

  $.ajax({
    type: "GET",
    url: `http://localhost:3000/events`,
  }).done(function (data, msg) {
    console.log(data);
    $.each(data, function (indexInArray, valueOfElement) {
      makeGrid(valueOfElement);
    });

    $('.submit').click(function (e) { 
      e.preventDefault();
      // e.stopPropagation
      console.log(e.target.id)
      sessionStorage.setItem(EVENTID, e.target.id);
      window.location = '/eventPage/event.html'
      
    });
  });

  function makeGrid(i) {
    // let container = document.getElementById("event-wrapper");
    
    $('#event-wrapper').append(
        `
      <div class="event-card" id = "${i.id}">

      <img src="../resources/img/pexels-burst-374780.jpg"  alt="" class="wrap_img">
      <div class="event-card-details">
          <h3 class="event-head">${i.eventName}</h3>
          <p class="event-time">${getDate(i.startDate, "month")} ${getDate(
          i.startDate,
          "day"
        )}, ${i.startTime}</p>
      
          <p class="event-host">${i.organiserName}</p>
          <div class="form-bo">
      
          <input type="button" class="submit" value="see details" id=${i.id}">
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

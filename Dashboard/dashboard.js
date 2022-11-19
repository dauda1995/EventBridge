import { event, getDate, getTime } from "../model/event.js";
import {EVENTID, token, BASE_URL, URL_EVENTS, URL_SIGNIN} from "../model/keys.js"
import { user } from "../model/user.js";

$(document).ready(function () {
  let obj = {};

  
  let userid = JSON.parse(sessionStorage.getItem(token));

 
    $("#username").html(userid.username);

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
    let i = 1
    let j = 1
    $.each(data, function (indexInArray, valueOfElement) {
     
      if(j >4){
        i++
        j=1
      }
      makeGrid(valueOfElement, i, j);
      j++
    });

   
  });

    
  function makeGrid(i, row, column) {
    // let container = document.getElementById("event-wrapper");
    
    $('.event-container').append(
        `
        <div class="event-card" id="${i.eventID}" style= "grid-template-rows: ${row}; grid-template-columns:${column}" >
                
                  <img src="${i.imgUrl}" class = "event-ad-img"  id="${i.eventID}">
                
                <div class="event-body"  id="${i.eventID}">
                  <h2 class="event-heading"  id="${i.eventID}">${i.eventName}</h2>
                  <p class="event-date"  id="${i.eventID}">${getDate(i.startDate, "month")} ${getDate(
                    i.startDate,
                    "day"
                  )}, ${i.startTime}</p>
                  <p class="location"  id="${i.eventID}">${i.address.city}</p>
                  <p class="event-cost"  id="${i.eventID}">${i.cost}</p>
                  <div class="event-org">
                    <p class="event-organiser"  id="${i.eventID}"
                    >${i.organiserName}</p>
                  </div>
                 
                </div>
              </div>
              `);


              $('.event-card').click(function (e) { 
                e.preventDefault();
                // e.stopPropagation
                console.log("errrt" +e.target.id)
                sessionStorage.setItem(EVENTID,JSON.stringify(e.target.id));
                window.location = '/eventPage2/pageevent.html'
                
              });
        // container.append(cell);
  }
    
  

 
  $("#create-event").click(function (e) {
    e.preventDefault();

    window.location = "../create_event/createEvent.html";
  });

  $("#check-events").click(function (e) {
    e.preventDefault();
    window.location = "../EventListPage/EventList.html";
  });

  $("#maps").click(function (e) {
    e.preventDefault();
    window.location = "../GoogleApi/dashboardmap.html";
  });

  $("#online").click(function (e) {
    e.preventDefault();

  });

});

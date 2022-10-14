import { EVENTID, USERID } from "../model/keys.js";
import getUserDetail from "../exportFunctions/getUser.js";
import { user } from "../model/user.js";
import { event, getDate, getTime } from "../model/event.js";
import { tickets } from "../model/tickets.js";

$(document).ready(function () {
  let eventDetails = {};
  let userDetails = {};
  let userId = localStorage.getItem(USERID);
  console.log(userId);

  $.get(
    `http://localhost:3000/users/${userId}`,
    function (data, textStatus, jqXHR) {
      userDetails = user(data);

      $(".host").html(userDetails.firstname);
    }
  );

  let username = getUserDetail("#user-name");

  $.get(
    `http://localhost:3000/events/${sessionStorage.getItem(EVENTID)}`,

    function (data, textStatus, jqXHR) {
      eventDetails = event(data);
      console.log(eventDetails.location);

      $(".mon").html(getDate(eventDetails.startDate, "month"));
      $(".day").html(getDate(eventDetails.startDate, "day"));
      $("#event-heading").html(eventDetails.eventName);
      $(".event-cost").html(eventDetails.cost);
      $("#event-headings").html(eventDetails.eventName);
      $("#summary").html(eventDetails.summary);

      $(".event-time").html(
        getDate(eventDetails.startDate, "both") + " " + eventDetails.startTime
      );
      $(".event-location").html(eventDetails.location);

      checkReservation();
    }
  );

  $(".register").click(function (e) {
    e.preventDefault();

    console.log(userDetails.id)
    let obj = {
      customerId: userDetails.id,
      eventId: eventDetails.eventID,
      dateCreated: new Date(),
      ticketId: "",
    };

    let ticket = tickets(obj);

    $.post(
      `http://localhost:3000/tickets`,
      ticket,
      function (data, textStatus, jqXHR) {
        if (textStatus == "success") {
          swal({
            title: "Reservation successful!",
            text: "you have registered for this event, see you there!",
            icon:"success",
            button:false,
            timer: 2000
           });
        }
      }
    );
  });


  let checkReservation = ()=>{
    $.get(`http://localhost:3000/tickets`,
      function (data, textStatus, jqXHR) {
        $.each(data, function (indexInArray, valueOfElement) { 
         
           if(valueOfElement.eventId == eventDetails.eventID && valueOfElement.customerId == userDetails.id){
            $(".register").attr('disabled', true);
            $('#reg').html('Reserved');
           }
        });
      }
   
    );
  }

  $('#events-list').click(function (e) { 
    e.preventDefault();
    window.location = window.location = "/EventListPage/EventList.html";
  });

  $('#create-event').click(function (e) { 
    e.preventDefault();
    window.location = "/create_event/createEvent.html";
  });
});

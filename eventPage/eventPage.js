import { EVENTID, USERID, URL_EVENTS, URL_TICKETS, token } from "../model/keys.js";
import getUserDetail from "../exportFunctions/getUser.js";
import { user } from "../model/user.js";
import { event, getDate, getTime } from "../model/event.js";
import { tickets } from "../model/tickets.js";

$(document).ready(function () {
  let eventDetails = {};
  let userDetails = {};
  let userId = JSON.parse(sessionStorage.getItem(token));
  console.log(userId)
  let eventId = JSON.parse(sessionStorage.getItem(EVENTID));
  console.log(`${URL_EVENTS}/getById/${eventId}`)

  $.get(`${URL_EVENTS}/getById/${eventId}`,
    function (data, textStatus, jqXHR) {
      //  eventDetails = event(data);
      eventDetails = data
      console.log(eventDetails.location);

      $("#user-name").html(userId.username);
      $(".mon").html(getDate(eventDetails.startDate, "month"));
      $(".day").html(getDate(eventDetails.startDate, "day"));
      $("#event-heading").html(eventDetails.eventName);
      $(".event-cost").html(eventDetails.cost);
      $("#event-headings").html(eventDetails.eventName);
      $("#summary").html(eventDetails.summary);
      $(".hero-img").attr('src', eventDetails.imgUrl)
      $('.img-event').attr('src', eventDetails.imgUrl)

      $(".event-time").html(
        getDate(eventDetails.startDate, "both") + " " + eventDetails.startTime
      );
      $(".event-location").html(eventDetails.location);

      checkReservation();
    }
  
  );
  // $.get(
  //   `${URL_EVENTS}/getById/${EVENTID}`,
  //   function (data, textStatus, jqXHR) {
  //     userDetails = user(data);

  //     $(".host").html(userDetails.firstname);
  //   }
  // );

  // let username = getUserDetail("#user-name");

  // $.get(
  //   `http://localhost:3000/events/${sessionStorage.getItem(EVENTID)}`,

  //   function (data, textStatus, jqXHR) {
  //     eventDetails = event(data);
  //     console.log(eventDetails.location);

  //     $(".mon").html(getDate(eventDetails.startDate, "month"));
  //     $(".day").html(getDate(eventDetails.startDate, "day"));
  //     $("#event-heading").html(eventDetails.eventName);
  //     $(".event-cost").html(eventDetails.cost);
  //     $("#event-headings").html(eventDetails.eventName);
  //     $("#summary").html(eventDetails.summary);

  //     $(".event-time").html(
  //       getDate(eventDetails.startDate, "both") + " " + eventDetails.startTime
  //     );
  //     $(".event-location").html(eventDetails.location);

  //     checkReservation();
  //   }
  // );

  $(".register").click(function (e) {
    e.preventDefault();

    console.log(userId.id)
    let obj = {
      customerId: userId.id,
      eventId: eventDetails.eventID,
      dateCreated: new Date(),
      
      // eventId:obj.eventId,
      //       customerId:obj.customerId,
      //       dateCreated:obj.dateCreated
    };

    let ticket = tickets(obj);
    console.log(eventDetails.eventID)



    $.post(
      `${URL_TICKETS}/save/${eventId}/${userId.id}/tickets`,
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
           checkReservation();
        }else{
          swal({
            title: "Reservation Failed",
            text: "Unsuccessful",
            // icon:"failed",
            button:false,
            timer: 2000
           });
        }
      }
    );
  });


  let checkReservation = ()=>{

    console.log(userId.id, parseInt(eventId))
    $.get(`${URL_TICKETS}/getbyIds/${userId.id}/${parseInt(eventId)}`,
      function (data, textStatus, jqXHR) {
        try {


          console.log(textStatus, data)
          
          if(data!= 'undefined'){
            console.log("err" + data)
            $(".register").attr('disabled', true);
            $('#reg').html('Reserved');
           }
          
        } catch (error) {
          console.log(error);
        }
        
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

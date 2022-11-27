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

  $("#username").html(userId.username);

  $.get(`${URL_EVENTS}/getById/${eventId}`,
    function (data, textStatus, jqXHR) {
      //  eventDetails = event(data);
      eventDetails = data
      console.log(eventDetails.location);

      
     
      $("#datemon").html(getDate(eventDetails.startDate, "month"));
      $("#dateday").html(getDate(eventDetails.startDate, "day"));
      $(".eventtitle").html(eventDetails.eventName);
      $(".price").html(eventDetails.cost);
      $("#event-headings").html(eventDetails.eventName);
      $(".host").html(eventDetails.organiserName);
      $(".summary").html(eventDetails.summary);
      $(".hero-img").attr('src', eventDetails.imgUrl)
      $('.img-event').attr('src', eventDetails.imgUrl)

      $("#event-time").html(
        getDate(eventDetails.startDate, "both") + " " + eventDetails.startTime
      );
      $("#event-location").html(eventDetails.address.city);

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

    console.log(eventId)


    $.post(
      `${URL_TICKETS}/save/${eventId}/${userId.id}/tickets`,
      ticket,
      function (data, textStatus, jqXHR) {
        console.log(textStatus)
        if (textStatus == "success") {
          checkReservation();
          swal({
            title: "Reservation successful!",
            text: "you have registered for this event, see you there!",
            icon:"success",
            button:false,
            timer: 2000
           });
          
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

  

  let swt = (imglink) =>{
    Swal.fire({
      title: "Reservation successful!",
      text: userId.username,
      imageUrl: imglink,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
    })
  }


  let checkReservation = ()=>{

    console.log(userId.id, eventDetails.eventID)
    $.get(`${URL_TICKETS}/getbyIds/${eventDetails.eventID}/${userId.id}`,
      function (data, textStatus, jqXHR) {
        try {


          // console.log(textStatus, data)
          
          console.log("checkreservation: " + textStatus)
          console.log(data);
          // console.log(data)
          if(textStatus == 'success'){
            console.log("err" + data.qrcode)
            $(".register").attr('disabled', true);
            
            swt(`data:image/png;base64,${data.qrcode}`)
            $(".reg").html('View QR code');

            $('.reg').click(function (e) { 
              e.preventDefault();
              swt(`data:image/png;base64,${data.qrcode}`)
              
            });
          
            // $("#barcode").attr('src', `data:image/png;base64,${data.qrcode}`);



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
    window.location = "/new_concepts/landingPage.html";
  });


});

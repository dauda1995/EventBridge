import getUserDetail from "../exportFunctions/getUser.js";
import { EVENTID, SWEETALERT, token, URL_TICKETS, URL_EVENTS, TICKETID } from "../model/keys.js";
import {getEventsFromDatabase} from "../services/EventServices.js"

$(document).ready(function () {
  let events = [];
  let url;
  // let obj = getUserDetail("#username");
  let userid = JSON.parse(sessionStorage.getItem(token));
  console.log(userid)
  $("#username").html(userid.username)

  const sweet = sessionStorage.getItem(SWEETALERT);
  console.log(sweet);
  if (sweet == "success") {
    swal({
      title: "successful!",
      text: "event successfully created",
      icon: "success",
      button: false,
      timer: 1000,
    });
    sessionStorage.setItem(SWEETALERT, '')
  }


  let response = async(url) =>{
    return await getEventsFromDatabase(url).then((res) =>{
      console.log(res)
      $.each(res, function (indexInArray, valueOfElement) { 
        appendList(valueOfElement);
      });

      moreDetails();
    })
  }

  if($('#event-status').val() == undefined || 'All'){
  url = `${URL_TICKETS}/byPersonId/${userid.id}`;
  response(url);
  }

  let moreDetails = () => {
    $(".more").click(function (e) {
      e.preventDefault();
      let id = e.target.id;
      console.log(id)
      sessionStorage.setItem(TICKETID,JSON.stringify(id));
      sessionStorage.setItem(EVENTID, JSON.stringify(id))
      window.location ='/eventPage2/pageevent.html'
    });
  };

  let removeli = ()=>{
    $('.eventItem').remove();
  }


  let appendList = (single) => {
    const date = new Date(single.event.startDate);
    let str = date.toString();
    const [day, month, year] = str.split(" ");

    $(".list-event").append(`
        <li class="eventItem" id=${single.ticketId}>
        <div class="event-list-lower">
          <div class="list-heading">
              <div class="event-details">
                <p class="title" id="eventName">${single.event.eventName}</p>
                <p class="type" id="location">${single.event.address.city}</p>
                <p class="date-time">${single.event.startDate} ${single.event.startTime}</p>
              </div>
            <div id="three">
              <div>0/0</div>
              <div>${single.event.cost}</div>
              <div id="eventType">${single.event.eventType}</div>
            </div>
          </div>
          <div class="more-container">
          <img src ="../resources/img/arrow/front-arrow.svg" alt="" class="more" id='${single.event.eventID}'/>
        </div>
        
        </div>
        
      </li>`);
  };

  $('#first-item').click(function (e) { 
    e.preventDefault();
    window.location = '../EventListPage/EventList.html'
    
    
  });

  $('#home-nav').click(function (e) { 
    e.preventDefault();
    window.location = '../new_concepts/landingPage.html'

    
  });

  $("#event-status").change(function (e) { 
    e.preventDefault();
    removeli();

    let text = $( "#event-status option:selected" ).text();
    console.log(text);

    if(text == "All"){
      url = `${URL_TICKETS}`
    }else{
      console.log("gotten to here")
      url = `${URL_TICKETS}/bycategory/${text}`;
    }
   
    response(url);

    
  });


 
  
});

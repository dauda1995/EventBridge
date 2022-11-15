import getUserDetail from "../exportFunctions/getUser.js";
import { EVENTID, SWEETALERT, BASE_URL, URL_EVENTS, token } from "../model/keys.js";
import { user } from "../model/user.js";
import { getEventsFromDatabase, swtAlrt } from "../services/EventServices.js";

$(document).ready(function () {
  let events = [];
 
  // let obj = getUserDetail("#username");
  let userid = JSON.parse(sessionStorage.getItem(token));
  let url = `${URL_EVENTS}/byorganiser/${userid.id}`;

  $("#username").html(userid.username)
 


  const sweet = sessionStorage.getItem(SWEETALERT);
  console.log(sweet);
  if (sweet == "success") {

    let alrt = async() =>{
      return await swtAlrt('success', 'event successfully created', 'success').then(() =>{
        sessionStorage.setItem(SWEETALERT, '')
      })
  }
  alrt();
    // swal({
    //   title: "successful!",
    //   text: "event successfully created",
    //   icon: "success",
    //   button: false,
    //   timer: 1000,
    // });
    

    
  }

  let match = (str1, str2) => {
    let status = false;
    str1 == str2 ? (status = true) : (status = false);
    return status;
  };

  // let m = new Date("2022-10-06");
  // console.log(m);
  // let d = m.toString()
  // console.log(d)
  // const [Dy, month, year] = d.split(' ')
  // console.log(year)

  let response = async(category) =>{
    
    return await getEventsFromDatabase(url).then((res) =>{
      $.each(res, function (indexInArray, valueOfElement) { 
        appendList(valueOfElement);
      });

      moreDetails();
    })
  }

  response();

  // $.get(
  //   `${URL_EVENTS}/byOrganiser/${userid.id}`,
  //   function (data, textStatus, jqXHR) {
  //     $.each(data, function (indexInArray, valueOfElement) {
  //       if (match(valueOfElement.organiserID, userid)) {
  //         events.push(valueOfElement);
  //         console.log("valid");
  //         appendList(valueOfElement);
  //       } else {
  //         console.log("invalid");
  //       }
  //     });

  //     moreDetails();
  //   }
  // );

  let moreDetails = () => {
    $(".more").click(function (e) {
      e.preventDefault();
      let id = e.target.id;
      console.log(id)
      sessionStorage.setItem(EVENTID,JSON.stringify(id));
      window.location ="../eventPage/event.html"
    });
  };

  let appendList = (single) => {
    const date = new Date(single.startDate);
    let str = date.toString();
    const [day, month, year] = str.split(" ");

    $(".list-event").append(`
        <li class="eventItem" id='${single.id}'>
        <div class="event-list-lower">
          <div class="list-heading">
            <div id="line">
              <div class="date">
                <div class="mon" id="month">${month}</div>
                <div class="day" id="day">${day}</div>
              </div>

             

              <div class="event-details">
                <p class="title" id="eventName">${single.eventName}</p>
                <p class="type" id="location">${single.organiserName}</p>
                <p class="date-time">${day} ${month}, ${year} ${single.startTime}</p>
              </div>
            </div>

            <div id="three">
              <div>0/0</div>
              <div>${single.cost}</div>
              <div id="eventType">${single.eventType}</div>
            </div>
          </div>

          <div class="more-container">
          <img src ="../resources/img/arrow/front-arrow.svg" alt="" class="more" id='${single.eventID}'/>
        </div>
        
        </div>
        
      </li>`);
  };

  $('#registered-events').click(function (e) { 
    e.preventDefault();
    window.location = '../EventListPage/registeredEventlist.html'
    
  });

  $('#create-btn').click(function (e) { 
    e.preventDefault();
    window.location = '../create_event/createEvent.html'
  });

  $('#home-nav').click(function (e) { 
    e.preventDefault();
    window.location = '../new_concepts/landingPage.html'

    
  });

  let removeli = ()=>{
    $('.eventItem').remove();
  }


  
  $("#event-status").change(function (e) { 
    e.preventDefault();
    removeli();

    let text = $( "#event-status option:selected" ).text();
    console.log(text);

    if(text == "All"){
      url = `${URL_EVENTS}/byorganiser/${userid.id}`;
    }else{
      console.log("gotten to here")
      url = `${URL_EVENTS}/byorganiserandCategory/${userid.id}/${text}`;
    }
   
    response(url);

    
  });




});

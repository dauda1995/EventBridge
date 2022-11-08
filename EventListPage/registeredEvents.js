import getUserDetail from "../exportFunctions/getUser.js";
import { EVENTID, SWEETALERT } from "../model/keys.js";

$(document).ready(function () {
  let events = [];
  let obj = getUserDetail("#username");
  let userid = localStorage.getItem("userid");

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

  let match = (str1, str2) => {
    let status = false;
    str1 != str2 ? (status = true) : (status = false);
    return status;
  };

  // let m = new Date("2022-10-06");
  // console.log(m);
  // let d = m.toString()
  // console.log(d)
  // const [Dy, month, year] = d.split(' ')
  // console.log(year)

  
  $.get(
    `http://localhost:3000/events`,
    userid,
    function (data, textStatus, jqXHR) {
      $.each(data, function (indexInArray, valueOfElement) {
        if (match(valueOfElement.organiserID, userid)) {
          events.push(valueOfElement);
          console.log("valid");
          appendList(valueOfElement);
        } else {
          console.log("invalid");
        }
      });

      moreDetails();
    }
  );

  let moreDetails = () => {
    $(".more").click(function (e) {
      e.preventDefault();
      let id = e.target.id;
      console.log(id)
      sessionStorage.setItem(EVENTID, id);
      window.location ="../eventPage/event.html"
    });
  };

  let appendList = (single) => {
    const date = new Date(single.startDate);
    let str = date.toString();
    const [day, month, year] = str.split(" ");

    $(".list-event").append(`
        <li class="eventItem" id=${single.id}>
        <div class="event-list-lower">
          <div class="list-heading">
            <div id="line">
              <div class="date">
                <div class="mon" id="month">${month}</div>
                <div class="day" id="day">${day}</div>
              </div>

              <img src="../resources/img/images.svg" alt="" />

              <div class="event-details">
                <p class="title" id="eventName">${single.eventName}</p>
                <p class="type" id="location">${single.location}</p>
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
          <img src ="../resources/img/arrow/front-arrow.svg" alt="" class="more" id=${single.id}/>
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
    window.location = '../Dashboard/dashboard.html'

    
  });

});

import getUserDetail from "../exportFunctions/getUser.js";
import {
  EVENTID,
  SWEETALERT,
  BASE_URL,
  URL_EVENTS,
  token,
  CREATE_TYPE,
  CREATE_TYPE_EDIT,
  CREATE_TYPE_CREATE,
} from "../model/keys.js";
import { user } from "../model/user.js";
import { getEventsFromDatabase, swtAlrt, swtAlrtDelete } from "../services/EventServices.js";

$(document).ready(function () {
  let events = [];
  let state = 1;

  // let obj = getUserDetail("#username");
  let userid = JSON.parse(sessionStorage.getItem(token));
  let url = `${URL_EVENTS}/byorganiser/${userid.id}`;

  $("#username").html(userid.username);

  const sweet = sessionStorage.getItem(SWEETALERT);
  console.log(sweet);
  if (sweet == "success") {
    let alrt = async () => {
      return await swtAlrt(
        "success",
        "event successfully created",
        "success"
      ).then(() => {
        sessionStorage.setItem(SWEETALERT, "");
      });
    };
    alrt();
  }

  let match = (str1, str2) => {
    let status = false;
    str1 == str2 ? (status = true) : (status = false);
    return status;
  };

  let response = async (category) => {
    return await getEventsFromDatabase(url, userid.token).then((res) => {
      $.each(res, function (indexInArray, valueOfElement) {
        appendList(valueOfElement);
      });

      moreDetails();
    });
  };

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


    $('body').click(function (e) { 
      e.preventDefault();
      if(state ==3){
      document
      .querySelectorAll(".event-list-lower .con-dropdown")
      .forEach((elem) => {
        elem.classList.remove("active");
      });
    }
      
    });

    $(".more-container").click(function (e) {
      
      document
        .querySelectorAll(".event-list-lower .con-dropdown")
        .forEach((elem) => {
          elem.classList.remove("active");
        });
      e.currentTarget.parentElement
        .querySelector(".con-dropdown")
        .classList.add("active");

        state =2;
    });


   


    $('.edit').click(function (e) { 
      e.preventDefault();
      console.log(e.target.id)

      
    let id = e.target.id;
    console.log(id)
    // sessionStorage.setItem(TICKETID,JSON.stringify(id));
    sessionStorage.setItem(EVENTID, JSON.stringify(id));
    sessionStorage.setItem(CREATE_TYPE, CREATE_TYPE_EDIT);
    window.location ='/edit_event/editEvent.html'
     
      
    });

    $('.delete').click(function (e) { 
      // e.preventDefault();
      console.log(e.target.id)
      // window.location = '../eventPage2/pageevent.html'
      let urlx = `${URL_EVENTS}/delete/${e.target.id}`


      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          $.ajax({
            type: "DELETE",
            url: urlx,
            headers: {
              'Authorization': 'Bearer ' + userid.token,
              "Content-Type":"application/json"
          },
            success: function (response) {
              
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          window.location = "../EventListPage/EventList.html";
            }
          });

        }
      })

     



      // let res = async () => {
      //   let innerReturn = await swtAlrtDelete(url).then((ans) =>{
      //     if(ans == 'success'){
      //       console.log("checking")
      //     }
      //   });
      //   console.log("return" + innerReturn)
      // }

      // res();
      

     
    });

    $(".more").click(function (e) {
      e.preventDefault();
      let id = e.target.id;
      console.log(id);
      sessionStorage.setItem(EVENTID, JSON.stringify(id));
      window.location = "/eventPage2/pageevent.html";
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
              <div class="event-details">
                <p class="title" id="eventName">${single.eventName}</p>
                <p class="type" id="location">${single.address.city}</p>
              
              </div>
            </div>

            <div id="three">
              <div style="color:black">0/0</div>
              <div>${single.cost}</div>
              <div id="eventType" style="color:black">${single.eventType}</div>
            </div>
          </div>

          <div class="more-container">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>

          <div class="con-dropdown">
            <ul>
              <li id="${single.eventID}" class="edit">Edit</li>
              <li id="${single.eventID}" class="delete">Delete</li>
            </ul>
          </div>
        </div>
        
      </li>`);
  };

  $("#registered-events").click(function (e) {
    e.preventDefault();
    window.location = "../EventListPage/registeredEventlist.html";
  });

  $("#create-btn").click(function (e) {
    e.preventDefault();
    sessionStorage.setItem(CREATE_TYPE, CREATE_TYPE_CREATE);
    window.location = "../create_event/createEvent.html";
  });

  $("#home-nav").click(function (e) {
    e.preventDefault();
    window.location = "../new_concepts/landingPage.html";
  });

  let removeli = () => {
    $(".eventItem").remove();
  };

  $("#event-status").change(function (e) {
    e.preventDefault();
    removeli();

    let text = $("#event-status option:selected").text();
    console.log(text);

    if (text == "All") {
      url = `${URL_EVENTS}/byorganiser/${userid.id}`;
    } else {
      console.log("gotten to here");
      url = `${URL_EVENTS}/byorganiserandCategory/${userid.id}/${text}`;
    }

    response(url);
  });
});

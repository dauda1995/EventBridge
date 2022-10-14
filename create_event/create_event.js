import getUserDetail from "../exportFunctions/getUser.js";
import { selectButton } from "../exportFunctions/helperFunctions.js";
import {USERID, CREATE_STATUS, CREATE_STATE, COMPLETE, INCOMPLETE, EVENT_LOCATION_KEY} from "../model/keys.js"
import {event} from "../model/event.js"

$(document).ready(function () {
    let obj = {}


    function getsession(){
      obj = JSON.parse(sessionStorage.getItem(CREATE_STATUS));
      let obj2 = JSON.parse(sessionStorage.getItem(EVENT_LOCATION_KEY));

      $("#event-title").val(obj.eventName);
      $("#event-organiser").val( obj.organiserName);
     $("#event-address").val(obj2.address);
  
     $("#event-date-start").val(obj.startDate);
     $("#event-time-start").val(obj.startTime);
  
     $("#event-date-end").val(obj.endDate);
     $("#event-time-end").val(obj.endTime);
     $('#event-summary').val(obj.summary);
     $('#event-cost').val(obj.cost);
     $('#event-img').val(obj2.img);
     $("#event-type").val()

      
    }
    if(sessionStorage.getItem(CREATE_STATE) ==INCOMPLETE){
      getsession();

    }





    
  $("#button-discard").click(function (e) {
    e.preventDefault();

 
        
  });
 let userid = localStorage.getItem(USERID)
  getUserDetail("#user-name");

    $.get(`http://localhost:3000/users/${userid}`,
      function (data, textStatus, jqXHR) {
        obj.organiserID = data.id;
        console.log(obj.organiserID)
      }
    );
  

  let locationArr = ["online", "future", "venue"];
  let location = '';
   selectButton(locationArr, ".list-button");


  let dateTimeArr = ["single", "reoccurring"];
  let dateTime='';
  selectButton(dateTimeArr, ".list-button-time");

 
 

  $('.list-button').click(function (e) { 
    e.preventDefault();
    location = e.target.id;
    if(location == "venue"){
     
      let eventInputs = JSON.stringify(setSession())
      sessionStorage.setItem(CREATE_STATE, INCOMPLETE)
      sessionStorage.setItem(CREATE_STATUS, eventInputs)
      window.location = "../GoogleApi/index.html"
    }
  });

  

  $('.list-button-time').click(function (e) { 
    e.preventDefault();
    dateTime = e.target.id
    
    
  });

  function setSession(){

    let eventName = $("#event-title").val();
    let organiserName = $("#event-organiser").val();
    let address = $("#event-address").val();
  
    let startDate = $("#event-date-start").val();
    let startTime = $("#event-time-start").val();
  
    let endDate = $("#event-date-end").val();
    let endTime = $("#event-time-end").val();
    let summary = $('#event-summary').val();
    let cost = $('#event-cost').val();
    let img = $('#event-img').val();
    let eventType = $("#event-type").val()

    obj.eventID = "";
    obj.eventName = eventName;
    obj.organiserName = organiserName;
    obj.location = address;
    obj.startDate = startDate;
    obj.startTime = startTime;
    obj.endDate = endDate;
    obj.endTime = endTime;
    obj.eventType = location;
    obj.summary = summary;
    obj.cost = cost;
    obj.imgUrl = img;

    return obj;

  }


  $("#button-create").click(function (e) {
        e.preventDefault();

        

        let eventName = $("#event-title").val();
        let organiserName = $("#event-organiser").val();
        let address = $("#event-address").val();
      
        let startDate = $("#event-date-start").val();
        let startTime = $("#event-time-start").val();
      
        let endDate = $("#event-date-end").val();
        let endTime = $("#event-time-end").val();
        let summary = $('#event-summary').val();
        let cost = $('#event-cost').val();
        let img = $('#event-img').val();
      
        let eventType = $("#event-type").val();
   

 
        
        obj.eventID = "";
        obj.eventName = eventName;
        obj.organiserName = organiserName;
        obj.location = address;
        obj.startDate = startDate;
        obj.startTime = startTime;
        obj.endDate = endDate;
        obj.endTime = endTime;
        obj.eventType = location;
        obj.summary = summary;
        obj.cost = cost;
        obj.imgUrl = img;


        
              $.post("http://localhost:3000/events", obj, function(data, status){
                swal({
                  type: 'success',
                  title: `event created`,
                  showConfirmButton: false,
                  timer: 5000
                })


                if(status == 'success'){
                  sessionStorage.setItem("sweetAlert", "success")
                  window.location = '../EventListPage/EventList.html'
                }else{
                  swal({
                    type: 'error',
                    title: `error`,
                    showConfirmButton: false,
                    timer: 5000
                  })
                }
              });
     
       
  });

  $("#first-item").click(function (e) {
    e.preventDefault();
    window.location = "/New folder/EventListPage/EventList.html";
  });
});

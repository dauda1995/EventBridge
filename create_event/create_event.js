import getUserDetail from "../exportFunctions/getUser.js";
import { selectButton } from "../exportFunctions/helperFunctions.js";
import {USERID} from "../model/keys.js"

$(document).ready(function () {
    let obj = {
        eventID:'',
        organiserID: '',
        eventName: '',
        organiserName:'',
        location: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endtime: '',
        type: ''
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
  });

  $('.list-button-time').click(function (e) { 
    e.preventDefault();
    dateTime = e.target.id
    
  });


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

import {
  CREATE_STATUS,
  token,
  CREATE_STATE,
  INCOMPLETE,
  COMPLETE,
  EVENT_LOCATION_KEY,
  URL_EVENTS,
  CREATE_TYPE_CREATE,
  CREATE_TYPE_EDIT,
  CREATE_TYPE,
  EVENTID,
} from "../model/keys.js";
import { GOOGLE_PATH } from "../model/paths.js";
import { selectButton } from "../exportFunctions/helperFunctions.js";
import {
  getEventsFromDatabase,
  submitEventDetails,
  swtAlrt
} from "../services/EventServices.js";


$(document).ready(function () {
  let venueType;
  let category;
  let obj2;
  sessionStorage.setItem(CREATE_TYPE, CREATE_TYPE_CREATE);
  let userId = JSON.parse(sessionStorage.getItem(token));
  let eventid = JSON.parse(sessionStorage.getItem(EVENTID));

  sessionStorage.setItem(CREATE_TYPE, CREATE_TYPE_CREATE);
  console.log(sessionStorage.getItem(CREATE_TYPE))


 
  

  let obj = {
    eventName: "",
    organiserName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    summary: "",
    cost: "",
    imgUrl: "",
    latitude: 0.0,
    longitude: 0.0,
    location: "",
    preference: "",
    eventType: "",
  };


     
  let alrt = async(eventType, title, icon, callback) =>{
    return await swtAlrt(eventType, title, icon).then(() =>{
      callback
    })
}

  
  let validate = () => {
    if(obj.eventName.length == 0){
      alrt("error", "event name is not set", "error")
      return false
    }
    if(obj.organiserName.length == 0){
      alrt("error", "organiser name is not set", "error")
      return false
    }
    
    if(obj.summary.length == 0){
      alrt("error", "summary is not set", "error")
      return false
    }

    if(obj.cost.length == 0){
      alrt("error", "cost is not set", "error")
      return false
    }

    if(obj.imgUrl.length == 0){
      alrt("error", "image is not set", "error")
      return false
    }

    if(obj.location.length == 0){
      alrt("error", "location address is not set", "error")
      return false
    }

    if(obj.eventType.length == 0){
      alrt("error", "location type is not set", "error")
      return false
    }

    if(obj.startDate.length == 0){
      alrt("error", "start date is not set", "error")
      return false
    }

    if(obj.startTime.length == 0){
      alrt("error", "start time is not set", "error")
      return false
    }

    if(obj.endDate.length == 0){
      alrt("error", "end date is not set", "error")
      return false
    }
    
    if(obj.endTime.length == 0){
      alrt("error", "end time is not set", "error")
      return false
    }
    return true

  }

  // }

  function timeValidate(id){

    const date = document.getElementById(id);
    date.min = new Date().toISOString().split("T")[0];
    date.value = new Date().toISOString().split("T")[0];
  }

  let initialize = () => {


    timeValidate('event-date-start');
    timeValidate('event-date-end');
    


    console.log("initialized");
    let locationArr = ["online", "venue"];
    venueType = "";
    selectButton(locationArr, ".list-button");

    let categories = ["science", "music", "expo"];
    category = "";
    // selectButton(categories, ".list-button-time");

    $("#user-name").html(userId.username);

    $(".list-button").click(function (e) {
      e.preventDefault();
      console.log(e.target.id);
      obj.eventType = e.target.id;
      venueType = e.target.id;

      if(e.target.id == "online"){
        console.log('lk')
        $('#event-address').attr('placeholder', 'website');
      }

      if (e.target.id == "venue") {
        console.log("venue clicked");
        sessionStorage.setItem(CREATE_STATE, INCOMPLETE);
        saveDataToSessionStorage()
        loadGoogleMapApi();
      }
    });

    $(".list-button-time").change(function (e) {
      e.preventDefault();
      console.log(e.target.id);

      let text = $(".list-button-time option:selected").text();
      console.log(text);
      category = text;
   
    });

   
  };

  let selectButtons = (id) => {
    if (id != "") {
      document.getElementById(id).style =
        "background-color:#ebeefc; color:#4169e7; border:2px Solid #4169e7;";
    }
  };

  initialize();

  let invalidateLocation = () =>{

    try{
    if(obj2 == null)
    return false


    if(obj2.lat == null){
      alrt("error", "location is not set", "error")
      sessionStorage.setItem(CREATE_STATE, COMPLETE);
      return false
    }

    if(obj2.lng == null){
      alrt("error", "location is not set", "error")
      sessionStorage.setItem(CREATE_STATE, COMPLETE);
      return false
    }

    return true;
  }catch(e){
    sessionStorage.setItem(CREATE_STATE, COMPLETE);
  }
  }

  let setDataFromSessionStorage = () => {
    if (obj.eventType == "venue") {

      console.log('entered')
      let run = invalidateLocation();
      if(run  == false ){
        console.log(sessionStorage.getItem(CREATE_STATE))
        sessionStorage.setItem(CREATE_STATE, COMPLETE)
        return
      }
      obj.latitude = obj2.lat;
      obj.longitude = obj2.lng;
      obj.location = obj2.address;
    
    }

    console.log(obj.imgUrl);

    $("#event-title").val(obj.eventName);
    $("#event-organiser").val(obj.organiserName);
    $("#event-date-start").val(obj.startDate);
    $("#event-time-start").val(obj.startTime);
    $("#event-date-end").val(obj.endDate);
    $("#event-time-end").val(obj.endTime);
    $("#event-summary").val(obj.summary);
    $("#event-cost").val(obj.cost);
    $("#event-address").val(obj.location);
    // $('#event-img').val(obj.imgUrl);

    $("#event-img").attr("src", () => {
      return obj.imgUrl;
    });
    venueType = obj.eventType;
    console.log(obj.eventType);
    category = obj.preference;

    selectButtons(obj.eventType);
    selectButtons(obj.preference);
  };

  if (sessionStorage.getItem(CREATE_STATE) == INCOMPLETE) {
    obj = JSON.parse(sessionStorage.getItem(CREATE_STATUS));
    obj2 = JSON.parse(sessionStorage.getItem(EVENT_LOCATION_KEY));
    // console.log(obj.location)
    // sessionStorage.setItem(CREATE_STATE, "COMPLETE")

    setDataFromSessionStorage(obj, obj2);

  }


  // if(sessionStorage.getItem(CREATE_STATE) == COMPLETE){

  //   setDataFromSessionStorage();
  // }


  let saveDataToSessionStorage = () => {
    // obj.imgUrl = $('#event-img').val();
    console.log(obj.imgUrl);
    obj.eventName = $("#event-title").val();
    obj.organiserName = $("#event-organiser").val();
    obj.startDate = $("#event-date-start").val();
    obj.startTime = $("#event-time-start").val();
    obj.endDate = $("#event-date-end").val();
    obj.endTime = $("#event-time-end").val();
    obj.summary = $("#event-summary").val();
    obj.cost = $("#event-cost").val();
    // obj.imgUrl = $("#event-img").val();

    obj.location = $("#event-address").val();
    obj.eventType = venueType;
    obj.preference = category;

    if (obj.eventType == "venue") {
      if (obj2 != null) {
        obj.latitude = obj2.lat;
        obj.longitude = obj2.lng;
        obj.location = obj2.address;
      }
    }

    sessionStorage.setItem(CREATE_STATUS, JSON.stringify(obj));
  };
  $("#event-img").change(() => {
    imgurlConvert().then((result) => {
      obj.imgUrl = result;
      console.log(result);
      $("#test").attr("src", result);
    });
  });

  let imgurlConvert = () => {
    return new Promise((resolve, reject) => {
      let input = document.getElementById("event-img");
      let file = input.files[0];
      let fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => resolve(fr.result);
      fr.onerror = (error) => reject(error);
    });
  };

  let loadGoogleMapApi = () => {
    return (window.location = GOOGLE_PATH);
  };



  $("#button-create").click(function (e) {
    e.preventDefault();
    sessionStorage.setItem(CREATE_STATE, COMPLETE);
    // sessionStorage.setItem(CREATE_STATUS, null);

    saveDataToSessionStorage();
    console.log(obj);
    if (obj.eventName == null) return;

    let inv = validate();
    
    if(inv == false){
      return
    }

   

   

    let url = `${URL_EVENTS}/createEvent/${userId.id}/events`;
    let result = async () => {
      let ret = await submitEventDetails(JSON.stringify(obj), url, userId.token).then((res) => {
        console.log("what todo", res);
        if (res == true) {
          console.log("should redirect");
          sessionStorage.setItem("sweetAlert", "success");
          redirect();
        }else{
          sessionStorage.setItem(CREATE_STATE, INCOMPLETE);
        }
      });
      console.log("this is the ajax response" + ret);
    };
    result();
  });

  let redirect = () => {
    sessionStorage.setItem(CREATE_TYPE, "");
    window.location = "../EventListPage/EventList.html";
  };
});

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
    swtAlrt,
    updateEventDetails,
  } from "../services/EventServices.js";
  
  $(document).ready(function () {
    let venueType;
    let category;
    let obj2;
    let userId = JSON.parse(sessionStorage.getItem(token));
    let eventid = JSON.parse(sessionStorage.getItem(EVENTID));
    sessionStorage.setItem(CREATE_TYPE, CREATE_TYPE_EDIT);

    console.log(sessionStorage.getItem(CREATE_TYPE))
    console.log(sessionStorage.getItem(CREATE_STATE))
  
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


    let setFieldsFromPayload = (response) =>{

        console.log(sessionStorage.getItem(CREATE_STATE))
        if( sessionStorage.getItem(CREATE_STATE) != INCOMPLETE){

            obj.location = response.address.city;
            venueType = response.eventType;
            try {
                obj.imgUrl = response.imgUrl;
                category = response.categories.preference;
            } catch (error) {
                
            }

            if(response.eventType == "venue"){

                obj.latitude =  response.address.latitude;
                obj.longitude =  response.address.longitude;
            }

        }

    
        selectButtons(response.eventType);
        // selectButtons(response.preference);

        $("#event-title").val(response.eventName);
        $("#event-organiser").val(response.organiserName);
        $("#event-date-start").val(response.startDate);
        $("#event-time-start").val(response.startTime);
        $("#event-date-end").val(response.endDate);
        $("#event-time-end").val(response.endTime);
        $("#event-summary").val(response.summary);
        $("#event-cost").val(response.cost);
        if(sessionStorage.getItem(CREATE_STATE) == COMPLETE){
            $("#event-address").val(response.address.city);
            console.log('create')
        }else{
            $("#event-address").val(obj.location);
            console.log('update', obj.location, obj.eventType, obj.category)
        }
        

    }

    
  
    // }
  
    let initialize = () => {
     
      console.log("initialized");
      let locationArr = ["online", "future", "venue"];
      venueType = "";
      selectButton(locationArr, ".list-button");
  
     
   
  
      $("#user-name").html(userId.username);
  
      $(".list-button").click(function (e) {
        e.preventDefault();
        console.log(e.target.id);
        obj.eventType = e.target.id;
        venueType = e.target.id;
  
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


      if(sessionStorage.getItem(CREATE_STATE) != INCOMPLETE){

      $.ajax({
        type: "GET",
        url: `${URL_EVENTS}/getById/${eventid}`,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            console.log(response)

            try {
                setFieldsFromPayload(response);
            } catch (error) {
               console.log('img or preference wasnt set')
            }
           
        }
      });

    }else if(sessionStorage.getItem(CREATE_STATE) == INCOMPLETE){
        obj = JSON.parse(sessionStorage.getItem(CREATE_STATUS));
        obj2 = JSON.parse(sessionStorage.getItem(EVENT_LOCATION_KEY));

        
        obj.latitude = obj2.lat
        obj.longitude = obj2.lng
        obj.location = obj2.address
        console.log(obj, obj2)

        setFieldsFromPayload(obj)
    }
      
  
     
    };

  
  
    let selectButtons = (id) => {
      if (id != "") {
        document.getElementById(id).style =
          "background-color:#ebeefc; color:#4169e7; border:2px Solid #4169e7;";
      }
    };
  
    initialize();


   

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
    console.log(obj.eventType)
    obj.eventType;
    obj.preference = category;

    if (obj.eventType == "venue") {
      if (obj2 != null) {
        obj.latitude = obj2.lat;
        obj.longitude = obj2.lng;
        obj.location = obj2.address;
      }
    }

    sessionStorage.setItem(CREATE_STATUS, JSON.stringify(obj));
    console.log(obj)
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
  

  $('#button-create').click(function (e) { 
    e.preventDefault();
    sessionStorage.setItem(CREATE_STATE, COMPLETE);
    sessionStorage.setItem(CREATE_STATUS, null);

    saveDataToSessionStorage();
    if (obj.eventName == "" || obj.summary == "" || obj.organiserName == ""
        || obj.location == "" || obj.startDate == "" && obj.eventType == ""){

            swtAlrt('error', 'Do i need to tell you to input the fields?', 'error')
            return;
        } 

    
    let url = `${URL_EVENTS}/update/${eventid}/`;
    console.log(url, "\n", obj.eventType);


    let data = JSON.stringify(obj);
    console.log('thus is it: ', data)
    let result = async () => {
      let ret = await updateEventDetails(data, url).then((res) => {
        console.log("what todo", res);
        if (res == 'success') {
          console.log("should redirect");
          sessionStorage.setItem("sweetAlert", "success");
          redirect();
        }
      });
      console.log("this is the ajax response" + ret);
    };
    result();
    
  });

  let redirect = () => {
    sessionStorage.removeItem(CREATE_TYPE);
    window.location = "../EventListPage/EventList.html";
  };
   
});
  
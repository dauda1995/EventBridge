import { CREATE_STATUS, token, CREATE_STATE,
     INCOMPLETE, COMPLETE, EVENT_LOCATION_KEY, URL_EVENTS } from "../model/keys.js";
import { GOOGLE_PATH } from "../model/paths.js";
import {selectButton} from "../exportFunctions/helperFunctions.js";
import { submitEventDetails } from "../services/EventServices.js";


$(document).ready(function () {
    let venueType;
    let  category;
    let obj2;
    let userId = JSON.parse(sessionStorage.getItem(token));

    let obj = {
    eventName:'',
    organiserName:'',
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:'',
    summary:'',
    cost:'',
    imgUrl:'',
    latitude:0.00,
    longitude:0.00,
    location:'',
    preference:'',
    eventType:''
    }

 
    


    let initialize = ()=>{
        console.log('initialed')
        let locationArr = ["online", "future", "venue"];
        venueType = "";
        selectButton(locationArr, ".list-button");

                
        let categories = ["science", "music", "expo"];
        category= "";
        // selectButton(categories, ".list-button-time");

        $("#user-name").html(userId.username);

        $(".list-button").click(function (e) {
            e.preventDefault();
            console.log(e.target.id)
            obj.eventType = e.target.id;
            venueType = e.target.id;
           
         
            if(e.target.id == "venue"){
                console.log("venue clicked")
                sessionStorage.setItem(CREATE_STATE, INCOMPLETE);
                saveDataToSessionStorage()
                loadGoogleMapApi();

            }
          


        });    
        
        $(".list-button-time").change(function (e) {
            e.preventDefault();
            console.log(e.target.id)
           
            let text = $( ".list-button-time option:selected" ).text();
            console.log(text)
            category = text;

            
           
        });

      
       


    }

   
    
    let selectButtons = (id) =>{
        if(id != ''){
        document.getElementById(id).style = 'background-color:#ebeefc; color:#4169e7; border:2px Solid #4169e7;'
        }

    }


    initialize();
        

    let setDataFromSessionStorage =() =>{
        obj = JSON.parse(sessionStorage.getItem(CREATE_STATUS));
        obj2 = JSON.parse(sessionStorage.getItem(EVENT_LOCATION_KEY));

        if(obj.eventType == 'venue'){
            
            obj.latitude = obj2.lat;
             obj.longitude = obj2.lng;
             obj.location = obj2.address;
        }

        $("#event-title").val(obj.eventName);
        $("#event-organiser").val(obj.organiserName);
        $("#event-date-start").val(obj.startDate);
        $("#event-time-start").val(obj.startTime);
        $("#event-date-end").val(obj.endDate);
        $("#event-time-end").val(obj.endTime);
        $("#event-summary").val(obj.summary);
        $("#event-cost").val(obj.cost);
        $("#event-address").val(obj.location);
        $('#event-img').attr('src',()=>{return obj.imgUrl})
        venueType = obj.eventType;
        console.log(obj.eventType)
        category = obj.preference;

      
        selectButtons(obj.eventType);
        selectButtons(obj.preference);
        


    }

    if (sessionStorage.getItem(CREATE_STATE) == INCOMPLETE) {
        setDataFromSessionStorage();
      }

    let saveDataToSessionStorage =() =>{

        // obj.imgUrl = $('#event-img').val();
        console.log(obj.imgUrl);
        obj.eventName =  $("#event-title").val();
        obj.organiserName =  $("#event-organiser").val();
        obj.startDate = $("#event-date-start").val();
        obj.startTime =  $("#event-time-start").val();
        obj.endDate = $("#event-date-end").val();
        obj.endTime =  $("#event-time-end").val();
        obj.summary = $("#event-summary").val();
        obj.cost =  $("#event-cost").val();
        // obj.imgUrl = $("#event-img").val();
        obj.location =  $("#event-address").val();
        obj.eventType = venueType;
        obj.preference = category;

        if(obj.eventType == 'venue'){
            if(obj2 != null){
                obj.latitude = obj2.lat;
                obj.longitude = obj2.lng;
                obj.location = obj2.address;
            }
           
        }


        sessionStorage.setItem(CREATE_STATUS, JSON.stringify(obj))

        
    }
    $('#event-img').change(()=>{
        imgurlConvert().then(result=>{
            obj.imgUrl = result;
            console.log(result)
            $("#test").attr("src", result);
           
        })
    })

    let imgurlConvert = () => {
        return new Promise((resolve, reject) => {
            let input = document.getElementById('event-img');
            let file = input.files[0];
            let fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload =()=> resolve(fr.result)
            fr.onerror = error => reject(error);
        })
       

    }

    let loadGoogleMapApi = () =>{
        return window.location = GOOGLE_PATH;
    }

    $("#button-create").click(function (e) {
        e.preventDefault();
        sessionStorage.setItem(CREATE_STATE, COMPLETE);
        sessionStorage.setItem(CREATE_STATUS, null);

       
        saveDataToSessionStorage();
        console.log(obj)
        if(obj.eventName == null)
            return;

        let url = `${URL_EVENTS}/createEvent/${userId.id}/events`;
       let result = async() =>{
            let ret = await submitEventDetails(obj, url).then((res)=>{
                console.log('what todo', res)
                if(res == true){
                    console.log('should redirect')
                    sessionStorage.setItem("sweetAlert", "success");
                    redirect()
                }
            })
            console.log('this is the ajax response' + ret);

          
                
                    
       }
       result();

    });

    let redirect = ()=>{
        window.location = "../EventListPage/EventList.html";
    }
});
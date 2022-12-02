
import { BASE_URL, COMPLETE, CREATE_STATE, CREATE_TYPE, CREATE_TYPE_CREATE, EVENTID, setBearer, signup2login, sweetAlrtSuccess, token, URL_SIGNIN } from "../model/keys.js";
import { user } from "../model/user.js";
import { swtAlrt } from "../services/EventServices.js";
import {LoginService, USER_API_BASE_URL} from "../services/LoginService.js";
// import axios from "axios";


$('document').ready(function(){

   
    sessionStorage.clear()
    let alrt = async(eventType, title, icon, callback) =>{
        return await swtAlrt(eventType, title, icon).then(() =>{
          callback
        })
    }

    let userDetails =JSON.parse(sessionStorage.getItem(signup2login))
    if(userDetails != null){
    $('.email').val(userDetails.firstName);
    $('.password').val(userDetails.password);
    }

    // $.post("url", data,
    //     function (data, textStatus, jqXHR) {
            
    //     },
    //     "dataType"
    // );
  
    
    const getUsers = (obj) => {

        $.ajax({
            type: "POST",
            url: URL_SIGNIN,
            data: obj,
            // headers: {
            //     "Content-Type":"application/json"
            // },
            success: function (response) {
                sessionStorage.setItem(token, JSON.stringify(response));
                console.log(sessionStorage.getItem(token));
                alrt('success', 'Login successful', 'success', window.location = "../new_concepts/landingPage.html");
            },
            error: function (response){
                alrt('error', 'user doesn\'t exist', 'error');
            }
        });

        // $.post(URL_SIGNIN, obj,
        //     function (data, textStatus, jqXHR) {
              
        //         console.log(textStatus)
        //        if(textStatus == 'success'){
        //         // console.log(data)
        //         sessionStorage.setItem(token, JSON.stringify(data))
               
        //         console.log(sessionStorage.getItem(token));
               
        //         // sweetAlrtSuccess("welcome!!", "Login Successful" + textStatus, "../Dashboard/dashboard.html");


        //         alrt('success', 'Login successful', 'success', window.location = "../new_concepts/landingPage.html");
               
          
        //        }else{

        //         alrt('error', 'wrong username or password', 'error', window.location = "../new_concepts/landingPage.html");
        //        }
        //     },


        // );

       

        //   $.ajax( URL_SIGNIN, {
        //     type : "POST",
        //     contenttype : "application/json",
        //     // submit this data
        //     data : obj,
        //     dataType : 'json',
        //     success : function ( data, status, xhr) {
        //     $( "#p1" ).text( "The sent data is : " + data + " and the status is " + status + "." ); },
        //     error : function ( jqXhr, textStatus, errorMessage ) {
        //     $( "#p1" ).text( ' The error message is : ' + errorMessage );
        //     }
        //     });
            

      
    }

    $('.submit').click(function(){
      
       
        let username = $('.email').val();
        let password = $('.password').val();

        if((password.length !== 0) && (username.length !==0)){

          

            let obj = {
                password: password,
                firstNameOrEmail: username
            }

           getUsers(obj);

        }else{
            
                alrt('error', 'invalid email or password', 'error');
                return
            
        }
    })

    console.log(window.location.pathname)

})
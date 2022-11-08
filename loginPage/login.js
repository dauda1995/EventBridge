
import { BASE_URL, setBearer, sweetAlrtSuccess, token, URL_SIGNIN } from "../model/keys.js";
import { user } from "../model/user.js";
import { swtAlrt } from "../services/EventServices.js";
import {LoginService, USER_API_BASE_URL} from "../services/LoginService.js";
// import axios from "axios";

$('document').ready(function(){
    // localStorage.clear()
    
    const getUsers = (data) => {

        $.post(URL_SIGNIN, data,
            function (data, textStatus, jqXHR) {
                
                const users = data;

                console.log(data.username)
                sessionStorage.setItem(token, JSON.stringify(data))
               
                console.log(sessionStorage.getItem(token));
               
                // sweetAlrtSuccess("welcome!!", "Login Successful" + textStatus, "../Dashboard/dashboard.html");

                let alrt = async() =>{
                    return await swtAlrt('success', 'Login successful', 'success').then(() =>{
                        window.location = "../Dashboard/dashboard.html";
                    })
                }

                alrt();
               
                // swal({
                //     title: "Login Successful!",
                //     text: "Welcome",
                //     icon:"success",
                //     button:false
                
                //   }).then((result) => {
                    
                   
                //     window.location = "../Dashboard/dashboard.html"
                    
                //   })

                ////////////////


            //     swal({
            //         title: "Login Successful!",
            //         text: "Welcome",
            //         icon:"success",
            //         button:false},
            //         function(){
            //             console.log('dddddd')
            //            window.location = "../Dashboard/dashboard.html"
                       
                    
            //  });
                
               
            },

        );
    }

    $('.submit').click(function(){
      
        console.log("log in to user")
        let username = $('.email').val();
        let password = $('.password').val();

        if((password.length !== 0) && (username.length !==0)){

            let obj = {
                "password": password,
                "firstNameOrEmail": username
            }

           getUsers(obj);

        }
    })

})
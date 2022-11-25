import { URL_SIGNUP , signup2login} from "../model/keys.js";
import {swtAlrt} from "../services/EventServices.js"


$(document).ready(function(){

    
    let alrt = async(eventType, title, icon, callback) =>{
        return await swtAlrt(eventType, title, icon).then(() =>{
          callback
        })
    }
 

    $('.submit').click(function (e){
    e.preventDefault();
    console.log('clicked')

        let email = $('.email').val();
        let userId = $('.username').val();
        let password1 = $('.pass1').val();
        let first = $('.first').val();
        // let last = $('.last').val();
        let password2 = $('.pass2').val(); 
    
        // let  user = new userInfo(email, userId, password1, first, last);
     
        if(!email.match( /^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
         alrt('error', 'invalid email', 'error');
         return
        }

        if(userId.length == 0){
            alrt('error', 'invalid username', 'error');
            return
            }

        if(password1 !== password2){
            alrt('error', 'incorrect password match', 'error');
            return
        }
       
        
        

        if(password1.length == 0){
            alrt('error', 'password cannot be left blank', 'error');
            return
        }

        



        if(password1 == password2 && password1.length !== 0 && email.length !==0
            && userId.length !==0 && password2.length !==0  && email.match( /^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
           
       
                    let obj = {
                        email: email,
                        firstName:userId,
                        name: first,
                        password: password1
                    }

                    // console.log(URL_SIGNUP)

                    $.ajax({
                        type: "POST",
                        url: URL_SIGNUP,
                        data: obj,
                        // dataType: "dataType",
                        success: function (response) {
                            alrt('success', 'Registered successfully', 'success');
                            window.location = "../loginPage/login.html";
                        },
                        error:function (response){
                            alrt('error', 'Username already exists', 'error');
                            // window.location = "../loginPage/login.html";
                        }
                    });

                    $.post(URL_SIGNUP, obj,
                        function (data, textStatus, jqXHR) {
                            sessionStorage.setItem(signup2login, JSON.stringify(obj))
                            alrt('success', 'Registered successfully', 'success',   window.location = "../loginPage/login.html");
                            console.log(data)
                            console.log(textStatus);
                            // window.location = "../loginPage/login.html";         
                           
                           
                        }
                      
                    );

                    // $.post(URL_SIGNUP, obj, function(data, status){
                      
                    //     console.log(status + data);
                    //     // swal({
                    //     //     title: "Welcome!",
                    //     //     text: "Sign Up successful",
                    //     //     icon:"success",
                    //     //     button:false
                    //     //    }, function(){
                          
                    //     //   });
                    //       return false;
                    // });
                  
                    
                
                }
       
    })

})
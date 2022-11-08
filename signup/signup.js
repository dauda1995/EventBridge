import { URL_SIGNUP } from "../model/keys.js";

$(document).ready(function(){
 

    $('.submit').click(function (e){
    e.preventDefault();

        let email = $('.email').val();
        let userId = $('.username').val();
        let password1 = $('.pass1').val();
        let first = $('.first').val();
        // let last = $('.last').val();
        let password2 = $('.pass2').val(); 
    
        // let  user = new userInfo(email, userId, password1, first, last);
     
    

        if(password1 == password2 && password1.length !== 0 && email.length !==0
            && userId.length !==0 && password2.length !==0  && email.match( /^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
           
       
                    let obj = {
                        "email": email,
                        "firstName":userId,
                        "name": first,
                        "password": password1
                    }

                    // console.log(URL_SIGNUP)


                    $.post(URL_SIGNUP, obj,
                        function (data, textStatus, jqXHR) {
                            console.log(data)
                            console.log(textStatus);
                            sweetAlrtSuccess("welcome!!", "Login Successful" + textStatus, "../signup/signUp.html");
                        },
                      
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
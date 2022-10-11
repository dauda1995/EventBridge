$(document).ready(function(){
 

    let arr=[];
  

    function userInfo (email, username, password, first, second){
        this.email = email;
        this.username = username;
        this.password = password;
        this.first = first;
        this.second = second;
        
    }

    function find_Email(str){
        let status = false;
        for(let i=0; i<arr.length;i++){
            
            if (arr[i] == str){
                status = true;
                break;
            } else {
                status = false;
            }
        }
        return status;
    }

    $('.submit').click(function (e){
    e.preventDefault();

        let email = $('.email').val();
        let userId = $('.username').val();
        let password1 = $('.pass1').val();
        let first = $('.first').val();
        let last = $('.last').val();
        let password2 = $('.pass2').val(); 
    
        let  user = new userInfo(email, userId, password1, first, last);
     
    

        if(password1 == password2 && password1.length !== 0 && email.length !==0
            && userId.length !==0 && first.length !==0 && last.length !==0
            && password2.length !==0){
            // alert(password1)
            $.get('http://localhost:3000/users', function(data, status){
    
                // alert(status)
                $.each(data, function(i, single){
                    // alert(single.email)
                    arr.push(single.email)                    
                });
            //     // arr=[]
  
                if(email.length !== 0 && find_Email(user.email) == true ){
                    // alert('already registered');
                    arr=[]
                }else {
                    // alert ('welcome ');
                    arr=[];

                    // localStorage.setItem('user', user.email);
            
                    let obj = {
                        "email": email,
                        "username":userId,
                        "firstname": first,
                        "lastname": last,
                        "password": password1
                    }

                    $.post("http://localhost:3000/users", obj, function(data, status){
                      
                        swal({
                            title: "login success!",
                            text: "incorrect username or password",
                            icon:"success",
                            button:false
                           }, function(){
                            window.location ="../loginPage/login.html";
                          });
                          return false;
                    });
                  
                    
                
                }
       
            })
       }
            
      
    })
    



})
$('document').ready(function(){
    localStorage.clear()
    let arr = []
    function usersInfo(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
    
    function find_email(str, psword) {
        let status = false;
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i].email == str) && (arr[i].password == psword)) {
                // alert('this user exists')
                status = true;
                break;

            } else {
                // alert('still checking')
                status = false;
            }
        }
        return status;
    }

    function ret_email(str, psword) {
      
        for (let i = 0; i < arr.length; i++) {
            if ((arr[i].email == str) && (arr[i].password == psword)) {
                // alert('this user exists')
                return arr[i];

            } 
        }
       
    }


    $('.submit').click(function(){
      
        let username = $('.email').val();
        let password = $('.password').val();

        if((password.length !== 0) && (username.match( /^[^\s@]+@[^\s@]+\.[^\s@]+$/))){

            $.get('http://localhost:3000/users', function(data, status){
                $.each(data, function(i, single){
                    arr.push({
                        id:single.id,
                        email:single.email,
                        username: single.username,
                        password: single.password
                    })
                })

                if(find_email(username, password) == true){
                    let obj = ret_email(username, password);
                    localStorage.setItem('userid', obj.id );
                   
                 
                    swal({
                        title: "login success!",
                        icon:"success",
                        button:false
                       });
                    

                    arr = []
                    window.location ="../Dashboard/dashboard.html";
                }else{

                    swal({
                        title: "login failed!",
                        text: "user is not registered",
                        icon:"error"
                       });
                    arr = []
                }

            })
           

        }else{

           swal({
            title: "login failed!",
            text: "incorrect username or password",
            icon:"error",
            button:false
           });
        }
    })

})
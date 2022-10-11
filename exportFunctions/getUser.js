export default function getUserDetail(userhtml){
    let obj = {}

   
    let userid = localStorage.getItem('userid');

    $.ajax({
        method: "GET",
        url: `http://localhost:3000/users/${userid}`,
        
      })
        .done(function(data, msg ) {
          obj = data;
          // console.log(obj.firstname, " ", obj.lastname)
          $(userhtml).html(obj.firstname + " " + obj.lastname)
          document.querySelector(userhtml).style='background-color:green; color:#fff; padding:12px; border-radius: 20px;'
      
          return data.firstname;
        });

 
}



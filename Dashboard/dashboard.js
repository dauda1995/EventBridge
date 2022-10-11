$(document).ready(function () {
  let obj = {}

   
    let userid = localStorage.getItem('userid');
    console.log(userid)

    $.ajax({
        method: "GET",
        url: `http://localhost:3000/users/${userid}`,
        
      })
        .done(function(data, msg ) {
          obj = data;
          console.log(obj.id + ' ' + obj.firstname)
          $('#user-nav').html(obj.firstname + " " + obj.lastname)
        });

  


    let slideIndex = 0;
    showSlides();
    
    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("slideimg");
    //   let dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    
    //   for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    //   }
      slides[slideIndex-1].style.display = "block";  
      
      setTimeout(showSlides, 10000); // Change image every 2 seconds
    }


    $('#create-event').click(function (e) { 
      e.preventDefault();

    

      window.location ="../create_event/createEvent.html";
    });

    $('#check-events').click(function (e) { 
      e.preventDefault();
      window.location ="../EventListPage/EventList.html";

      
    });

});
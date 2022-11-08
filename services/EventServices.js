export async function submitEventDetails(eventDetails, url){
    let stat;
    let obj = await $.post(`${url}`, eventDetails,
    function (data, textStatus, jqXHR) {
        if(textStatus == 'success'){
            // swal({
            //     type: "success",
            //     title: `event created`,
            //     showConfirmButton: false,
            //     timer: 2000,
            //   });

              console.log('in here swals')
            stat = true
        }else{
            swal({
                      type: "error",
                      title: `error`,
                      showConfirmButton: false,
                      timer: 2000,
                    });
            stat = false;
        }
    },
   

    );

return stat;

};

export async function swtAlrt(type, title, icon){

   return await swal({
        type: type,
        title: `${title}`,
        icon: icon,
        button: false,
        timer: 2000,
      });
}
    
    

export async function getEventsFromDatabase(geturl){
    console.log(geturl)
    let obj = $.ajax({
        type: "GET",
        url: geturl,
       
        success: function (response) {
            
        }
    });

    return obj;
}
    
    
    
//     $.ajax({
//         type: "POST",
//         url: `${url}`,
//         data: eventDetails,
//         success: function (response, status) {
//             console.log(response);
//             swal({
//                     type: "success",
//                     title: `event created`,
//                     showConfirmButton: false,
//                     timer: 5000,
//                   });
//         } 
        
//     });

//     return obj;
// }



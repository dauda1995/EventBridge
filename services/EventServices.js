
export async function submitEventDetails(eventDetails, url,){
    let stat;


    let obj = await $.ajax({
        type: "POST",
        url: url,
        data: eventDetails,
        // dataType: "dataType",
        headers: {
            // 'Authorization': 'Bearer ' + token,
            "Content-Type":"application/json"
        },
        success: function (response) {
            
            console.log('in here swals')
            stat = true

        },
        error: function (response){

            swal({
                type: "error",
                title: `error`,
                showConfirmButton: false,
                timer: 2000,
              });
            stat = false;
        }
    });
    // let obj = await $.post(`${url}`, eventDetails,
    // function (data, textStatus, jqXHR) {
    //     if(textStatus == 'success'){
    //         // swal({
    //         //     type: "success",
    //         //     title: `event created`,
    //         //     showConfirmButton: false,
    //         //     timer: 2000,
    //         //   });

    //           console.log('in here swals')
    //         stat = true
    //     }else{
    //         swal({
    //                   type: "error",
    //                   title: `error`,
    //                   showConfirmButton: false,
    //                   timer: 2000,
    //                 });
    //         stat = false;
    //     }
    // },
   

    // );

return stat;

};

export async function updateEventDetails(eventDetails, url, token){
    let stat;
    let obj = await $.ajax({
        type: "PUT",
        url: url,
        data: eventDetails,
        // dataType: "dataType",
        headers: {
            // 'Authorization': 'Bearer ' + token,
            "Content-Type":"application/json"
        },
        success: function (response) {
            swtAlrt("success", "updated successfully", "success");
            stat = 'success';
        },
        error: function(response){
            swtAlrt("error", "failed update", "error");
            stat = response;
        }

    });

    return stat
}

export async function deleteEventDetails(id, url, token){
    let stat;
    let obj = await $.ajax({
        type: "DELETE",
        url: url,
        // data: eventDetails,
        // dataType: "dataType",
        headers: {
            // 'Authorization': 'Bearer ' + token,
            "Content-Type":"application/json"
        },
        success: function (response) {
            // swtAlrt("success", "updated successfully", "success");
            stat = 'success';
        },
        error: function(response){
            // swtAlrt("error", "failed update", "error");
            stat = 'error';
        }

    });

    return stat
}

export async function swtAlrt(type, title, icon){

   return await swal({
        type: type,
        title: `${title}`,
        icon: icon,
        button: false,
        timer: 2000,
      });
}

export async function swtAlrtDelete(url){
// Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {

        let result = async () => {
            let ret = await deleteEventDetails(url).then((res) => {
              if (res == 'success') {
                console.log("should DELETE event");

                swtAlrt("success", "updated successfully", "success");

                // Swal.fire(
                //     'Deleted!',
                //     'Your event has been deleted.',
                //     'success'
                //   )
               
              }
            });
            console.log("this is the ajax response" + ret);
        };
        result();


     
    }
//   })
// }
    
    

export async function getEventsFromDatabase(geturl, token){
    console.log(geturl)
    let obj = await $.ajax({
        type: "GET",
        url: geturl,
        headers: {
            
            // 'Authorization': 'Bearer ' + token,
        },
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




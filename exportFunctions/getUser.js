export default async function getUserDetail() {

  let obj;
  let userid = localStorage.getItem("userid");

  obj = await $.ajax({
    method: "GET",
    url: `http://localhost:3000/users/1`,
  })

  console.log(obj)
  return obj;

}


// export default async function submitEventDetails(eventDetails){
//   let obj;
//   obj = await $.ajax({
//     type: "POST",
//     url: ,
//     data: "data",
//     dataType: "dataType",
//     success: function (response) {
      
//     }
//   });
// }

// `${URL_EVENTS}/createEvent/${userId.id}/events`

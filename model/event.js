
   export const event ={
    // eventID: obj.eventID,
    organiserID: "",
    eventName: "",
    organiserName:"",
    startDate: "",
    startTime: "",
    endDate: "",
    endtime: "",
    type: "",
    cost: "", 
    summary: "",
    imgUrl:"", 
   
    address:{
        lat: "",
        lng:"",
        location: ""
    },
    categories:{
        preference:""
    }
    }



export const getDate =(eventDate, str)=> {
    console.log(new Date())
       const [day, month, year]=(new Date(eventDate)).toString().split(' ');
     
        if(str =='month')
            return month;
        else if(str == 'day'){
            return day;
        }else{
            return day + ' ' + month;
        }
}

export const getTime =(eventTime, str)=> {

    const [day, month, hour, minute]=(new Date(eventTime)).toString().split(' ');
    console.log('sds',day)
    if(str =='hour')
    return hour;
    else if(str == 'minute'){
        return minute;
    }else{
        return hour + ":" + minute;
    }
}

   
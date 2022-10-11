
   export const event =(obj)=>{ 

    let e ={
    eventID: obj.id,
    organiserID: obj.organiserID,
    eventName: obj.eventName,
    organiserName:obj.organiserID,
    location: obj.location,
    startDate: obj.startDate,
    startTime: obj.startTime,
    endDate: obj.endDate,
    endtime: obj.endtime,
    type: obj.type,
    cost: obj.cost, 
    summary: obj.summary,
    imgUrl:obj.imgUrl
    }

    return e
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

   
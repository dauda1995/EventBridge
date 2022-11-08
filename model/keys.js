export const EVENTID = "eventid";
export const SWEETALERT = "sweetAlert";
export const USERID = "userid";
export const CREATE_STATUS = "status";
export const CREATE_STATE = "complete";
export const EVENT_LOCATION_KEY = "location_key";
export const COMPLETE = "complete";
export const INCOMPLETE = "incomplete";

export const token = "token";

export const BASE_URL = "http://localhost:8082/"; 
export const URL_SIGNUP= `${BASE_URL}api/v1/auth/signup`;
export const URL_SIGNIN = `${BASE_URL}api/v1/auth/signin`;
export const URL_EVENTS = `${BASE_URL}api/events`;
export const URL_TICKETS = `${BASE_URL}api/tickets`;

export const setBearer = (bearer) =>{
    sessionStorage.clear()
    sessionStorage.setItem(token, bearer);

}

export const sweetAlrtSuccess =(title, message, url)=>{

   

}
import { token } from "./model/keys";


$(document).ready(function(){
    if(sessionStorage.getItem(token)==null){
        window.location = './loginPage/login.html';
    }
})
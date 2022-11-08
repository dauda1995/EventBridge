export class LoginService{

   
    constructor(){
      
      
    }


    getUsers(src, callback){

        
        let arr =
            axios.get('http://localhost:3000/users')
            .then((response) =>{

                console.log("ready" + response.data)
             arr.onload = () => callback(response.data)
                 

            })
          
          
    };



    setUsers = () =>{
        getUsers().then((response) =>{console.log(response)})
    }    


   
}

export const USER_API_BASE_URL = "http://localhost:3000/users";


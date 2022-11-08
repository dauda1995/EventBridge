
export function selectButton(buttonIdArr, buttonClick){
     
    $(buttonClick).click(function (e) { 
        e.preventDefault();
        let venue;
        // console.log(e.target.id)

        for(let i= 0; i<buttonIdArr.length; i++){
            if(e.target.id == buttonIdArr[i]){
                e.target.style='background-color:#ebeefc; color:#4169e7; border:2px Solid #4169e7;'
            }else{

            document.getElementById(buttonIdArr[i]).style = '';
            }
        }
        
    });


}

export function getValue(selector){
    $(selector).val();
}
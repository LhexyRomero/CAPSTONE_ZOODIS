$(function(){

});


function notiCard(){
    $.get("/notiCard",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
        }
    });
}
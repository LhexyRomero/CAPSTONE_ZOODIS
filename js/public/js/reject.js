$(function(){

});

function rejectTable(){
    $.get("/rejectTable",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let data = response.data;
        data.forEach((element,index) => {
            
            
        });
    }); 
}
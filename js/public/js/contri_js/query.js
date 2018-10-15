$(function(){
    addedData();
});

function addedData(){
    $.get('/addedData',(response)=>{
        if(response.success == false){
            $.notify("Error getting query!",{type:"danger"});
            return;
        }

        let html = '<div class="progress-bar bg-success" role="progressbar" aria-valuenow="'+response.data.approve+'"aria-valuemin="0" aria-valuemax="200" style="width:'+ response.data.approve+'%;"><span class="progress-value">'+ response.data.approve+'</span></div>';
        $("#totalApproved").html(html);

        
        let html1 = '<div class="progress-bar bg-danger" role="progressbar" aria-valuenow="'+response.data.reject+'"aria-valuemin="0" aria-valuemax="200" style="width:'+ response.data.reject+'%;"><span class="progress-value">'+ response.data.reject+'</span></div>';
        $("#totalReject").html(html1);
        
    });
}
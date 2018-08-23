$(function(){
    notiCard();
});

function notiCard(){
    $.get("/notiCard",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let colPerRow = 3;
        let colCount = 1;

        let html = "<div class='row'>";
        $("#placeholder").html("");
        data.forEach((element,index) => {
            let temphtml = "<div class='col-md-"+parseInt(12/colPerRow)+" div"+index+" card'>";
            temphtml += "<div class='card-body'><label>Category</label>"  + "<p><em>"+ element.category +"</em><p>" 
            + "<label>Added Data</label>"  +    "<p>"+ element.addedData +"</p>" 
            + "<label>Date</label>"  +    "<p>"+ element.dateTime +"<p>" 
            + "<label>status</label>"  +    "<p>"+ element.status +"<p>" 
            + "<label>message</label>"  +    "<p>"+ element.message +"<p>" 
            + "<button type='button' class='btn btn-primary pull-right' onclick='updateNotiCard("+element.notificationID+")'>Okay</button></div>"; 
        
            temphtml += "</div>";
            html += temphtml;

            if(colCount == colPerRow){
                colCount = 1;
                html += "</div><div class='row'>";
            }
            else {
                colCount++;
            }

            if(index == data.length-1){
                html += "</div>";
                $('#placeholder').html(html);
            }
        });

        console.log("DITO AKO");
        console.log(response.data);

    });
}

let noti = 0;
function updateNotiCard(id) {
    noti = id;
    let url = "/updateNotiCard/"+noti;

    console.log(noti);
    $.post(url,(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }
        notiCard();
    });
}
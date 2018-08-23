$(function(){
    notiCard();
});

function notiCard(){
    $.get("/notiCard",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        console.log("DITO AKO");
        console.log(response.data);

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<ul>";
            row += "<li>" + element.dateTime + "</li>";
            row += "<td>" + element.species + "</td>";
            row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewAnimalTaxon(" + element.animalTaxoID + ")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            if (element.status === "approved") {
                row += "<td><font color = #18ce0f><em>" + element.status + "</em></font></td>";
            }
            else if (element.status === "rejected"){
                row += "<td><font color = red><em>" + element.status + "</em></font></td>";
            }
            else {
                row += "<td><font color = #f96332><em>" + element.status + "</em></font></td>";
            }
            row += "</tr>";
            html += row;
        });
    });
}
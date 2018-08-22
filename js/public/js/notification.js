$(function (){
    notificationList();
});

function notificationList() {
    $.get("/notificationList", (response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type: "danger"});
            return;
        }

        let data = response.data;

        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.dateTime + "</td>";
            row += "<td>" + element.staffName + "</td>";
            row += "<td>" + element.addedData + "</td>";
            row += "<td>" + element.category + "</td>";
            if(element.category === "Bacteria"){
                row += "<td><a data-toggle='modal' href='#modalBacteria'><button onclick ='viewBacteria("+element.animalID+")' type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#viewModal2'><button onclick = 'viewAnimal("+element.animalID+")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            }
            else if(element.category === "Animal"){
                row += "<td><a data-toggle='modal' href='#exampleModalCenter2'><button onclick ='editAnimal("+element.animalID+")' type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;</td>";
            }
            else {
                row += "<td><a data-toggle='modal' href='#exampleModalCenter2'><button onclick ='editAnimal("+element.animalID+")' type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;</td>";
            }
            
            row += "</tr>";
            html += row;
        });
        $('#notificationList').html(html);
        $('#notificationTable').dataTable();

    });
}
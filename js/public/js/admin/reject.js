$(function(){
    rejectTable();
    rejectList();
});

function rejectTable(){
    $.get("/rejectTableList",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }
        
        console.log("dito ako");
        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + Date.parse(element.dateTime).toString('MMM dd, yyyy - hh:mm tt') + "</td>";
            row += "<td>" + element.staffName + "</td>";
            row += "<td><em>" + element.category + "</em></td>";
            row += "<td>" + element.addedData + "</td>";
            row += "</tr>";
            html += row;
        });
        $('#rejectList').html(html);
        $('#rejectTable').dataTable();
    }); 
}

function rejectList() {
    $.get("/rejectList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + Date.parse(element.dateTime).toString('MMM dd, yyyy - hh:mm tt') + "</td>";
            row += "<td>" + element.staffName + "</td>";
            row += "<td>" + element.category + "</td>";
            row += "<td>" + element.addedData + "</td>";
            

            row += "</tr>";
            html += row;
        });
        $('#rejectList').html(html);
        $('#rejectTable').dataTable();
    });
}
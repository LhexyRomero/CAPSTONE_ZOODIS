$(function(){
    toxinModule();
});

function toxinModule(){
    $.get('/toxinModule',(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.bacteriumScientificName + "</td>";
            row += "<td><a style='cursor: pointer; ' onclick ='viewToxin("+element.toxinID+")'>" + element.name + "</a></td>";
            row += "<td>" + element.structureFeature.substring(0,200)+"...." + "</td>";
            row += "</tr>";
            html += row;
        });
        $('#toxModuleList').html(html);
        $('#toxModuleTable').dataTable();
    });
}

function viewToxin(id) {
    window.location="view_toxin?toxinID="+id;
}
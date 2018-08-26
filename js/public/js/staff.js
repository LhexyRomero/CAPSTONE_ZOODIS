$(function(){
    staffList();
});

function staffList() {
    $.get("/staffList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: danger });
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.firstName +" "+ element.lastName+ "</td>";
            row += "<td>" + element.userName + "</td>";
            row += "<td>" + element.email + "</td>";
            row += "<td>" + element.contact + "</td>";
            row += "<td onclick='(" + element.animalTaxoID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
            row += "</tr>";
            html += row;
        });
        $('#staffList').html(html);
        $('#staffTable').dataTable();

    });
}

function generate(){
    let code = Math.random().toString(36).replace('0.','');
    $('input[name=generate]').val(code);
}

function code(e) {
    e.preventDefault();

    let data = $("#codeForm").serializeArray();
    let dataInsert = {};

    data.forEach((element,index) => {
        console.log(element.name + ":" + element.value);

        
        dataInsert[element.name] = element.value;
        
        
    });

    $.post("/code",dataInsert,(response)=>{ 
        if(response.success == false){
            $.notify("Error generating code!",{type:"danger"});
            return;
        }

        $("#generate").modal("hide");
    });
}

function createCode(e) {
    e.preventDefault();

    let data = $("#createCode").serializeArray();
    let dataInsert = {};
    let errCount = 0;

    data.forEach((element,index) => {
        if(element.value == ""){
            $("input[name=createCode]").css("background-color","#feebeb");  
        }
    });
}
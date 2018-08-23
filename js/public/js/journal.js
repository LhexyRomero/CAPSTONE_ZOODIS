let isClick = 0;
$(function () {
    journalList();
});

function addJournal(eAdd) {
    eAdd.preventDefault();

    if(isClick !=0){
        return;
    }
    isClick++

    let data = $("#journalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};


    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        isClick = 0;
        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }

        else if (element.value.match(/[*\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
        }

        else {
            dataInsert[element.name] = element.value;
        }
    });

    if(errCount>0) {
        $.notify("All fields must be filled!",{type: "danger"});
        return;
    }

    else if(invCount>0){
        $.notify("Invalid Character!",{type:"danger"});
        return;
    }

    swal({
        title: 'Add Journal',
        text: "Are you sure?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes'
    }).then((isConfirmed) => {
        if (!isConfirmed) {
            return;
        }

        $.post("/addJournal", dataInsert, (response) => {
            if (!response.success) {
                swal({
                    title: "Error!",
                    text: response.detail,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Okay"
                });
                return;
            }

            swal({
                title: "Done!",
                text: "Data Recorded",
                type: "success",
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Okay"
            });
            clearJournal();
        });
    })

    
}

function clearJournal(){
$("input[name=strJournalCode]").val("");
$("input[name=strJournalName]").val("");
$("input[name=strDoi]").val("");

}

function journalList(){
    $.get("/journalList",(response)=>{
        if (response.success==false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }
        
        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.name + "</td>";
            row += "<td onclick='editAnimalTaxon(" + element.journalID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            row += "</tr>";
            html += row;
        });
        $('#journalTableList').html(html);
        $('#journalTable').dataTable();
    });
}
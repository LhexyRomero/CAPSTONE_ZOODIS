let isClick = 0;
$(function () {
    journalList();
    toSelectStaffName();
    toSelectJournal();
});

function addJournal(eAdd) {
    eAdd.preventDefault();

    if (isClick != 0) {
        return;
    }
    isClick++

    let data = $("#journalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = new FormData($("#journalForm")[0]);;


    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        isClick = 0;
        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
        }

        else {
            // dataInsert[element.name] = element.value;
        }
    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
        return;
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
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

        $.ajax({
            type: "POST",
            url: "/addJournal",
            data: dataInsert,
            processData: false,
            contentType: false,
            success: function (response) {
                isClicked = 0;
                if (response.success == false) {
                    swal({
                        title: "Error!",
                        text: response.detail,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Okay"
                    });
                }
                else {
                    swal({
                        title: "Done!",
                        text: "Data Recorded",
                        type: "success",
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                    clearJournal();
                }
            }
        });
    });
}

function clearJournal() {
    $("input[name=strJournalCode]").val("");
    $("input[name=strJournalName]").val("");
    $("input[name=strDoi]").val("");
    $("input[name=inputfile").val("");
}

function journalList() {
    $.get("/journalList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.name + "</td>";
            row += "<td><a data-toggle='modal' href='#exampleModalCenter'><button onclick = editJournal(" + element.journalID + ") type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#viewModal'><button onclick = 'viewJournal(" + element.journalID + ")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            if(element.status == "Incomplete"){
                row += "<td><font color='red'><em>" + element.status + "</em></font></td>";
            }
            else{
                row += "<td><font color='#18ce0f'><em>" + element.status + "</em></font></td>";
            }
            row += "</tr>";
            html += row;
        });
        $('#journalTableList').html(html);
        $('#journalTable').dataTable();
    });
}

let globalIDa = 0;
function editJournal(journalID) {
    globalIDa = journalID;
    console.log(globalIDa + "ID TO UPDATE");
    let url = "/editJournal/" + journalID;

    $.get(url, function (response) {

        if (response == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            $('input[name=modalJournalCode]').val(response.data.code);
            $('input[name=modalJournalName]').val(response.data.name);
            $('input[name=modalDoi]').val(response.data.doi);
            /*  $('input[name=modalStaffName]').val(response.data.doi);*/


        }

    });
    let html;
    $('#exampleModalCenter').html(html);
}

function updateJournal() {
    console.log(globalIDa + "SA UPDATE");
    let url = "/updateJournal/" + globalIDa;
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};
    console.log(url);

    let data = $("#editJournal").serializeArray();

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);
        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClicked = 0;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }

    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        isClicked = 0;
        console.log("Yieeee LOLL");
        swal({
            title: 'Update Journal',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        journalList();
                    }
                });
            }
        })
    }
}

let viewJournalID = 0;
function viewJournal(journalID) {

    viewJournalID = journalID;
    let url = "/viewJournal/" + viewJournalID;
    console.log(url);

    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        console.log("here");
        let data = response.data;
        let html = "";
        // let selectedBacteria = "<option value ="+element.bacteriumID+">"+element.bacteriumName+"<option>";
        let code = data.code;
        let name = data.name;
        let doi = data.doi;

        $("#modalViewCode").html(code);
        $("#modalViewName").html(name);
        $("#modalViewDoi").html(doi);
        /*$("#modalViewStaffName").html(staffName);*/



    });
};

function toSelectStaffName() {
    $.get("/toSelectStaffName", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.staffID + ">" + element.firstName + " " + element.lastName + "</option>";
        });
        $('#toSelectStaffName').html(html);
    });
};

function toSelectJournal() {
    $.get("/toSelectJournal1", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        console.log(data);
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.journalID + ">" + element.name + "</option>";
        });
        $('#toSelectJournal').html(html);
    });
};

function assignedJournal(e) {
    e.preventDefault();

    let data = $("#assignedJournalForm").serializeArray();
    let errCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {

        if (element.value == "") {
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }
    });

    if (errCount > 0) {
        $.notify("All fields must be filled", { type: "danger" });
    }

    else {
        swal({
            title: 'Assigned Journal',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (!isConfirmed) {
                return;
            }

            $.post("/assignedJournal",dataInsert,(response)=>{
                isClicked = 0;
                if (response.success == false) {
                    swal({
                        title: "Error!",
                        text: "Journal already assigned!",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Okay"
                    });
                }
                else {
                    swal({
                        title: "Done!",
                        text: response.detail,
                        type: "success",
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                    $("#journal").modal("hide");
                }
            });
        });
    }
}
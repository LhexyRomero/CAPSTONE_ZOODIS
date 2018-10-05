let isClick = 0;
$(function () {
    journalList();
    journalAssignee();
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
        title: 'Are you sure?',
        text: "Add Journal",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
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
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                }
                else {
                    swal({
                        title: "Done!",
                        text: "Successfully Added!",
                        type: "success",
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                    clearJournal();
                    journalList();
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
        console.log(data);
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.name + "</td>";
            if(element.status == "Incomplete"){
                row += "<td class='text-center'><span class='badge badge-danger'>"+ element.status +"</span></td>";
            }
            else{
                row += "<td class='text-center'><span class='badge badge-success'>"+ element.status +"</span></td>";
            }
            row += "<td class='text-right'><a data-toggle='modal' href='#exampleModalCenter'><button onclick = editJournal(" + element.journalID + ") type='button' rel='tooltip' title='' class='btn btn-round btn-info btn-icon btn-icon-mini btn-sm' data-original-title='edit'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#viewModal'><button onclick = 'viewJournal(" + element.journalID + ")' type='button' rel='tooltip' class='btn btn-round btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
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

        else if (element.value.match(/[*]/g) != null) {
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
            title: 'Are you sure?',
            text: "Update Journal",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Updated!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        journalList();
                        $('#exampleModalCenter').modal("hide");
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
        let code = data.code;
        let name = data.name;
        let doi = data.doi;

        $("#modalViewCode").html(code);
        $("#modalViewName").html(name);
        $("#modalViewDoi").html(doi);

    });
}

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
}


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
}

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
            title: 'Are you sure?',
            text: "Assign Journal",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
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
                    $("#journalModal").modal("hide");
                }
            });
        });
    }
}

function journalAssignee() {
    $.get("/journalAssignee",(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!");
            return;
        }

        let data = response.data;
        let html = "";

        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.firstName + " " + element.middleInitial +" " +element.lastName + "</td>";
            row += "<td>" + element.name + "</td>";
            row += "</tr>";
            html += row;
        });
        $('#assigneeList').html(html);
    });
}


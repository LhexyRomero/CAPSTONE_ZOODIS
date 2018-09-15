$(function () {
    notiCard();
    notificationJournal();
});

function notiCard() {
    $.get("/notiCard", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let colPerRow = 1;
        let colCount = 1;

        let html = "<div class='row'>";
        $("#placeholder").html("");
        data.forEach((element, index) => {

            if(element.status == 'approved'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.notificationID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-success'>" + element.status + "</span><br>"
                    + "<label>" + element.dateTime + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

            else if(element.status == 'rejected'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.notificationID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-danger'>" + element.status + "</span><br>"
                    + "<label>" + element.dateTime + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

            if (colCount == colPerRow) {
                colCount = 1;
                html += "</div><div class='row'>";
            }
            else {
                colCount++;
            }

            if (index == data.length - 1) {
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
    let url = "/updateNotiCard/" + noti;

    console.log(noti);
    $.post(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        notiCard();
    });
}

function notificationJournal() {

    return $.get('/notifyJournal', (response) => {
        console.log("here");
        if (response.success == false) {
            return;
        }
        let data = response.data;
        console.log(data);

        if (data.state == "noticed" && data.status == "Incomplete") {
            let code = "<h6>" + data.code + "</h6>";
            let name = "<h6>" + data.name + "</h6>";
            $("#journalCode").html(code);
            $("#journalName").html(name);
            $('#downloadJournal').attr('href', '/downloadJournal/' + data.file.split('\\')[2]);

        }
        else if (data.state == "notify" && data.status == "Incomplete") {
            swal({
                title: 'Journal',
                text: response.detail,
                type: 'success',
                confirmButtonColor: '#9c27b0',
                confirmButtonText: 'Set Journal'
            }).then((isConfirmed) => {
                if (isConfirmed) {
                    $.post("/setJournal", (response) => {
                        if (response.success == false) {
                            swal({
                                title: "Error!",
                                text: "Error Accepting Journal!",
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
                        }
                    });
                }
            });
            let code = "<h6>" + data.code + "</h6>";
            let name = "<h6>" + data.name + "</h6>";
            $("#journalCode").html(code);
            $("#journalName").html(name);
            $('#downloadJournal').attr('href', '/downloadJournal/' + data.file.split('\\')[2]);
        }

        else if (data.state == "none" && data.status == "none") {
            let code = "<h6> No Journal Assigned by the Admin</h6>";
            $("#journalCode").html(code);
            $("#download").hide();
            $("#finish").hide();
        }

        else {
            let code = "<h6> No Journal Assigned by the Admin</h6>";
            $("#journalCode").html(code);
            $("#download").hide();
            $("#finish").hide();
        }
    });
}

function finishedJournal() {
    $.post("/finishedJournal", (response) => {
        if (response.success == false) {
            return;
        }

        $.notify(response.detail, { type: "success" });

        let code = "<h6>Job well Done</h6>";
        let name = "<h6>Journal Completed!</h6>";
        $("#journalCode").html(code);
        $("#journalName").html(name);
        $("#download").hide();
    });
}


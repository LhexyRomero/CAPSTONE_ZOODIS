$(function () {
    notiCard();
    selectDisease();
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
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.requestID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-success'>" + element.status + "</span><br>"
                    + "<label>" + Date.parse(element.dateTime).toString('MMM dd, yyyy hh:mm tt') + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

            else if(element.status == 'rejected'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.requestID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-danger'>" + element.status + "</span><br>"
                    + "<label>" + Date.parse(element.dateTime).toString('MMM dd, yyyy hh:mm tt') + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

            else if(element.category == 'Disease' && element.status == 'revised'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.requestID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-warning'>" + element.status + "</span><br>"
                    + "<label>" + Date.parse(element.dateTime).toString('MMM dd, yyyy hh:mm tt') + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                    + "<button class='pull-right btn btn-primary' onclick=modalDisease("+ element.addedID+")>view</button><br>"
                temphtml += "</div>";
                html += temphtml;
            }

            else if(element.category == 'Prevention' && element.status == 'revised'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.requestID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-warning'>" + element.status + "</span><br>"
                    + "<label>" + Date.parse(element.dateTime).toString('MMM dd, yyyy hh:mm tt') + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                    + "<button class='pull-right btn btn-primary' onclick=modalPrevention("+ element.addedID+")>view</button><br>"
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
    });
}

let noti = 0;
function updateNotiCard(id) {
    noti = id;
    let url = "/updateNotiCard/" + noti;

    $.post(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        window.location.href = '/contri_Notification';
        notiCard();
    });
}

function notificationJournal() {
    $.get('/notifyJournal', (response) => {
        if (response.success == false) {
            return;
        }
        let data = response.data;
         
        if (data.state == "noticed" && data.status == "Incomplete" && data.name !== "none") {
            let code = "<h6>" + data.code + "</h6>";
            let name = "<h6>" + data.name + "</h6>";
            $("#journalCode").html(code);
            $("#journalName").html(name);
            $('#downloadJournal').attr('href', '/downloadJournal/' + data.file.split('\\')[3]);

        }
        else if (data.state == "notify" && data.status == "Incomplete" && data.name !== "none") {
            swal({
                title: 'Journal',
                text: response.detail,
                type: 'success',
                confirmButtonColor: '#9c27b0',
                confirmButtonText: 'Set Journal',
                allowOutsideClick: false
            }).then((isConfirmed) => {
                if (isConfirmed) {
                    $.post("/setJournal", (response) => {
                        if (response.success == false) {
                            $.notify("Error processing Journal!",{type:"success"});
                        }

                        else {
                            $.notify(response.detail,{type:"success"});
                        }
                    });
                }
            });
            let code = "<h6>" + data.code + "</h6>";
            let name = "<h6>" + data.name + "</h6>";
            $("#journalCode").html(code);
            $("#journalName").html(name);
            $('#downloadJournal').attr('href', '/downloadJournal/' + data.file.split('\\')[3]);
        }

        else if (data.code == "none" && data.name == "none" && data.name == "none") {
            let code = "<h6> No Journal Assigned by the Admin</h6>";
            $("#journalCode").html(code);
            $("#downloadJournal").hide();
            $("#finish").hide();
        }
        else if (data.state == "revised" && data.status == "Incomplete" && data.name !== "none") {
            let code = "<h6>" + data.code + "</h6>";
            let name = "<h6>" + data.name + "</h6>";
            let badge = "<span class='badge badge-danger'>Incomplete</span>";
            let message = "<label class='text-danger'>Incomplete data:&nbsp;"+data.message+"</label>"
            $(".revised").html(badge);
            $(".re-message").html(message);
            $("#journalCode").html(code);
            $("#journalName").html(name);
            $('#downloadJournal').attr('href', '/downloadJournal/' + data.file.split('\\')[3]);

        }

        else {
            let code = "<h6> No Journal Assigned by the Admin</h6>";
            $("#journalCode").html(code);
            $("#downloadJournal").hide();
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

        $("#finish").hide();
        let code = "<h6>Job well Done</h6>";
        let name = "<h6>Journal Completed!</h6>";
        $("#journalCode").html(code);
        $("#journalName").html(name);
        $("#download").hide();
        
        setTimeout(function(){ 
            window.location = 'http://localhost:4000/contri_Dashboard'
        }, 2000);
    });
}

let viewDiseaseID = 0;
function modalDisease(id){
    console.log(id);

    $("#contri_modalDisease").modal("show");
    viewDiseaseID = id;
    let url = "/modalDisease/" + viewDiseaseID;

    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data form the server!");
            return;
        }


        let data = response.data;
        console.log(data);
        $('input[name=modalName').val(data.diseaseName);
        $('textarea[name=modalDesc]').val(data.diseaseDesc);

        $("#modalSymptoms").html("");
        $("#modalBodySite").html("");

        data.symptoms.forEach((element, index) => {
            console.log("adding sym");
            addFieldEdit(element);
        });

        data.bodySite.forEach((element, index) => {
            console.log("adding body");
            addFieldEdit3(element);
            console.log(element);
        });

        sympCount = data.symptoms.length;
        bodyCount = data.bodySite.length;
    });

}

function selectDisease() {
    $.get('/revisedSelectDisease', (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        console.log(data);
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.diseaseID + ">" + element.diseaseName + "</option>";
        });
        $('#toSelectDisease').html(html);
        $('.select-disease').chosen({});
    });
}


let viewPreventionID = 0;
function modalPrevention(id) {
    viewPreventionID = id;
    $("#contri_modalPreventions").modal("show");
    let url = "/modalPrevention/" + viewPreventionID;
    console.log(url);

    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data form the server!");
            return;
        }

        let data = response.data;
        console.log(data);
        $('select[name=selectDisease]').val(data.diseaseID);
        $("#modalPreventionDisplay").html("");

        data.preventions.forEach((element, index) => {
            addFieldEdit2(element);
        });

        let html;
        $('#modalPreventions').html(html);
        preventionCount = data.preventions.length;
    });
}

function reSubmitDisease(e){
    e.preventDefault();

    let dataInsert = {};
    let formData = $('#modalDiseaseForm').serializeArray();
    console.log(formData);
    let _data = {
        symptoms: [],
    };
    let _body = {
        bodySite: [],
    };
    let error = 0;
    formData.forEach((element, index) => {
        console.log(element.name + ":" + element.value);
        if (element.value == "") {
            error++;
            return;
        }
        if (element.name.search("modalSymp") == -1) {
            _data[element.name] = element.value;
        } 
        else {
            _data.symptoms.push(element.value);
        }
        if (element.name.search("modalBody") == -1) {
            _body[element.name] = element.value;
        }
        else {
            _body.bodySite.push(element.value);
        }
    });
    if (error == 0) {
        _data.symptoms = _data.symptoms.join(":");
        _body.bodySite = _body.bodySite.join(":");
        
        dataInsert[formData[0].name] = formData[0].value;
        dataInsert[formData[1].name] = formData[1].value;
        dataInsert["symptoms"] = _data.symptoms;
        dataInsert["bodySite"] = _body.bodySite;

        console.log(dataInsert);
        swal({
            title: 'Are you sure?',
            text: "Approve Disease",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then(function (ok) {
            if (ok) {
                $.ajax({
                    url: "/reSubmitDisease/" + viewDiseaseID,
                    type: "POST",
                    data: dataInsert,
                    success: function (res) {
                        if (res.success) {
                            swal({
                                title: "Done!",
                                text: res.detail,
                                type: "success",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay",
                                allowOutsideClick: false
                            });
                            $('#contri_modalDisease').modal("hide");
                            notiCard();
                        } else {
                            $.notify("Failed: " + res.detail, { type: "danger" });
                        }
                    },
                    error: function (xhr) {
                        $.notify("Failed: " + xhr.status + " " + xhr.statusText, { type: "danger" });
                    }
                });
            }
        });
    } else {
        $.notify("All field must be filled.", { type: "warning" });
    }
}

function reSubmitPrevention(eAdd) {
    eAdd.preventDefault();

    let formData = $('#modalPreventionForm').serializeArray();
    let _data = {
        preventions: [],
    };
    let error = 0;
    formData.forEach((element, index) => {
        console.log(element.name + ":" + element.value);
        if (element.value == "") {
            error++;
            return;
        }
        if (element.name.search("modalPrev") == -1) {
            _data[element.name] = element.value;
        } else {
            _data.preventions.push(element.value);
        }
    });
    if (error == 0) {
        _data.preventions = _data.preventions.join(":");
        swal({
            title: 'Are you sure?',
            text: "Approve Prevention",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then(function (ok) {
            if (ok) {
                $.ajax({
                    url: "/reSubmitPrevention/" + viewPreventionID,
                    type: "POST",
                    data: _data,
                    success: function (res) {
                        if (res.success) {
                            swal({
                                title: "Done!",
                                text: res.detail,
                                type: "success",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay",
                                allowOutsideClick: false
                            });
                            $('#contri_modalPreventions').modal("hide");
                            notiCard();
                        } else {
                            $.notify("Failed: " + res.detail, { type: "danger" });
                        }
                    },
                    error: function (xhr) {
                        $.notify("Failed: " + xhr.status + " " + xhr.statusText, { type: "danger" });
                    }
                });
            }
        });
    } else {
        $.notify("All field must be filled.", { type: "warning" });
    }
}


let count = 0;
let sympCount = 0;
let target = $(".symptomsTxt");
let targetBtn = $("#responseButton");

function addField() {
    if (count >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "symptoms" + count;
    let buttonName = "button" + count;
    let html = '<input type="text" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='sympDiv" + count + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target.append(newDiv);
    count++;
    console.log(count);
    console.log(boxName);
}

function deleteField(count) {
    $('input[name=symptoms' + count + ']').remove();
    $('button[name=button' + count + ']').remove();
    $('.sympDiv' + count).remove();
    count--;
    console.log(count + "lol");
}

let count1 = 0;
let preventionCount = 0;
let target1 = $(".preventionTxt");
let targetBtn1 = $("#responseButton");

function addFieldPrevention() {
    if (count1 >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "prevention" + count1;
    let buttonName = "button" + count1;
    let html = '<input type="text" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count1 + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';
    let newDiv = "<div class='preventionDiv" + count1 + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target1.append(newDiv);

    console.log(count1);
    console.log(boxName);
    count1++;
}

function deleteField(count1) {
    $('input[name=prevention' + count1 + ']').remove();
    $('button[name=button' + count1 + ']').remove();
    $('.preventionDiv' + count1).remove();
    count1--;
    console.log(count1 + "lol");
}

let count2 = 0;
let bodyCount = 0;
let target2 = $(".bodyTxt");
let targetBtn2 = $("#responseButton");

function addFieldBody() {
    if (count >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "body" + count2;
    let buttonName = "button" + count2;
    let html = '<input type="text" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteFieldPrevention(' + count2 + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='bodyDiv" + count2 + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target.append(newDiv);
    count2++;
}

function deleteFieldPrevention(count) {
    $('input[name=symptoms' + count + ']').remove();
    $('button[name=button' + count + ']').remove();
    $('.bodyDiv' + count).remove();
    count--;
    console.log(count + "lol");
}

let addFieldEdit = function (value) {
    if ($('.symptomsEditDiv').length >= 10) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    value = value == undefined ? "" : value;

    let html = "<input class='form-control' name='modalSymp" + sympCount + "' value='" + value + "' type = 'text'/><br>";
    let buttonName = "buttonEdit" + sympCount;
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteFieldEdit(' + sympCount + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='symptomsEditDiv sympEditDiv" + sympCount + " row'>" + "<div class='col-sm-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    $("#modalSymptoms").append(newDiv);
    sympCount++;
}

let deleteFieldEdit = function (selected) {
    $('.sympEditDiv' + selected).remove();
}

let addFieldEdit2 = function (value) {
    if ($('.preventionEditDiv').length >= 10) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    value = value == undefined ? "" : value;

    let html = "<input class='form-control' name='modalPrev" + preventionCount + "' value='" + value + "' type = 'text'/><br>";
    let buttonName = "buttonEdit" + preventionCount;
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteFieldEdit2(' + preventionCount + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='preventionEditDiv prevEditDiv" + preventionCount + " row'>" + "<div class='col-sm-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    $("#modalPreventionDisplay").append(newDiv);
    preventionCount++;
}

let deleteFieldEdit2 = function (selected) {
    $('.prevEditDiv' + selected).remove();
}

let addFieldEdit3 = function (value) {
    if ($('.bodySiteEditDiv').length >= 10) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    value = value == undefined ? "" : value;

    let html = "<input class='form-control' name='modalBody" + bodyCount + "' value='" + value + "' type = 'text'/><br>";
    let buttonName = "buttonEdit" + bodyCount;
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteFieldEdit3(' + bodyCount + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='bodySiteEditDiv bodyEditDiv" + bodyCount + " row'>" + "<div class='col-sm-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    $("#modalBodySite").append(newDiv);
    bodyCount++;
}

let deleteFieldEdit3 = function (selected) {
    $('.bodyEditDiv' + selected).remove();
}



let isClick = 0;
$(function () {
    staffList();
    $(".stats").hide();
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
            row += "<td>" + element.firstName + " " + element.lastName + "</td>";
            row += "<td>" + element.userName + "</td>";
            // row += "<td>" + element.email + "</td>";
            // row += "<td>" + element.contact + "</td>"; //I need ID of this specific user... is it element.id?
            if (element.type == 2) {
                row += '<td><div class="form-check"><label class="form-check-label"><input class="form-check-input admin-switch" name = "admin" type="checkbox" value="' + element.staffID + '" checked><span class="form-check-sign"></span></label></div></td>';
            }
            else {
                row += '<td><div class="form-check"><label class="form-check-label"><input class="form-check-input admin-switch" name = "contributor" type="checkbox" value="' + element.staffID + '" ><span class="form-check-sign"></span></label></div></td>';
            }
            if (element.status == 1) {
                row += '<td><div class="form-check"><label class="form-check-label"><input class="form-check-input status-switch" name = "active" type="checkbox" value="' + element.staffID + '" checked><span class="form-check-sign"></span></label></div></td>';
            }
            else {
                row += '<td><div class="form-check"><label class="form-check-label"><input class="form-check-input status-switch" name = "inactive" type="checkbox" value="' + element.staffID + '" ><span class="form-check-sign"></span></label></div></td>';
            }
            row += "</tr>";
            html += row;
        });
        $('#staffList').html(html);
        $('.admin-switch').on('click', adminSwitch);
        $('.status-switch').on('click', statusSwitch);
        $('#staffTable').dataTable();
    });
}

function statusSwitch(event) {
    if (this.checked) {
        let staffID = this.value;
        console.log("CHECKED" + staffID);

        let url = "/activateStatus/" + staffID;
        swal({
            title: 'Are you sure?',
            text: "You want to active this staff?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, (response) => {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Unsuccessful!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Account activated!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                });
            }
        }).catch(()=>{
            $('input[type=checkbox][value="'+ staffID +'"]').removeAttr('checked');
        });
    }


    else {
        let staffID = this.value;
        console.log("UNCHECKED" + staffID);

        let url = "/deactivateStatus/" + staffID;

        swal({
            title: 'Are you sure?',
            text: "You want to deactivate this staff?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, (response) => {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Unsuccessful!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Privilege dismissed!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                });
            }
        });
    }
}

function adminSwitch(event) {
    if (this.checked) {
        let staffID = this.value;
        console.log("CHECKED" + staffID);

        let url = "/updateTypeToAdmin/" + staffID;
        swal({
            title: 'Are you sure?',
            text: "Allow this staff to have admin privilege?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, (response) => {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Unsuccessful!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Privilege granted!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                });
            }
        }).catch(()=>{
            $("input[type=checkbox][value="+ staffID +"]").removeAttr('checked');
        });
    }


    else {
        let staffID = this.value;
        console.log("UNCHECKED" + staffID);

        let url = "/updateTypeToContributor/" + staffID;

        swal({
            title: 'Are you sure?',
            text: "Remove the admin privilege to this staff?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, (response) => {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Unsuccessful!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Privilege dismissed!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                });
            }
        });
    }
}

function generate() {
    let code = Math.random().toString(36).replace('0.', '');
    $('.generate').val(code);
}

function code(e) {
    if (isClick != 0) {
        return;
    }
    isClick++;

    e.preventDefault();
    let data = $("#codeForm").serializeArray();
    let errCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=emailAdd]').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }
        else {
            dataInsert[element.name] = element.value;
        }

    });

    if (errCount > 0) {
        $.notify("Provide an Email!", { type: "danger" });
        return;
    }
    $(".stats").show();
    $.post("/code", dataInsert, (response) => {
        if (response.success == false) {
            $.notify("Error generating code!", { type: "danger" });
            return;
        }

        $.notify("Key token already sent!", { type: "success" });
        $(".stats").hide();
        $('#generate').modal("hide");
    });
}

function createCode(e) {
    e.preventDefault();

    let data = $("#createCode").serializeArray();
    let dataInsert = {};
    let errCount = 0;

    data.forEach((element, index) => {
        if (element.value == "") {
            $("input[name=createCode]").css("background-color", "#feebeb");
        }
    });
}
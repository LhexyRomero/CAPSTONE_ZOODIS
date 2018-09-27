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
            row += "<td>" + element.email + "</td>";
            row += "<td>" + element.contact + "</td>"; //I need ID of this specific user... is it element.id?
            if (element.type == 2) {
                row += '<td class="form-check"><label class="form-check-label"><input class="form-check-input admin-switch" name = "admin" type="checkbox" value=' + element.staffID + ' checked=""><span class="form-check-sign"></span></label></td>';
            }
            else {
                row += '<td class="form-check"><label class="form-check-label"><input class="form-check-input admin-switch" name = "contributor" type="checkbox" value=' + element.staffID + ' ><span class="form-check-sign"></span></label></td>';
            }
            row += "</tr>";
            html += row;
        });
        $('#staffList').html(html);
        $('.admin-switch').on('click', adminSwitch);
        $('#staffTable').dataTable();
    });
}

function adminSwitch(event) {
    if (this.checked) {
        let staffID = this.value;
        console.log("CHECKED" + staffID);

        let url = "/updateTypeToAdmin/" + staffID;
        $.post(url, (response) => {
            if (response.success == false) {
                $.notify("Error changing Contributor to Admin!", { type: "danger" });
                return;
            }
            $.notify(response.detail, { type: "success" });
        });
    }

    else {
        let staffID = this.value;
        console.log("UNCHECKED" + staffID);

        let url = "/updateTypeToContributor/" + staffID;
        $.post(url, (response) => {
            if (response.success == false) {
                $.notify("Error changing Admin to Contributor!", { type: "danger" });
                return;
            }
            $.notify(response.detail, { type: "success" });
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
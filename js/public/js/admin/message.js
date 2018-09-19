$(function () {
    $("#btnSend").hide();
    messageList();
});

function viewMessages(e) {
    $.get("/viewMessage", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the Server!", { type: "danger" });
            return;
        }
    });
}

function messageList() {
    $.get("/messageList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            if (element.state == 1) {
                let row = "<tr class='unread strong'>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td>" + element.name + "</td>";
                row += "<td>" + element.subject + "</td>";
                row += "<td><label>" + element.date + "</label></td>";
                row += "<td><a href='#'>view</a></td>";
                row += "</tr>";
                html += row;
            }
            else {
                let row = "<tr>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td>" + element.name + "</td>";
                row += "<td>" + element.subject + "</td>";
                row += "<td><label>" + element.date + "</label></td>";
                row += "<td><a href='#'>view</a></td>";
                row += "</tr>";
                html += row;
            }
        });
        $('#messageList').html(html);
    });
}
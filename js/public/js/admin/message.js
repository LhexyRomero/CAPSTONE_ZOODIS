$(function () {
    $("#btnSend").hide();
    messageList();
});

function viewMessage(e,id,member) {
    let url = "/viewMessage/"+id+"/"+member;
    console.log(url);
    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the Server!", { type: "danger" });
            return;
        }

        let email = "<label>" +response.data.email+ "</label>";
        let message = "<p class ='pLabel'>" +response.data.message+ "</p>";
        let dateTime = "<label>" + Date.parse(response.data.date).toString('MMM dd, yyyy')+" "+Date.parse(response.data.time).toString('hh:mm')+"</label>";

        $("#email").html(email);
        $("#message").html(message);
        $("#dateTime").html(dateTime);
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
                let row = "<tr class='unread hov' onclick='viewMessage(this,"+element.usermessageID+","+element.staffID+")'>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td><strong>" + element.name + "</strong></td>";
                row += "<td><strong>" + element.subject + "</strong></td>";
                row += "<td><label>" + element.date + "</label></td>";
                row += "</tr>";
                html += row;
            }
            else {
                let row = "<tr class='hov' onclick='viewMessage(this,"+element.usermessageID+","+element.staffID+")'>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td>" + element.name + "</td>";
                row += "<td>" + element.subject + "</td>";
                row += "<td><label>" + element.date + "</label></td>";
                row += "</tr>";
                html += row;
            }
        });
        $('#messageList').html(html);
    });
}
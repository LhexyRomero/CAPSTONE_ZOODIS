$(function () {
    $("#btnSend").hide();
    $("#btnCancel").hide();
    messageList(messageLimit,messageNext);
    $('.nextPage').on('click', function(){
        messageList(messageLimit,messageNext);
    });
    $('.prevPage').on('click', function(){
        console.log('ho')
        messageList(messageLimit,messageNext - messageLimit);
    });
});

let messageNext = 0;
let messageLimit = 2;

function viewMessage(e, id, member) {
    let url = "/viewMessage/" + id + "/" + member;
    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the Server!", { type: "danger" });
            return;
        }
        let email = "<label id='emailAdd'>" + response.data.email + "</label>";
        let message = "<p class ='pLabel'>" + response.data.message + "</p>";
        let subject = "<p id='subject'>" +response.data.subject + "</p>";
        let noSubject = "<p id='subject'>[No Subject]</p>";
        let dateTime = "<label>" + Date.parse(response.data.date).toString('MMM dd, yyyy') + " " + Date.parse(response.data.time).toString('hh:mm tt') + "</label>";

        if(response.data.subject == ""){
            $("#sub").html(noSubject);
        }

        else {
            $("#sub").html(subject);
        }
        
        $("#email").html(email);
        $("#message").html(message);
        $("#dateTime").html(dateTime);
    });
}

function messageList(limit, offset) {
    $.get("/messageList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "";
        for(let x=0; x<limit; x++){
            let element = data[x+offset];
            if(!element) return;
            if (element.state == 1) {
                let row = "<tr class='unread hov' onclick='viewMessage(this," + element.usermessageID + "," + element.staffID + ")'>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td><strong>" + element.name + "</strong></td>";
                row += "<td><strong>" + element.subject + "</strong></td>";
                //row += "<td><label>" + Date.parse(element.dateTime).toString('MMM dd') + "</label></td>";
                row += "</tr>";
                html += row;
            }
            else {
                let row = "<tr class='hov' onclick='viewMessage(this," + element.usermessageID + "," + element.staffID + ")'>";
                row += "<td><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td>" + element.name + "</td>";
                row += "<td>" + element.subject + "</td>";
               // row += "<td><label>" + Date.parse(element.date).toString('MMM dd') + "</label></td>";
                row += "</tr>";
                html += row;
            }
            if(x==limit-1){
                messageNext = x+offset;
            }
        }
        $('#messageList').html(html);
    });
}

function send() {
    let data = $("#sendMessage").serializeArray();
    let email = $("#emailAdd").html();
    let subject = $("#subject").html();
    let dataInsert = {};

    if (data[0].value == "") {
        $('textarea[name=replyMessage]').css("background", "#feebeb");
        $.notify("Enter a message!", { type: "danger" });
        isClick = 0;
    }

    if (email == "") {
        $.notify("No reciepient Provided!", { type: "danger" });
        isClick = 0;
    }

    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert['emailAdd'] = email;
        dataInsert['subject'] = subject;
    }

    $.post("/send", dataInsert,(response)=>{
        if(response.success == false) {
            $.notify("Error sending message!", {type:"danger"});
            return;
        }
            $.notify(response.detail,{type:"success"});
    });
}

function reply() {
    $("#btnSend").show();
    $("#btnReply").hide();
    $("#btnCancel").show();
}

function cancel() {
    $("#btnCancel").hide();
    $("#btnSend").hide();
    $("#btnReply").show();
}
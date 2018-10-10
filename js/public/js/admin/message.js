$(function () {
    $("#btnSend").hide();
    $("#btnCancel").hide();
    $(".stats").hide();
    messageList(messageLimit,messageNext);
    $('.nextPage').on('click', function(){
        messageList(messageLimit,messageNext+1);
    });
    $('.prevPage').on('click', function(){
        messageList(messageLimit,messageNext - messageLimit);
    });
});

let messageNext = 0;
let messageLimit = 3;

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
    $.get("/messageList?offset=" + offset + "&limit=" + limit, (response) => {
        if(response.success ==false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let data = response.data;
        if(offset >= data.length || offset < 0) return;
        let html="";
        let count = 0;
        for(let x=0; x<limit; x++){
            let element = data[offset+x];
            if(!element) break;
            if(element.type == 1){
                let row = "<tr class='unread hov mail' data-href='messageDetails?mid=" + element.usermessageID +"'>";
                row += "<td class='cb-size'><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td class='b-size'><span class='badge badge-info'>inquiry</span></td>"
                row += "<td class='name-size'><strong>" + element.mName + "</strong></td>";
                row += "<td class='subject-size'><strong>" + element.mSubject + "</strong></td>";
                row += "<td>" +"-&nbsp;"+ element.mMessage.substring(0,50) + "...</td>";
                row += "<td><strong></strong></td>";
                row += "<td><label class='pull-right'>" + Date.parse(element.mDateTime).toString('MMM dd') + "&nbsp;&nbsp;</label></td>";
                row += "</tr>";
                html += row;

            }
            else {
                
                let row = "<tr class='unread hov mail' data-href='messageDetails?ujid=" + element.userjournalID +"&staffid="+ element.staffID +"'>";
                row += "<td class='cb-size'><br><div class='form-check'><label class'form-check-label'><input class='form-check-input' type='checkbox'><span class='form-check-sign'></span></label></div></td>"
                row += "<td class='b-size'><span class='badge badge-danger'>journal</span></td>";
                row += "<td class='name-size'><strong>" + element.firstName + " " + element.lastName + "</strong></td>";
                row += "<td class='subject-size'><strong>" + element.jSubject + "</strong></td>";
                row += "<td>" +"-&nbsp;"+ element.jMessage.substring(0,50) + "...</td>";
                row += "<td><img class='pull-right' src='/assets/img/attachment.png'></td>";
                row += "<td class='date-size'><label class='pull-right'>" + Date.parse(element.jDateTime).toString('MMM dd') + "&nbsp;&nbsp;</label></td>";
                row += "</tr>";
                html += row;

                
            }

            count = x+offset;
        }

        messageNext = count;
        if(messageNext >= data.length-1 ) messageNext = offset;
        $('#messageList').html(html);
        $('.mail').on('click', function(){
            window.location = $(this).data('href');
        });

        data.forEach(element => {
            if(element.type == 1 ){
                if(element.mState == 1 ){
                }
            }
            else if(element.type == 2 ){
                if(element.jState == 1 ){
                }
            }
        });
    });
}

function adminSend(e) {
    e.preventDefault();

    let data = $("#adminSendForm").serializeArray();
    let dataInsert = {};
    let errCount = 0;
    let invcount = 0;

    if(data[0].value =="" && data[2].value ==""){
        $('textarea[name=adminMessage]').css("background", "#feebeb");
        $('input[name=email]').css("background", "#feebeb");
        errCount++;
        isClick = 0;
    }

    else if(data[0].value.match(/[*#\/]/g) != null && data[1].value.match(/[*#\/]/g) != null){
        $('input[name=email]').css("background", "#feebeb");
        $('input[name=subject]').css("background", "#feebeb");
        invcount++;
        isClick = 0;
    }
    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
        dataInsert[data[2].name] = data[2].value;
    }
    if(errCount>0){
        $.notify("Enter a message!", { type: "danger" });
    }

    else if(invcount){
        
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        $(".stats").show();
        $.post("/adminSend",dataInsert,(response)=>{
            if(response.success == false){
                $.notify("Message not Sent",{type:"danger"});
                return;
            }
            $.notify(response.detail,{type:"success"});
            $(".stats").hide();
        });
    }
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
    
    $(".stats").show();
    $.post("/send", dataInsert,(response)=>{
        if(response.success == false) {
            $.notify("Error sending message!", {type:"danger"});
            return;
        }
        $(".stats").hide();
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
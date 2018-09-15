let isClick = 0;

function collabMessage() {

    if (isClick != 0) {
        return;
    }
    isClick++;

    let data = $("#collabContactForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    if (data[1].value == "") {
        $('textarea[name=message]').css("background", "#feebeb");
        errCount++;
        isClick = 0;
    }

    else if (data[0].value.match(/[*#\/]/g) != null || data[1].value.match(/[*#\/]/g) != null) {
        $('textarea[name=message]').css("background", "#feebeb");
        $('input[name=message]').css("background", "#feebeb");
        invCount++;
        isClick = 0;
    }

    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
        console.log(dataInsert);
    }

    if (errCount > 0) {
        let html = "<label><font color='red'>Enter a message!</font></label>";
        $(".messageNotif").html(html);
    }

    else if (invCount > 0) {
        let html = "<label><font color='red'>Invalid Character!</font></label>";
        $(".messageNotif").html(html);
    }

    else {
        $.post("/collabMessage", dataInsert, (response) => {
            if (response.success == false) {
                let html = "<label><font color='red'>Error sending message!</font></label>";
                $(".messageNotif").html(html);
                return;
            }

            let html = "<label><font color='#24bb01'>" + response.detail + "</font></label>";
            let info = "<label>Check your email after 2-3 days, Thankyou!<label>";
            $(".messageNotif").html(html);
            $(".messageInfo").html(info);

        });
    }

}

function contactMessage(e) {
    e.preventDefault();

    let data = $("#contactForm").serializeArray();
    let dataInsert = {};

    console.log(data);

    if(data[0].value == "" || data[1].value == "" || data[3].value == "" ){
        isClick = 0;
        $('textarea[name=message]').css("background", "#feebeb");
        $('input[name=name]').css("background", "#feebeb");
        $('input[name=email]').css("background", "#feebeb");
        let html = "<label><font color='red'>Fill up the fields!</font></label>";
        $(".notif").html(html);
    }

    else if (data[0].value.match(/[*#\/]/g) != null || data[1].value.match(/[*#\/]/g) != null || data[2].value.match(/[*#\/]/g) != null || data[3].value.match(/[*#\/]/g) != null) {
        isClick = 0;
        $('textarea[name=message]').css("background", "#feebeb");
        $('input[name=name]').css("background", "#feebeb");
        $('input[name=subject]').css("background", "#feebeb");
        $('input[name=email]').css("background", "#feebeb");
        let html = "<label><font color='red'>Invalid Character!</font></label>";
        $(".notif").html(html);
    }

    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
        dataInsert[data[2].name] = data[2].value;
        dataInsert[data[3].name] = data[3].value;
    }

    $.post("/contactMessage", dataInsert, (response)=>{
        if(response.success == false){
            let html = "<label><font color='red'>Error sending message!</font></label>";
            $(".notif").html(html);
            return;
        }
        
        let html = "<label><font color='#24bb01'>" + response.detail + "</font></label>";
        let info = "<label>Check your email after 2-3 days, Thankyou!<label>";
        $(".notif").html(html);
        $(".info").html(info);
    });

}
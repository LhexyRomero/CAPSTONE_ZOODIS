let isClick = 0;

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

    console.log(dataInsert,"LEKI THIS IS FOR CONTACTS");

    $.post("/contactMessage", dataInsert, (response)=>{
        if(response.success == false){
            let html = "<label><font color='red'>Error sending message!</font></label>";
            $(".notif").html(html);
            return;
        }
        
        clearFields();
        let html = "<label><font color='#24bb01'>" + response.detail + "</font></label>";
        let info = "<label>Check your email after 2-3 days, Thankyou!<label>";
        $(".notif").html(html);
        $(".info").html(info);
    });

}

function clearFields() {
    $('textarea[name=message]').val("");
    $('input[name=name]').val("");
    $('input[name=subject]').val("");
    $('input[name=email]').val("");
}
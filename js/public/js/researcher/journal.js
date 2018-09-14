let isClicked = 0;
function uploadJournal(e){
    e.preventDefault();

    if (isClicked != 0) {
        return;
    }
    isClicked++

    let data = $("#collabForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = new FormData($("#collabForm")[0]);

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClicked = 0;
        }

        else if (element.value.match(/[*#]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
            //dataInsert.append(element.name,element.value);
        }

    });

    if (errCount > 0) {
        let html = "<label><font color='red'>All fields must be filled!</font></label>";
        $(".notif").html(html);
        return;
    }

    else if (invCount > 0) {
        let html = "<label><font color='red'>Invalid Character!</font></label>";
        $(".notif").html(html);
        return;
    }

    $.ajax({
        type: "POST",
        url: "/uploadJournal",
        data: dataInsert,
        processData: false,
        contentType: false,
        success: (response) =>{
            isClicked = 0;
            if(response.success == false) {
                let html = "<label><font color='red'>"+response.detail+"</font></label>";
                $(".notif").html(html);
                return;
            }

            //green
            let html = "<label><font color='#24bb01'>"+response.detail+"</font></label>";
            let info = "<label>Check your email after 2-3 days, Thankyou!<label>";
            $(".notif").html(html);
            $(".info").html(info);
            clearJournal();
        }
    });
}

function clearJournal() {
    $("input[name=name]").val("");
    $("input[name=doi]").val("");
    $("input[type=file]").val("");
}
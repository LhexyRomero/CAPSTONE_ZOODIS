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

        else if (element.value.match(/[*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
            //dataInsert.append(element.name,element.value);
        }

    });

    if (errCount > 0) {
        $.notify("Fields must be filled out!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }
}
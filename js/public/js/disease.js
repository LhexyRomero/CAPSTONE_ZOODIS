/**
 * Start: Adding field
 */

let isClicked = 0;
let count = 0;
let target = $(".symptomsTxt");
let targetBtn = $("#responseButton");

function addField() { 
    if (count>=10){
        $.notify("You reached the maximum numbers of field!",{type:"danger"});
        return;
    }
    
    let boxName="symptoms"+count;
    let buttonName = "button"+count;
    let html = '<input type="text" class="form-control" name="'+boxName+'""/>';
    let button = '<button name="'+buttonName+'"type="button" onclick ="deleteField('+ count +')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';
    
    let newDiv = "<div class='sympDiv"+ count +" row'>" + "<div class='col-md-8'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";
    
    target.append(newDiv);
    count++;
    console.log(count);
    console.log(boxName);
}

function deleteField(count) {
    $('input[name=symptoms'+ count +']').remove();
    $('button[name=button'+ count +']').remove();
    $('.sympDiv'+count).remove();
    count--;
    console.log(count+"lol");
}


/**
 * End: Adding field
 */

function addDisease(eAdd) {
    eAdd.preventDefault();

    if (isClicked != 0) {
        return;
    }
    isClicked++;

    let data = $("#diseaseForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value === "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }
        else if (element.value.match(/[0-9*#\/]/g) !== null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
        }
        else {
            dataInsert[element.name] = element.value;
        }
    });

    isClicked = 0;

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
        return;
    }

    if (invCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
        return;
    }

    console.log("Yieeee accpeted");
    swal({
        title: 'Add Disease',
        text: "Are you sure?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes'
    }).then((isConfirmed) => {
        if (!isConfirmed) {
            return;
        }

        $.post("/disease", dataInsert, (response) => {
            if (!response.success) {
                swal({
                    title: "Error!",
                    text: "Data Already Exists!",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Okay"
                });
                return;
            }
            
            swal({
                title: "Done!",
                text: "Data Recorded",
                type: "success",
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Okay"
            });
        
        });
        
    })
}



/**
 * Start: Adding field
 */

let isClicked = 0;
let count = 0;
let target = $(".preventionTxt");
let targetBtn = $("#responseButton");

function addField() {
    if (count >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "prevention" + count;
    let buttonName = "button" + count;
    let html = '<input type="text" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';
    let newDiv = "<div class='preventionDiv" + count + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target.append(newDiv);
    count++;
    console.log(count);
    console.log(boxName);
}

function deleteField(count) {
    $('input[name=prevention' + count + ']').remove();
    $('button[name=button' + count + ']').remove();
    $('.preventionDiv' + count).remove();
    count--;
    console.log(count + "lol");
}

/**
 * End: Adding field
 */
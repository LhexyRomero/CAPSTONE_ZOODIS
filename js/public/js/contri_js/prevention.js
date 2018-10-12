$(function (){
    toSelectDisease();
    preventionList();
});
let isClick = 0;
let count1 = 0;
let preventionCount = 0;
let target1 = $(".preventionTxt");
let targetBtn1 = $("#responseButton");

function addFieldPrevention() {
    if (count1 >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "prevention" + count1;
    let buttonName = "button" + count1;
    let html = '<input type="text" autocomplete="off" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count1 + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';
    let newDiv = "<div class='preventionDiv" + count1 + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target1.append(newDiv);
    
    console.log(count1);
    console.log(boxName);
    count1++;
}

function deleteField(count1) {
    $('input[name=prevention' + count1 + ']').remove();
    $('button[name=button' + count1 + ']').remove();
    $('.preventionDiv' + count1).remove();
    count1--;
    console.log(count1 + "lol");
}

function addPrevention(eAdd) {
    eAdd.preventDefault();

    if(isClick !=0){
        return;
    }
    isClick++

    let data = $("#preventionForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};


    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        isClick = 0;
        if (element.value == "") {
            $('select[name='+element.name+']').css("background", "#feebeb"); //no functioning!
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
        }

        else {
            dataInsert[element.name] = element.value;
        }
    });

    if(errCount>0) {
        $.notify("All fields must be filled!",{type: "danger"});
        return;
    }

    else if(invCount>0){
        $.notify("Invalid Character!",{type:"danger"});
        return;
    }

    swal({
        title: 'Are you sure?',
        text: "Add Prevention",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
        confirmButtonText: 'Yes',
        allowOutsideClick: false
    }).then((isConfirmed) => {
        if (!isConfirmed) {
            return;
        }

        $.post("/contri_addPrevention", dataInsert, (response) => {
            if (!response.success) {
                swal({
                    title: "Error!",
                    text: response.detail,
                    type: "error",
                    confirmButtonColor: "#9c27b0",
                    confirmButtonText: "Okay",
                    allowOutsideClick: false
                });
                return;
            }

            swal({
                title: "Done!",
                text: response.detail,
                type: "success",
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Okay",
                allowOutsideClick: false
            });
            clearPrevention();
            preventionList();
        });

    })

    
}

function clearPrevention() {
    $('select[name=selectDisease]').val("");
    $('input[name=strPrevention]').val("");
    $('input[name=prevention0]').val("");
    $('input[name=prevention1]').val("");
    $('input[name=prevention2]').val("");
    $('input[name=prevention3]').val("");
    $('input[name=prevention4]').val("");
    $('input[name=prevention5]').val("");
    $('input[name=prevention6]').val("");
    $('input[name=prevention7]').val("");
    $('input[name=prevention8]').val("");
    isClick=0;

}

function toSelectDisease() {
    $.get("/contri_toSelectDisease",(response)=>{
        if(response.success == false) {
            $.notify("Error getting data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let html ="<option value = ''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.diseaseID + ">" + element.diseaseName + "</option>";
        });
        $('#toSelectDisease').html(html);
    });
}

let viewPreventionID = 0;
function viewPrevention(id) {

    viewPreventionID = id;
    let url = "/contri_viewPrevention/" + viewPreventionID;
    console.log(url);

    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let html = "";
        let diseaseName = "<h5><font color='#9c27b0'><b>" + data.diseaseName + "</b></font></h5>";
        let approved = "<span class='badge badge-success'>"+data.status+"</span>";
        let rejected = "<span class='badge badge-danger'>"+data.status+"</span>";
        let pending = "<span class='badge badge-default'>"+data.status+"</span>";

        console.log(pending);
        data.preventions.forEach((element, index) => {
            let list = "<ul>";
            list += "<li>" + element + "</li>";
            list += "</ul>";
            html += list;

        });

        if(data.status == 'rejected') {
            $("#status").html(rejected);
        }

        else if(data.status == 'approved') {
            $("#status").html(approved);
        }

        else if(data.status == 'pending') {
            $("#status").html(pending);
        }

        $("#viewPreventionName").html(diseaseName);
        $("#viewPrevention").html(html);
    });
};

function preventionList() {
    $.get("/contri_preventionList",(response) =>{
        if(response.success == false) {
            $.notify("Error getting data from the server!",{type: "danger"});
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element,index) => {
            let row = "<tr>";
            row += "<td>" +element.diseaseName+"</td>";
            row += "<td><a data-toggle='modal' href='#viewModal2'><button onclick = 'viewPrevention(" + element.preventionID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            if (element.status === "approved") {
                row += "<td><span class='badge badge-success'>"+element.status+"</span></td>";
            }
            else if (element.status === "rejected"){
                row += "<td><span class='badge badge-danger'>"+element.status+"</span></td>";
            }
            else {
                row += "<td><span class='badge badge-default'>"+element.status+"</span></td>";
            }
            row += "</tr>";
            html += row;
        });

        $("#preventionTableList").html(html);
        $("#preventionTable").dataTable();
    });
}
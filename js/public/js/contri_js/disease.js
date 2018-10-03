$(function () {
    diseaseList();
});

let isClicked = 0;
let count = 0;
let sympCount = 0;
let target = $(".symptomsTxt");
let targetBtn = $("#responseButton");

function addField() {
    if (count >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    let boxName = "symptoms" + count;
    let buttonName = "button" + count;
    let html = '<input autocomplete="off" type="text" class="form-control" name="' + boxName + '""/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='sympDiv" + count + " row'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    target.append(newDiv);
    count++;
    console.log(count);
    console.log(boxName);
}

function deleteField(count) {
    $('input[name=symptoms' + count + ']').remove();
    $('button[name=button' + count + ']').remove();
    $('.sympDiv' + count).remove();
    count--;
    console.log(count + "lol");
}// End: Adding field


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

        isClicked = 0;
        if (element.value === "") {
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }
        else if (element.value.match(/[*#\/]/g) !== null) {
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

    else if (invCount > 0) {
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

        $.post("/contri_disease", dataInsert, (response) => {
            if (!response.success) {
                swal({
                    title: "Error!",
                    text: response.detail,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Okay"
                });
                return;
            }

            swal({
                title: "Done!",
                text: response.detail,
                type: "success",
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Okay"
            });
            diseaseList();
            clearDisease();
        });

    })
}

function clearDisease() {
    
    $('select[name=selectBacteria]').val("");
    $('select[name=selectJournal]').val("");
    $('input[name=strDiseaseName]').val("");
    $('textarea[name=strDiseaseDesc]').val("");
    $('input[name=strSymptoms]').val("");
    $('input[name=symptoms0').val("");
    $('input[name=symptoms1').val("");
    $('input[name=symptoms2').val("");
    $('input[name=symptoms3').val("");
    $('input[name=symptoms4').val("");
    $('input[name=symptoms5').val("");
    $('input[name=symptoms6').val("");
    $('input[name=symptoms7').val("");
    $('input[name=symptoms8').val("");
    isClick = 0;
}

function diseaseList() {
    $.get("/contri_diseaseList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.diseaseName + "</td>";
            row += "<td>&nbsp;<a data-toggle='modal' href='#viewModal'><button onclick = 'viewDisease(" + element.diseaseID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
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
        $('#diseaseTableList').html(html);
        $('#diseaseTable').dataTable();
    });
}

let viewDiseaseID = 0;
function viewDisease(id) {

    viewDiseaseID = id;
    let url = "/contri_viewDisease/" + viewDiseaseID;
    console.log(url);

    $.get(url, (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        console.log("here");
        let data = response.data;
        let html = "";
        let selectedBacteria = "<p>"+data.bacteriumName+"</p>";
        let diseaseName = "<h5><font color='#9c27b0'><b>" + data.diseaseName + "</b></font></h5>";
        let diseaseDesc = "<p>" + data.diseaseDesc + "</p>";
        let approved = "<span class='badge badge-success'>"+data.status+"</span>";
        let rejected = "<span class='badge badge-danger'>"+data.status+"</span>";
        let pending = "<span class='badge badge-default'>"+data.status+"</span>";

        data.symptoms.forEach((element, index) => {
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
        $("#name").html(data.title);
        $("#viewSelected").html(selectedBacteria);
        $("#viewDiseaseName").html(diseaseName);
        $("#viewDiseaseDesc").html(diseaseDesc);
        $("#viewSymptoms").html(html);


    });
};


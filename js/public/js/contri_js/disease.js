$(function () {
    diseaseList();
    
    $('.bodySiteInput').autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bodySite/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        },
    });
});

let isClicked = 0;
let count = 0;
let countS = 0;
let countB = 0;
let sympCount = 0;
let target = $(".symptomsTxt");
let target2 = $(".bodyTxt");
let targetBtn = $("#responseButton");

function addField(type) {
    if (countB >= 9 || countS >= 9) {
        $.notify("You reached the maximum numbers of field!", { type: "danger" });
        return;
    }

    if(type == 1){
        if($('#symptomsIn').val() == "") return;
    }else{
        if($('#siteIn').val() == "") return;
    }

    let symptomName = "symptoms" + countS;
    let bodyName = "site" + countB;
    let boxName = type == 1 ? symptomName : bodyName;
    let buttonName = "button" + count;
    let value = type == 1 ? $('#symptomsIn').val() : $('#siteIn').val();
    let html = '<input type="text" class="form-control '+ (type==1?"symptomsInput":"bodySiteInput") +'" name="' + boxName + '"" value="'+ value +'" disabled/>';
    let button = '<button name="' + buttonName + '"type="button" onclick ="deleteField(' + count + ')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';

    let newDiv = "<div class='sympDiv" + count + " row additionField'>" + "<div class='col-md-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";

    if(type==1){
        target.append(newDiv);
        $('#symptomsIn').val("");
        countS++;
    }
    else{
        target2.append(newDiv);
        $('#siteIn').val("");
        countB++;
    }
    count++;
    // console.log(count);
    // console.log(boxName);
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

        if(element.name == 'symptoms1' || element.name == 'site1') return; 
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

    var site = [];
    var symptoms = [];
    $('.bodySiteInput').each((i,e)=>{
        site.push(e.value);
    });
    $('.symptomsInput').each((i,e)=>{
        symptoms.push(e.value);
    });
    dataInsert["site"] = site;
    dataInsert["symptoms"] = symptoms;

    isClicked = 0;

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
        return;
    }

    else if(site.length == 0 || symptoms.length == 0){
        $.notify(site.length == 0 ? "No bodysite added!" : "No symptoms added!", { type: "danger" });
        return;
    }

    else if (invCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
        return;
    }

    console.log("Yieeee accpeted");
    swal({
        title: 'Are you sure?',
        text: "Add Disease",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
        confirmButtonText: 'Yes',
        allowOutsideClick: false
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
                    confirmButtonColor: "#9c27b0",
                    confirmButtonText: "Okay",
                    allowOutsideClick: false
                });
                return;
            }

            swal({
                title: "Done!",
                text: "Successfully Submitted to Admin!",
                type: "success",
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Okay",
                allowOutsideClick: false
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
    $('input[name=site1').val("");
    $('.additionField').remove();
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
            row += "<td>&nbsp;<a data-toggle='modal' href='#viewModal'><button title='View Details' onclick = 'viewDisease(" + element.diseaseID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
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
        $("#viewDiseaseName").html(diseaseName);
        $("#viewDiseaseDesc").html(diseaseDesc);
        $("#viewSymptoms").html(html);


    });
};


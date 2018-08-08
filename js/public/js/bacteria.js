$(function () { //onload
    bacteriaTaxonList();
    toxinList();
});

let isClick = 0;

/**
 * Start: Bacteria Taxonomy
 */
function addBacteriaTaxon(eAdd) {
    eAdd.preventDefault();

    if (isClick != 0) {
        return;
    }
    isClick++

    let data = $("#bacteriaTaxonForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClick = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }


    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        isClick = 0;
        console.log("Yieeee accpeted");
        swal({
            title: 'Add Bacteria Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/bacteriaTaxon", dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        bacteriaTaxonList();
                        clearBacteriaTaxon();
                    }
                });
            }
        })
    }
}

function clearBacteriaTaxon(eClear) {

    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    isClick = 0;
}

/**
 * End: Bacteria Taxonomy
 */

/**
 * Start: Bacteria Taxonomy List
 */
function bacteriaTaxonList() {
    $.get("/bacteriaTaxonList", function (response) {

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";

            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.phylum + "</td>";
                row += "<td>" + element.class + "</td>";
                row += "<td>" + element.orderr + "</td>";
                row += "<td>" + element.family + "</td>";
                row += "<td>" + element.genus + "</td>";
                row += "<td>" + element.species + "</td>";
                row += "<td onclick='editBacteriaTaxon(" + element.bacteriumTaxoID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });

            $('#bacteriataxonTableList').html(html);
            $('#bacteriaTaxonTable').DataTable();
        }

    });
}

/**
 * End: Bacteria Taxonomy List
 */

/**
 * Start: Edit Bacteria Taxonomy
 */
let globalId = 0;

function editBacteriaTaxon(bacteriumTaxoID) {

    globalId = bacteriumTaxoID;
    console.log(globalId + "EDIT");

    let url = "/editBacteriaTaxon/" + bacteriumTaxoID;
    $.get(url, function (response) {
        if (response.success == false) {
            $.notify("Error getting data from server!", { type: "danger" });

        }
        else {
            $('#formPhylum').addClass("is-filled");
            $('#formClass').addClass("is-filled");
            $('#formOrder').addClass("is-filled");
            $('#formFamily').addClass("is-filled");
            $('#formGenus').addClass("is-filled");
            $('#formSpecies').addClass("is-filled");

            $('input[name=modalPhylum]').val(response.data.phylum);
            $('input[name=modalClass]').val(response.data.class);
            $('input[name=modalOrder]').val(response.data.order);
            $('input[name=modalFamily]').val(response.data.family);
            $('input[name=modalGenus]').val(response.data.genus);
            $('input[name=modalSpecies]').val(response.data.species);
        }
    });

    let html;
    $('#exampleModalCenter').html(html);
}


function updateBacteriaTaxon() {

    console.log(globalId + "UPDATE");
    let url = "/updateBacteriaTaxon/" + globalId;
    console.log(url);
    let data = $("#editBacteriaTaxonForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClick = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }

    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        isClick = 0;
        console.log("Yieeee LOLL");
        swal({
            title: 'Update Bacteria Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        bacteriaTaxonList();
                    }
                });
            }
        })
    }
}

/**
 * End: Edit Bacteria Taxonmy
 */

/**
 * Start: Toxins
 */
function addToxin(eAdd) {
    eAdd.preventDefault();

    if (isClick != 0) {
        return;
    }
    isClick++

    let data = $("#toxinForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClick = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }

    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
    }

    else {
        swal({
            title: 'Add Bacteria Toxin',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/toxin", dataInsert, function (response) {
                    isClick=0;
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        toxinList();
                        clearToxin();
                    }
                });
            }
        })
    }

}

function clearToxin(){
    $('input[name=strToxinName]').val("");
    $('textarea[name=strStructureFeature]').val("");
    $('textarea[name=strFunction]').val("");
}
/**
 * End: Toxins
 */

 /**
  * Start: Taxon List
  */

function toxinList(){
    $.get("/toxinList",function(response){
        if(response.success == false) {
            $.notify("Error getting data from the server!",{type:"danger"});
        }

        else{
            let data = response.data;
            let html = "";

            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.name + "</td>";
                row += "<td>" + element.structureFeature + "</td>";
                row += "<td>" + element.function + "</td>";
                row += "<td onclick='editToxin(" + element.toxinID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });
            $('#toxinTableList').html(html);
            $('#toxinTable').DataTable();
        }
    });
}
 /**
  * End: Taxon List
  */

/**
 * Start: Edit Taxon 
 */

let globalToxinID = 0;
function editToxin(toxinID){

    globalToxinID = toxinID;
    console.log(globalToxinID + "AKO YON");
    let url = "/editToxin/" + globalToxinID;

    $.get(url,function(response){
        isClick = 0;

        if(response.success == false) {
            S.notify("Error getting data from the server!");
        }

        else {
            console.log("hi");
            $('input[name=modalToxinName]').val(response.data.name);
            $('textarea[name=modalStructureFeature]').val(response.data.structureFeature);
            $('textarea[name=modalFunction]').val(response.data.toxinFunction);
        }
    });
}

function updateToxin() {

    console.log(globalToxinID +"UPDATE NA KO"); 
    let url = "/updateToxin/" + globalToxinID;
    console.log(url);
    let data = $("#editToxinForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element,index) => {
        console.log(element.name +":"+element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClick = 0;
        }

        else {
            dataInsert[element.name] = element.value;
        }
    });

    if(errCount>0) {
        $.notify("All fields must be field!",{type:"danger"});
    }

    else if(invCount>0) {
        $.notify("Invalid Characters!",{type:"danger"});
    }

    else {
        swal({
            title: 'Update Bacteria Toxin',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    isClick=0;
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        toxinList();
                    }
                });
            }
        });
    }
}
/**
 * End: Edit Taxon 
 */

 


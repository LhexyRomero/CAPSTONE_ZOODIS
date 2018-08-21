$(function () {
    toSelectAnimal();
    bacteriaTaxonList();
    toSelectJournal();
    toSelectBacteria();
    toxinList();
});
let isClick = 0;

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
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
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
        swal({
            title: 'Add Bacteria Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/contri_bacteriaTaxon", dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
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

function bacteriaTaxonList() {
    $.get("/contri_bacteriaTaxonList", function (response) {

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";
            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.genus + "</td>";
                row += "<td>" + element.species + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewBacteriaTaxon(" + element.bacteriumTaxoID + ")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><font color = #18ce0f><em>" + element.status + "</em></font></td>";
                }
                else {
                    row += "<td><font color = #f96332><em>" + element.status + "</em></font></td>";
                }
                row += "</tr>";
                html += row;
            });
            $('#bacteriataxonTableList').html(html);
            $('#bacteriataxonTable').dataTable();
        }

    });
}

let viewID = 0;
function viewBacteriaTaxon(id) {
    viewID = id;
    let url = "/contri_viewBacteriaTaxon/" + viewID;

    $.get(url, (response) => {
        if (response.success === false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let statusApproved = "<font color = #18ce0f><em>" + response.data.status + "</em></font>";
        let statusPending = "<font color = #f96332><em>" + response.data.status + "</em></font>";
        let statusRejected = "<font color=red><em>" +response.data.status+ "</em></font>";
        if (response.data.status === 'approved') {
            $('#status').html(statusApproved);
            $('#phylum').html(response.data.phylum);
            $('#classs').html(response.data.classs);
            $('#order').html(response.data.order);
            $('#family').html(response.data.family);
            $('#genus').html(response.data.genus);
            $('#species').html(response.data.species);
            $('#name').html(response.data.title);
        }

        else if(response.data.status === 'rejected'){
            $('#status').html(statusRejected);
            $('#phylum').html(response.data.phylum);
            $('#classs').html(response.data.classs);
            $('#order').html(response.data.order);
            $('#family').html(response.data.family);
            $('#genus').html(response.data.genus);
            $('#species').html(response.data.species);
            $('#name').html(response.data.title);
        }

        else {
            $('#status').html(statusPending);
            $('#phylum').html(response.data.phylum);
            $('#classs').html(response.data.classs);
            $('#order').html(response.data.order);
            $('#family').html(response.data.family);
            $('#genus').html(response.data.genus);
            $('#species').html(response.data.species);
            $('#name').html(response.data.title);
        }
    });
}

function toSelectBacteria() {
    $.get("/contri_toSelectBacteria", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.bacteriumID + ">" + element.bacteriumScientificName + "</option>";
        });
        $('#toSelectBacteria').html(html);
    });
};

function toSelectAnimal() {
    $.get("/contri_toSelectAnimal", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        console.log(data);
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.animalID + ">" + element.animalScientificName + "</option>";
        });
        $('#toSelectAnimal').html(html);
    });
}

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
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('textarea[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClick = 0;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
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
                $.post("/contri_toxin", dataInsert, function (response) {
                    isClick = 0;
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
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

function clearToxin() {
    $('select[name=selectBacteria').val("");
    $('input[name=strToxinName]').val("");
    $('textarea[name=strStructureFeature]').val("");
    $('textarea[name=strFunction]').val("");
}

function toxinList() {
    $.get("/toxinList", function (response) {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";

            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.name + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewToxin(" + element.toxinID + ")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><font color = #18ce0f><em>" + element.status + "</em></font></td>";
                }
                else if (element.status === "rejected") {
                    row += "<td><font color = red><em>" + element.status + "</em></font></td>";
                }
                else {
                    row += "<td><font color = #f96332><em>" + element.status + "</em></font></td>";
                }
                row += "</tr>";
                html += row;
            });
            $('#toxinTableList').html(html);
            $('#toxinTable').dataTable();
        }
    });
}

let viewToxinID = 0;
function viewToxin(id) {
    console.log("LEKI");
    viewToxinID = id;
    let url = "/contri_viewToxin/" + viewToxinID;
    console.log(url);

    $.get(url, (response) => {
        if (response.success === false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let statusApproved = "<font color = #18ce0f><em>" + response.data.status + "</em></font>";
        let statusPending = "<font color = #f96332><em>" + response.data.status + "</em></font>";
        let statusRejected = "<font color=red><em>" +response.data.status+ "</em></font>";

        if (response.data.status === 'approved') {
            $('#viewToxinName').html(response.data.name);
            $('#status').html(statusApproved);
            $('#structureFeature').html(response.data.feature);
            $('#function').html(response.data.function);
        }

        else if(response.data.status === 'rejected'){
            $('#viewToxinName').html(response.data.name);
            $('#status').html(statusRejected);
            $('#structureFeature').html(response.data.feature);
            $('#function').html(response.data.func);
        }

        else {
            $('#viewToxinName').html(response.data.name);
            $('#status').html(statusPending);
            $('#structureFeature').html(response.data.feature);
            $('#function').html(response.data.func);
        }
    });
}

function toSelectJournal() {
    $.get("/contri_toSelectJournal1", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.journalID + ">" + element.code + "</option>";
        });
        $('#toSelectJournal').html(html);
    });
};

function addBacteria(eAdd) {
    eAdd.preventDefault();

    if (isClick != 0) {
        return;
    }
    isClick++;

    let data = $("#bacteriaForm").serializeArray();
    let errCount = 0;
    let numCount = 0;
    let strCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        isClick = 0;
        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
        }

        else if ($('select[name=toSelect]').val().match(/[a-zA-Z*#\/]/g) != null && $('input[type=number]').val().match(/[a-zA-Z*#\/]/g) != null) {
            $('select[name=toSelect]').css("background", "#feebeb");
            $('input[type=number]').css("background", "#feebeb");
            numCount++;
        }

        else if ($('input[type=text]').val().match(/[0-9*#\/]/g) != null) {
            $('input[type=text]').css("background", "#feebeb");
            strCount++;
        }

        else {
            dataInsert[element.name] = element.value;
        }
    });

    if (errCount > 0) {
        $.notify("All fields must be filled!", { type: "danger" });
    }

    else if (numCount > 0) {
        $.notify("Invalid input!", { type: "danger" });
    }

    else if (strCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
    }

    else {
        let submit = () => {
            $.post("/contri_bacteria", dataInsert, (response) => {
                isClick = 0;
                if (response.success == false) {
                    isClick = 0;

                    if (response.error == 1) {
                        $.notify(response.detail, { type: "danger" });
                    }

                    else if (response.error == 2) {
                        $.notify(response.detail, { type: "danger" });
                    }

                    else if (response.error == 3) {
                        $.notify(response.detail, { type: "danger" });
                    }

                    else {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }
                }
                else {
                    if (response.data) {
                        $.notify("Check before Saving!", { type: "primary" });
                        $("input[name=strScientificName]").val(response.data.scientificName);
                        $("input[name=strPhylum]").val(response.data.phylum);
                        $("input[name=strClass]").val(response.data.class);
                        $("input[name=strOrder]").val(response.data.order);
                        $("input[name=strFamily]").val(response.data.family);
                        $("input[name=strGenus]").val(response.data.genus);
                        $("input[name=strSpecies]").val(response.data.species);

                        $("#toSubmitBacteria").html("Save");
                        isInsertBacteria = 1;
                    }

                    else {
                        swal({
                            title: "Success!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }
                }
            });
        }

        if (isInsertBacteria) {
            dataInsert.isInserting = 1;
            swal({
                title: 'Add Bacteria',
                text: "Are you sure?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes'
            }).then((isConfirmed) => {
                submit();
            });
        }
        else {
            submit();
        }
    }
}

function clearBacteria() {
    $("select[name=toSelect]").val("");
    $("input[name=strSpeciesName]").val("");
    $("input[name=strGenusName]").val("");
    $("input[name=strTissueSpecifity]").val("");
    $("input[name=strSampleType]").val("");
    $("input[name=strMethodOfIsolation]").val("");
    $("input[name=strMethodOfIdentification]").val("");

}




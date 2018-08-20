$(function () {
    bacteriaTaxonList();
    toSelectJournal();
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
    url = "/contri_viewBacteriaTaxon/" + viewID;

    $.get(url, (response) => {
        if (response.success === false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let statusApproved = "<font color = #18ce0f><em>" + response.data.status + "</em></font>";
        let statusPending = "<font color = #f96332><em>" + response.data.status + "</em></font>";
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
            html += "<option value=" + element.bacteriumTaxoID + ">" + element.bacteriumScientificName + "</option>";
        });
        $('#toSelectBacteria').html(html);
    });
};

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



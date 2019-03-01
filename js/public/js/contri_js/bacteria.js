$(function () {
    toSelectAnimal();
    toSelectBacteria();
    bacteriaTaxonList();
    toSelectJournal();
    toxinList();
    bacteriaList();

    $("input[name=strSpeciesName]").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bacteriaSpecies/?data=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $("input[name=strGenusName]").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bacteriaGenus/?data=" + req.term + "&species=" + $('input[name=strSpeciesName').val() + "",
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                },
            });
        },
    });
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
            title: 'Are you sure?',
            text: "Add Bacteria Taxon",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/contri_bacteriaTaxon", dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
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

    $('input[select=selectJournal]').val("");
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
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewBacteriaTaxon(" + element.bacteriumTaxoID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><span class='badge badge-success'>"+element.status+"</span></td>";
                }
                else {
                    row += "<td><span class='badge badge-default'>" + element.status + "</span></td>";
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
        //<span class='badge badge-success'>approved</span>
        let statusApproved = "<span class='badge badge-success'>" + response.data.status + "</span>";
        let statusPending = "<span class='badge badge-default'>" + response.data.status + "</span>";
        let statusRejected = "<span class='badge badge-danger'>" + response.data.status + "</span>";
        
        if (response.data.status == 'approved') {
            $('#status').html(statusApproved);
            $('#phylum').html(response.data.phylum);
            $('#classs').html(response.data.classs);
            $('#order').html(response.data.order);
            $('#family').html(response.data.family);
            $('#genus').html(response.data.genus);
            $('#species').html(response.data.species);
            $('#name').html(response.data.title);
        }

        else if (response.data.status == 'rejected') {
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
}

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
            html += "<option value=" + element.animalID + ">" + element.animalName + "</option>";
        });
        $('#toSelectAnimal').html(html);
        $('#toModalBacteria').html(html);
    });
}

function passToxin(result){
    $("input[name=forToxin").val(result[0].toxinID);
    $("#toDisplayToxin").val(result[0].name);
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
        isClick = 0;
        swal({
            title: 'Are you sure?',
            text: "Add Bacteria Toxin",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/contri_toxin", dataInsert, function (response) {
                    isClick = 0;
                    console.log(response);
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                        clearToxin();
                    }

                    else if(response.error == 1 ){
                        $.notify(response.detail,{type:"warning"});
                        $("#addCarrier").modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $("#addCarrier").modal('hide');
                        passToxin(response.data);
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                        toxinList();
                        clearToxin();
                    }
                });
            }
            else {
                isClick =0;
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
    $.get("/contri_toxinList", function (response) {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";

            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.name + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewToxin(" + element.toxinID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><span class='badge badge-success'>"+element.status+"</span></td>";
                }
                else if (element.status === "rejected") {
                    row += "<td><span class='badge badge-danger'>"+element.status+"</span></td>";
                }
                else {
                    row += "<td><span class='badge badge-default'>"+element.status+"</span></td>";
                }
                row += "</tr>";
                html += row;
            });
            $('#toxinList').html(html);
            $('#toxinTable').dataTable();
        }
    });
}

let viewToxinID = 0;
function viewToxin(id) {
    viewToxinID = id;
    let url = "/contri_viewToxin/" + viewToxinID;

    $.get(url, (response) => {
        if (response.success === false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let statusApproved = "<span class='badge badge-success'>"+response.data.status+"</span>";
        let statusPending = "<span class='badge badge-default'>"+response.data.status+"</span>";
        let statusRejected = "<span class='badge badge-danger'>"+response.data.status+"</span>";

        if (response.data.status == "approved") {
            $('#viewToxinName').html(response.data.name);
            $('#status').html(statusApproved);
            $('#structureFeature').html(response.data.feature);
            $('#function').html(response.data.func);
        }

        else if (response.data.status == "rejected") {
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


function clearBacteria() {
    $("select[name=toSelect]").val("");
    $("input[name=strSpeciesName]").val("");
    $("input[name=strGenusName]").val("");
    $("input[name=strTissueSpecifity]").val("");
    $("input[name=strSampleType]").val("");
    $("input[name=strMethodOfIsolation]").val("");
    $("input[name=strMethodOfIdentification]").val("");

}

function addBacteria(eAdd) {
    eAdd.preventDefault();

    if (isClick != 0) {
        return;
    }
    isClick++;

    let data = $("#bacteriaForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        isClick = 0;
        if (element.value == "") {
            $('select[name=' + element.name + ']').css("background", "#feebeb");
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
            title: 'Are you sure?',
            text: "Add Bacteria",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
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

                        else if(response.error == 4) {
                            $.notify(response.detail,{type:"warning"});
                            $("#addHost").modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                            $("#addHost").modal('hide');
                            passResult(response.data);
                        }
                        
                        else {
                            swal({
                                title: "Error!",
                                text: response.detail,
                                type: "error",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay",
                                allowOutsideClick: false
                            });
                        }
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    clearBacteria();
                    bacteriaList();
                    }
                });
            }
        });
    }
}

function clearBacteria() {
    $("select[name=toAnimal]").val("");
    $("select[name=selectJournal]").val("");
    $("input[name=strSpeciesName]").val("");
    $("input[name=strGenusName]").val("");
    $("input[name=strTissueSpecifity]").val("");
    $("input[name=strSampleType]").val("");
    $("input[name=strMethodOfIsolation]").val("");
    $("input[name=strMethodOfIdentification]").val("");
    $("input[name=strGramStain]").val("");
    $("input[name=strLength]").val("");
    $("input[name=strWidth]").val("");
    $("input[name=strShape]").val("");
    $("input[name=strMotility]").val("");
    isClick = 0;
}

function bacteriaList() {
    $.get("/contri_bacteriaList",(response)=>{

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";
            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.bacteriumScientificName + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewBacteria(" + element.bacteriumID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><span class='badge badge-success'>"+element.status+"</span></td>";
                }
                else if(element.status === "rejected") {
                    row += "<td><span class='badge badge-danger'>"+element.status+"</span></td>";
                }
                else {
                    row += "<td><span class='badge badge-default'>"+element.status+"</span></td>";
                }
                row += "</tr>";
                html += row;
            });
            $('#bacteriaList').html(html);
            $('#bacteriaTable').dataTable();
        }
    });
}

let viewbacteriaID = 0;

function viewBacteria(id){

    viewbacteriaID = id;
    let url = "/contri_viewBacteria/"+viewbacteriaID;
    $.get(url,(response)=>{
        if(response.success === false) {
            $.notify("Error getting data from the Server!",{type:"danger"});
        }

        let data = response.data;
        let html = "";

        let bacteriaName = "<h5><font color='#9c27b0'><em><b>" + data.scientificName + "</b></em></font></h5>";
        let animalName = "<label>"+data.animalName+"</label>";
        let tissueName = "<label>"+data.tissueSpecifity+"</label>";
        let sampleName = "<label>"+data.sampleType+"</label>";
        let isolationName = "<label>"+data.isolation+"</label>";
        let identificationName = "<label>"+data.identification+"</label>";
        let phylum = "<label>"+data.phylum+"</label>";
        let classs = "<label>"+data.class+"</label>";
        let order ="<label>"+data.order+"</label>";
        let family =  "<label>"+data.family+"</label>";
        let genus = "<label>"+data.genus+"</label>";
        let species = "<label>"+data.species+"</label>";
        let gramStain = "<label>"+data.gramStain+"</label>";
        let length ="<label>"+data.length+"</label>";
        let width ="<label>"+data.width+"</label>";
        let shape ="<label>"+data.shape+"</label>";
        let motility ="<label>"+data.motility+"</label>";
        let status = "";
        if (data.status === "approved") {
            status = "<span class='badge badge-success'>"+response.data.status+"</span>"
        }

        else if (data.status === "pending") {
            status = "<span class='badge badge-default'>"+response.data.status+"</span>"
        }

        else {
            status = "<span class='badge badge-danger'>"+response.data.status+"</span>"
        }

        data.animal.forEach((element, index) => {
            let list = "<ul style='padding-left:0;'>";
            list += "<li>" + element.animalName + "</li>";
            list += "</ul>";
            html += list;
        });

        $("#listAnimal").html(html);
        $("#status").html(status);
        $("#bacteriaName").html(bacteriaName);
        $("#animalName").html(animalName);
        $("#tissueName").html(tissueName);
        $("#sampleName").html(sampleName);
        $("#isolationName").html(isolationName);
        $("#identificationName").html(identificationName);
        $("#phylum").html(phylum);
        $("#classs").html(classs);
        $("#order").html(order);
        $("#family").html(family);
        $("#genus").html(genus);
        $("#species").html(species);
        $("#gramStain").html(gramStain);
        $("#length").html(length);
        $("#width").html(width);
        $("#shape").html(shape);
        $("#motility").html(motility);
    });
}


function passToxin(result){
    console.log(result);
    $("input[name=forToxin").val(result[0].toxinID);
    $("#toDisplayToxin").val(result[0].name);
}

function addHost(){
    let data = $("#hostForm").serializeArray();
    let errCount = 0;
    let dataInsert = {};
    console.log(data);

    if(data[0].value =="" || data[1].value ==""){
        $('select[name=toModal]').css("background", "#feebeb");
        $('select[name=toBacteria]').css("background", "#feebeb");
        errCount++;
    }

    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
    }

    if(errCount>0){
        $.notify("Select Animal and Bacteria!",{type:"danger"});
    }

    else {
        swal({
            title: 'Are you sure?',
            text: "Add Animal Hosts",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/contri_bacteriaHost",dataInsert,(response)=>{
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Added!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                        $('#addHost').modal("hide");
                        clearBacteria();
                    }
                });
            }
        });
            
    }
}

function addCarrier(){
    let data = $("#carrierForm").serializeArray();
    let errCount = 0;
    let dataInsert = {};
    console.log(data);

    if(data[0].value =="" || data[1].value ==""){
        $('select[name=toModal]').css("background", "#feebeb");
        errCount++;
    }

    else {
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
    }

    if(errCount>0){
        $.notify("Select Bacteria!",{type:"danger"});
    }

    else {
        swal({
            title: 'Are you sure?',
            text: "Add Carrier Bacteria",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/carrier",dataInsert,(response)=>{
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: response.detail,
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Added!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                        $('#addCarrier').modal("hide");
                        clearToxin();
                    }
                });
            }
        });
            
    }

}




$(function () { //onload
    toSelectBacteria();
    bacteriaTaxonList();
    toSelectBacteria2();
    toSelectBacteria3();
    toSelectJournalBacteria();
    toxinList();
    bacteriaList();
    //toModalSelect(); leki: error

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

    $("select[name=toSelect]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strSpeciesName]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strGenusName]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strTissueSpecifity]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strSampleType]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strMethodOfIsolation]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strMethodOfIdentification]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strGramStain]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strLength]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strWidth]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strShape]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $("input[name=strMotility]").on("keyup" , function(){
        isInsertBacteria = 0;
        $("#toSubmitBacteria").html("Add");
    });

    $('input[name=strSpecies]').on('focus', function(){
        if($('input[name=strGenus]').val() != ""){
            taxoBacSearch = true;
        }
    });

    let loading = null
    $('input[name=strSpecies]').on('change', function(){
        if(!loading){
            let genus = $('input[name=strGenus]').val();
            let species =  $('input[name=strSpecies]').val();
            loading = $.ajax({
                type: "GET",
                url: "/search/bacteriaSpeciesTaxoData/?species=" + species + "&genus=" + genus,
                success: (response) => {
                    loading = false;
                    if(Object.keys(response.data).length != 0){
                        $("input[name=strFamily]").val(response.data.family);
                        $("input[name=strOrder]").val(response.data.ordo);
                        $("input[name=strClass]").val(response.data.class);
                        $("input[name=strPhylum]").val(response.data.phylum);
                    }
                    
                },
                error: (response) => {
                    console.log(response.detail);
                    loading = false;
                }
            });
        }
    });

    $('input[name=strSpecies]').autocomplete({
        source: (req, res) => {
            if(taxoBacSearch){
                let genus = $('input[name=strGenus]').val();
                $.ajax({
                    type: "GET",
                    url: "/search/bacteriaSpeciesTaxo/?data=" + req.term + "&genus=" + genus,
                    success: (response) => {
                        res(response.data);
                    },
                    error: (response) => {
                        console.log(response.detail);
                    }
                });
            }else{
                res([]);
            }
        },
    });
});
let taxoBacSearch = false;
let isClick = 0;
function toSelectBacteria() {
    $.get("/toSelectBacteria", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.animalID + ">" + element.animalName + "</option>";
        });
        $('#toSelectBacteria').html(html);
        $('#toModalBacteria').html(html);
    });
};

function toSelectJournalBacteria() {
    $.get("/toSelectJournalBacteria", (response) => {
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
        console.log("Yieeee accpeted");
        swal({
            title: 'Are you sure?',
            text: "Add Bacteria Taxon",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/bacteriaTaxon", dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Added!",
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

    $('select[name=selectJournal]').val("");
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    isClick = 0;
}

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
                row += "<td onclick='editBacteriaTaxon(" + element.bacteriumTaxoID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-round btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });

            $('#bacteriataxonTableList').html(html);
            $('#bacteriaTaxonTable').DataTable();
        }

    });
}

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
            title: 'Are you sure?',
            text: "Update Bacteria Taxon",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Updated!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        $('#exampleModalCenter').modal("hide");
                        bacteriaTaxonList();
                    }
                });
            }
        })
    }
}
//End: Edit Bacteria Taxonmy


//Start: Toxins
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
        isClick = 0;
    }

    else if (invCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
        isClick = 0;
    }

    else {
        swal({
            title: 'Are you sure?',
            text: "Add Bacteria Toxin",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/toxin", dataInsert, function (response) {
                    isClick = 0;
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Added!",
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
    $('select[name=selectBacteria2]').val("");
    $('input[name=strToxinName]').val("");
    $('textarea[name=strStructureFeature]').val("");
    $('textarea[name=strFunction]').val("");
}
// End: Toxins

//Start: Taxon List
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
                row += "<td>" + element.structureFeature + "</td>";
                row += "<td onclick='editToxin(" + element.toxinID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-round btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });
            $('#toxinTableList').html(html);
            $('#toxinTable').DataTable();
        }
    });
}
//End: Taxon List


//Start: Edit Taxon  
let globalToxinID = 0;
function editToxin(toxinID) {

    globalToxinID = toxinID;
    console.log(globalToxinID + "AKO YON");
    let url = "/editToxin/" + globalToxinID;

    $.get(url, function (response) {
        isClick = 0;

        if (response.success == false) {
            S.notify("Error getting data from the server!");
        }
        else {
            $('select[name=modalSelect]').val(response.data.bacteriumID);
            $('input[name=modalToxinName]').val(response.data.name);
            $('textarea[name=modalStructureFeature]').val(response.data.structureFeature);
            $('textarea[name=modalFunction]').val(response.data.toxinFunction);
        }
    });
}

function updateToxin() {

    console.log(globalToxinID + "UPDATE NA KO");
    let url = "/updateToxin/" + globalToxinID;
    console.log(url);
    let data = $("#editToxinForm").serializeArray();
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
        $.notify("All fields must be field!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Characters!", { type: "danger" });
    }

    else {
        swal({
            title: 'Are you sure?',
            text: "Update Bacteria Toxin",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    isClick = 0;
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
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
                        $("#exampleModalCenter").modal("hide");
                    }
                });
            }
        });
    }
}

let isInsertBacteria = 0;
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
            $.post("/bacteria", dataInsert, (response) => {
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
                        $.notify(response.detail,{type:"warning"});
                        $("#addHost").modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $("#addHost").modal('hide');
                    }
                }
                else {
                    if (response.data) {
                        $.notify("Check before Saving!",{type: "primary"});
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
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        clearBacteria();
                        bacteriaList();
                        $("#toSubmitBacteria").html("Add");
                    }
                }
            });
        }

        if(isInsertBacteria){
            dataInsert.isInserting = 1;
            swal({
                title: 'Are you sure?',
                text: "Add Bacteria",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9c27b0',
                confirmButtonText: 'Yes'
            }).then((isConfirmed) => {
                submit();
            });
        }
        else{
            submit();
        }
    }
}

function clearBacteria() {
    $("select[name=selectJournal]").val("");
    $("select[name=toSelect]").val("");
    $("input[name=strSpeciesName]").val("");
    $("input[name=strGenusName]").val("");
    $("input[name=strTissueSpecifity]").val("");
    $("input[name=strSampleType]").val("");
    $("input[name=strMethodOfIsolation]").val("");
    $("input[name=strMethodOfIdentification]").val("");
    $("input[name=strPhylum]").val("");
    $("input[name=strClass]").val("");
    $("input[name=strOrder]").val("");
    $("input[name=strFamily]").val("");
    $("input[name=strGenus]").val("");
    $("input[name=strSpecies]").val("");
    $("input[name=strScientificName]").val("");
}

function bacteriaList() {
    $.get("/bacteriaList",(response) =>{
        if(response.success == false) {
            $.notify("Error getting data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.bacteriumScientificName + "</td>";
                row += "<td>" + element.bacteriumTissueSpecifity + "</td>";
                row += "<td><a data-toggle='modal' href='#exampleModalCenter'><button onclick = 'editBacteria(" + element.bacteriumID + ")' type='button' rel='tooltip' class='btn btn-round btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#viewModal'><button onclick = 'viewBacteria(" + element.bacteriumID + ")' type='button' rel='tooltip' class='btn btn-round btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });

            $('#bacteriaList').html(html);
            $('#bacteriaTable').DataTable();
    });
}

let globalBacteriumID = 0 ;

function viewBacteria(id) {
    globalBacteriumID = id;
    let url = "/viewBacteria/" + globalBacteriumID;
    console.log(url);
    $.get(url,(response)=>{
        if(response.success == false) {
            $.notify("Error getting Data from the Server!", {type:"danger"});
            return;
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

        data.animal.forEach((element, index) => {
            let list = "<ul style='padding-left:0;'>";
            list += "<li>" + element.animalName + "</li>";
            list += "</ul>";
            html += list;
        });

        $("#listAnimal").html(html);
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
    });

}


let hostCount = 0;
function editBacteria(id) {
    globalBacteriumID = id;
    let url = "/editBacteria/"+globalBacteriumID;
    console.log(url);

    $.get(url,(response)=>{

        if(response.success == false) {
            $.notify("Error getting data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;

        data.animal.forEach((element,index) => {
            console.log(data.animal);
            let html ="<input class='form-control' name='addHost"+hostCount+"' value='"+ element.animalName +"' type = 'text'/><br>";
            let buttonName = "buttonEdit" + hostCount;
            let button = '<button name="' + buttonName + '"type="button" onclick ="deleteHostField(' + hostCount +","+element.animalID+ "," + element.bacteriumID+')" rel="tooltip" title="" class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral" data-original-title="Remove"><i class="now-ui-icons ui-1_simple-remove"></i></button>';
        
            let newDiv = "<div class='hostDiv deleteHost" + hostCount + " row'>" + "<div class='col-sm-10'>" + html + "</div><div class='col-sm-2'>" + button + "</div>";
        
            $("#modalHost").append(newDiv); 
            hostCount++;
        });

        $("select[name=toSelect]").val(response.data.animalID);
        $('input[name=modalGenusName]').val(response.data.genusName);
        $("input[name=modalSpeciesName]").val(response.data.speciesName);
        $("input[name=modalScientificName]").val(response.data.scientificName);
        $("input[name=modalTissue]").val(response.data.tissueSpecifity);
        $("input[name=modalSample]").val(response.data.sampleType);
        $("input[name=modalIsolation]").val(response.data.isolation);
        $("input[name=modalIdentification]").val(response.data.identification);
        $("input[name=modalPhylum]").val(response.data.phylum);
        $("input[name=modalClass]").val(response.data.class);
        $("input[name=modalOrder]").val(response.data.order);
        $("input[name=modalFamily]").val(response.data.family);
        $("input[name=modalGenus]").val(response.data.genus);
        $("input[name=modalSpecies]").val(response.data.species);
    });
}

function deleteHostField(selected,hostID,bacteriumID){
    $('.deleteHost' + selected).remove();
}


function updateBacteria(hostID) {

    let url = "/updateBacteria/"+globalBacteriumID;
    let data = $("#editBacteriaForm").serializeArray();
    let errCount = 0;
    let numCount = 0;
    let strCount = 0;
    let dataInsert = {};

    data.forEach((element,index) => {
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
        swal({
            title: 'Are you sure?',
            text: "Update Bacteria",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
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
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay"
                            });
                        }
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        
                        $("#exampleModalCenter").modal("hide");
                        bacteriaList();
                    }
                });
            }
        });
    }


}

function toSelectBacteria2() {
    $.get("/toSelectBacteria2", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.bacteriumID + ">" + element.bacteriumScientificName + "</option>";
        });
        $('#toSelectBacteria2').html(html);
    });
}

function addHost(){

    let data = $("#hostForm").serializeArray();
    let errCount = 0;
    let dataInsert = {};

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
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/bacteriaHost",dataInsert,(response)=>{
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Unable to add Animal Host!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                    }
                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Added!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        $('#addHost').modal("hide");
                        clearBacteria();
                    }
                });
            }
        });
           
    }

}

function toSelectBacteria3() {
    $.get('/toSelectBacteria3',(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }
        console.log(response.data);
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.bacteriumID + ">" + element.bacteriumScientificName + "</option>";
        });
        $('#toModalSelectB').html(html);
    });
}


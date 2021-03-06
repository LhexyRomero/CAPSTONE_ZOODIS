$(function () { //onload
    animalTaxonList();
    animalList();
    toSelectJournal();
    $('.searchAnimal').autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/animal/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        },
    });

    $("input[name=strCommonName]").on("keyup", function () {
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });

    $("input[name=strScientificName]").on("keyup", function () {
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });

    $("input[name=strBodySite]").on("keyup", function () {
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });
});

let isClicked = 0;
let isInsertAnimal = 0;

function addAnimal(e) {
    e.preventDefault();

    //to prevent spam
    if (isClicked != 0) {
        return;
    }
    isClicked++

    let data = $("#animalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = new FormData($("#animalForm")[0]);

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
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
            //dataInsert.append(element.name,element.value);
        }

    });

    if (errCount > 0) {
        $.notify("Fields must be filled out!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        let submit = function () {
            $.ajax({
                type: "POST",
                url: "/animal",
                data: dataInsert,
                processData: false,
                contentType: false,
                success: function (response) {
                    isClicked = 0;
                    if (response.success == false) {
                        isClicked = 0;

                        if (response.error == 1) {
                            $.notify(response.detail, { type: "danger" });
                        }

                        else if (response.error == 2) {
                            $.notify(response.detail, { type: 'danger' });
                        }

                        else if (response.error == 3) {
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
                            $.notify(response.detail, { type: "danger" });
                        }

                    }
                    else {

                        if (response.data) {
                            $("input[name=strPhylum]").val(response.data.phylum);
                            $("input[name=strClass]").val(response.data.class);
                            $("input[name=strOrder]").val(response.data.order);
                            $("input[name=strFamily]").val(response.data.family);
                            $("input[name=strGenus]").val(response.data.genus);
                            $("input[name=strSpecies]").val(response.data.species);
                            $("#toSubmitAnimal").html("Save");
                            isInsertAnimal = 1;
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
                            clearAnimal();
                        }
                    }
                }
            });
        };

        if (isInsertAnimal) { //kapag mag iinsert
            dataInsert.append('isInserting', 1)
            swal({
                title: "Are you sure?",
                text: "Add Animal Taxon",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#9c27b0",
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                allowOutsideClick: false
            }).then(function (isConfirmed) {
                if(isConfirmed){
                    submit();
                }
                else{
                    $('toSubmitAnimal').on("click", function(){
                    });
                }
            });
        } else {
            submit();
        }
    }
}

function clearAnimal(eClear) {

    $('#dismiss').removeClass("fileinput-exists").addClass("fileinput-new");
    $('input[name=strCommonName]').val("");
    $('input[name=strScientificName]').val("");
    $('input[name=strBodySite]').val("");
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    $('select[name=selectJournal]').val('').trigger('chosen:updated');
    $('select[name=selectJournal]').val("");
    $("#toSubmitAnimal").html("Add");
    isClicked = 0;
}

function addAnimalTaxon(eAdd) {
    eAdd.preventDefault();

    if (isClicked != 0) {
        return
    }
    isClicked++;

    let data = $("#animalTaxonForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

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
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        isClicked = 0;
        console.log("Yieeee accpeted");
        swal({
            title: 'Are you sure?',
            text: "Add Animal Taxon",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/animalTaxon", dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
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
                        animalTaxonList();
                        clearAnimalTaxon();
                    }
                });
            }
        })
    }
}

function clearAnimalTaxon(eClear) {

    isClicked = 0;
    $('select[name=selectJournal').val("");
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    console.log("nabura naman");

}
function animalTaxonList() {
    $.get("/animalTaxonList", function (response) {

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
                row += "<td onclick='editAnimalTaxon(" + element.animalTaxoID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' title='Edit' rel='tooltip' class='btn btn-round btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });
            $('#animaltaxonTableList').html(html);
            $('#animalTaxonTable').dataTable();
        }

    });
}
let globalIDa = 0;
function editAnimalTaxon(animalTaxoID) {

    globalIDa = animalTaxoID;
    console.log(globalIDa + "ID TO UPDATE")
    let url = "/editAnimalTaxon/" + animalTaxoID;

    $.get(url, function (response) {

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
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
function updateAnimalTaxon() {
    console.log(globalIDa + "SA UPDATE");
    let url = "/updateAnimalTaxon/" + globalIDa;
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};
    console.log(url);

    let data = $("#editAnimalTaxonForm").serializeArray();

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClicked = 0;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
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
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        isClicked = 0;
        console.log("Yieeee LOLL");
        swal({
            title: 'Are you sure?',
            text: "Update Animal Taxon",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9c27b0',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function (response) {
                    if (response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Successfully Updated!",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        });
                        $('#exampleModalCenter').modal("hide");
                        animalTaxonList();
                    }
                });
            }
        })
    }
}

function animalList() {
    $.get("/animalList",(response)=>{
        if(response.success == false) {
            $.notify("Error getting data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.animalName + "</td>";
            row += "<td>" + element.animalScientificName + "</td>";
            row += "<td><a data-toggle='modal' href='#exampleModalCenter2'><button onclick ='editAnimal("+element.animalID+")' type='button' rel='tooltip' title='Edit' class='btn btn-round btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a>&nbsp;<a data-toggle='modal' href='#viewModal2'><button onclick = 'viewAnimal("+element.animalID+")' type='button' rel='tooltip' title='View Details' class='btn btn-round btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
            row += "</tr>";
            html += row;
        });
        $('#animalList').html(html);
        $('#animalTable').dataTable();

    });
}

let globalAnimalID = 0;
function viewAnimal(id){

    globalAnimalID = id;
    let url = "/viewAnimal/"+globalAnimalID;

    $.get(url,(response)=>{
        if(response.success == false) {
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let animalName  = "<label>"+response.data.animalName+"</label>";
        let scientificName = "<label>"+response.data.animalScientificName+"</label>";
        let phylum = "<label>"+response.data.phylum+"</label>";
        let classs = "<label>"+response.data.classs+"</label>";
        let order = "<label>"+response.data.order+"</label>";
        let family = "<label>"+response.data.family+"</label>";
        let genus = "<label>"+response.data.genus+"</label>";
        let species = "<label>"+response.data.species+"</label>";

        //picture
        $('.animalPic').attr('src',response.data.image.replace('js\\public','assets'));
        $("#animalName2").html(animalName);
        $("#scientificName").html(scientificName);
        $("#phylum2").html(phylum);
        $("#classs2").html(classs);
        $("#order2").html(order);
        $("#family2").html(family);
        $("#genus2").html(genus);
        $("#species2").html(species);
    });
}

function editAnimal(id) {
    globalAnimalID = id;
    let url = "/viewAnimal/"+globalAnimalID;

    $.get(url, (response) =>{
        if(response.success == false ){
            $.notify("Error getting data from the Server!",{type:"danger"});
            return;
        }

        $('.previewAnimal').attr('src', response.data.image.replace('js\\public','assets'));
        $("#editPic").hide();
        $("input[name=modalCommonName]").val(response.data.animalName);
        $("input[name=modalScientificName]").val(response.data.animalScientificName);
        $("input[name=modalPhylum2]").val(response.data.phylum);
        $("input[name=modalClass2]").val(response.data.classs);
        $("input[name=modalOrder2]").val(response.data.order);
        $("input[name=modalFamily2]").val(response.data.family);
        $("input[name=modalGenus2]").val(response.data.genus);
        $("input[name=modalSpecies2]").val(response.data.species);
    });
}

function selectFile() {
    $("#prevAnimal").hide();
    $("#editPic").show();
}

function updateAnimal(){
    let dataInsert = new FormData($("#editAnimalForm")[0]);
    let data = $("#editAnimalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;

    data.forEach((element, index) => {

        if (element.value == "") {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClicked = 0;
        }

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
            //dataInsert.append(element.name,element.value);
        }

    });
    
    if (errCount > 0) {
        $.notify("Fields must be filled out!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        let submit = function () {
            $.ajax({
                type: "POST",
                url: "/editAnimal/"  + globalAnimalID,
                data: dataInsert,
                processData: false,
                contentType: false,
                success: function (response) {
                    isClicked = 0;
                    if (response.success == false) {
                        isClicked = 0;

                        if (response.error == 1) {
                            $.notify(response.detail, { type: "danger" });
                        }

                        else if (response.error == 2) {
                            $.notify(response.detail, { type: 'danger' });
                        }

                        else if (response.error == 3) {
                            $.notify(response.detail, { type: "danger" });
                        }

                        else {
                            $.notify(response.detail, { type: "danger" });
                        }

                    }
                    else {

                        if (response.data) {
                            $("input[name=strPhylum]").val(response.data.phylum);
                            $("input[name=strClass]").val(response.data.class);
                            $("input[name=strOrder]").val(response.data.order);
                            $("input[name=strFamily]").val(response.data.family);
                            $("input[name=strGenus]").val(response.data.genus);
                            $("input[name=strSpecies]").val(response.data.species);
                            $("#toSubmitAnimal").html("Save");
                            isInsertAnimal = 1;
                        }

                        else {
                            swal({
                                title: "Done!",
                                text: "Successfully Updated!",
                                type: "success",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay",
                                allowOutsideClick: false
                            });
                            $("#exampleModalCenter2").modal("hide");
                        }
                    }
                }
            });
        };
        swal({
            title: "Are you sure?",
            text: "Update Animal",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#9c27b0",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            allowOutsideClick: false
        }).then(function (isConfirmed) {
            if(isConfirmed){
                submit();
            }
        });
    }
}

function toSelectJournal() {
    $.get("/toSelectJournal", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "<option value=''>...</option>";
        data.forEach((element, index) => {
            html += "<option value=" + element.journalID + ">" +element.code+" - "+ element.name + "</option>";
        });
        $('#toSelectJournal').html(html);
    });
};
isClicked = 0;

$(function () {
    animalTaxonList();
    toSelectJournal();
    animalList();

    $('.searchAnimal').autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/animal/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                    console.log("dito");
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        },
    });
});

function addAnimal(eAdd) {
    eAdd.preventDefault();

    if (isClicked != 0) {
        return;
    }
    isClicked++;

    let data = $("#animalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = new FormData($("#animalForm")[0]);

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
            //dataInsert.append(element.name,element.value);
        }

    });

    if (errCount > 0) {
        $.notify("All Fields must be filled out!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
        swal({
            title: 'Add Animal Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "/contri_animal",
                    data: dataInsert,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        isClicked = 0;
        
                        if (response.success == false) {
                            isClicked = 0;
        
                            if(response.error == 1) {
                                $.notify(response.detail,{type:"danger"});
                                return;
                            }
                            else if(response.error == 2) {
                                $.notify(response.detail,{type:"danger"});
                                return;
                            }
                            else{
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
                            swal({
                                title: "Done!",
                                text: response.detail,
                                type: "success",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay"
                            });
                            animalList();
                            clearAnimal();
                        }
                        
                    }
                });
            }
        })
    }
}

function clearAnimal() {
    $('input[name=strCommonName]').val("");
    $('input[name=strScientificName]').val("");
    $('input[name=strBodySite]').val("");
    $('input[select=selectJournal]').val("");
    isClicked = 0;
}

function addAnimalTaxon(eAdd) {
    eAdd.preventDefault();

    if (isClicked != 0) {
        return;
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
        swal({
            title: 'Add Animal Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
        }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/contri_animalTaxon", dataInsert, function (response) {
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
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    $('select[name=selectJournal]').val("");

}

function animalTaxonList() {
    $.get("/contri_animalTaxonList", function (response) {
        console.log('im here SA TAXON');

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            console.log(data);
            let html = "";
            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.genus + "</td>";
                row += "<td>" + element.species + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewAnimalTaxon(" + element.animalTaxoID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><span class='badge badge-success'>" + element.status + "</span>";
                }
                else if (element.status === "rejected"){
                    row += "<td><span class='badge badge-danger'>" + element.status + "</span>";
                }
                else {
                    row += "<td><span class='badge badge-default'>" + element.status + "</span>";
                }
                row += "</tr>";
                html += row;
            });
            $('#animaltaxonTableList').html(html);
            $('#animalTaxonTable').dataTable();
        }

    });
}

let viewID = 0;
function viewAnimalTaxon(id) {
    viewID = id;
    url = "/contri_viewAnimalTaxon/" + viewID;

    $.get(url, (response) => {
        if (response.success === false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let statusApproved = "<span class='badge badge-success'>" + response.data.status + "</span>";
        let statusPending = "<span class='badge badge-default'>" + response.data.status + "</span>";
        let statusReject = "<span class='badge badge-danger'>" + response.data.status + "</span>";
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

        else if(response.data.status == 'rejected') {
            $('#status').html(statusReject);
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

function toSelectJournal() {
    $.get("/contri_toSelectJournal", (response) => {
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

function animalList() {
    $.get("/contri_animalList",(response)=>{

        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
        }

        else {
            let data = response.data;
            let html = "";
            data.forEach((element, index) => {
                let row = "<tr>";
                row += "<td>" + element.animalName + "</td>";
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewAnimal(" + element.animalID + ")' type='button' rel='tooltip' class='btn btn-round btn-primary btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if (element.status === "approved") {
                    row += "<td><span class='badge badge-success'>"+element.status+"</span></td>";
                }
                else if(element.status === "rejected") {
                    row += "<td><span class='badge badge-danger'>"+element.status+"</span></td>";
                }
                else {
                    row += "<td><span class='badge badge-default'>" + element.status + "</em></font></td>";
                }
                row += "</tr>";
                html += row;
            });
            $('#animalList').html(html);
            $('#animalTable').dataTable();
        }
    });
}

let globalAnimalID = 0;
function viewAnimal(id){

    globalAnimalID = id;
    let url = "/contri_viewAnimal/"+globalAnimalID;
    console.log(url);

    
    $.get(url,(response)=>{
        if(response.success == false) {
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }

        let animalName  = "<label>"+response.data.animalName+"</label>";
        let scientificName = "<label>"+response.data.animalScientificName+"</label>";
        let bodySite = "<label>"+response.data.bodySite+"</label>";
        let phylum = "<label>"+response.data.phylum+"</label>";
        let classs = "<label>"+response.data.classs+"</label>";
        let order = "<label>"+response.data.order+"</label>";
        let family = "<label>"+response.data.family+"</label>";
        let genus = "<label>"+response.data.genus+"</label>";
        let species = "<label>"+response.data.species+"</label>";
        let status ="";

        if(response.data.status === "approved"){
            status = "<td><span class='badge badge-success'>"+response.data.status+"</span></td>";
        }

        else if(response.data.status === "pending"){
            status = "<td><span class='badge badge-default'>"+response.data.status+"</span></td>";
        }
        
        else {
            status = "<td><span class='badge badge-danger'>"+response.data.status+"</span></td>";
        }

        $('.contri_animalPic').attr('src',response.data.image.replace('public','assets'));
        $("#animalName2").html(animalName);
        $("#scientificName").html(scientificName);
        $("#bodySite").html(bodySite);
        $("#phylum2").html(phylum);
        $("#classs2").html(classs);
        $("#order2").html(order);
        $("#family2").html(family);
        $("#genus2").html(genus);
        $("#species2").html(species);
        $("#status").html(status);
        $("#name").html(response.data.title);
    });
}
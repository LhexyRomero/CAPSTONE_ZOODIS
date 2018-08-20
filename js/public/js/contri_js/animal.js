isClicked = 0;

$(function(){
    animalTaxonList();
    toSelectJournal();
});

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

        else if (element.value.match(/[0-9*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
        }

    });

    if (errCount > 0) {
        $.notify("Fields must be filled out!", { type: "danger" });
    }

    else if (invCount > 0) {
        $.notify("Invalid Character!", { type: "danger" });
    }

    else {
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

                    if (response.error == 1) {
                        $.notify(response.detail, { type: "danger" });
                    }

                    else if (response.error == 2) {
                        $.notify(response.detail, { type: "danger" });
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
                            title: "Success",
                            text: "Animal Successfully Added!",
                            type: "success",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay",
                        });
                    }
                }
            }
        });
    }
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
                row += "<td><a data-toggle='modal' href='#viewModal'><button onclick = 'viewAnimalTaxon("+element.animalTaxoID+")' type='button' rel='tooltip' class='btn btn-success btn-icon btn-sm'><i class='now-ui-icons travel_info'></i></button></a></td>";
                if(element.status === "approved"){
                    row += "<td><font color = #18ce0f><em>"+element.status+"</em></font></td>";
                }
                else {
                    row += "<td><font color = #f96332><em>"+element.status+"</em></font></td>";
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

    $.get(url,(response)=>{
        if(response.success === false) {
            $.notify("Error getting data from the server!",{type:"danger"});
            return; 
        }
        
        let statusApproved = "<font color = #18ce0f><em>"+response.data.status+"</em></font>";
        let statusPending ="<font color = #f96332><em>"+response.data.status+"</em></font>";
        if(response.data.status === 'approved') {
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

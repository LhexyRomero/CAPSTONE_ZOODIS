$(function(){ //onload
    bacteriaTaxonList();
});

let isClick=0;

/**
 * Start: Bacteria Taxonomy
 */
function addBacteriaTaxon(eAdd) {
    eAdd.preventDefault();

    let data = $("#bacteriaTaxonForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element,index) => {
        console.log(element.name +":"+element.value);

        if(element.value == "") {
            $('input[name='+ element.name +']').css("background","#feebeb");
            errCount++;
        }

        else if(element.value.match(/[0-9*#\/]/g) != null){
            $('input[name='+ element.name +']').css("background","#feebeb");
            invCount++;
            isClick=0;
        }
        
        else {
            dataInsert[element.name] = element.value;
        }


    });

    if(errCount>0) {
        $.notify("All fields must be filled!",{type:"danger"});
    }

    else if(invCount>0) {
        $.notify("Invalid Character!",{type: "danger"});
    }

    else {
        isClick=0;
        console.log("Yieeee accpeted");
        swal({
            title: "Warning!",
            text: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },function(isConfirmed){
            if(isConfirmed){
                $.post("/bacteriaTaxon", dataInsert, function(response){

                    if(response.success == false){
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                        bacteriaTaxonList();
                        clearBacteriaTaxon();
                    }

                });
            }
        });
    }
}

function clearBacteriaTaxon(eClear) {

    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    isClick=0;
}

/**
 * End: Bacteria Taxonomy
 */

/**
 * Start: Bacteria Taxonomy List
 */
function bacteriaTaxonList(){
    $.get("/bacteriaTaxonList",function(response){

        if(response.success == false) {
            $.notify("Error getting data from the server!", {type:"danger"});
        }

        else {
            let data = response.data;
            let html = "";

            data.forEach((element,index)=>{
                let row = "<tr>";
                row += "<td>"+ element.phylum +"</td>";
                row += "<td>"+ element.class +"</td>";
                row += "<td>"+ element.orderr +"</td>";
                row += "<td>"+ element.family+"</td>";
                row += "<td>"+ element.genus +"</td>"; 
                row += "<td>"+ element.species+"</td>";
                row += "<td onclick='editBacteriaTaxon("+element.bacteriumTaxoID+")'><a data-toggle='modal' href='#exampleModalCenter'><i class='far fa-edit'></i></a></td>";
                row += "</tr>";
                html += row;
            });
            
            $('#bacteriataxonTableList').html(html);
            $('#myTable').DataTable();
        }

    });
}

/**
 * End: Bacteria Taxonomy List
 */
let globalId = 0;

function editBacteriaTaxon(bacteriumTaxoID){

    globalId = bacteriumTaxoID;
    console.log(globalId + "EDIT");

    let url = "/editBacteriaTaxon/" + bacteriumTaxoID;
    $.get(url, function(response){
        if(response.success == false){
            $.notify("Error getting data from server!",{type:"danger"});

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


function updateBacteriaTaxon(){ 

    console.log(globalId +"UPDATE");  
    let url = "/updateBacteriaTaxon/" +globalId;
    console.log(url);
    let data = $("#editBacteriaTaxonForm").serializeArray();
    let errCount=0;
    let invCount=0;
    let dataInsert = {};
    
    data.forEach((element,index) => {
        console.log(element.name +":"+ element.value);

        if(element.value == "") {
            $('input[name='+element.name +']').css("background","#feebeb");
            errCount++;
            isClick=0;
        }

        else if(element.value.match(/[0-9*#\/]/g) != null){
            $('input[name='+ element.name +']').css("background","#feebeb");
            invCount++;
            isClick=0;
        }
        
        else {
            dataInsert[element.name] = element.value;
        }

    });

    if(errCount>0){
        $.notify("All fields must be filled!",{type:"danger"});
    }

    else if(invCount>0){
        $.notify("Invalid Character!",{type:"danger"});
    }

    else {
        isClick=0;
        console.log("Yieeee LOLL");
        swal({
            title: "Warning!",
            text: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        },function(isConfirmed){
            if(isConfirmed){
                $.post(url, dataInsert, function(response){

                    if(response.success == false){
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                        bacteriaTaxonList();
                    }

                });
            }
        });
    }
}



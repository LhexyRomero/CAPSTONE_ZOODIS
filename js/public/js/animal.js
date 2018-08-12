$(function(){ //onload
    animalTaxonList();
    $("input[name=strScientificName]").autocomplete({
        source: (req, res)=>{
            $.ajax({
                type: "GET",
                url: "/search/animal/?data=" + req.term,
                success: function(response){
                    res(response.data);
                },
                error: function(response){
                    console.log(response.detail);
                },
            });
        },
    });

    $("input[name=strCommonName]").on("keyup" , function(){
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });

    $("input[name=strScientificName]").on("keyup" , function(){
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });

    $("input[name=strBodySite]").on("keyup" , function(){
        isInsertAnimal = 0;
        $("#toSubmitAnimal").html("Add");
    });
});

let isClick=0;
let isInsertAnimal = 0;
/**
 * Start: Add Animal Details
 */
function addAnimal(e){
    e.preventDefault();

    //to prevent spam
    if (isClick !=0){
        return;
    }
    isClick++

    let data = $("#animalForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element,index) => {
        console.log(element.name + ":" + element.value);

        if(element.value == ""){    
        $('input[name='+ element.name +']').css("background","#feebeb");
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

    if(errCount>0) {
        $.notify("Fields must be filled out!",{type: "danger"});
    }

    else if(invCount>0){
        $.notify("Invalid Character!", {type:"danger"});
    }

    else{
        let submit = function(){
            //kapag tama na yung input -- Ajax Requests
            $.post("/animal",dataInsert, function(response){
                isClick=0;
                if(response.success == false) { 
                    isClick=0;
                    
                    //if data already exists
                    if(response.error == 1){
                        $.notify(response.detail, {type: "danger"});
                    }
        
                    //if Genus not found
                    else if(response.error == 2){
                        $.notify(response.detail,{type:"danger"});
                        $.notify(response.detail, {type: 'warning'});
                        let html = "<br><ul><h4 class ='card-title'>Suggested Genus</h4><br>";
                        response.data.forEach((element, index)=>{
                            html += "<li font size='6'>"+ element.genus +"</li>";
                        });
                        html += "</ul>";
                        $('#suggestionsGenus').html(html);
                    }   
        
                    //if Species not found
                    else if(response.error == 3){
                        $.notify(response.detail,{type:"danger"});
                        let html = "<br><ul><h4 class ='card-title'>Suggested Species</h4><br>";
                        response.data.forEach((element, index)=>{
                            html += "<li font size='6'>"+ element.species +"</li>";
                        });
                        html += "</ul>";
                        $('#suggestionsSpecies').html(html);
                    }

                    else {
                        $.notify(response.detail , {type:"danger"});
                    }

                }
                else {
                    //$.notify("Successfully Added!", {type:"success"})

                    if(response.data) {
                        $("input[name=strPhylum]").val(response.data.phylum);
                        $("input[name=strClass]").val(response.data.class);
                        $("input[name=strOrder]").val(response.data.order);
                        $("input[name=strFamily]").val(response.data.family);
                        $("input[name=strGenus]").val(response.data.genus);
                        $("input[name=strSpecies]").val(response.data.species);
                        $("#toSubmitAnimal").html("Save");
                        isInsertAnimal=1;
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

            });
        };

        if(isInsertAnimal) { //kapag mag iinsert
            dataInsert.isInserting = 1;
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
            }).then(function(isConfirmed){
                submit();
            });
        }else{
            submit();
        }
    }
}

function clearAnimal(eClear){

    $('input[name=strCommonName]').val("");
    $('input[name=strScientificName]').val("");
    $('input[name=strBodySite]').val("");
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    isClick=0;
}

/**
 * End: Add Animal Details
 */

/**
 * Start: Animal Taxonomy
 */
function addAnimalTaxon(eAdd){
    eAdd.preventDefault();

    if(isClick != 0){
        return
    }
    isClick++;

    let data = $("#animalTaxonForm").serializeArray();
    let errCount = 0;
    let invCount = 0;
    let dataInsert = {};

    data.forEach((element,index)=>{
        console.log(element.name +":"+ element.value);

        if(element.value == ""){
            console.log("HI");
            $('input[name='+ element.name +']').css("border-color","#ff5050");
            errCount++;
            isClick=0;
        }

        else if(element.value.match(/[0-9*#\/]/g) != null){
            $('input[name='+ element.name +']').css("border-color","#ff5050");
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

    else if(invCount>0){
        $.notify("Invalid Character!",{type:"danger"});
    }

    else {
        isClick=0;
        console.log("Yieeee accpeted");
        swal({
            title: 'Add Animal Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
          }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post("/animalTaxon", dataInsert, function(response) {
                    if(response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else{
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
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

function clearAnimalTaxon(eClear){

    isClick=0;
    $('input[name=strPhylum]').val("");
    $('input[name=strClass]').val("");
    $('input[name=strOrder]').val("");
    $('input[name=strFamily]').val("");
    $('input[name=strGenus]').val("");
    $('input[name=strSpecies]').val("");
    console.log("nabura naman");
    
} 

/**
 * End: Animal Taxonomy
 */

 /**
  * Start: Animal Taxonomy List
  */

  function animalTaxonList(){
    $.get("/animalTaxonList",function(response){

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
                row += "<td onclick='editAnimalTaxon("+element.animalTaxoID+")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
                row += "</tr>";
                html += row;
            });
            $('#animaltaxonTableList').html(html);
            $('#animalTaxonTable').dataTable();
        }

    });
  }

  /**
  * End: Animal Taxonomy List
  */

  /**
  * Start: Edit Animal Taxonomy
  */
 let globalId = 0;
 function editAnimalTaxon(animalTaxoID) {

    globalId = animalTaxoID;
    console.log(globalId + "ID TO UPDATE")
    let url = "/editAnimalTaxon/" + animalTaxoID;

    $.get(url, function(response){

        if(response.success == false) {
            $.notify("Error getting data from the server!",{type: "danger"});
        }

        else{
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
 /**
  * End: Edit Animal Taxonomy
  */

 function updateAnimalTaxon() {
     console.log(globalId + "SA UPDATE");
     let url = "/updateAnimalTaxon/" + globalId;
     let errCount = 0;
     let invCount = 0;
     let dataInsert = {};
     console.log(url);

     let data = $("#editAnimalTaxonForm").serializeArray();

     data.forEach((element,index)=> {
        console.log(element.name + ":" + element.value);

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

     if(errCount>0) {
         $.notify("All fields must be filled!",{type:"danger"});
     }

     else if (invCount>0) {
         $.notify("Invalid Character!",{type:"danger"});
     }

     else {
        isClick=0;
        console.log("Yieeee LOLL");
        swal({
            title: 'Update Animal Taxon',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes'
          }).then((isConfirmed) => {
            if (isConfirmed) {
                $.post(url, dataInsert, function(response) {
                    if(response.success == false) {
                        swal({
                            title: "Error!",
                            text: "Data Already Exists!",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay"
                        });
                    }

                    else{
                        swal({
                            title: "Done!",
                            text: "Data Recorded",
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay"
                        });
                        animalTaxonList();
                    }
                });
            }
          })
    }
 }
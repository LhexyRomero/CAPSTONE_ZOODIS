$(function () {
    notificationCard();
    $(".stats").hide();
});

function notificationCard() {
    $.get("/notificationCard", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the Server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let colPerRow = 1;
        let colCount = 1;
        let html = "<div class='row'>";
        $("#placeholder").html("");

        data.forEach((element, index) => {
            console.log(data);
            let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
            temphtml += "<h5 class='text-primary'><strong>" + element.code + "</strong></h5>"
                + "<p class='pLabel'><strong>" + element.name + "</strong></p>"
                + "<p class='pLabel'>" + element.firstName + " " + element.middleInitial + " " + element.lastName + "</p>"
                + "<br><button type='button' class='btn btn-primary pull-right' onclick='notificationDetails("+ element.ownedBy +","+ element.journalID +","+ element.staffID +")'>View</button>";
            temphtml += "</div>";
            html += temphtml;

            if (colCount == colPerRow) {
                colCount = 1;
                html += "</div><div class='row'>";
            }
            else {
                colCount++;
            }

            if (index == data.length - 1) {
                html += "</div>";
                $('#placeholder').html(html);
            }

        });
    });
}

let view = 0;
let owner = 0;
function notificationDetails(ownedBy,journalID, staffID){
    view = journalID;
    owner = ownedBy;
    let url = "/notificationDetails/"+journalID+"/"+staffID;
    console.log(url);

    $.get(url,(response)=>{
        if(response.success == false){
            $.notify("Error getting data from the server!",{type:"danger"});
            return;
        }
        
        let data = response.data;
        let html = "";
        console.log(data);
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.category + "</td>";
            row += "<td>" + element.addedData + "</td>";
            row += "</tr>";
            html += row;

            
            if(element.ownedBy == 1){
                $("#complete").show();
                $("#send").hide();
            }
            else {
                $("#complete").hide();
                $("#send").show();
            }
            
            $("input[name=email").val(element.email);
            if(element.category == 'Animal Taxonomy'){
                $("input[name=animalTaxon").val(element.addedData);
                console.log(element.addedData);
            }

            else if(element.category == 'Bacteria Taxonomy'){
                $("input[name=bacteriaTaxon").val(element.addedData);
                console.log(element.addedData);
            }

            else if(element.category == 'Animal'){
                $("input[name=animal").val(element.addedData);
                console.log(element.addedData);
            }

            else{
                $("input[name=bacteria").val(element.addedData);
                console.log(element.addedData);
            
            }
            
        });

        $('#gatheredData').html(html);
        $('#viewDetails').modal("show");
    });
}

function completeUpdate(){
    let url = "/completeUpdate/"+view;
    $.post(url,(response)=>{
        if(response.success == false){
            $.notify("Error getting Data from the Server!",{type:"danger"});
            return;
        }
        
        swal({
            title: "Done!",
            text: response.detail,
            type: "success",
            confirmButtonColor: "#9c27b0",
            confirmButtonText: "Okay"
        });
        notificationCard();
        $('#viewDetails').modal("hide"); 
    });
}

function sendUpdate(){
    let data = $("#dataForm").serializeArray();
    let dataInsert = {};

    data.forEach((element,index) => {
        dataInsert[element.name] = element.value;
    });

    console.log(dataInsert);
    swal({
        title: 'Email',
        text: "to Journals Owner!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
        confirmButtonText: 'Yes'
    }).then((isConfirmed) => {
        if (isConfirmed) {
            $(".stats").show();
            $.post('/sendUpdate',dataInsert,(response)=>{

            });
        }
    })

}

function incompleteUpdate(){
    let url ="/incompleteUpdate"+view;
}
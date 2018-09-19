$(function () {
    $("#btnSend").hide();
});

function viewMessages(e) {
    $.get("/viewMessage", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the Server!", { type: "danger" });
            return;
        }
    });
}

function messageList() {
    $.get("/messageList", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }
        let data = response.data;
        let html = "";
        data.forEach((element, index) => {
            /* let row = "<tr>";
            row += "<td>" + element.phylum + "</td>";
            row += "<td>" + element.class + "</td>";
            row += "<td>" + element.orderr + "</td>";
            row += "<td>" + element.family + "</td>";
            row += "<td>" + element.genus + "</td>";
            row += "<td>" + element.species + "</td>";
            row += "<td onclick='editAnimalTaxon(" + element.animalTaxoID + ")'><a data-toggle='modal' href='#exampleModalCenter'><button type='button' rel='tooltip' class='btn btn-info btn-icon btn-sm'><i class='now-ui-icons ui-2_settings-90'></i></button></a></td>";
            row += "</tr>";
            html += row; */
        });
        $('#messageList').html(html);
    });
}
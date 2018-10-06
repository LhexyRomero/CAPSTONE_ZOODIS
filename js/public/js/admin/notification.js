function notiCard() {
    $.get("/notiCard", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from the server!", { type: "danger" });
            return;
        }

        let data = response.data;
        let colPerRow = 1;
        let colCount = 1;

        let html = "<div class='row'>";
        $("#placeholder").html("");
        data.forEach((element, index) => {

            if(element.status == 'approved'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.notificationID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-success'>" + element.status + "</span><br>"
                    + "<label>" + element.dateTime + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

            else if(element.status == 'rejected'){
                let temphtml = "<div class='offset-md-1 col-md-" + parseInt(10 / colPerRow) + " div" + index + " card'><br>";
                temphtml += "<button type='button' class='close' onclick='updateNotiCard(" + element.notificationID + ")'><span>&times;</span></button>"
                    + "<h5 class='text-primary'><strong>" + element.category + "</strong></h5>"
                    + "<p class='pLabel'><strong>" + element.addedData + "</strong></p>"
                    + "<span class='badge badge-danger'>" + element.status + "</span><br>"
                    + "<label>" + element.dateTime + "</label><br>"
                    + "<label class='text-danger'>" + element.message + "</label><p></p>"
                temphtml += "</div>";
                html += temphtml;
            }

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

        console.log("DITO AKO");
        console.log(response.data);

    });
}
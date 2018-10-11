$(function () {
    console.log("SHEEEE");
    bacteriaModules();
    $("input[name=bacteriaScientificName").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bacteriaScientificName/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        }
    });

    if($('#phylumBacteria').html().trim() != ""){
        $('#noResultsBacteria').hide();
    }

    else {
        $('#bacteriaSearch').hide();
        $('#noResultsBacteria').show();
    }
});

let bacteriaSearchClick = 0;

function searchBacteria(e) {
    e.preventDefault();

    if (bacteriaSearchClick != 0) {
        return;
    }
    bacteriaSearchClick++;

    let data = $("#searchBacteria").serializeArray();
    let dataInsert = {};

    animalSearchClick = 0;
    if (data[0].value == "") {
        $("input[name=bacteriaScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Filled up the field!</font></label>";
        $(".bacteriaNotif").html(html);
    }

    else if (data[0].value.match(/[*#\/]/g) != null) {
        $("input[name=bacteriaScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Invalid Character!</font></label>";
        $(".bacteriaNotif").html(html);
    }

    else {
        dataInsert[data[0].name] = data[0].value;
    }

    $.post('/researcher_bacteria', dataInsert, (response) => {
        if (response.success == false) {
            return;
        }
    });
}

function bacteriaModules() {
    console.log("NICEEE");

    $.get("/bacteriaModules", (response) => {

        if (response.success == false) {
            $.notify("Error getting Data from the Server!", { type: "danger" });
            return;
        }

        let data = response.data;
        console.log(data);
        let colPerRow = 1;
        let colCount = 1;
        let html = '<div class="row">';
        data.forEach((element, index) => {
            let temphtml = '<div class="col-md-' + parseInt(6 / colPerRow) + '">';
            temphtml += '<div class="single-testimonial item d-flex flex-row">';
            temphtml += '<div class="desc">';
            temphtml += '<h4>' + element.bacteriumScientificName + '</h4>';
            temphtml += '<p>Animal Name</p>';
            temphtml += '</div>';
            temphtml += '</div>';

            html += temphtml;
            if (colCount == colPerRow) {
                colCount = 1;
                html += '</div>';
            }
            else {
                colCount++;
            }

            if (index == data.length - 1) {
                html += '</div>';
                $(".displayBacteria").html(html);
                console.log(html);
            }
        });
    });
}
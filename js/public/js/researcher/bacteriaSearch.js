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

    // if($('#phylumBacteria').html().trim() != ""){
    //     $('#noResultsBacteria').hide();
    // }

    // else {
    //     $('#noResultsBacteria').show();
    //     $('#bacteriaSearch').hide();
    // }
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
        let html = "";
        data.forEach((element, index) => {
            let row = "<tr>";
            row += "<td>" + element.animalName + "</td>";
            row += "<td>" + element.bacteriumScientificName + "</td>";
            if(element.pathogenic == 1) {
                row += '<td class="text-center"><span class="badge badge-danger">Pathogenic</span></td>';
            }
            else {
                row += '<td class="text-center"><span class="badge badge-warning">Potentially Pathogenic</span></td>';
            }
            row += "<td class='text-center'>" + element.doi + "</td>";
            row += "</tr>";
            html += row;
        });
        $('#bacModuleList').html(html);
        $('#bacModuleTable').dataTable();

    });
}

function viewDisease(id) {
    window.location="view_disease?diseaseID="+id;
}
$(function(){
    diseaseModules();
    $("input[name=diseaseName]").autocomplete({
        source: (req,res) => {
            $.ajax({
                type: "GET",
                url: "/search/diseaseName/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        }
    });
    console.log("WHE");
});

let diseaseIsClick = 0;

function searchDisease(e) {
    e.preventDefault();

    if (diseaseIsClick !=0) {
        return;
    }
    diseaseIsClick++;

    let data = $("#searchDisease").serializeArray();
    let dataInsert = {};

    diseaseIsClick = 0;
    if (data[0].value == ""){
        $("input[name=diseaseName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Filled up the field!</font></label>";
        $(".diseaseNotif").html(html);
    }

    else if (data[0].value.match(/[*#\/]/g) != null){
        $("input[name=diseaseName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Invalid Character!</font></label>";
        $(".diseaseNotif").html(html);
    }

    else {
        dataInsert[data[0].name] = data[0].value;
    }

    $.post('/researcher_disease',dataInsert,(response)=>{
        console.log(dataInsert);
        if(response.success == false) {
            return;
        }
    });
}

function diseaseModules() {
    console.log("LEKAY");

    $.get("/diseaseModules",(response)=>{

        if(response.success==false){
            $.notify("Error getting Data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;
        console.log(data);
        let colPerRow = 1;
        let colCount = 1;
        let html = '<div class="row">';
        data.forEach((element,index) => {
            let temphtml = '<div class="col-md-' + parseInt(6 / colPerRow) +'">';
            temphtml += '<div class="single-testimonial item d-flex flex-row">';
            temphtml += '<div class="desc">';
            temphtml += '<h4>'+element.diseaseName+'</h4>';
            temphtml += '<p>'+element.diseaseDesc.substring(0,40)+'</p>';
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
            
            if(index == data.length - 1){
                html += '</div>';
                $(".displayDisease").html(html);
                console.log(html);
            }
        });

    });
}
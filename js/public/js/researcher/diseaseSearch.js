$(function(){
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


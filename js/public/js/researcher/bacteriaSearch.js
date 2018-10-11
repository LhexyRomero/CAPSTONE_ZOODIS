$(function(){
    $("input[name=bacteriaScientificName").autocomplete({
        source: (req,res) => {
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

    if($('#phylumBacteria').html()!= ""){
        $('#noResultsBacteria').hide();
    }

    else {
        $('#bacteriaSearch').hide();
        $('#noResultsBacteria').show();
    }
});

let bacteriaSearchClick = 0;

function searchBacteria(e){
    e.preventDefault();

    if(bacteriaSearchClick !=0){
        return;
    }
    bacteriaSearchClick++;

    let data = $("#searchBacteria").serializeArray();
    let dataInsert = {};

    animalSearchClick = 0;
    if (data[0].value == ""){
        $("input[name=bacteriaScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Filled up the field!</font></label>";
        $(".bacteriaNotif").html(html);
    }

    else if (data[0].value.match(/[*#\/]/g) != null){
        $("input[name=bacteriaScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Invalid Character!</font></label>";
        $(".bacteriaNotif").html(html);
    }

    else {
        dataInsert[data[0].name] = data[0].value;
    }

    $.post('/researcher_bacteria',dataInsert,(response)=>{
        if(response.success == false) {
            return;
        }
    });
} 

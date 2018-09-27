$(function(){
    $("input[name=animalName").autocomplete({
        source: (req,res) => {
            $.ajax({
                type: "GET",
                url: "/search/animalName/?data=" + req.term,
                success: function (response) {
                    res(response.data);
                },
                error: function (response) {
                    console.log(response.detail);
                },
            });
        }
    });

});

let animalSearchClick = 0;

function searchAnimal() {
    $("#animal").addClass("show").addClass("active");
    $("#bacteria").removeClass("show").removeClass("active");

    if(animalSearchClick != 0){
        return;
    }
    animalSearchClick++;

    console.log("im here searching animal");
    let data = $("#searchAnimal").serializeArray();
    let dataInsert = {};

    animalSearchClick = 0;
    if (data[0].value == ""){
        $("input[name=animalName").css("background", "#feebeb");
        $("input[name=animalScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Filled up the field!</font></label>";
        $(".animalNotif").html(html);
    }

    else if (data[0].value.match(/[*#\/]/g) != null){
        $("input[name=animalName").css("background", "#feebeb");
        $("input[name=animalScientificName").css("background", "#feebeb");

        let html = "<label class='pull-right'><font color='red'>Invalid Character!</font></label>";
        $(".animalNotif").html(html);
    }

    else {
        dataInsert[data[0].name] = [data[0].value];
        console.log(dataInsert);
    }

    $.post('/searchingAnimal',dataInsert,(response)=>{

    });
}

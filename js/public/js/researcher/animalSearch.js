$(function(){
    animalModules();
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

    // if($('#phylum').html()!= ""){
    //     $('#noResults').hide();
    // }

    // else {
    //     $('#noResults').show();
    //     $('#animalSearch').hide();
    // }
});

let animalSearchClick = 0;

function searchAnimal(e) {
    e.preventDefault();

    $("#animal").addClass("show").addClass("active");
    $("#bacteria").removeClass("show").removeClass("active");

    if(animalSearchClick != 0){
        return;
    }
    animalSearchClick++;

    let data = $("#searchAnimal").serializeArray();
    let dataInsert = {};

    animalSearchClick = 0;
    if (data[0].value == ""){
        $("input[name=animalName").css("background", "#feebeb");

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
        dataInsert[data[0].name] = data[0].value;
    }

    $.post('/researcher_animal',dataInsert,(response)=>{
        if(response.success == false) {
            return;
        }
        
    });
}

function animalModules() {
    console.log("LEKI");

    $.get("/animalModules",(response)=>{

        if(response.success==false){
            $.notify("Error getting Data from the Server!",{type:"danger"});
            return;
        }

        let data = response.data;
        let colPerRow = 1;
        let colCount = 1;
        let html = '<div class="row">';
        data.forEach((element,index) => {
            let temphtml = '<div class="col-md-' + parseInt(4 / colPerRow) +'">'; 
            temphtml += '<div class="single-recent-blog-post item">';
            temphtml += '<br><br><div class="thumb"><a onclick="viewAnimal('+element.animalID+')"><img class="imgSize img-fluid" src="'+ element.image.replace('js\\public','assets') +'" alt="working"></a></div>';
            temphtml += '<div class="details">';
            temphtml += '<br><h3 style="text-transform:uppercase;">'+element.animalName+'</h3>';
            temphtml += '<p><em><b>'+element.animalScientificName+'</b></em></p>';
            temphtml += '<label style="font-size:12px;" class="text-info">'+element.name+'</label>';
            temphtml += '<label style="font-size:12px;">'+element.doi+'</label>';
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
                $(".displayAnimal").html(html);
            }
        });

    });
}

function viewAnimal(id){
    console.log(id + "ANDITO KOOO");
    
}
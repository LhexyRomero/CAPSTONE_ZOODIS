$(function(){
    animalQuery();
});

function animalQuery(){
    console.log("PYKEEE");

    $.get("/animalQuery",(response)=>{

        if (response.success==false){
        $.notify("Error getting data from the server!", {type:"danger"});
        return;
    }
        let data = response.data;
        let colPerRow = 1;
        let colCount = 1;
        let html = '<div class="row">';

        data.forEach((element,index)=>{
            let temphtml = '<div class="col-lg-' +parseInt(4 / colPerRow) +'">';
            temphtml += '<div class="single-destination relative">';
            temphtml += '<div class="thumb relative"><img class="img-fluid" src="'+ element.image.replace('js\\public','assets') +'" alt="GUMAGANA"></div>';
            temphtml += '<div class="desc">';
            temphtml += '<h4 class="li">'+element.animalName+'</h4>';
            temphtml += '<p class="text-white">3 Bacteria</p>';
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
                $(".animalQuery").html(html);
            }
        });
    });
}
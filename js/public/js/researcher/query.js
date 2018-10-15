$(function(){
    animalQuery();
    numberBacteria();
    bacteriaQuery();
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
            temphtml += '<div class="thumb relative"><div class="overlay overlay-bg"></div><img class="img-fluid" src="'+ element.image.replace('js\\public','assets') +'" alt="GUMAGANA"></div>';
            temphtml += '<div class="desc">';
            temphtml += '<a href="#" class="price-btn">';
            temphtml += '<h4 class="li">'+element.animalName+'</h4>';
            temphtml += '<p class="text-white">'+element.bacteriaQ+'&nbsp;Bacteria</p>';
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

function bacteriaQuery(){
    $.get('/bacteriaQuery',(response)=>{
        if(response.success == false){
            $.notify("Error querying!",{type:danger});
            return;
        }

        let human = "";
        let count = "<h1>"+response.data.stCount+"</h1>";
        let bacName = "<h4>"+response.data.stBac+"</h4>";
        if(response.data.stPath == 1){
            human = '<span class="badge badge-danger">Pathogenic Bacteria</span>';
        }
        else {
            human = '<span class="badge badge-warning">Potentially Pathogenic Bacteria</span>';
        }

        $(".count").html(count);
        $(".bacName").html(bacName);
        $(".human").html(human);

        let human1 = "";
        let count1 = "<h1>"+response.data.ndCount+"</h1>";
        let bacName1 = "<h4>"+response.data.ndBac+"</h4>";
        if(response.data.ndPath == 1){
            human1 = '<span class="badge badge-danger">Pathogenic Bacteria</span>';
        }
        else {
            human1 = '<span class="badge badge-warning">Potentially Pathogenic Bacteria</span>';
        }

        $(".count1").html(count1);
        $(".bacName1").html(bacName1);
        $(".human1").html(human1);
    });
}

function numberBacteria(){
    console.log("PASOK");
    $.get('/numberBacteria',(response)=>{
        console.log(response);
        if(response.success == false){
            $.notify("Error querying!",{type:danger});
            return;
        }
        let patho = "<h1>"+response.data.patho+"</h1>";
        let potentPatho = "<h1>"+response.data.potentPatho+"</h1>";
        
        $(".pathogenic").html(patho);
        $(".notpathogenic").html(potentPatho);
    });
}


$(function(){
    animalModules();
    console.log('searchAnimal');
    $("#animal").addClass("show").addClass("active");
    $("#bacteria").removeClass("show").removeClass("active");
    
    wordCloud('Animal');
	
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

function animalModules(){
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

async function wordCloud(category) {
    /*  ======================= SETUP WORD CLOUD ======================= */
    var config = {
        trace: true,
        spiralResolution: 1, //Lower = better resolution
        spiralLimit: 360 * 5,
        lineHeight: 0.6,
        xWordPadding: 0,
        yWordPadding: 3,
        font: "sans-serif"
    }

    var words = [];
    if (category == 'Animal') {
        var promise1 = new Promise(function(resolve, reject) {
            $.get("/animalList",(response)=>{
                if(response.success == false) {
                    $.notify("Error getting data from the Server!",{type:"danger"});
                    return;
                }
        
                let data = response.data;
                words = data.filter(e => e.status == 'approved').map(e => e.animalName).map(function (word) {
                    return {
                        word: word,
                        freq: Math.floor(Math.random() * 25) + 7
                    }
                })

                words = words.reverse();
                
                if (words.length > 20) {
                    resolve(words.slice(0, 19));
                } else {
                    resolve(words);
                }
            });   
          });
        words = await promise1;
    } else {
        var promise1 = new Promise(function(resolve, reject) {
            $.get("/bacteriaList",(response)=>{
                if(response.success == false) {
                    $.notify("Error getting data from the Server!",{type:"danger"});
                    return;
                }
        
                let data = response.data;
                words = data.filter(e => e.status == 'approved').map(e => e.bacteriumScientificName).map(function (word) {
                    return {
                        word: word,
                        freq: (word.length > 20) ? 15 : Math.floor(Math.random() * 20) + 6
                    }
                })
                
                if (words.length > 20) {
                    resolve(words.slice(0, 19));
                } else {
                    resolve(words);
                }
            });   
          });
        words = await promise1;
    }
    

    words.sort(function (a, b) {
        return -1 * (a.freq - b.freq);
    });
    var cloud = document.getElementById("word-cloud");
    cloud.innerHTML = "";
    cloud.style.position = "relative";
    cloud.style.fontFamily = config.font;

    var traceCanvas = document.createElement("canvas");
    traceCanvas.width = cloud.offsetWidth;
    traceCanvas.height = cloud.offsetHeight;
    var traceCanvasCtx = traceCanvas.getContext("2d");
    cloud.appendChild(traceCanvas);

    var startPoint = {
        x: cloud.offsetWidth / 2,
        y: cloud.offsetHeight / 2
    };

    var wordsDown = [];

    function createWordObject(word, freq) {
        var wordContainer = document.createElement("div");
        wordContainer.style.position = "absolute";
        wordContainer.style.fontSize = freq + "px";
        wordContainer.style.lineHeight = config.lineHeight;
        //wordContainer.style.transform = "translateX(-50%) translateY(-50%)";
        wordContainer.appendChild(document.createTextNode(word));

        return wordContainer;
    }

    function placeWord(word, x, y) {

        cloud.appendChild(word);
        word.style.left = x - word.offsetWidth / 2 + "px";
        word.style.top = y - word.offsetHeight / 2 + "px";

        wordsDown.push(word.getBoundingClientRect());
    }

    function trace(x, y) {
        //     traceCanvasCtx.lineTo(x, y);
        //     traceCanvasCtx.stroke();
        traceCanvasCtx.fillRect(x, y, 1, 1);
    }

    function spiral(i, callback) {
        angle = config.spiralResolution * i;
        x = (1 + angle) * Math.cos(angle);
        y = (1 + angle) * Math.sin(angle);
        return callback ? callback() : null;
    }

    function intersect(word, x, y) {
        cloud.appendChild(word);

        word.style.left = x - word.offsetWidth / 2 + "px";
        word.style.top = y - word.offsetHeight / 2 + "px";

        var currentWord = word.getBoundingClientRect();

        cloud.removeChild(word);

        for (var i = 0; i < wordsDown.length; i += 1) {
            var comparisonWord = wordsDown[i];

            if (!(currentWord.right + config.xWordPadding < comparisonWord.left - config.xWordPadding ||
                currentWord.left - config.xWordPadding > comparisonWord.right + config.wXordPadding ||
                currentWord.bottom + config.yWordPadding < comparisonWord.top - config.yWordPadding ||
                currentWord.top - config.yWordPadding > comparisonWord.bottom + config.yWordPadding)) {

                return true;
            }
        }

        return false;
    }

    (function placeWords() {
        for (var i = 0; i < words.length; i += 1) {

            var word = createWordObject(words[i].word, words[i].freq);

            for (var j = 0; j < config.spiralLimit; j++) {
                //If the spiral function returns true, we've placed the word down and can break from the j loop
                if (spiral(j, function () {
                    if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                        placeWord(word, startPoint.x + x, startPoint.y + y);
                        return true;
                    }
                })) {
                    break;
                }
            }
        }
    })();
        /* =======================  LETS GO WORD CLOUD ! =======================  */

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function viewAnimal(id){
    window.location="view_animal?animalID="+id;
}

function viewBacteria(id){
    window.location="view_bacteria?bacteriumID="+id;
}


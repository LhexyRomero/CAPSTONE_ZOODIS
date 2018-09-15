let isClick =0;

function updateProfile(e){
    e.preventDefault();

    let data = $("#profileForm").serializeArray();
    let dataInsert = {};

    if(data[1].value =="" || data[2].value =="" || data[4].value =="" || data[5].value ==""){
        $('input[name=contact]').css("background", "#feebeb");
        $('input[name=firstName]').css("background", "#feebeb");
        $('input[name=lastName]').css("background", "#feebeb");
        $('input[name=email]').css("background", "#feebeb");
        $.notify("Fill up required fields!",{type: "danger"});
    }

    else if(data[0].value.match(/[*#\/]/g) || data[1].value.match(/[*#\/]/g) || data[2].value.match(/[*#\/]/g) || data[3].value.match(/[*#\/]/g) || data[4].value.match(/[*#\/]/g) || data[5].value.match(/[*#\/]/g) || data[6].value.match(/[*#\/]/g) ){
        $('input[type=text]').css("background","#feebeb");
        $('input[type=email]').css("background","#feebeb");
        $.notify("Invalid Character!",{type: "danger"});
    }
    
    else { 
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
        dataInsert[data[2].name] = data[2].value;
        dataInsert[data[3].name] = data[3].value;
        dataInsert[data[4].name] = data[4].value;
        dataInsert[data[5].name] = data[5].value;
        dataInsert[data[6].name] = data[6].value;
    }

}
function reports() {

    let data = $("#generateReports").serializeArray();
    let dataInsert = {};
    
    dataInsert[data[0].name] = data[0].value;
    dataInsert[data[1].name] = data[1].value;

    console.log(dataInsert);   
    $.post('/reports',dataInsert,(response)=>{
        if(response.success == false){
            $.notify("Error generating Reports!",{type:"danger"});
            return;
        }

    });

}
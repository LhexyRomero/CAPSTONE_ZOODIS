function reports() {

    let data = $("#generateReports").serializeArray();
    let dataInsert = {};
    
    dataInsert[data[0].name] = data[0].value;
    dataInsert[data[1].name] = data[1].value;

    var link = '/reports?month=' + (data[0].value-1) + "&year=" + data[1].value;
    window.open(link, '_blank');
    // console.log(dataInsert);   
    // $.get('/reports?month=' + (data[0].value-1) + "&year=" + data[1].value,(response)=>{
    //     if(response.success == false){
    //         $.notify("Error generating Reports!",{type:"danger"});
    //         return;
    //     }

    // });

}
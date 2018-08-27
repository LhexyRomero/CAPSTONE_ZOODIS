function sample(e){
    e.preventDefault();

    let data = $("input[name=searchBacteria]").val();

    $.post("/sample",{searchBacteria: data.trim()},(response)=>{
        if(response.success == false){
            $.notify(response.detail,{type:"danger"});
            return;
        }else{
            console.log(response.data);
            $('#searchResults').html("");
            response.data.forEach(element => {
                var html = "<tr>";
                html += "<td>"+ element.diseaseName +"</td>";
                html += "</tr>";
                $('#searchResults').append(html);
            });
        }
    });
}
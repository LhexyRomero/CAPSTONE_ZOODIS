function sample(e){
    e.preventDefault();

    let data = $("#sample").val();

    $.post("/sample",data,(response)=>{
        if(response.success == false){
            $.notify("Err",{type:"danger"});
            return;
        }

    });
}
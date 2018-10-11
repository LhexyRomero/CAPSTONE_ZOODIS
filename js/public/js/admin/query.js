
$(function(){
    totalAnimal();
    totalDisease();
    totalPrevention();
    totalJournal();
    totalApproved();
    totalReject();
    totalCollaborators();
    completeJournal();
});

function totalAnimal() {
    $.get('/totalAnimal',(response)=>{
        if(response.success ==false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<h3 style="margin-top:0;" class="info-title">'+response.data+'</h3>';
        $("#totalAnimal").html(html);
    });
}

function totalDisease() {
    $.get('/totalDisease',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<h3 style="margin-top:0;" class="info-title">'+response.data+'</h3>';
        $("#totalDisease").html(html);
    });
}

function totalPrevention() {
    $.get('/totalPrevention',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<h3 style="margin-top:0;" class="info-title">'+response.data+'</h3>';
        $("#totalPrevention").html(html);
    });
}

function totalJournal() {
    $.get('/totalJournal',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<div class="progress-bar" role="progressbar" aria-valuenow="'+response.data+'"aria-valuemin="0" aria-valuemax="100" style="width:'+ response.data+'%;"><span class="progress-value">'+ response.data+'</span></div>';
        $("#totalJournal").html(html);
    });
}

function totalApproved() {
    $.get('/totalApproved',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<div class="progress-bar bg-success" role="progressbar" aria-valuenow="'+response.data+'"aria-valuemin="0" aria-valuemax="200" style="width:'+ response.data+'%;"><span class="progress-value">'+ response.data+'</span></div>';
        $("#totalApproved").html(html);
    });
}

function totalReject() {
    $.get('/totalReject',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<div class="progress-bar bg-danger" role="progressbar" aria-valuenow="'+response.data+'"aria-valuemin="0" aria-valuemax="200" style="width:'+ response.data+'%;"><span class="progress-value">'+ response.data+'</span></div>';
        $("#totalReject").html(html);
    });
}

function totalCollaborators(){
    $.get('/totalCollaborators',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<div class="progress-bar bg-info" role="progressbar" aria-valuenow="'+response.data+'"aria-valuemin="0" aria-valuemax="100" style="width:'+ response.data+'%;"><span class="progress-value">'+ response.data+'</span></div>';
        $("#totalCollaborators").html(html);
    });
}

function completeJournal(){
    $.get('/completeJournal',(response)=>{
        if(response.success == false) {
            $.notify("Error getting query",{type:"danger"});
            return;
        }
        let html = '<div class="progress-bar bg-primary" role="progressbar" aria-valuenow="'+response.data+'"aria-valuemin="0" aria-valuemax="100" style="width:'+ response.data+'%;"><span class="progress-value">'+ response.data+'</span></div>';
        $("#completeJournal").html(html);
    });
}
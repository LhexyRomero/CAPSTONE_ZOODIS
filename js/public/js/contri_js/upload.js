isClicked = 0;

$(function () {
    // init
});

function uploadData(eAdd) {
    eAdd.preventDefault();

    let data = $("#animalForm").serializeArray();
    let dataInsert = new FormData($("#animalForm")[0]);

    data.forEach((element, index) => {
        console.log(element.name + ":" + element.value);

        if (element.value == "") {
            $('select[name=' + element.name + ']').css("background", "#feebeb");
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            errCount++;
            isClicked = 0;
        }

        else if (element.value.match(/[*#\/]/g) != null) {
            $('input[name=' + element.name + ']').css("background", "#feebeb");
            invCount++;
            isClicked = 0;
        }

        else {
            //dataInsert.append(element.name,element.value);
        }

    });
    if (isClicked != 0) {
        return;
    }
    isClicked++;

    swal({
        title: 'Are you sure?',
        text: "Upload data?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
        confirmButtonText: 'Yes',
        allowOutsideClick: false
    }).then((isConfirmed) => {
        if (isConfirmed) {
            $.ajax({
                type: "POST",
                url: "/contri_upload",
                data: dataInsert,
                processData: false,
                contentType: false,
                success: function (response) {
                    isClicked = 0;

                    console.log('contri_upload response', response);
                    if (response.success == false) {
                        isClicked = 0;
                        
                        if(response.error == 1) {
                            $.notify(response.detail,{type:"danger"});
                            return;
                        }
                        else if(response.error == 2) {
                            $.notify(response.detail,{type:"danger"});
                            return;
                        }
                        else{
                            swal({
                                title: "Error!",
                                text: response.detail,
                                type: "error",
                                confirmButtonColor: "#9c27b0",
                                confirmButtonText: "Okay",
                                allowOutsideClick: false
                            });
                        }
                    }

                    else {
                        swal({
                            title: "Done!",
                            text: response.detail,
                            type: "success",
                            confirmButtonColor: "#9c27b0",
                            confirmButtonText: "Okay",
                            allowOutsideClick: false
                        }).then(() => {
                            window.location.href = '/contri_Animal'
                        });
                    }
                    
                }
            });
        }
    })
    
}

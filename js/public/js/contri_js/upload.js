isClicked = 0;

$(function () {
    // init
});

function uploadNow(event) {
    console.log('upload now!!!')
    event.preventDefault();

    var count = 0
    var all_data = []
    $('#excelList tr').each(function () {
        new_data = {}
        $(this).find('input[type="text"]').each(function() {
            new_data[$(this).attr("name")] = $(this).val()
        })
        all_data.push(new_data)
        count++;
        console.log(count);
     });

     $.ajax({
        type: "POST",
        url: "/contri_upload_2",
        data: {
            'data': JSON.stringify(all_data)
        },
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

                    console.log(response);
                    let data = response;
                    let html = "";
                    data.forEach((element, index) => {
                            let row = "<tr>";
                            row += "<td><input name=\"journal_number\" type=\"text\" value=\"" + element.journal_number + "\"/></td>";
                            row += "<td><input name=\"doi_number\" type=\"text\" value=\"" + element.doi_number + "\"/></td>";
                            row += "<td><input name=\"journal_title\" type=\"text\" value=\"" + element.journal_title + "\"/></td>";
                            row += "<td><input name=\"bacterial_id_method\" type=\"text\" value=\"" + element.bacterial_id_method + "\"/></td>";
                            row += "<td><input name=\"animal_specimen\" type=\"text\" value=\"" + element.animal_specimen + "\"/></td>";
                            row += "<td><input name=\"animal_common_name\" type=\"text\" value=\"" + element.animal_common_name + "\"/></td>";
                            row += "<td><input name=\"animal_scientific_name\" type=\"text\" value=\"" + element.animal_scientific_name + "\"/></td>";
                            row += "<td><input name=\"bacterial_name\" type=\"text\" value=\"" + element.bacterial_name + "\"/></td>";
                            row += "<td><input name=\"phylum\" type=\"text\" value=\"" + element.phylum + "\"/></td>";
                            row += "<td><input name=\"clazz\" type=\"text\" value=\"" + element.clazz + "\"/></td>";
                            row += "<td><input name=\"order\" type=\"text\" value=\"" + element.order + "\"/></td>";
                            row += "<td><input name=\"family\" type=\"text\" value=\"" + element.family + "\"/></td>";
                            row += "<td><input name=\"genus\" type=\"text\" value=\"" + element.genus + "\"/></td>";
                            row += "<td><input name=\"species\" type=\"text\" value=\"" + element.species + "\"/></td>";
                            row += "<td><input name=\"country\" type=\"text\" value=\"" + element.country + "\"/></td>";
                            
                            row += "</tr>";
                            html += row;
                        });

                        $('#excelList').html(html);
                        $('#excelTable').DataTable();
                }
            });
        }
    })
    
}

$(function () {
    viewProfile();
    $("#toSubmitProfile").hide();
    $("#toCancel").hide();
});

let isClick = 0;

function editProfile() {

    $("#toUpdateProfile").hide();
    $("#toCancel").show();
    $("#toSubmitProfile").show();
    $('input[name=userName]').removeAttr("disabled");
    $('input[name=contact]').removeAttr("disabled");
    $('input[name=firstName]').removeAttr("disabled");
    $('input[name=middleInitial]').removeAttr("disabled");
    $('input[name=lastName]').removeAttr("disabled");
    $('input[name=email]').removeAttr("disabled");
    $('input[name=address]').removeAttr("disabled");

}

function cancelEdit() {
    $("#toUpdateProfile").show();
    $("#toCancel").hide();
    $("#toSubmitProfile").hide();
    $('input[name=userName]').attr("disabled", "");
    $('input[name=contact]').attr("disabled", "");
    $('input[name=firstName]').attr("disabled", "");
    $('input[name=middleInitial]').attr("disabled", "");
    $('input[name=lastName]').attr("disabled", "");
    $('input[name=email]').attr("disabled", "");
    $('input[name=address]').attr("disabled", "");

}

function updateProfile(e) {
    e.preventDefault();

    if (isClick == !0) {
        return;
    }
    isClick++;

    let data = $("#profileForm").serializeArray();
    let dataInsert = {};
    console.log(data);

    if (data[1].value == "" || data[2].value == "" || data[4].value == "" || data[5].value == "") {
        $('input[name=contact]').css("background", "#feebeb");
        $('input[name=firstName]').css("background", "#feebeb");
        $('input[name=lastName]').css("background", "#feebeb");
        $('input[name=email]').css("background", "#feebeb");
        $.notify("Fill up required fields!", { type: "danger" });
        isClick = 0;
    }

    else if (data[0].value.match(/[*#\/]/g) || data[1].value.match(/[*#\/]/g) || data[2].value.match(/[*#\/]/g) || data[3].value.match(/[*#\/]/g) || data[4].value.match(/[*#\/]/g) || data[5].value.match(/[*#\/]/g) || data[6].value.match(/[*#\/]/g)) {
        $('input[type=text]').css("background", "#feebeb");
        $('input[type=email]').css("background", "#feebeb");
        $.notify("Invalid Character!", { type: "danger" });
        isClick = 0;
    }

    else {
        isClick =0;
        dataInsert[data[0].name] = data[0].value;
        dataInsert[data[1].name] = data[1].value;
        dataInsert[data[2].name] = data[2].value;
        dataInsert[data[3].name] = data[3].value;
        dataInsert[data[4].name] = data[4].value;
        dataInsert[data[5].name] = data[5].value;
        dataInsert[data[6].name] = data[6].value;
    }

    swal({
        title: 'Are you sure?',
        text: "Update Profile",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9c27b0',
        confirmButtonText: 'Yes'
    }).then((isConfirmed) => {
        if (isConfirmed) {
            $.post("/updateProfile", dataInsert,(response) =>{
                console.log(response);
                if (response.success == false) {
                    swal({
                        title: "Error!",
                        text: "Error Updating Profile!",
                        type: "error",
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                }

                else {
                    swal({
                        title: "Done!",
                        text: response.detail,
                        type: "success",
                        confirmButtonColor: "#9c27b0",
                        confirmButtonText: "Okay"
                    });
                    cancelEdit();
                }
            });
        }
    });
}

function viewProfile() {
    $.get("/viewProfile", (response) => {
        if (response.success == false) {
            $.notify("Error getting data from th server!", { type: "danger" });
            return;
        }

        $("input[name=userName").val(response.data.userName);
        $("input[name=contact").val(response.data.contact);
        $("input[name=firstName").val(response.data.firstName);
        $("input[name=middleInitial").val(response.data.middleInitial);
        $("input[name=lastName").val(response.data.lastName);
        $("input[name=email").val(response.data.email);
        $("input[name=address").val(response.data.address);

        let fullName = "<h5 class='title pLabel'>" + response.data.firstName + " " + response.data.lastName + "</h5>";
        let userN = "<p class='description'>" + "@" + response.data.userName + "</p>";
        $("#fullName").html(fullName);
        $("#userN").html(userN);

    })
}
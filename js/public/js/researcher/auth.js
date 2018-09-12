var auth = {
    login: (user, pass, cb)=>{
        var data = {};
        if(typeof user == 'object'){
            cb = pass;
            data = user;
        }else{
            data = {
                username: user,
                password: pass
            }
        }

        $.post('/login', data, function(res){
            if(res.success){
                cb(null);
            }else{
                cb(null, res.detail);
            }
        }).fail(xhr=>{
            cb(new Error(xhr.status+": "+xhr.statusText));
        });
    },
    register: (data, cb)=>{

    }
}

$(function(){
    $('#loginForm').submit(function(event){
        event.preventDefault();
        var data = $(this).serializeArray();
        auth.login(data[0].value, data[1].value, function(err, detail){
            if(err) return console.log(err);
            if(detail){
                alert(detail);
            }else{
                alert('Login!');
                $('#modalLogin').modal('hide');
            }
        });
    });
});
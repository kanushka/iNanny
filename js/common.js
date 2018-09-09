var BASE_URL = null;
var DEFAULT_IMG_URL = null;

//
// events
//

$(document).ready(function() {
    BASE_URL = $("#baseUrl").val();
    DEFAULT_IMG_URL = `${BASE_URL}img/profile/sample_img.jpg`;
});


// logout user
$('.logoutBtn').click(function(){
    $.post(BASE_URL + "user/logout",
    {},
    function (data, status) {
        if(status){
            if(data.error){
                Materialize.toast(`Something went wrong. cannot logout user now.`, 4000);
            }else{
                window.location.href = BASE_URL + "user/login";
            }
        }
    });
});

//
// functions
//

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function capitalizeWord(string) {
    if(string == null || string == ''){
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function titleCase(str) {
    if(str == null || str == ''){
        return '';
    }
    return str.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
  }
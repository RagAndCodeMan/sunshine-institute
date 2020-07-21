$('.submit').on("click", function(e) {
    var password = $(".password").val();
    var login = $('.login').val();
    var isFailure = false;

    if (password === "" || login === "") {
        e.preventDefault();
        validationFailure("Все поля обязательны к заполнению!");
        isFailure = true;
    }
    
    if (isFailure === false) {
        $('.submit').submit()
    }
})

function validationFailure(reason) {
    $(".modal-body").text(reason);

    $('#warning').modal({
        keyboard: true
    });
}
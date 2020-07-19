var win_w = $(document).width()

if (win_w > 620) {
    $('[data-toggle="tooltip"]').tooltip();
} else {
    $('.name').attr('placeholder', "Ваше имя");
    $('.login').attr('placeholder', "Придумайте логин (eng)");
}

document.getElementsByName('login')[0].addEventListener("keydown", function() {
    withoutCyr(document.getElementsByName('login')[0])
})

$('.submit').on("click", function(e) {
    var password = $(".password").val();
    var confirmPassword = $(".password-repeat").val();
    var name = $('.name').val();
    var login = $('.login').val();
    var isFailure = false;

    if (password === "" || confirmPassword === "" || name === "" || login === "") {
        e.preventDefault();
        validationFailure("Все поля обязательны к заполнению!");
        isFailure = true;
    } 
    else if (login.length <= 3) {
        e.preventDefault();
        validationFailure("Логин обязан быть написан латинскими символами, а его длина должна быть не меньше трёх символов!");
        isFailure = true;
    }

    if (password !== confirmPassword) {
        e.preventDefault();
        validationFailure("Пароли не совпадают!");
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

function withoutCyr(input) {
    var value = input.value;
    var re = /а|б|в|г|д|е|ё|ж|з|и|ё|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|ъ|ы|ь|э|ю|я/gi;
    if (re.test(value)) {
        value = value.replace(re, '');
        input.value = "";
    }
}

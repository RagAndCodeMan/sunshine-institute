var win_w = $(document).width()

if (win_w > 620) {
    $('[data-toggle="tooltip"]').tooltip();
} else {
    $('.name').attr('placeholder', "Ваше имя");
    $('.login').attr('placeholder', "Придумайте логин");
}

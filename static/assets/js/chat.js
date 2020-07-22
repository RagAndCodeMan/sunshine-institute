$(function() {
    var socket = io();

    socket.emit("user_connected", $("#name").text())
    socket.on("display_connection", function(name) {
        $("#messageArea").append(`<li class="event-message"><strong>${name}</strong> присоединился к чату!</li>`)
    })

    socket.on("display_message", (data) => {
        $("#messageArea").append(`<li class="chat-message"><span style="float: left; margin-right: 20px">${data[0]}</span>${data[1]}<span style="float: right;">${data[2]}</span></li>`);
    })

    socket.on("display_disconnection", function() {
        $("#messageArea").append(`<li class="event-message">Кто-то покинул чат...</li>`); 
    });

    $("#submit").click(function(event) {
        event.preventDefault();

        socket.emit("message_send", [$("#name").text(), $("#message").val(), new Date().getHours() + ":" + new Date().getMinutes()]);
        $("#message").val('');
    });
});
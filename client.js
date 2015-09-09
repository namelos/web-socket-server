$(function() {
  var ws = new WebSocket('ws://localhost:8000');
  $('button').click(function() {
      ws.send($('input').val());
  });
  ws.onmessage = function(data) {
    $('ul').append('<li>' + data.data + '</li>')
  }
});

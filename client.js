$(function() {
  var ws = new WebSocket('ws://localhost:8000');
  $('button').click(function() {
      ws.send($('input').val());
  });
  ws.onmessage = function(data) {

    var d = JSON.parse(data.data);
    console.log(d);
    $('ul').append('<li>'
        + '<img src=' + d.portrait + ' alt="portrait" class="img">'
        + '客户端:' + d.id
        + '日期: ' + d.date
        + '<br />'
        + '<p>' + d.content + '</p>'
        + '</li>')
  }
});

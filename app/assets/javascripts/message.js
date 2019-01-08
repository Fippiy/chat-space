$(function() {

  var message_list = $(".main__body");

  function appendContent(message) {

    var html_head = `<div class="main__body--box clearfix" message_id="${ message.id }">
                  <li class="message-nickname">
                    ${ message.nickname }
                  </li>
                  <li class="message-date">
                    ${ message.created_at }
                  </li>
                  <li class="message-text">`

    if (message.image == null) {
      var html_body = `${ message.text }`
    } else {
      var html_body = `${ message.text }<img src="${ message.image }">`
    }

    var html_foot =   `</li>
                    </div>`

    var html = html_head + html_body + html_foot
    message_list.append(html);
    $('html, body').scrollTop($(document).height());
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);

    var href = window.location.href;

    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      appendContent(message);
      $("#message_text").val("");
      $("#message_image").val("");
      $("#message-submit").prop('disabled', false);
    })
    .fail(function() {
      $("#message-submit").prop('disabled', false);
      alert('通信に失敗しました');
    });
  });

  setInterval(function() {
    var href = window.location.href;
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messages){
      var lastMessageId = $(".main__body--box").last().attr("message_id");
      if (messages.length !== 0) {
        messages.forEach(function(message) {
        if (message.id > lastMessageId) {
          appendContent(message);
          }
        });
      }
    })
    .fail(function() {
      console.log("fail");
      alert('通信に失敗しました');
    });
  },5000);
});

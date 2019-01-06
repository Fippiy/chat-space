$(function() {

  var message_list = $(".main__body");

  function appendContent(message) {

    var html_head = `<div class="main__body--box clearfix">
                  <li class="message-nickname">
                    ${ message.nickname }
                  </li>
                  <li class="message-date">
                    ${ message.created_at }
                  </li>
                  <li class="message-text">`

    if (message.image == null) {
      var html_body = `${ message.text }`
    } else if (message.text == null) {
      var html_body = `<img src="${ message.image }">`
    } else {
      var html_body = `${ message.text }<img src="${ message.image }">`
    }

    var html_foot =   `</li>
                    </div>`

    var html = html_head + html_body + html_foot
    message_list.append(html);
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
      console.log(message);
      appendContent(message);
      $("#message_text").val("");
      $("#message_image").val("");
      $("#message-submit").prop('disabled', false);
      $('html, body').scrollTop($(document).height());
    })
    .fail(function() {
      $("#message-submit").prop('disabled', false);
      alert('通信に失敗しました');
    });
  });
});

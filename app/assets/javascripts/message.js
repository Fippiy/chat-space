$(function() {

  var message_list = $(".main__body");

  function appendContent(message) {
    var html_body =
      message.image == null ? message.text : message.text + "<img src=" + message.image + ">";
    var html = "test"
     // `<div class="  main__body--box clearfix" message_id="${ message.id }">
     //              <li class="message-nickname">
     //                ${ message.nickname }
     //              </li>
     //              <li class="message-date">
     //                ${ message.created_at }
     //              </li>
     //              <li class="message-text">
     //                ${ html_body }
     //              </li>
     //            </div>`
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
    var regExpGroupMessagePath = RegExp(/\/groups\/[0-9]+\/messages/);
    if(href.match(regExpGroupMessagePath)) {
      var lastMessageId = $(".main__body--box").last().attr("message_id");
      if (lastMessageId > 0) {
        $.ajax({
          url: href,
          type: 'GET',
          data: {
            message: {id: lastMessageId}
          },
          dataType: 'json',
          processData: true,
          contentType: false
        })
        .done(function(messages){
          if (messages.length !== 0) {
            messages.forEach(function(message) {
              appendContent(message);
            });
          }
        })
        .fail(function() {
          alert('通信に失敗しました');
        });
      }
    }
  },5000);
});

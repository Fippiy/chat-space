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
    } else {
      var html_body = `${ message.text }<img src="${ message.image }">`
    }

    var html_foot =   `</li>
                    </div>`

    var html = html_head + html_body + html_foot
    message_list.append(html);
    $('html, body').scrollTop($(document).height());
  }

  // function insertToMessageHTML(message) {
  //   var insertMessageHTML = `<div class="main__body--box clearfix">
  //                             <li class="message-nickname">${ nickname }</li>
  //                             <li class="message-date">${ created_at }</li>
  //                             <li class="message-text">${ text }</li>
  //                           </div>`
  // }

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

  // !!!!!!!!!!!!!!!!!!!!!!!自動更新
  setInterval(function() {
  // !!!!!!!!!!!!!!!!!!!!!!!コンソールで自動更新確認
    // console.log("自動出力表示テスト");
    var href = window.location.href;

    $.ajax({
      // url: location.href.json
      url: href,
      type: 'GET',
      // data: { date: lastMessageDate },
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messages){
  // !!!!!!!!!!!!!!!!!!!!!!!コンソールで自動更新確認
      console.log("done");
      // console.log(messages);
      // !!!!!!!!!!!!!!!!時間取得（仮置きで1/7指定)
      // var lastMessageDate = new Date("2019/01/07 23:59:59");
      // console.log(lastMessageDate);
      // console.log(messages);
      //// 最新メッセージの時間を取得
      var lastMessageDate = new Date($(".message-date").last().text());
      // console.log($(".message-date").last().text());
      // console.log(lastMessageDate);
      //// 新たに書き出すHTML枠を空にする（再更新時に残骸データをのこさないため）
      // var insertMessageHTML = ""

      // console.log(messages);
      //// 取得したJSONと最新メッセージ時間の比較
      if (messages.length !== 0) {
        messages.forEach(function(message) {
        var messageDate = new Date(message.created_at);

          // console.log($.type(lastMessageDate));
          // console.log($.type(messageDate));
          console.log(lastMessageDate);
          console.log(messageDate);

          // console.log($.type(message.created_at));
          // console.log($.type(lastMessageDate));
          // console.log(new Date(message.created_at));
        if (messageDate > lastMessageDate) {
          // HTML生成
          // insertToMessageHTML(message);
          appendContent(message);
          }
        });
      }




      //// 最新データであればHTML書き出しを実施
      // if (insertMessageHTML !== null) {
      // if (insertMessageHTML !== null) {
      // //// 書き出したデータを最新行に追加

      // }
    })
    .fail(function() {
  // !!!!!!!!!!!!!!!!!!!!!!!コンソールで自動更新確認
      console.log("fail");
    });
  },5000);
});

$(function() {

  var user_list = $("#chat-group-users");

  function appendUser(user) {
    // var html = `<div>${ user.nickname }</div>`
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.nickname }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.nickname }">追加</a>
                </div>`
    user_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    user_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
      // 同じで使えるなら、先頭の配列を利用する
      $("#chat-group-users").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});

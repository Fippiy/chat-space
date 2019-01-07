$(function() {

  var user_list = $("#user-search-result");

  function appendUser(user) {
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

  function appendAddUser(userId, userNickname) {
    var addHtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userId }'>
                    <input name='group[user_ids][]' type='hidden' value='${ userId }'>
                    <p class='chat-group-user__name'>${ userNickname }</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
    $('.chat-group-users').append(addHtml);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      user_list.empty();
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

  user_list.on("click", ".user-search-add", function() {
    var userId = $(this).attr('data-user-id');
    var userNickname = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendAddUser(userId, userNickname);
  });
  $(".chat-group-users").on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});

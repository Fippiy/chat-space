$(function() {

  var userSearchList = $("#user-search-result");
  // var userOutputList = $('.chat-group-user input');
  // var userOutputList = $('.chat-group-user').children().attr('class');
  // var userOutputList = $('.chat-group-user').attr('id');
  // console.log(userOutputList);

  // var userOutputList = $('.nowChatMember').attr("value");

  function appendUserToSearchResult(user) {
    var appendUserSearchResultHTML = `<div class="chat-group-user clearfix">
                                        <p class="chat-group-user__name">${ user.nickname }</p>
                                        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.nickname }">追加</a>
                                      </div>`
    userSearchList.append(appendUserSearchResultHTML);
  }

  function appendNoUserToSearchResult(user) {
    var appendUserSearchResultHTML = `<div class="chat-group-user clearfix">
                                        <p class="chat-group-user__name">${ user }</p>
                                      </div>`
    userSearchList.append(appendUserSearchResultHTML);
  }

  function appendUserToChatMember(userId, userNickname) {
    var appendUserChatMemberHTML = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userId }'>
                                      <input class='nowChatMember' name='group[user_ids][]' type='hidden' value='${ userId }'>
                                      <p class='chat-group-user__name'>${ userNickname }</p>
                                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                                    </div>`
    $('.chat-group-users').append(appendUserChatMemberHTML);
  }

  $("#user-search-field").on("keyup", function() {
    var inputUserSearch = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: inputUserSearch },
      dataType: 'json'
    })
    .done(function(users) {
      userSearchList.empty();
      if (users.length !== 0) {
        var nowChatMembers = [];
        $(".chat-group-user").each(function() {
          nowChatMembers.push($(this).children().attr('value'));
        });
        users.forEach(function(user) {
          var test = String(user.id);
          if (nowChatMembers.indexOf(test) == -1) {
            appendUserToSearchResult(user);
          }
        });
      }
      else {
        appendNoUserToSearchResult("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  userSearchList.on("click", ".user-search-add", function() {
    var userId = $(this).attr('data-user-id');
    var userNickname = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendUserToChatMember(userId, userNickname);
  });
  $(".chat-group-users").on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});

$(function() {

  var userSearchList = $("#user-search-result");

  function appendUserToSearchResult(user) {
    var appendUserSearchResultHTML = "test"
    userSearchList.append(appendUserSearchResultHTML);
  }

  function appendNoUserToSearchResult(user) {
    var appendUserSearchResultHTML = "test"
    userSearchList.append(appendUserSearchResultHTML);
  }

  function appendUserToChatMember(userId, userNickname) {
    var appendUserChatMemberHTML = "test"
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
          var addUserId = String(user.id);
          if (nowChatMembers.indexOf(addUserId) == -1) {
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

$(function(){

  function buildHTML(message){
    if (message.image){
      let html = `<div class="chatBox" data-message-id=${message.id}>
                    <div class="chatBox__userBox">
                      <div class="chatBox__userBox__name">
                        ${message.user_name}
                        &nbsp;
                      </div>
                      <div class="chatBox__userBox__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chatBox__messageBox">
                      <p class="Message__text">
                        ${message.text}
                      </p>
                      <img class="Message__iamge" src="${message.image}">
                    </div>
                  </div>`
      return html;
    }else{
      let html = `<div class="chatBox" data-message-id=${message.id}>
                    <div class="chatBox__userBox">
                      <div class="chatBox__userBox__name">
                        ${message.user_name}
                        &nbsp;
                      </div>
                      <div class="chatBox__userBox__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chatBox__messageBox">
                      <p class="Message__text">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
      return html;
    }
  }

  
  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.chatBox:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.Mainbar__chat').append(insertHTML);
        $('.Mainbar__chat').animate({ scrollTop: $('.Mainbar__chat')[0].scrollHeight });
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  setInterval(reloadMessages, 7000);
});
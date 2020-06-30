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
    let last_message_id = $('.chatBox:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
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
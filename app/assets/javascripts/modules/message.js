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

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(text){
      let html = buildHTML(text)
      $('.Mainbar__chat').append(html);
      $('.Mainbar__chat').animate({ scrollTop: $('.Mainbar__chat')[0].scrollHeight });
      $('.Form')[0].reset('');
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.form__btn').prop('disabled', false);
    })
  })
});
$(function(){
  function buildmessage(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="main__body__frame">
                <div class="main__body__frame__member">
                ${message.name}
                </div>
                <div class="main__body__frame__date">
                ${message.date}
                </div>
                <div class="main__body__frame__comment">
                <p class="lower-message__content">
                ${message.content}
                </p>
                ${image_url}
              </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(document.querySelector("form"));
    formData.append("upload-label", "This is some extra data");
    var url = $("form").attr('action')
    $.ajax({
      url:url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messages){
      var html = buildmessage(messages);
      $('.main__body').append(html)
      $('#new_message')[0].reset();
      $('.text__submit').prop('disabled', false);
      $('#main').animate({ scrollTop: $('#main')[0].scrollHeight});
      return false
    })
    .fail(function(message) {
      alert("メッセージ送信に失敗しました");
  });
  })
})
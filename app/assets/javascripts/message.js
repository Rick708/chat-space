$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="main__body__frame">
                  <div class="main__body__frame__member">
                  ${message.name}
                  </div>
                  <div class="main__body__frame__date">
                  ${message.date}
                  </div>
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
      contentType: false,
    })
    .done(function(messages){
      var html = buildHTML(messages);
      $('.main__body').append(html)
      $('#new_message')[0].reset();
      $('.text__submit').prop('disabled', false);
      $('#main').animate({ scrollTop: $('#main')[0].scrollHeight});
      return false
    })
    .fail(function(message) {
      alert("メッセージ送信に失敗しました");
  });
  });

  //自動更新
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data('messageId')
      $.ajax({
        url: "api/messages",
        //ルートで見る。メッセージのインデックスのパスを入力
        type: 'GET',
        //ルートで見る。メッセージインデックスのPATCHを入力
        dataType: 'json',
        //jsonで送っているのでデータタイプはjson
        data: {id: last_message_id}
        //上記で定義したlast_message_idをidとして使えるように定義
      })

      .done(function(messages){
        let insertHTML = '';
        //追加するHTMLの入れ物を作る
        messages.forEach(function(message){
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message);
        //メッセージが入ったHTMLを取得
        $('.main__body').append(insertHTML);
        //メッセージを追加
        $('#main').animate({scrollTop: $('#main')[0].scrollHeight}, 'fast'); 
        //一番下にスクロール
      })
     })
     .fail(function() {
      alert('error');
     });
    };
  }
  setInterval(reloadMessages, 10000);
  //10秒毎に自動更新する
});

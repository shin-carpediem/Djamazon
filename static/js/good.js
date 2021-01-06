$(function(){
  // setup for ajax
  var csrftoken = getCookie('csrftoken');
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

var AddedGoodList = []; // 連打防止用のIPアドレス格納リスト
// いいねボタン押下時の処理
onClickGoodButton();

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
      }
    }
    return cookieValue;
}

function onClickGoodButton() {
    $('.good_button').on('click', function() {
      var currentCount = $(this).data('count');
      var countViewer = $(this).find('.good_counter');
      if (AddedGoodList.indexOf(commentId) < 0) {
          good(currentCount, countViewer);
      }
    });
}

// ajax通信して投票結果を反映する
function good(currentCount, countViewer) {
  let url = '/api/good/';
  $.ajax({
      type: 'POST',
      url: url,
      data: {
          ip_address: ip_address
      }
  }).then(
      data => {
        if (data.result) {
            countViewer.text(currentCount + 1);
            AddedGoodList.push(ip_address);
        }
      },
      error => {
        if (error.responseJSON.message) {
            alert(error.responseJSON.message);
        }
      }
  );
}
});
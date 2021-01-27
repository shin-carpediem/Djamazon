// header_title
var h1 = document.querySelector("h1");

h1.addEventListener("input", function() {
  this.setAttribute("data-heading", this.innerText);
});
// end of header_title


// mousemove
//#titleを取得
let title = document.getElementById('title');
//#bgを取得
let bg = document.getElementById('bg');

document.addEventListener('mousemove', event => {

  //X座標(値は適宜調整)
  var x = Math.round(event.pageX / 100);
  //Y座標(値は適宜調整)
  var y = Math.round(event.pageY / 100);

  console.log(x, y);

  //#titleのX軸・Y軸を設定
  title.style.marginLeft = -x +'px';
  title.style.marginTop = -y +'px';

  //#bgのX軸・Y軸を設定
  bg.style.marginLeft = x +'px';
  bg.style.marginTop = y +'px';
});
// end of mousemove


// scroll_button
// anime.js利用

/* ========================================================
スクロールでトップに戻るボタンを表示
=========================================================*/
// スクロールして何ピクセルでアニメーションさせるか
var px_change = 1;
// スクロールのイベントハンドラを登録
window.addEventListener('scroll', function(e) {
  // 変化するポイントまでスクロールしたらクラスを追加
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if ( scrollTop > px_change ) {
    document.getElementById( "btn-backtotop" ).classList.add( "fadein" );

  // 変化するポイント以前であればクラスを削除
  } else {
    document.getElementById( "btn-backtotop" ).classList.remove( "fadein" );
  }
});

/* ========================================================
トップに戻るボタンのスムーズスクロール
=========================================================*/

document.getElementById( "btn-backtotop" ).addEventListener('click', function(e) {
  anime.remove("html, body");
  anime({
    targets: "html, body",
    scrollTop: 0,
    dulation: 600,
    easing: 'easeOutCubic',
  });
  return false;
});
// end of scroll_button


// good
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

var AddGoodList = []; // 連打防止用のIPアドレス格納リスト
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

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function onClickGoodButton() {
    $('.good_button').on('click', function() {
      var ipAddress = $(this).data('ip-address')
      var currentCount = $(this).data('count');
      var countViewer = $(this).find('.good_counter');
      if (AddGoodList.indexOf(ipAddress) < 0) {
          good(ipAddress, currentCount, countViewer);
      }
    });
}

// ajax通信して投票結果を反映する
function good(ipAddress, currentCount, countViewer) {
  let url = '';
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
            AddGoodList.push(ip_address);
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
// end of good
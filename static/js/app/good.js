"use strict";

const good = () => {
  // setup for ajax
  var csrftoken = getCookie("csrftoken");
  $.ajaxSetup({
    beforeSend: (xhr, settings) => {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    },
  });

  var AddGoodList = []; // 連打防止用のIPアドレス格納リスト
  // いいねボタン押下時の処理
  onClickGoodButton();

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrfSafeMethod = (method) => {
    // these HTTP methods do not require CSRF protection
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
  };

  const onClickGoodButton = () => {
    $(".good_button").on("click", function () {
      var ipAddress = $(this).data("ip-address");
      var currentCount = $(this).data("count");
      var countViewer = $(this).find(".good_counter");
      if (AddGoodList.indexOf(ipAddress) < 0) {
        good(ipAddress, currentCount, countViewer);
      }
    });
  };

  // ajax通信して投票結果を反映する
  const good = (ipAddress, currentCount, countViewer) => {
    let url = "";
    $.ajax({
      type: "POST",
      url: url,
      data: {
        ip_address: ip_address,
      },
    }).then(
      (data) => {
        if (data.result) {
          countViewer.text(currentCount + 1);
          AddGoodList.push(ip_address);
        }
      },
      (error) => {
        if (error.responseJSON.message) {
          alert(error.responseJSON.message);
        }
      }
    );
  };
};
good();

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
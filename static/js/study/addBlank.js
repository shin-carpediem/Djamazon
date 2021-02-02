"use strict";

const addBlank = () => {
  // タグの取得
  const tag = document.getElementsByTagName("A");
  // 属性を設定
  tag.setAttribute("target", "_blank");
  tag.setAttribute("rel", "noopener noreferre");
};
addBlank();

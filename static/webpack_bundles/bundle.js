/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./static/js/good.js":
/*!***************************!*\
  !*** ./static/js/good.js ***!
  \***************************/
/***/ (function() {

eval("const good = () => {\n  // setup for ajax\n  var csrftoken = getCookie(\"csrftoken\");\n  $.ajaxSetup({\n    beforeSend: (xhr, settings) => {\n      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {\n        xhr.setRequestHeader(\"X-CSRFToken\", csrftoken);\n      }\n    },\n  });\n\n  var AddGoodList = []; // 連打防止用のIPアドレス格納リスト\n  // いいねボタン押下時の処理\n  onClickGoodButton();\n\n  function getCookie(name) {\n    var cookieValue = null;\n    if (document.cookie && document.cookie !== \"\") {\n      var cookies = document.cookie.split(\";\");\n      for (var i = 0; i < cookies.length; i++) {\n        var cookie = jQuery.trim(cookies[i]);\n        // Does this cookie string begin with the name we want?\n        if (cookie.substring(0, name.length + 1) === name + \"=\") {\n          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n          break;\n        }\n      }\n    }\n    return cookieValue;\n  }\n\n  function csrfSafeMethod(method) {\n    // these HTTP methods do not require CSRF protection\n    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);\n  }\n\n  function onClickGoodButton() {\n    $(\".good_button\").on(\"click\", function () {\n      var ipAddress = $(this).data(\"ip-address\");\n      var currentCount = $(this).data(\"count\");\n      var countViewer = $(this).find(\".good_counter\");\n      if (AddGoodList.indexOf(ipAddress) < 0) {\n        good(ipAddress, currentCount, countViewer);\n      }\n    });\n  }\n\n  // ajax通信して投票結果を反映する\n  function good(ipAddress, currentCount, countViewer) {\n    let url = \"\";\n    $.ajax({\n      type: \"POST\",\n      url: url,\n      data: {\n        ip_address: ip_address,\n      },\n    }).then(\n      (data) => {\n        if (data.result) {\n          countViewer.text(currentCount + 1);\n          AddGoodList.push(ip_address);\n        }\n      },\n      (error) => {\n        if (error.responseJSON.message) {\n          alert(error.responseJSON.message);\n        }\n      }\n    );\n  }\n};\ngood();\n\n\n//# sourceURL=webpack://Djamazon/./static/js/good.js?");

/***/ }),

/***/ "./static/js/headerTitle.js":
/*!**********************************!*\
  !*** ./static/js/headerTitle.js ***!
  \**********************************/
/***/ (function() {

eval("const headerTitle = () => {\n  var h1 = document.querySelector(\"h1\");\n\n  h1.addEventListener(\"input\", () => {\n    this.setAttribute(\"data-heading\", this.innerText);\n  });\n};\nheaderTitle();\n\n\n//# sourceURL=webpack://Djamazon/./static/js/headerTitle.js?");

/***/ }),

/***/ "./static/js/main.js":
/*!***************************!*\
  !*** ./static/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _headerTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headerTitle */ \"./static/js/headerTitle.js\");\n/* harmony import */ var _headerTitle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_headerTitle__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mouseMove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mouseMove */ \"./static/js/mouseMove.js\");\n/* harmony import */ var _scrollButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollButton */ \"./static/js/scrollButton.js\");\n/* harmony import */ var _scrollButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scrollButton__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _good__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./good */ \"./static/js/good.js\");\n/* harmony import */ var _good__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_good__WEBPACK_IMPORTED_MODULE_3__);\n// for webpack, this is the entry point of JS files to bundle.\n\n(0,_headerTitle__WEBPACK_IMPORTED_MODULE_0__.headerTitle)();\n\n\n(0,_mouseMove__WEBPACK_IMPORTED_MODULE_1__.mouseMove)();\n\n\n(0,_scrollButton__WEBPACK_IMPORTED_MODULE_2__.scrollButton)();\n\n\n(0,_good__WEBPACK_IMPORTED_MODULE_3__.good)();\n\n\n//# sourceURL=webpack://Djamazon/./static/js/main.js?");

/***/ }),

/***/ "./static/js/mouseMove.js":
/*!********************************!*\
  !*** ./static/js/mouseMove.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mouseMove\": () => /* binding */ mouseMove\n/* harmony export */ });\nconst mouseMove = () => {\n  //#titleを取得\n  let title = document.getElementById(\"title\");\n  //#bgを取得\n  let bg = document.getElementById(\"bg\");\n\n  document.addEventListener(\"mousemove\", (event) => {\n    //X座標(値は適宜調整)\n    var x = Math.round(event.pageX / 100);\n    //Y座標(値は適宜調整)\n    var y = Math.round(event.pageY / 100);\n\n    console.log(x, y);\n\n    //#titleのX軸・Y軸を設定\n    title.style.marginLeft = -x + \"px\";\n    title.style.marginTop = -y + \"px\";\n\n    //#bgのX軸・Y軸を設定\n    bg.style.marginLeft = x + \"px\";\n    bg.style.marginTop = y + \"px\";\n  });\n};\n// mouseMove();\n\n\n//# sourceURL=webpack://Djamazon/./static/js/mouseMove.js?");

/***/ }),

/***/ "./static/js/scrollButton.js":
/*!***********************************!*\
  !*** ./static/js/scrollButton.js ***!
  \***********************************/
/***/ (() => {

eval("const scrollButton = () => {\n  // anime.js利用\n\n  /* ========================================================\nスクロールでトップに戻るボタンを表示\n=========================================================*/\n  // スクロールして何ピクセルでアニメーションさせるか\n  var px_change = 1;\n  // スクロールのイベントハンドラを登録\n  window.addEventListener(\"scroll\", (e) => {\n    // 変化するポイントまでスクロールしたらクラスを追加\n    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    if (scrollTop > px_change) {\n      document.getElementById(\"btn-backtotop\").classList.add(\"fadein\");\n\n      // 変化するポイント以前であればクラスを削除\n    } else {\n      document.getElementById(\"btn-backtotop\").classList.remove(\"fadein\");\n    }\n  });\n\n  /* ========================================================\nトップに戻るボタンのスムーズスクロール\n=========================================================*/\n\n  document.getElementById(\"btn-backtotop\").addEventListener(\"click\", (e) => {\n    anime.remove(\"html, body\");\n    anime({\n      targets: \"html, body\",\n      scrollTop: 0,\n      dulation: 600,\n      easing: \"easeOutCubic\",\n    });\n    return false;\n  });\n};\nscrollButton();\n\n\n//# sourceURL=webpack://Djamazon/./static/js/scrollButton.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./static/js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
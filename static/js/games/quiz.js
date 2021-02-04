"use strict";

{
  const question = document.getElementById("quiz-question");
  const choices = document.getElementById("quiz-choices");
  const question = document.getElementById("quiz-btn");

  const quizSet = [
    { q: "What is A?", c: ["A0", "A1", "A2"] },
    { q: "What is B?", c: ["B0", "B1", "B2"] },
    { q: "What is C?", c: ["C0", "C1", "C2"] },
  ];

  // 今何問目の問いか変数で管理する
  let currentNum = 0;
}

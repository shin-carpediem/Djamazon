"use strict";

const quiz = () => {
  const question = document.getElementById("quiz-question");
  const choices = document.getElementById("quiz-choices");
  const btn = document.getElementById("quiz-btn");
  const result = document.getElementById("quiz-result");
  const scoreLabel = document.querySelector("#quiz-result > p");

  // 各選択肢の１番目[0]を正解とする前提で以下を設計する
  const quizSet = shuffle([
    { q: "世界で一番大きな湖は？", c: ["カスピ海", "カリブ海", "琵琶湖"] },
    { q: "2の8乗は？", c: ["256", "64", "1024"] },
    {
      q: "次のうち、最初にリリースされた言語は？",
      c: ["Python", "JavaScript", "HTML"],
    },
  ]);
  // 今何問目の問いか変数で管理する
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  window.onload = () => {
    alert("This game is not related to point.")
  }

  // フィッシャー・イェーツのシャッフル
  function shuffle(arr) {
    // 最初のセットで、配列全体の中からランダムに要素を選んで、
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //  それを最後の要素と入れ替える（分割代入を用いる）
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add("correct");
      score++;
    } else {
      li.classList.add("wrong");
    }

    btn.classList.remove("disabled");
  }

  function setQuiz() {
    isAnswered = false;
    // 質問作成
    question.textContent = quizSet[currentNum].q;

    // nextボタンを押した時に前の選択肢を残さない為に、
    // 蓄積された選択肢choicesの値がnullになるまでループを回す
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // 配列のそのものを渡すと、shuffleで表示されるものだけでなく、
    // 配列そのものまでシャッフルされて、「配列の１番目が正解」を
    // 維持できなくなるので、スプレッド演算子を用いて、配列のコピーを作る
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // 選択項目作成
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      // クリックしたら正誤判定
      li.addEventListener("click", () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    // 最後の問題でボタンをshow sqoreに変更
    if (currentNum === quizSet.length - 1) {
      btn.textContent = "Show Score";
    }
  }

  setQuiz();

  btn.addEventListener("click", () => {
    if (btn.classList.contains("disabled")) {
      return;
    }
    btn.classList.add("disabled");

    // ゲーム終了時
    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove("hidden");
      setTimeout(checkResult, 2000);
    } else {
      currentNum++;
      setQuiz();
    }
  });
};
quiz();

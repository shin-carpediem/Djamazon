// https://djangobrothers.com/blogs/chartjs_usage/
"use strict";

// ポイントの増減をuserpointhistory.js経由で取得
async function callUserPointHistoryApi() {
  const res = await fetch("http://127.0.0.1:8000/api/userpointhistory/");
  const userpointhistory = await res.json();

  let rowBar = [];
  for (let i = 0; i <= userpointhistory.length; i++) {
    rowBar.push(userpointhistory[i]["point_history"]);
    console.log(rowBar);
  }

  let colBar = [];
  for (let i = 0; i <= userpointhistory.length; i++) {
    colBar.push(userpointhistory[i]["created_at"]);
  }
  console.log(colBar);
}
callUserPointHistoryApi();

function pointHistory() {
  let type = "line";

  let data = {
    // "created_at"のデータが入る
    // labels: ["2021/02/01", "2021/02/02", "2021/02/03", "2021/02/04"],
    labels: [rowBar],
    datasets: [
      {
        label: "",
        // "point_history"のデータが入る
        // data: [50000, 49000, 48000, 51000],
        data: [colBar],
        borderColor: "rgb(54, 165, 123)",
        backgroundColor: "rgb(54, 165, 123, 0.1)",
        lineTension: 0,
      },
    ],
  };

  let options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 30000,
            suggestedMax: 70000,
            stepSize: 500,
            // callbackは、value=それぞれの軸の値、index=その軸が何番目か、values=全ての軸の値、が配列として返ってくる
            callback: function (value, index, values) {
              return value + " Point";
            },
          },
        },
      ],
    },
    title: {
      display: true,
      text: "your point transition",
      fontSize: 18,
      position: "left",
    },
    legend: {
      display: false,
    },
  };

  let ctx = document.getElementById("point-trasition").getContext("2d");
  let pointhistory = new Chart(ctx, {
    type: type,
    data: data,
    options: options,
  });
}
pointHistory();

// https://djangobrothers.com/blogs/chartjs_usage/
"use strict";

// ポイントの増減をuserpointhistory.js経由で取得
async function pointHistory() {
  const res = await fetch("http://127.0.0.1:8000/api/userpointhistory/");
  const userpointhistory = await res.json();

  let rowBar = [];
  for (const point of userpointhistory) {
    rowBar.push(point["point_history"]);
  }

  let colBar = [];
  for (const date of userpointhistory) {
    let splitedDate = date["created_at"].split(":")[0].slice(0, -3);
    colBar.push(splitedDate);
  }
  console.log(colBar);

  let type = "line";

  let data = {
    // "created_at"のデータが入る
    labels: colBar,
    datasets: [
      {
        label: "",
        // "point_history"のデータが入る
        data: rowBar,
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
            suggestedMin: 40000,
            suggestedMax: 60000,
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

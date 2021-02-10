// https://djangobrothers.com/blogs/chartjs_usage/
"use strict";

{
  var type = "line";

  var data = {
    labels: ["2021/02/01", "2021/02/02", "2021/02/03", "2021/02/04"],
    datasets: [
      {
        label: "",
        data: [50000, 49000, 48000, 51000],
        borderColor: "#0f4b34",
        backgroundColor: "rgb(54, 165, 123, 0.3)",
        lineTension: 0,
      },
    ],
  };

  var options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 45000,
            suggestedMax: 55000,
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

  var ctx = document.getElementById("point-trasition").getContext("2d");
  var pointhistory = new Chart(ctx, {
    type: type,
    data: data,
    options: options,
  });
}

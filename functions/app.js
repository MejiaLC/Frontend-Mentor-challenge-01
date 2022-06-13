const ctx = document.getElementById("chart").getContext("2d");

let dataList = [];

const getChartData = async () => {
  try {
    let response = await fetch("../data.json");
    let data = await response.json();

    dataList = [...dataList, data];

    let days = dataList[0].map((item) => item.day);
    let dataChart = dataList[0].map((item) => item.amount);

    let months = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    let date = new Date();
    let today = months[date.getDay()];

    console.log(today);
    let todayPosition = days.findIndex((item) => item === today) + 1;

    console.log(todayPosition);

    let colors = [
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
      "hsl(10, 79%, 65%)",
    ];

    let barColors = colors.map((item, i) => {
      return i === todayPosition - 1 ? "hsl(186, 34%, 60%)" : item;
    });

    console.log(barColors);

    chartContext(days, dataChart, barColors);
  } catch (error) {
    console.error("An error has ocurred: ", error);
  }
};

getChartData();

const chartContext = (days, data, barColors) => {
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          data: data,
          backgroundColor: barColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },

      legend: {
        display: false,
      },
      onClick: (e, item) => {
        console.log(e, item);
      },

      onHover: function (e, item) {
        const target = e.native ? e.native.target : e.target;
        target.style.cursor = item[0] ? "pointer" : "default";
      },
    },
  });
};

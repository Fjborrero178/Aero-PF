document.getElementById("btn_menu").addEventListener("click", mostrar_menu);

document.getElementById("back_menu").addEventListener("click", ocultar_menu);

const nav = document.getElementById("nav");
const background_menu = document.getElementById("back_menu");

function mostrar_menu() {
  nav.style.right = "0px";
  background_menu.style.display = "block";
}

function ocultar_menu() {
  nav.style.right = "-250px";
  background_menu.style.display = "none";
}

var modoNewData = [1];
var modoOldData = [1];
var bateriaData = [0.06];
var windData = [0];
var currentDate = ["2022-11-21"];
var currentHours = ["00:00:00"];

let oldChart;
let newChart;
let batteryChart
let windChart;



setInterval(() => {
  console.log("Delayed for 3 second.");

  try {

    fetch("http://localhost:80/envio")
    .then((response) => response.json())
    .then((json) => {

      var now = new Date();

      var thiscurrentDate = now.toLocaleDateString();
      var thiscurrentHour = now.toLocaleTimeString();

      console.log(thiscurrentHour)
      console.log(thiscurrentDate)
      console.log(json);

      if (!(json.Modonew === "" && json.Modoold === "" && json.bateria === "" && json.viento === "")){
        modoNewData.push(parseFloat(json.Modonew));
        modoOldData.push(parseFloat(json.Modoold));
        bateriaData.push(parseFloat(json.Bateria));
        windData.push(parseFloat(json.Viento));
        currentDate.push(thiscurrentDate);
        currentHours.push(thiscurrentHour);
      }


      
      if (newChart) {
        newChart.destroy();
      }

      const newModeldata = {
        labels: currentHours,
        datasets: [
          {
            label: "Sistema nuevo",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: modoNewData,
            fill: false,
          }]
      };

      const newModelconfig = {
        type: "line",
        data: newModeldata,
      };
      newChart = new Chart(document.getElementById("myChart"), newModelconfig);

      // ========================================================================================================//

      
      if (oldChart) {
        oldChart.destroy();
      }

      var oldModelChart = {
        labels: currentHours,
        datasets: [
          {
            label: "Sistema antiguo",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: modoNewData,
            fill: false,
          },
        ],
      };

      const oldConfig = {
        type: "line",
        data: oldModelChart,
        options: {},
      };

      oldChart = new Chart(
        document.getElementById("myChart1").getContext('2d'),
        oldConfig
      );

      // ========================================================================================================//

      // ========================================================================================================//

      
      if (batteryChart) {
        batteryChart.destroy();
      }

      var batteryModelChart = {
        labels: currentHours,
        datasets: [
          {
            label: "Estado de la bateria",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: bateriaData,
            fill: false,
          },
        ],
      };

      const batteryConfig = {
        type: "line",
        data: batteryModelChart,
        options: {},
      };

      batteryChart = new Chart(
        document.getElementById("myChart2").getContext('2d'),
        batteryConfig
      );

      // ========================================================================================================//

      // ========================================================================================================//

      
      if (windChart) {
        windChart.destroy();
      }

      var windModelChart = {
        labels: currentHours,
        datasets: [
          {
            label: "Estado del voltaje con respecto al viento",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: windData,
            fill: false,
          },
        ],
      };

      const windConfig = {
        type: "line",
        data: windModelChart,
        options: {},
      };

      windChart = new Chart(
        document.getElementById("myChart3").getContext('2d'),
        windConfig
      );

      // ========================================================================================================//
    });

  } catch (err) {
    console.log("fallamos mi gente");
  }
}, 3000);

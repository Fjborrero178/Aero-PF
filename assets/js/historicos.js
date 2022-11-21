
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

//Calendario
window.addEventListener("load", function () {

  const inicio = document.getElementById("start");

  inicio.addEventListener("change", function () {
    if (document.getElementById("stop").value < this.value) {
      document.getElementById("stop").value = this.value;
    }
  });

  const final = document.getElementById("stop");

  final.addEventListener("change", function () {
    if (document.getElementById("start").value > this.value) {
      this.value = document.getElementById("start").value;
    }
  });
});

async function enviarhist() {
  const inicio = document.getElementById("start").value;
  const final = document.getElementById("stop").value;

  var info = {
    fecha_inicio: inicio.slice(0, 10),
    hora_inicio: inicio.slice(11, 16),
    fecha_fin: final.slice(0, 10),
    hora_fin: final.slice(11, 16),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };

  const respond = await fetch("http://ec2-54-91-98-42.compute-1.amazonaws.com:8000/hist", options);
  const data = await respond.json();

  if (data !== 0) {
    data.forEach((element) => {
        
        modoNewData.push(parseFloat(element.Modonew));
        modoOldData.push(parseFloat(element.Modoold));
        bateriaData.push(parseFloat(element.Bateria));
        windData.push(parseFloat(element.Viento));
        currentDate.push(element.Fecha);
        currentHours.push(element.Hora);

    });
  }
  console.log(data);

  if (newChart) {
    newChart.destroy();
  }


  const newModeldata = {
    labels: currentDate,
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
    labels: currentDate,
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
    labels: currentDate,
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
    labels: currentDate,
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


}


const ctx = document.getElementById("Radarchart").getContext("2d");
const nompays = document.querySelector(".country .name");
const castotal = document.querySelector(".total-cases .value");
const nvcas = document.querySelector(".total-cases .new-value");
const casretablie = document.querySelector(".recovered .value");
const nvcasretablie = document.querySelector(".recovered .new-value");
const mortss = document.querySelector(".deaths .value");
const nvmortss = document.querySelector(".deaths .new-value");
const startdate = document.getElementById("startdate");
const enddate = document.getElementById("enddate");

app_data = [],
listdescas = [],
listdesretablies = [],
listdesmorts = [],
deaths = [],
Dateeee = [];


let choicecountry;
var requestOptions = {
  method: "GET",
};

// executer le chart
function executchart() {
    datamodif();
    radarchart();
  }

function jibdata(country) {
  choicecountry = country;

    listdescas = [],
    listdesretablies = [],
    listdesmorts = [],
    dates = [],
    Dateeee = [];

  const api_fetch = async (country) => {
    await fetch("https://api.covid19api.com/total/country/" + country + "/status/confirmed?from=" + startdate.value + "T00:00:00Z&to="+ enddate.value +"T00:00:00Z", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          listdescas.push(entry.Cases);
        });
      });

    await fetch("https://api.covid19api.com/total/country/" + country + "/status/recovered?from=" + startdate.value + "T00:00:00Z&to="+ enddate.value +"T00:00:00Z", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          listdesretablies.push(entry.Cases);
        });
      });

    await fetch("https://api.covid19api.com/total/country/" + country + "/status/deaths?from=" + startdate.value + "T00:00:00Z&to="+ enddate.value +"T00:00:00Z",requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          listdesmorts.push(entry.Cases);
        });
      });
    executchart();
  };
  api_fetch(country);
}

jibdata(choicecountry);

const getmois = [
  "Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre",
];

function Datee(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${getmois[date.getMonth()]}`;
  }


// Chartjs
let my_chart;
function radarchart() {
  if (my_chart) {
    my_chart.destroy();
  }
my_chart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Cas",
          data: listdescas,
          fill: false,
          borderColor: "#f90001",
          backgroundColor: "#f90001",
          borderWidth: 1,
        },
        {
          label: "Rétablie",
          data: listdesretablies,
          fill: false,
          borderColor: "#6bf901",
          backgroundColor: "#6bf901",
          borderWidth: 1,
        },
        {
          label: "Morts",
          data: listdesmorts,
          fill: false,
          borderColor: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
        },
      ],
      labels: Dateeee,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function datamodif() {
    var castotall = listdescas[listdescas.length - 1];
    var nvcascomfirme = castotall - listdescas[listdescas.length - 2];
    var totalretablie = listdesretablies[listdesretablies.length - 1];
    var nvtotalretabliee = totalretablie - listdesretablies[listdesretablies.length - 2];
    var totalmorts = listdesmorts[listdesmorts.length - 1];
    var nvtotalmortss = totalmorts - listdesmorts[listdesmorts.length - 2];
    nompays.innerHTML = choicecountry;
    castotal.innerHTML = castotall;
    nvcas.innerHTML = `+${nvcascomfirme}`;
    casretablie.innerHTML = totalretablie;
    nvcasretablie.innerHTML = `+${nvtotalretabliee}`;
    mortss.innerHTML = totalmorts;
    nvmortss.innerHTML = `+${nvtotalmortss}`;
  
    // format dates
    dates.forEach((date) => {
      Dateeee.push(Datee(date));
    });
  }
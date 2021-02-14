  // Make a request for a user with a given ID
  axios.get('https://api.covid19api.com/summary')
    .then(function (response) {
      // handle success
      // console.log(response.data.Countries);


      response.data.Countries.forEach((country) => {

        document.getElementById('countries').innerHTML += `<option value="${country.Country}">${country.Country}</option>`
        // console.log(country.Country);
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  //   -----------------get country -------------------

  var find = document.getElementById("submit");
  find.addEventListener('click', () => {

    let country = document.getElementById('countries').value;
    axios.get(`https://api.covid19api.com/live/country/${country}/status/confirmed`)
      .then(function (response) {
        // handle success
        // console.log();

        let lat = response.data[1].Lat;
        let lon = response.data[1].Lon;

        document.getElementById('mapp').innerHTML = `<iframe  src="http://maps.google.com/maps?q=${lat},${lon}&z=6&output=embed" style="width:800px;height:500px;"></iframe>`


        // console.log(lon);
        // console.log(lat);

        document.getElementById('para1').innerHTML = response.data[1].Deaths;

        document.getElementById('para2').innerHTML = response.data[1].Confirmed;

        document.getElementById('para3').innerHTML = response.data[1].Recovered;

        document.getElementById('datee').innerHTML = response.data[1].Date;
        
        document.getElementById('para4').innerHTML = response.data[1].Active;
        



        response.data.Countries.forEach((country) => {

          document.getElementById('countries').innerHTML += `<option value="${country.Country}">${country.Country}</option>`
          console.log(country.Country);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });


  });
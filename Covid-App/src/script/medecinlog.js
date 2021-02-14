const urlapi = "https://6006fcca3698a80017de26e1.mockapi.io/api/v1/users";

function loginmedecin() {
  var email = document.getElementById("username").value;
  var erreuremail = document.getElementById('erreuremail');
  var password = document.getElementById("password").value;
  var erreurmdp = document.getElementById('erreurmdp');

  apiresult = {};
  fetch(urlapi)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      apiresult = data;
      apiresult.map((medecin) => {
        if (medecin.email == email && medecin.password == password) {
          window.location.href = "../views/statistique.html";
        } else {
          erreuremail.innerHTML = "Entrer un email valide";
          erreurmdp.innerHTML = "Entrer un mot de passe valide ";
        }
      });
    })
}
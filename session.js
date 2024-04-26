window.onload = function () {
  const cpf = localStorage.getItem("cpf");
  if (!cpf) {
    window.location.href = "index.html";
    return;
  }

  ref
    .orderByChild("cpf")
    .equalTo(cpf)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        var expirationDate = data.expiration;
        var today = new Date();
        var expiration = new Date(expirationDate);

        if (today >= expiration) {
          alert("A licença expirou");
          window.location.href = "index.html";
          return;
        } else {
          var diffTime = expiration.getTime() - today.getTime();
          var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            alert("Sua licença expira amanhã. Fale com o suporte e renove");
            return;
          }
        }

        const licenseData = document.getElementById("license-data")
        if (licenseData) {

        document.querySelector(".license-container").style.display = "inline-flex"
          licenseData.textContent = `Sua licença dura ${diffDays} dias`
        }
      });
    });
};

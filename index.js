document.addEventListener("DOMContentLoaded", function () {
  let btn = document.querySelector(".fa-eye");
  let inputSenha = document.querySelector("#senha");
  let msg = document.querySelector("#msg");

  btn.addEventListener("click", () => {
    if (inputSenha.getAttribute("type") === "password") {
      inputSenha.setAttribute("type", "text");
    } else {
      inputSenha.setAttribute("type", "password");
    }
  });

  function showMessage(message) {
    msg.style.display = "block";
    msg.innerHTML = message;
  }

  function hideMessage() {
    msg.style.display = "none";
    msg.innerHTML = "";
  }

  function entrar() {
    hideMessage();

    const senha = document.getElementById("senha").value.trim();
    if (!senha) {
      showMessage("Por favor, preencha o campo com uma senha válida!");
      return;
    }

    ref
      .orderByChild("cpf")
      .equalTo(senha)
      .once("value", function (snapshot) {
        if (!snapshot.exists()) return showMessage("Usuário não encontrado");
        snapshot.forEach(function (childSnapshot) {
          var data = childSnapshot.val();
          var expirationDate = data.expiration;
          var today = new Date();
          var expiration = new Date(expirationDate);

          if (today >= expiration) {
            alert("A licença expirou.");
            window.location.href = "index.html";
          } else {
            localStorage.setItem("cpf", senha);
            showMessage("Login realizado com sucesso");
            setTimeout(() => {
              window.location.href = "indicador3.html";
            }, 2000);
          }
        });
      });
  }

  const btnEntrar = document.querySelector("#btnEntrar");
  if (btnEntrar) {
    btnEntrar.addEventListener("click", entrar);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('.fa-eye');
  let inputSenha = document.querySelector('#senha');
  let msgError = document.querySelector('#msgError');

  btn.addEventListener('click', () => {
    if (inputSenha.getAttribute('type') === 'password') {
      inputSenha.setAttribute('type', 'text');
    } else {
      inputSenha.setAttribute('type', 'password');
    }
  });

  function showErrorMessage(message) {
    msgError.style.display = 'block';
    msgError.innerHTML = message;
  }

  function hideErrorMessage() {
    msgError.style.display = 'none';
    msgError.innerHTML = '';
  }

  function entrar() {
    console.log("Tentativa de login iniciada.");
    hideErrorMessage();
    showLoading();

    const senha = document.getElementById('senha').value.trim(); // Obter o valor da senha

    // Autenticar com Firebase usando a senha fornecida e um email fictício
    firebase.auth().signInWithEmailAndPassword('admin@gmail.com', senha)
      .then(() => {
        console.log("Login bem-sucedido.");
        hideLoading();
        window.location.href = "indicador3.html"; // Redirecionar para a outra página após o login bem-sucedido
      })
      .catch((error) => {
        console.error("Erro durante o login:", error);
        hideLoading();
        showErrorMessage('CPF incorreto! Verifique e tente novamente.');
      });
  }

  const btnEntrar = document.querySelector('#btnEntrar');
  if (btnEntrar) {
    btnEntrar.addEventListener('click', entrar);
  }
});

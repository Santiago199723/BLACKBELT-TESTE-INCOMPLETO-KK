document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('.fa-eye');
  let inputSenha = document.querySelector('#senha');
  let msgError = document.querySelector('#msgError');
  let loadingTimeout;

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

  function showLoading() {
    // Exibe a mensagem de carregamento
    // Aqui você pode adicionar um spinner ou outra representação visual de carregamento
    // Neste exemplo, apenas definimos um temporizador para exibir a mensagem de senha incorreta após 7 segundos
    loadingTimeout = setTimeout(() => {
      hideLoading();
      showErrorMessage('CPF incorreto ou ainda não há cadastro! Verifique e tente novamente.');
    }, 7000);
  }

  function hideLoading() {
    // Oculta a mensagem de carregamento e cancela o temporizador
    clearTimeout(loadingTimeout);
  }

  function entrar() {
    console.log("Tentativa de login iniciada.");
    hideErrorMessage();
    showLoading();

    const senha = document.getElementById('senha').value.trim(); // Obter o valor da senha
    const emails = [];
    for (let i = 1; i <= 500; i++) {
      emails.push(`admin${i}@gmail.com`);
    } // Lista de emails para tentar fazer login

    if (!senha) {
      showErrorMessage('Preencha o campo com um CPF válido!');
      hideLoading();
      return;
    }

    // Mapeia a lista de emails para uma matriz de promessas de autenticação
    const authPromises = emails.map(email => {
      // Tenta fazer login com o email atual
      return firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(() => {
          console.log("Login bem-sucedido.");
          // Se o login for bem-sucedido, redireciona para a outra página
          window.location.href = "indicador3.html";
        })
        .catch(error => {
          console.error("Erro durante o login:", error);
          // Verifica se o erro é devido a uma senha incorreta ou a um email inexistente
          if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
            // Se o erro for devido a uma senha incorreta ou a um email inexistente, retorna uma promessa rejeitada
            return Promise.reject();
          } else {
            // Se for outro tipo de erro, lança novamente o erro
            throw error;
          }
        });
    });

    // Executa todas as promessas em paralelo
    Promise.all(authPromises)
      .then(() => {
        // Se todas as promessas forem resolvidas (ou seja, nenhum login foi bem-sucedido), exibe a mensagem de erro
        hideLoading();
        showErrorMessage('CPF incorreto ou ainda não há cadastro! Verifique e tente novamente.');
      })
      .catch(() => {
        // Se alguma promessa for rejeitada, não faz nada aqui, pois o redirecionamento já foi tratado dentro da promessa de autenticação
      });
  }

  const btnEntrar = document.querySelector('#btnEntrar');
  if (btnEntrar) {
    btnEntrar.addEventListener('click', () => {
      // Exibe a mensagem de "Aguarde, estou verificando no banco de dados" antes de chamar a função entrar()
      console.log("Aguarde, estou verificando seu CPF no banco de dados..");
      entrar();
    });
  }
});

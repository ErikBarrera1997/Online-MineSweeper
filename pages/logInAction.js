// Logic for handling login form submission and peek password functionality in LogIn.html
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const peekButton = document.getElementById('peek-password');
let hidePasswordTimeout;

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);

        try {
            const response = await fetch('../connection/loginactions.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = '../index.html';
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error al iniciar sesión. Intente más tarde');
        }
    });
}

window.addEventListener('load', () => {
  loginForm.reset();
  redirectIfAuth();
});

peekButton.addEventListener('click', () => {
  clearTimeout(hidePasswordTimeout);
  passwordInput.type = 'text';
  peekButton.textContent = 'Visible';

  hidePasswordTimeout = window.setTimeout(() => {
    passwordInput.type = 'password';
    peekButton.textContent = 'Ver 3 seg';
  }, 3000);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  emailError.textContent = '';
  passwordError.textContent = '';

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email) {
    emailError.textContent = 'El correo es requerido';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = 'Ingresa un correo válido (ejemplo@dominio.com)';
    return;
  }

  if (!password) {
    passwordError.textContent = 'La contraseña es requerida';
    return;
  }

  const formData = new FormData();
  formData.append('e_mail', email);
  formData.append('password', password);

  try {
    const response = await fetch('../connection/loginAction.php', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '../index.html';
    } else {
      mostrarMensaje(data.message, 'error');
    }
  } catch (error) {
    mostrarMensaje('Error de conexión: ' + error.message, 'error');
  }
});
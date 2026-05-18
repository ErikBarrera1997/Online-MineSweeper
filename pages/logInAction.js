// Logic for handling login form submission and peek password functionality in LogIn.html
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const peekButton = document.getElementById('peek-password');
let hidePasswordTimeout;

window.addEventListener('load', () => {
    if (loginForm) loginForm.reset();
    if (typeof redirectIfAuth === 'function') {
        redirectIfAuth();
    }
});

if (peekButton && passwordInput) {
    peekButton.addEventListener('click', () => {
        clearTimeout(hidePasswordTimeout);
        passwordInput.type = 'text';
        peekButton.textContent = 'Visible';

        hidePasswordTimeout = window.setTimeout(() => {
            passwordInput.type = 'password';
            peekButton.textContent = 'Ver';
        }, 3000);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        
        if (emailError) emailError.textContent = '';
        if (passwordError) passwordError.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            if (emailError) emailError.textContent = 'El correo es requerido';
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            if (emailError) emailError.textContent = 'Ingresa un correo válido';
            return;
        }

        if (!password) {
            if (passwordError) passwordError.textContent = 'La contraseña es requerida';
            return;
        }

        const formData = new FormData(loginForm);
        formData.set('e_mail', email);

        try {
            const response = await fetch('../connection/loginAction.php', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = '../index.html';
            } else {
                if (typeof mostrarMensaje === 'function') {
                    mostrarMensaje(data.message || 'Credenciales incorrectas', 'error');
                } else {
                    alert(data.message || 'Credenciales incorrectas');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            if (typeof mostrarMensaje === 'function') {
                mostrarMensaje('Error de conexión: ' + error.message, 'error');
            } else {
                alert('Error de conexión');
            }
        }
    });
}
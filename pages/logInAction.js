// Logic for handling login form submission and peek password functionality in LogIn.html
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');

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
            alert('Error al intentar iniciar sesión.');
        }
    });
}

// Aquí puedes añadir la lógica de "peek password" si existe en LogIn.html
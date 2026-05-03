// Logic for handling logon form submission and peek password functionality in LogOn.html
const passwordInput = document.getElementById('password');
const peekButton = document.getElementById('peek-password');
const logonForm = document.getElementById('logon-form');
let hidePasswordTimeout;

if (peekButton && passwordInput) {
    peekButton.addEventListener('click', () => {
        clearTimeout(hidePasswordTimeout);
        passwordInput.type = 'text';
        peekButton.textContent = 'Visible';

        hidePasswordTimeout = window.setTimeout(() => {
            passwordInput.type = 'password';
            peekButton.textContent = 'Ver';
        }, 1000);
    });
}

if (logonForm) {
    logonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(logonForm);
        // Mapeo manual si los nombres de los inputs no coinciden con lo esperado por el PHP
        formData.set('user_name', document.getElementById('nickname').value.trim());
        formData.set('e_mail', document.getElementById('email').value.trim());

        try {
            const response = await fetch('../connection/logonactions.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                alert('Usuario creado con éxito. Ahora puedes iniciar sesión');
                window.location.href = './LogIn.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error de conexión: ' + error.message);
        }
    });
}
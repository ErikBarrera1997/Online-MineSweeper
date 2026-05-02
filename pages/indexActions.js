// Logic for handling session check, login/logout button visibility, and user greeting on index.html
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const userGreeting = document.getElementById('user-greeting');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logout());
}

(async () => {
    try {
        const response = await fetch('data/checkSession.php', {
            credentials: 'include'
        });
        const data = await response.json();

        if (data.authenticated) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (authSection) authSection.style.display = 'flex';
            if (userGreeting) userGreeting.textContent = `Hola de nuevo '${data.user.user_name}'`;
        }
    } catch (error) {
        console.error('Session check failed:', error);
    }
})();
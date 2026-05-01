const API_BASE = window.location.pathname.includes('/pages/') ? '../data' : 'data';

async function requireAuth(redirectUrl = null, loginUrl = '../pages/LogIn.html') {
    try {
        const response = await fetch(`${API_BASE}/checkSession.php`, {
            credentials: 'include'
        });

        const data = await response.json();

        if (!data.authenticated) {
            window.location.href = loginUrl;
            return null;
        }

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }

        return data.user;
    } catch (error) {
        console.error('Session check failed:', error);
        window.location.href = loginUrl;
        return null;
    }
}

async function redirectIfAuth() {
    try {
        const response = await fetch(`${API_BASE}/checkSession.php`, {
            credentials: 'include'
        });

        const data = await response.json();

        if (data.authenticated) {
            window.location.href = '../index.html';
        }
    } catch (error) {
        console.error('Session check failed:', error);
    }
}

async function logout() {
    try {
        const response = await fetch(`${API_BASE}/destroySession.php`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            console.error('Logout request failed:', response.status);
            return;
        }

        const data = await response.json();
        if (!data.success) {
            console.error('Logout failed server-side');
            return;
        }
    } catch (error) {
        console.error('Logout failed:', error);
        return;
    }

    window.location.reload();
}

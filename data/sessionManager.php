<?php
const COOKIE_NAME = "ms_session";
const COOKIE_LIFETIME = 3600;

/**
 * Sets an HttpOnly session cookie for the authenticated user.
 * @param array $userData User data from the database.
 */
function setSessionCookie($userData) {
    $payload = [
        "user_name" => $userData["user_name"],
        "e_mail" => $userData["e_mail"],
        "exp" => time() + COOKIE_LIFETIME
    ];

    $encoded = base64_encode(json_encode($payload));
    $signature = hash_hmac("sha256", $encoded, "mine_sweeper_secret_key");
    $token = $encoded . "." . $signature;

    setcookie(COOKIE_NAME, $token, [
        "expires" => time() + COOKIE_LIFETIME,
        "path" => "/",
        "secure" => false,
        "httponly" => true,
        "samesite" => "Lax"
    ]);
}

/**
 * Verifies and decodes the session cookie.
 * @return array|false Decoded user data or false if invalid.
 */
function verifySession() {
    if (!isset($_COOKIE[COOKIE_NAME])) {
        return false;
    }

    $parts = explode(".", $_COOKIE[COOKIE_NAME], 2);
    if (count($parts) !== 2) {
        return false;
    }

    $encoded = $parts[0];
    $signature = $parts[1];
    $expected = hash_hmac("sha256", $encoded, "mine_sweeper_secret_key");

    if (!hash_equals($expected, $signature)) {
        return false;
    }

    $data = json_decode(base64_decode($encoded), true);
    if (!$data || $data["exp"] < time()) {
        return false;
    }

    return [
        "user_name" => $data["user_name"],
        "e_mail" => $data["e_mail"]
    ];
}

/**
 * Destroys the session cookie.
 */
function destroySession() {
    setcookie(COOKIE_NAME, "", [
        "expires" => time() - 3600,
        "path" => "/",
        "secure" => false,
        "httponly" => true,
        "samesite" => "Lax"
    ]);
}
?>

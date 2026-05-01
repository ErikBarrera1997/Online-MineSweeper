/**
 * Displays a modal message window centered on the page.
 * @param {string} texto - The message to display.
 * @param {string} type - 'success' or 'error' (optional, for future styling).
 * @param {function} onAccept - Callback executed when "Aceptar" is clicked (optional).
 */
function mostrarMensaje(texto, type = "info", onAccept = null) {
  const overlay = document.createElement("div");
  overlay.className = "message-overlay";

  const win = document.createElement("div");
  win.className = "message-window";

  const msg = document.createElement("p");
  msg.textContent = texto;
  msg.style.textAlign = "center";
  msg.style.whiteSpace = "pre-line";

  const btn = document.createElement("button");
  btn.textContent = "Aceptar";
  btn.onclick = () => {
    overlay.remove();
    if (onAccept) onAccept();
  };

  win.appendChild(msg);
  win.appendChild(btn);
  overlay.appendChild(win);
  document.body.appendChild(overlay);
}

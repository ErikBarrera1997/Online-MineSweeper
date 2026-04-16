/**
 * Object containing messaging utility functions.
 */
const messages = {
  /**
   * Displays a modal message window within the game container.
   * @param {string} texto - The message to display.
   */
  mostrarMensaje: function(texto) {
    const container = document.getElementById("container");
    if (!container) return;

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
    btn.onclick = () => overlay.remove();

    win.appendChild(msg);
    win.appendChild(btn);
    overlay.appendChild(win);
    container.appendChild(overlay);
  }
};

async function showSecretMessage() {
    const img = await getImageFromFile();
    const container = document.getElementById("container");

    const overlay = document.createElement("div");
    overlay.className = "message-overlay";

    const win = document.createElement("div");
    win.className = "message-window";
    win.style.backgroundColor = "#040404";

    if (img) {
        img.style.maxWidth = "100%";
        img.style.display = "block";
        img.style.marginBottom = "10px";
        win.appendChild(img);
    }

    const btn = document.createElement("button");
    btn.textContent = "Aceptar";
    btn.onclick = () => overlay.remove();

    win.appendChild(btn);
    overlay.appendChild(win);
    if (container) container.appendChild(overlay);
}
/**
 * Object containing messaging utility functions.
 */
const messages = {
  /**
   * Displays a modal message window within the game container.
   * @param {string} texto - The message to display.
   */
  mostrarMensaje: async function(texto) {
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

    const newsLink = document.createElement("a");
    let noticia = null;
    
    try {
        const topic = "accidentes";
        noticia = await getRandomNews(topic);
    } catch (e) {
        console.warn("No se pudo cargar la noticia para el mensaje.");
    }

    if (noticia) {
      newsLink.href = noticia.link;
      newsLink.textContent = noticia.tittle;
      newsLink.target = "_blank"; // Abrir en pestaña nueva
      newsLink.style.display = "block";
      newsLink.style.margin = "10px 0";
      newsLink.style.color = "#3498db";
      newsLink.style.fontSize = "0.9em";
      newsLink.style.textDecoration = "none";
    }

    const btn = document.createElement("button");
    btn.textContent = "Aceptar";
    btn.onclick = () => {
      overlay.remove();
      stopAudio("null");
      stopAudio("creepy");
    };

    win.appendChild(msg);
    if (noticia) win.appendChild(newsLink);
    win.appendChild(btn);
    overlay.appendChild(win);
    container.appendChild(overlay);
  },

  /**
   * Shows a message indicating that the player has run out of time.
   */
  mostrarTiempoAgotado: function() {
    this.mostrarMensaje("¡Tiempo agotado!\nNo has logrado despejar el campo de minas a tiempo.\n\nInténtalo de nuevo.");
  }
};

async function showSecretMessage() {
    const img = await getImageFromFile();
    const container = document.getElementById("container");

    const overlay = document.createElement("div");
    overlay.className = "message-overlay";

    //image div
    const win = document.createElement("div");
    win.className = "message-window";
    win.style.backgroundColor = "#040404";
    win.style.width = "100%";
    win.style.height = "100%";
    win.style.maxWidth = "none";
    win.style.padding = "0";
    win.style.borderRadius = "0";
    win.style.position = "relative";

    //image size settings
    if (img) {
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.display = "block";
        win.appendChild(img);
    }

    const btn = document.createElement("button");
    btn.textContent = "Aceptar";
    btn.style.position = "absolute";
    btn.style.bottom = "20px";
    btn.style.left = "50%";
    btn.style.transform = "translateX(-50%)";
    btn.onclick = () => {
        overlay.remove();
        stopAudio("null");
    };

    win.appendChild(btn);
    overlay.appendChild(win);
    if (container) container.appendChild(overlay);
}
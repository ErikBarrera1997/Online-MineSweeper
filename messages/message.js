/**
 * Object containing messaging utility functions.
 */
const messages = {
  getContainer(target = "container") {
    if (target instanceof HTMLElement) {
      return target;
    }

    if (typeof target === "string" && target.length > 0) {
      return document.getElementById(target);
    }
    return document.getElementById("container");
  },

  createMessageElements(texto) {
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

    win.appendChild(msg);
    win.appendChild(btn);
    overlay.appendChild(win);

    return { overlay, win, btn };
  },

  attachCloseHandler(overlay, btn, callback) {
    btn.onclick = () => {
      overlay.remove();
      stopAudio("null");
      stopAudio("creepy");
      if (typeof callback === "function") callback();
    };
  },

  /**
   * Displays a modal message window within the game container.
   * @param {string} texto - The message to display.
   * @param {string} type - 'success', 'error', 'info', etc.
   * @param {Function} callback - Function to execute when "Aceptar" is clicked.
   */
  mostrarMensaje: async function(texto, type = "info", callback = null) {
    if (typeof type === "function") {
        callback = type;
        type = "info";
    }

    const container = this.getContainer("container");
    if (!container) return;

    const { overlay, win, btn } = this.createMessageElements(texto);
    let noticia = null;

    try {
      const topic = "accidentes";
      noticia = await getRandomNews(topic);
    } catch (e) {
      console.warn("No se pudo cargar la noticia para el mensaje.");
    }

    if (noticia) {
      const newsLink = document.createElement("a");
      newsLink.href = noticia.link;
      newsLink.textContent = noticia.title;
      newsLink.target = "_blank";
      newsLink.style.display = "block";
      newsLink.style.margin = "10px 0";
      newsLink.style.color = "#3498db";
      newsLink.style.fontSize = "0.9em";
      newsLink.style.textDecoration = "none";
      win.insertBefore(newsLink, btn);
    }

    this.attachCloseHandler(overlay, btn, callback);
    container.appendChild(overlay);
  },

  /**
   * Displays the same modal message window without loading or showing a news link.
   * @param {string} texto - The message to display.
   * @param {Function} callback - Function to execute when "Aceptar" is clicked.
   * @param {string|HTMLElement} target - The container id or element where the message should appear.
   */
  mostrarMensajeSinNoticia: function(texto, callback, target = "container") {
    const container = this.getContainer(target);
    if (!container) return;

    const { overlay, btn } = this.createMessageElements(texto);
    this.attachCloseHandler(overlay, btn, callback);
    container.appendChild(overlay);
  },

  /**
   * Shows a message indicating that the player has run out of time.
   */
  mostrarTiempoAgotado: function() {
    this.mostrarMensaje("¡Tiempo agotado!\nNo has logrado despejar el campo de minas a tiempo.\n\nInténtalo de nuevo.");
  },

  /**
   * Shows a temporary toast notification at the bottom of the screen.
   * @param {string} mensaje 
   * @param {number} duracion 
   */
  mostrarNotificacion: function(mensaje, duracion = 3500) {
    const notification = document.createElement("div");
    notification.className = "toast-notification";
    notification.textContent = mensaje;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transition = "opacity 0.5s ease";
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 500);
    }, duracion);
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
    win.style.width = "100%";
    win.style.height = "100%";
    win.style.maxWidth = "none";
    win.style.padding = "0";
    win.style.borderRadius = "0";
    win.style.position = "relative";

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

let count2 = 0;

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

function showSurprise() {
  count2++;      
    if (count2 === 1) {
        showSecretMessage();
        count2 = 0; 
        return true;
    }

    return false;
}
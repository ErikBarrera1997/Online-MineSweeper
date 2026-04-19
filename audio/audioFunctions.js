
function getRandomAudio() {     
    const numeroAleatorio = Math.floor(Math.random() * 10);
    console.log("Lógica Audio: Valor generado:", numeroAleatorio);
    
    // Condición: probability 20%  (0, 1). 
    if (numeroAleatorio <= 1) {
        playAudio("creepy");
    }  

}
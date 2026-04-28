
function getRandomAudio() {     
    const numeroAleatorio = Math.floor(Math.random() * 15);
    
    // Condición: probability 20%  (0, 1). 
    if (numeroAleatorio <= 1) {
        playAudio("creepy");
    }  

}


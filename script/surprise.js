let count2 = 0;

function showSurprise() {
  count2++;      
    if (count2 === 5) {
        //stopAudio("creepy");
        showSecretMessage();
        count2 = 0; 
        playAudio("null");
        return true;
    }

  return false;
}
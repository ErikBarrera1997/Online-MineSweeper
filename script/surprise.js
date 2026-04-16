let count2 = 0;

function showSurprise() {
  count2++;      
    if (count2 === 1) {
        showSecretMessage();
        count2 = 0; 
        return true;
    }

    return false;
}
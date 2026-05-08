function generate(){
    const percent = GAME_SETTINGS.MINES.PROBABILITY;
    let r = Math.random();   
	let c = Math.floor(r * 100);
	  
    if( c < percent ){  //Probabilidad de colocar la mina.
	  return true;   
	}
	      
	return false; 
}

let percent = 15; // Probabilidad de colocar una mina (0-100)

function generate(){
    let r = Math.random();   
	let c = Math.floor(r * 100);
	  
    if( c < percent ){  //Probabilidad de colocar la mina.
	  return true;   
	}
	      
	return false; 
}
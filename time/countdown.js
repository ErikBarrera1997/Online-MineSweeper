    let count = 0;
	let increment = 1; // valor por defecto.
	let activated = false;

	function Temporizer(increment) {
		setIncrement(increment);
	}

	function getCount(){
		count += increment;
		return count;
	}

	function isActivated(){
		return activated;
	}

	function setActivated(status){
		activated = status;
	}

	function setIncrement(value) {
		if (typeof value === "number" && !Number.isNaN(value)) {
			increment = value;
		}
	}

	function reset(){
		count = 0;
	}

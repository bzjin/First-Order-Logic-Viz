
var svg = d3.select("#chart").append("svg")
		.attr("width", 1200)

var svgB = d3.select("#block").append("svg")
		.attr("width", 1600)

var tC = "#068481";
var fC = "#CC1100";

var now; 

var testcase = [["F"], ["⇒"], [["⇒"], ["P"], ["P"]], ["P"]]; // Falsifies statement: ((P ⇒ P) ⇒ P)
var testcase2 = [["F"], "⇒", ["∧", ["¬", ["P"]], ["¬", ["Q"]]], ["¬", ["∨", ["P"], ["Q"]]]]; // Falsifies statement: (((P ⇒ Q) ⇒ P) ⇒ P)
var testcase3 = [["F"], "⇒", ["⇒", ["⇒", ["P"], ["Q"]], ["P"]], ["P"]]; // Falsifies statement: ((¬ P ∧ ¬ Q) ⇒ ¬ (P ∨ Q))
var testcase4 = [["F"], "⇒", ["⇒", ["P"], ["Q"]], ["⇒", ["¬", ["Q"]], ["P"]]]; // Falsifies statement: ((P ⇒ Q) ⇒ (¬ Q ⇒ P))

originalTableaux(testcase, .5);
originalTableaux(testcase3, 2);
originalTableaux(testcase2, 3.5);
originalTableaux(testcase4, 5);

var testcase = [["F"], ["⇒"], [["⇒"], ["P"], ["P"]], ["P"]]; // Falsifies statement: ((P ⇒ P) ⇒ P)
var testcase2 = [["F"], "⇒", ["∧", ["¬", ["P"]], ["¬", ["Q"]]], ["¬", ["∨", ["P"], ["Q"]]]]; // Falsifies statement: (((P ⇒ Q) ⇒ P) ⇒ P)
var testcase3 = [["F"], "⇒", ["⇒", ["⇒", ["P"], ["Q"]], ["P"]], ["P"]]; // Falsifies statement: ((¬ P ∧ ¬ Q) ⇒ ¬ (P ∨ Q))
var testcase4 = [["F"], "⇒", ["⇒", ["P"], ["Q"]], ["⇒", ["¬", ["Q"]], ["P"]]]; // Falsifies statement: ((P ⇒ Q) ⇒ (¬ Q ⇒ P))

blockTableaux(testcase, 1);
blockTableaux(testcase3, 3);
blockTableaux(testcase2, 5);
blockTableaux(testcase4, 7);

function originalTableaux (truth, x) { // Original Tableaux Method
	var yPos = 70; 
	var xPos = x * 200;

	svg.append("text").attr("x", xPos).attr("y", yPos - 45).style("fill", tC).style("font-weight", 300)
		.text("Prove: " + printer(truth.slice(1)))

	svg.append("text").attr("x", xPos).attr("y", yPos - 15).style("fill", fC)
		.text("F" + printer(truth.slice(1)))

	var allSym = ["∧", "∨", "⇒", "¬"]
	//var allOps = [trueAnd, falseAnd, trueOr, falseOr];

	function printer (array){
		var string = "";
		if (array.length == 1) { 
			string = array[0];
		} else if (array.length == 2) {
			string = array[0] + " " + printer(array[1]);
		} else {
			string = "(" + printer(array[1]) + " " + array[0] + " " + printer(array[2]) + ")";
		}
		return string; 
	}

	function TF (array) {
		var returnVal = "";
		if (array[0] == "T" && array[1] == "∧"){
			returnVal = trueAnd(array.slice(2))
		} else if (array[0] == "T" && array[1] == "∨"){
			now.style("text-decoration", "underline");
			returnVal = trueOr(array.slice(2))
		} else if (array[0] == "T" && array[1] == "⇒"){
			now.style("text-decoration", "underline");
			returnVal = trueThen(array.slice(2))
		} else if (array[0] == "T" && array[1] == "¬"){
			returnVal = trueNot(array.slice(2))
		} else if (array[0] == "F" && array[1] == "∧"){
			now.style("text-decoration", "underline");
			returnVal = falseAnd(array.slice(2))
		} else if (array[0] == "F" && array[1] == "∨"){
			returnVal = falseOr(array.slice(2))
		} else if (array[0] == "F" && array[1] == "⇒"){
			returnVal = falseThen(array.slice(2))
		} else if (array[0] == "F" && array[1] == "¬"){
			returnVal = falseNot(array.slice(2))
		} 
		return returnVal;
	}

	function trueAnd (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["T"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 
		yPos += 15; 
		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function falseAnd (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["F"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
		yPos += 15; 

		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function trueOr (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["T"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 
		yPos += 15; 

		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function falseOr (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["F"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
		yPos += 15; 

		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function trueThen (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["T"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 
		yPos += 15; 

		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function falseThen (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["F"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		yPos += 15; 
		if (a[0].slice(1).length > 1) { TF(a[0]);} 

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
		yPos += 15; 

		if (a[1].slice(1).length > 1) { TF(a[1]);}
	}

	function trueNot (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))
		yPos += 15; 

		if (a[0].slice(1).length > 1) { TF(a[0]);} 
	}

	function falseNot (a) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);

		now = svg.append("text").attr("x", xPos).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		yPos += 15; 

		if (a[0].slice(1).length > 1) { TF(a[0]);} 
	}

	TF(truth);
}

function blockTableaux (truth, x) { // Original Tableaux Method
	var yPos = 70; 
	var xPos = x * 200;
	var inc = 80;
	var xCo = x * 200;

	svgB.append("text").attr("x", xPos).attr("y", yPos - 45).style("fill", tC).style("font-weight", 300)
		.text("Prove: " + printer(truth.slice(1)))

	svgB.append("text").attr("x", xPos).attr("y", yPos - 15).style("fill", fC)
		.text("F" + printer(truth.slice(1)))

	var allSym = ["∧", "∨", "⇒", "¬"]
	//var allOps = [trueAnd, falseAnd, trueOr, falseOr];

	function printer (array){
		var string = "";
		if (array.length == 1) { 
			string = array[0];
		} else if (array.length == 2) {
			string = array[0] + " " + printer(array[1]);
		} else {
			string = "(" + printer(array[1]) + " " + array[0] + " " + printer(array[2]) + ")";
		}
		return string; 
	}

	function TF (array, xSub) {
		var returnVal = "";
		if (array[0] == "T" && array[1] == "∧"){
			returnVal = trueAnd(array.slice(2), xSub)
		} else if (array[0] == "T" && array[1] == "∨"){
			now.style("text-decoration", "underline");
			returnVal = trueOr(array.slice(2), xSub)
		} else if (array[0] == "T" && array[1] == "⇒"){
			now.style("text-decoration", "underline");
			returnVal = trueThen(array.slice(2), xSub)
		} else if (array[0] == "T" && array[1] == "¬"){
			returnVal = trueNot(array.slice(2), xSub)
		} else if (array[0] == "F" && array[1] == "∧"){
			now.style("text-decoration", "underline");
			returnVal = falseAnd(array.slice(2), xSub)
		} else if (array[0] == "F" && array[1] == "∨"){
			returnVal = falseOr(array.slice(2), xSub)
		} else if (array[0] == "F" && array[1] == "⇒"){
			returnVal = falseThen(array.slice(2), xSub)
		} else if (array[0] == "F" && array[1] == "¬"){
			returnVal = falseNot(array.slice(2), xSub)
		} 
		return returnVal;
	}

	function trueAnd (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["T"]);

		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 

		yPos += 15;
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}
	}

	function falseAnd (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["F"]);

		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))

		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
		yPos += 15;
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}
	}

	function trueOr (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["T"]);

		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))

		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 
		yPos += 15;
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}
	}

	function falseOr (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["F"]);

		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))

		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
		yPos += 15; 
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}	
	}

	function trueThen (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		a[1].unshift(["T"]);

		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))

		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[1].slice(1))) 
		yPos += 15;
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}
	}

	function falseThen (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);
		a[1].unshift(["F"]);

		now = svgB.append("text").attr("x", xCo + inc).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[1].slice(1))) 
	
		now = svgB.append("text").attr("x", xCo - inc).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))

		yPos += 15;
		inc = inc/1.5; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo - 1.5*inc);} 
		if (a[1].slice(1).length > 1) { TF(a[1], xCo + 1.5*inc);}
	}

	function trueNot (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["F"]);
		now = svgB.append("text").attr("x", xCo).attr("y", yPos).style("fill", fC)
			.text("F" + printer(a[0].slice(1)))
		yPos += 15; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo);} 
	}

	function falseNot (a, xCo) { //Since T(X∧Y) means TX and TY
		a[0].unshift(["T"]);

		now = svgB.append("text").attr("x", xCo).attr("y", yPos).style("fill", tC)
			.text("T" + printer(a[0].slice(1)))
		yPos += 15; 

		if (a[0].slice(1).length > 1) { TF(a[0], xCo);} 
	}

	TF(truth, xCo);
}




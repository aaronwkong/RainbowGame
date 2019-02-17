// some global variables xD
var colours = ['#ffcccc', '#ffe6cc', '#ffffcc', '#e6ffcc', '#ccffcc', '#ccffff', '#cce6ff', '#ccccff', '#e6ccff', '#ffcce6'];
var questionColours = ['#000000', '#000000', '#000000', '#000000', '#000000'];
var guessColours = [0, 0, 0, 0, 0];
var index = 0;
var lvlsPassed = 0;
var oldIndex = 0;


// hides the answer and brings back the question page
function whitePage() {
	var answer = document.getElementById("answer");
	var question = document.getElementById("question");
	answer.style.visibility = "hidden";
	question.style.display = "inline";
}


// take out question and give slots
function blank() {
	var answer = document.getElementById("answer");
	var question = document.getElementById("question");
	question.style.display = "none";
	answer.style.zIndex = 1;
	answer.style.visibility = "visible";
}


// transitions into other pages  
function transition() {
	var answer = document.getElementById("answer");
	// if answer is displayed rn
	if (answer.style.visibility == "visible") {
		whitePage();
	}
	// if question is displayed rn
	else {
		setTimeout(blank, 5000);
	}
}


// Resets colour scheme of game
function resetColour() {
	var colour_list = document.querySelectorAll('.choice span');
	// first 5 levels - easy difficulty
	if (lvlsPassed <= 4) {
		colours = ['#ffcccc', '#ffe6cc', '#ffffcc', '#e6ffcc', '#ccffcc', '#ccffff', '#cce6ff', '#ccccff', '#e6ccff', '#ffcce6'];
	}
	// next 5 levels - medium-easy difficulty
	else if (lvlsPassed <= 9) {
		colours = ['#ffcccc', '#ffd9cc', '#ffe6cc', '#fff2cc', '#ffffcc', '#f2ffcc', '#d9ffcc', '#ccffe6', '#ccffff', '#ccf2ff'];
	}
	// next 5 levels - medium difficulty
	else if (lvlsPassed <= 14) {
		colours = ['#e6ffff', '#c4ffff', '#99ffff', '#00e6e6', '#00b3b3', '#fff2f5', '#ffe6ed', '#ffccda', '#ff99b6', '#ff6691'];
	}
	// next 5 levels - medium-hard difficulty
	else if (lvlsPassed <= 19) {
		colours = ['#e6ffe6', '#ccffcc', '#adffad', '#80fd80', '#40ff40', '#fff2e6', '#ffe6cc', '#fdd5aa', '#ffc180', '#ffa94d'];
	}
	// next 5 levels - hard difficulty
	else if (lvlsPassed <= 24) {
		colours = ['#e6f2ff', '#cce5ff', '#b3d7ff', '#96c8ff', '#80bbff', '#eee6ff', '#e3d6ff', '#d9c7ff', '#c9b0ff', '#b999ff'];
	}
	// last 5 levels - extreme difficulty
	else {
		colours = ['#f2ffe6', '#e5ffcc', '#d3ffad', '#beff84', '#adff66', '#ffffe6', '#ffffcc', '#ffffac', '#ffff8e', '#ffff66'];
	}
	for (i = 0; i <= 9; ++i) {
		colour_list[i].style.background = colours[i];
	}
	transition();
}


// Main Program
// Refreshes the question colours and creates an array for them
function main() {
	resetColour();
	var quest_colour = document.querySelectorAll('.question span');
	for (i = 0; i < 5; ++i) {
		var randInt = Math.floor(Math.random() * 10);
		questionColours[i] = colours[randInt];
		quest_colour[i].style.background = questionColours[i];
	}
}


// Implements user's guess and modifies the guess array
function guess(guessIndex) {
	var choice = document.querySelectorAll('.choice span');
	guessColours[index] = choice[guessIndex].style.backgroundColor;
	choice[oldIndex].style.borderStyle = "none";
	oldIndex = guessIndex;
	choice[oldIndex].style.borderStyle = "solid";
	choice[oldIndex].style.borderColor = "#d9d9d9";
	var user_colour = document.querySelectorAll(".user span");
	user_colour[index].style.background = guessColours[index];
	++index;
}


// Changes user guess (based on selection index)
function changeColour(newIndex) {
	var user_colour = document.querySelectorAll(".user span");
	index = newIndex;
}


// converts the hex to rgb format so a comparison can be made
function lazyConvertToRGB(){
	var invisible = document.querySelectorAll('.invisible span');
	for (i = 0; i < 5; ++i){
		invisible[i].style.backgroundColor = questionColours[i]; // fill an invisible div
	}
}


// Checks user answer upon submittal 
function guessAnswer() {
	var lose = false;
	lazyConvertToRGB();
	var invisible = document.querySelectorAll('.invisible span');
	for (i = 0; i < 5; ++i){ 
		questionColours[i] = invisible[i].style.backgroundColor; // fill questionColours[i] with the rgb instead of hex
	}
	// testing if they lost
	for (i = 0; i < 5; ++i) {
		if (guessColours[i] != questionColours[i]) { // guesColours[i] gets converted to rgb so we want questionsColours[i] as rgb too
			alert("Incorrect colours!"); // for now
			lose = true;
			lvlsPassed = 0;
			break;
			// don't know what happens yet - page changes and error code
		}
	}
	// they succeeded if this happens! 
	if(lose == false){
		alert("Correct!");
		++lvlsPassed;		// for now
	}
	
	// restart game for user
	var user_colour = document.querySelectorAll(".user span");
	for (i = 0; i < 5; ++i) {
		guessColours[i] = "#ffffff";
		user_colour[i].style.background = guessColours[i];
	}
	var lose = false;
	index = 0;
	transition();
	main();
}

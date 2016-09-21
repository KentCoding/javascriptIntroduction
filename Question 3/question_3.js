/*
Exemplar GCSE Computing
A452 Practical Investigation
Herring, Samuel
*/

////Traffic Light States - Binary to Denary Conversion
//Structure Example: 001 {Red: Off}, {Yellow: Off}, {Green: On}
//  | 4 | 2 | 1 | - Denary
//  | 0 | 0 | 1 | - Binary Result

var $tl = $('.traffic-light'); //Relation to Traffic Light CSS Class
var $lights = $('.light', $tl); //Create relationship for traffic light and light sibling classes

var states = [0, 4, 6, 1, 4]; // Binary states of traffic light phases in Denary form

function lightCycle() {
    var stateArray = $('.light', $tl).map(function (i, tl){return ~~!($(tl).hasClass('off'));} ).get(); //Fetch the boolean state of the light siblings using an inline function, based upon whether or not the 'off' class exists.
        
    var stateInteger = parseInt(stateArray.join(''), 2); //Convert the stateArray of each light sibling to binary form

    var nextStateIndex = states.indexOf(stateInteger)+1; //Set the next state of the light using an indexing system
    var nextStateNum = (nextStateIndex === states.length) ? 0 : parseInt(states[nextStateIndex]);  //Set the integer for the next state, if 0, then go back to the first object in the array, else, just set the next Integer based upon the nextStateIndex.

    $lights.addClass('off'); //Add off class to overwrite colour to white on all light siblings

    if (nextStateNum === 4) {
        $lights.siblings('.red').removeClass('off'); //Dependant on the Integer State of the light, move to the next step by removing an element class.
    } else if (nextStateNum === 6) {
        $lights.not('.green').removeClass('off');
    } else if (nextStateNum === 1) {
         $lights.siblings('.green').removeClass('off');
    }  else if (nextStateNum === 2) {
        $lights.siblings('.yellow').removeClass('off');
    }
}
    
var interval = null;

function autoCycle() {
/*
	If interval NOT null, then stop the cycle and set to null.
	As a result, multiple calls of function, will not act as a multiplier for the rate of phase changes.
*/
    if (!(interval === null)) {
        clearInterval(interval);
        interval = null;
        return;
    }

    // Set the cycle interval to one second
    interval = setInterval(lightCycle, 1000); //Start cycle with time parameter and call the lightCycle() function.
}
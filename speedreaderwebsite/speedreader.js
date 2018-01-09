(function() {
    //enforce semi-colon
    'use strict';
    
    //set up alias variables for easier to read code
    var $ = function(id) {return document.getElementById(id); };
    
    //fields
    var result;
    var curr = 0;
    var next;

    window.onload = function() { 
        //makes stop button grey onload
        $("stop").disabled = true;
        
        //fires start and stop button onclick
        var startButton = $("start");
        startButton.onclick = start;
        var stopButton = $("stop");
        stopButton.onclick = stop;
        
        //changes size of text onclick
        $("medium").onclick = changeSize;
        $("big").onclick = changeSize;
        $("bigger").onclick = changeSize;
        
        //changes the speed onchange of speed drop down menu
        //could not get it to work
        /* var speedButton = $("speed-input");
        speedButton.onchange = changeSpeed; */
    };
    
    //enables start button
    function start() {
        disabled(true);
        result = $("textareaId").value.split(/[ \t\n]+/); 
        var wpm = changeSpeed();
        next = setInterval(input, wpm);  
    }  
    
    //start helper function that reads word by word of input into box
    function input() {
        var readBox = $("readBox-layer"); 
        var currWord = hasPunctuation();
        readBox.innerHTML = currWord;
        curr++;
    }
    
    //start / unput helper fuction that removes punctuation from words and
    //extends the word an extra frame
    function hasPunctuation() {
        var comma = ",";
        var period = ".";
        var exclamation ="!";
        var question = "?";
        var semi = ";";
        var colon = ":";
        if(result[curr].endsWith(comma) || result[curr].endsWith(period) || 
           result[curr].endsWith(exclamation)  || result[curr].endsWith(question) || 
           result[curr].endsWith(semi) || result[curr].endsWith(colon)) {
            result[curr] = result[curr].substring(0, result[curr].length - 1);
            //repeats word twice 
            result.splice(curr + 1, 0, result[curr]); 
        }
        return result[curr];
    }
    
    //enables stop button
    function stop() {
        disabled(false);
        var readBox = $("readBox-layer"); 
        readBox.innerHTML = "";
        clearInterval(next);
        curr = 0;       
    }
    
    //disables play control buttons when they are pressed
    function disabled(isDisabled) {
        $("start").disabled = isDisabled;
        $("stop").disabled = !isDisabled;
        $("textareaId").disabled = isDisabled;   
    }
    
    //enables size buttons
    function changeSize() {
        var word = $("readBox-layer");
        word.style.fontSize = this.value;
        
    }
    
    //enables change speed dropdown menu
    //does NOT allow for change while words are already being read
    function changeSpeed() {
        var speed = $("speed-input").value;
        //speed = this.value;
        return speed;   
    }
})();
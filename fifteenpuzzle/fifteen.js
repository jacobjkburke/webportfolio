//Jacob Burke
//May 1st, 2017
//CSE 154
//Section AJ Susan Wolfgram
//Assignment 4 - Fifteen Puzzle
//JS for a webpage that creates a fifteen puzzle for a user to solve.

(function() {
    //enforce semi-colon and other good style
    'use strict';
    
    //set up alias variables for easier to read code
    var $ = function(id) { return document.getElementById(id); };
    var qs = function(sel) { return document.querySelector(sel); };
    var qsa = function(sel) { return document.querySelectorAll(sel); };
    
    //fields
    var emptyTileLeft = 300;
    var emptyTileTop = 300;
    
    window.onload = function() { 
        //calls function that add all the tiles to the puzzle area onload
        addTiles();
        
        //fires shuffle button when clicked
        var shuffleButton = $("shufflebutton");
        shuffleButton.onclick = shuffle;
    };
    
    //add all the tiles to the puzzle area
    function addTiles() {
        var countLeft = 0;
        var countTop = 0;
        for (var i = 1; i < 16; i++) {
            var left = countLeft * 100;
            var top = countTop * 100;
            countLeft++;
            var tile = document.createElement("div"); //creates one tile as a div
            tile.className = "tile"; //styles tile unobstrusivly
            tile.innerHTML = i;
            tile.style.backgroundPosition = (left * -1 + "px") + " " + (top * -1 + "px");
            tile.style.left = left + "px";
            tile.style.top = top + "px";
            
            //add tile to webpage
            var puzzleArea = $("puzzlearea");
            puzzleArea.appendChild(tile);
            if(countLeft == 4) {
                countLeft = 0;
                countTop++;
            }
            
            //moves tile on click
            tile.onclick = moveTile;
            
            //highlights tile on mouseover
            tile.onmouseover = highlight;
        }
    }
    
    //shifts an adjecent tile one over to empty tile spot
    function moveTile() {
        //store value of clicked tile
        //declares left and top to check if tile can move using canMove function
        var left = parseInt(this.style.left);
        var top = parseInt(this.style.top);
        if(canMove(left, top)) {
            //shifts tiles
            this.style.left =  emptyTileLeft + "px";
            this.style.top = emptyTileTop + "px";
            emptyTileLeft = left;
            emptyTileTop = top;
       }
    }
    
    //function to see if the each tile can be moved
    function canMove(left, top) {
        //check if the tile to left or right of clicked tile is empty
        if ((left + 100 == emptyTileLeft || left - 100 == emptyTileLeft) && top == emptyTileTop) {
            return true;
        //check if the tile to the top or bottom of clicked tile is empty
        } else if ((top + 100 == emptyTileTop || top - 100 == emptyTileTop) && left == emptyTileLeft) {
            return true;
        } else { //it is not next to an empty tile
            return false;   
        }  
    } 
    
    //highlights hovered tile
    function highlight() {
        //removes previous highlight css from classList Array
        this.classList.remove("highlight");
        
        //declares left and top to check if tile can move using canMove function
        var left = parseInt(this.style.left);
        var top = parseInt(this.style.top);
        if(canMove(left, top)) {
            this.classList.add("highlight");   
        }
    }
    
    //shuffles all 15 tiles
    function shuffle() {
        for(var i = 0; i < 1000; i++) {
            var tiles = qsa("#puzzlearea div"); //grabs all tiles in puzzlearea
            var neighbors = []; //creates div to store moveable tiles
            for(var j = 0; j < tiles.length; j++) {
                var tile = tiles[j];
                
                //declares left and top to check if tile can move using canMove function
                var left = parseInt(tile.style.left);
                var top = parseInt(tile.style.top);
                if(canMove(left, top)) {
                    neighbors.push(tile); 
                 }   
            }
            var randomIndex = neighbors[parseInt(Math.random() * neighbors.length)];
            //clicks the tile "moving" it
            randomIndex.click();
        }
    }
})(); //end module
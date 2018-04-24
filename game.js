// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var firstKey = true;
var level = 1;
var maxLevel = 3;

var boardWidth = 0;
var currentX = 0;
var currentY = 0;

// possible bead states
var END_BEAD = 2;
var ENTERED = 1;
var NOT_ENTERED = 0;

// Lose Condition
function loseStuff() {
    PS.init();
    PS.audioPlay("fx_hoot");
}

// Win Condition
function winStuff() {
    PS.data(PS.ALL, PS.ALL, 1);     // sets data to 1 so mouse does not change bead colors
    PS.color(PS.ALL, PS.ALL, 133, 153, 0);
    PS.statusText("You ate the grid!");
    PS.audioPlay("fx_tada");
}

// Check if bead entered and apply effect

function markEntered(x, y) {
    PS.scale(13, 4, 75);                // health bead medium
    PS.radius(13, 4, 50);
    PS.color(13, 4, 200, 200, 200);
    PS.data(x, y, ENTERED);
}

// Mark Starting point
function markStart(x, y) {
    PS.glyph(x, y, "S");
    PS.glyphColor(x, y, 100, 100, 100);
    currentX = x;
    currentY = y;
}

// Mark End point
function markEnd(x, y) {
    PS.color(x, y, PS.color(x, y, 133, 153, 0));
    PS.glyph(x, y, "E");
    PS.data(x, y, END_BEAD);
    PS.glyphColor(x, y, 238, 232, 213);
}

function notEntered(x, y) {
    return PS.data(x, y) !== ENTERED;
}

// Check if at Start point
function isStart(x, y) {
    if(x === 0 && y === 0) {
        return true;
    } else {
        return false;
    }
}

// Check if at End point
function isEnd(x, y) {
    return PS.data(x, y) === END_BEAD;
}

// Check win conditions and increment level
function checkWin() {
    if(isEnd){
        if(level < maxLevel) {
            level++;
        }
        PS.init();
        PS.audioPlay("fx_ding");

    }

}

// Make player movable
function move(x, y) {
    if(x < 0 || y < 0 || x > boardWidth - 1 || y > boardWidth - 1) {
        return null; // do nothing
    } else {
        if(notEntered(x, y)) {
            if(isEnd(x, y)) {
                markEntered(x, y);
                currentBead(x, y);

            } else {
                markEntered(x, y);
                currentBead(x, y);
                currentX = x;
                currentY = y;
                PS.audioPlay("fx_pop");
            }
        }
    }
}

//Distinguish player bead from markEntered bead
function currentBead(x, y) {
    PS.color(x, y, 0, 0, 0);

}

// Start Game
PS.init = function( system, options ) {
    "use strict";

    mouseDown = false;
    firstKey = true;

    if(level < 5) {    // 5x5 grid size for levels 1-4
        PS.gridSize(15,15);
    }/*
    if(level >= 5 && level < 7)    // for more levels with larger grids
    {
        PS.gridSize(7,7);
    }
    if(level >= 7)    // for more levels with larger grids
    {
        PS.gridSize(9,9);
    }*/

    PS.gridColor(10, 10, 10);
    PS.gridShadow(true, PS.COLOR_GRAY);
    PS.color(PS.ALL, PS.ALL, 175, 175, 175);
    //PS.statusColor(88, 110, 117);                   //dark gray
    PS.statusColor(180, 180, 180);                   //light gray
    //PS.statusColor(100, 100, 100);
    PS.statusText("Onward");
    PS.border( PS.ALL, PS.ALL, 0 );                 // no border
    PS.bgAlpha( PS.ALL, PS.ALL, PS.ALPHA_OPAQUE );  // opaque bg
    PS.bgColor( PS.ALL, PS.ALL, 175, 175, 175 );    // same color as board



    PS.data(PS.ALL, PS.ALL, 0);         // resets each bead to zero for new levels

    if (level === 1) {
        markEntered(13, 4);
        markStart(0, 0);
        markEnd(2, 2);
        boardWidth = 15;
    }
    if (level === 2) {
        markEntered(13, 4);
        markStart(0, 0);
        markEnd(4, 4);
        boardWidth = 15;
    }
    /*
    if (level === 3) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(2, 4);
        boardWidth = 15;
    }
    if (level === 4) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(3, 1);
        boardWidth = 15;
    }
    if (level === 5) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(3, 1);
        boardWidth = 15;
    }
    if (level === 6) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markEntered(5, 0);
        markEntered(6, 0);
        markEntered(6, 1);
        markEntered(6, 2);
        markEntered(6, 3);
        markEntered(5, 5);
        markStart(0, 0);
        markEnd(5, 3);
        boardWidth = 15;
    }
    if (level === 7) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markEntered(4, 4);
        markEntered(4, 5);
        markEntered(5, 4);
        markEntered(5, 5);
        markEntered(5, 7);
        markEntered(5, 0);
        markEntered(6, 0);
        markEntered(6, 1);
        markEntered(6, 2);
        markEntered(6, 3);
        markEntered(6, 4);
        markEntered(6, 5);
        markStart(0, 0);
        markEnd(5, 3);
        boardWidth = 15;
    }*/


    if(level === maxLevel) {
        winStuff();
    }
};

PS.touch = function( x, y, data, options ) {
    "use strict";
    if(x === 0 && y === 0) {
        mouseDown = true;
        //markEntered(x, y);
        currentBead(x, y);          // make darker tile move with mouse/keys
    }
};

PS.release = function( x, y, data, options ) {
    "use strict";
    mouseDown = false;


};

PS.enter = function( x, y, data, options ) {

    // console.log("Hello there"); // for debugging

    if(markEntered(13,4) === ENTERED){
        PS.scale(x, y, 100);
    }
    checkWin();
};

PS.exit = function( x, y, data, options ) {
    "use strict";
    if(mouseDown === true) {
        PS.color(x, y, PS.color(x, y, 175, 175, 175));               // resets color
    }
    if(mouseDown === false && PS.data(x,y) === NOT_ENTERED) {       // removes gray from previous bead
        PS.color(x, y, 175, 175, 175);
    }
    if(markEntered(13,4) === ENTERED){
        PS.scale(x, y, 100);

    }

};

PS.exitGrid = function( options ) {
    "use strict";


};

PS.keyDown = function( key, shift, ctrl, options ) {
    "use strict";
    if(markEntered(13,4) === ENTERED){
        PS.scale(x, y, 100);
    }
    if(key === PS.KEY_ARROW_DOWN) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX, currentY + 1);
        }
    }
    else if(key === PS.KEY_ARROW_UP) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX, currentY - 1);
        }
    }
    else if(key === PS.KEY_ARROW_LEFT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX - 1, currentY);
        }
    }
    else if(key === PS.KEY_ARROW_RIGHT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX + 1, currentY);
        }
    }
};

// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var firstKey = true;
var version = 1;
var maxLevel = 5;

var boardWidth = 5;
var currentX = 0;
var currentY = 0;

// Various possible states of the beads
var END_BEAD = 2;
var ENTERED = 1;
var NOT_ENTERED = 0;


function loseStuff() {
    PS.init();
    PS.audioPlay("fx_hoot");
}

function winStuff() {
    PS.data(PS.ALL, PS.ALL, 1);     // sets data to 1 so mouse does not change bead colors
    PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
    PS.statusText("You solved all the puzzles!");
    PS.audioPlay("fx_tada");
}

function markEntered(x, y) {
    PS.color(x, y, PS.COLOR_RED);
    PS.data(x, y, ENTERED);
}

function markStart(x, y) {
    PS.glyph(x, y, "S");
    currentX = x;
    currentY = y;
}

function markEnd(x, y) {
    PS.color(x, y, PS.COLOR_BLACK);
    PS.glyph(x, y, "E");
    PS.data(x, y, END_BEAD);
    PS.glyphColor(x, y, PS.COLOR_WHITE);
}

function notEntered(x, y) {
    return PS.data(x, y) !== ENTERED;
}

function isEnd(x, y) {
    return PS.data(x, y) === END_BEAD;
}

function checkWin() {
    var count = 0;
    for(var xNum = 0 ; xNum < 5 ; xNum++) {
        for(var yNum = 0 ; yNum < 5 ; yNum++) {
            if (PS.data(xNum, yNum) !== ENTERED) {     // if not all beads are entered (set to 1), increase count
                count++;
            }
        }
    }
    if(count > 0) {      // lose if not all beads are entered/red
        loseStuff();
    } else {            // move on to next level
        if(version < 5) {
            version++;
        }
        PS.init();
        PS.audioPlay("fx_ding");
    }
}

function move(x, y) {
    if(x < 0 || y < 0 || x > boardWidth - 1 || y > boardWidth - 1) {
        //loseStuff();
    } else {
        if(notEntered(x, y)) {
            if(isEnd(x, y)) {
                markEntered(x, y);
                checkWin();
            } else {
                markEntered(x, y);
                currentX = x;
                currentY = y;
                PS.audioPlay("fx_pop");
            }
        } else {
            loseStuff();
        }
    }
}

PS.init = function( system, options ) {
	"use strict";

    mouseDown = false;
    firstKey = true;

	if(version < 5) {    // 5x5 grid size for levels 1-4
        PS.gridSize(5,5);
    }
    if(version >= 5) {   // for more levels with larger grids
        PS.gridSize(7,7);
    }

	PS.gridColor(175, 175, 215);
    PS.color(PS.ALL, PS.ALL, 255, 255, 255);
	PS.statusColor( PS.COLOR_BLACK );
	PS.border( PS.ALL, PS.ALL, 0 );     // no border

    PS.data(PS.ALL, PS.ALL, 0);         // resets each bead to zero for new levels


    markEntered(0, 4);
    markEntered(1, 0);
    markEntered(2, 0);
    markEntered(3, 0);
    markEntered(2, 3);
    markEntered(4, 0);

    if (version === 1) {
        markStart(0, 0);
        markEnd(2, 2);
    }
    if (version === 2) {
        markStart(0, 0);
        markEnd(4, 4);
    }
    if (version === 3) {
        markStart(0, 0);
        markEnd(2, 4);
    }
    if (version === 4) {
        markStart(0, 0);
        markEnd(3, 1);
    }
    if(version ===1) {
        PS.statusText( "Drag to fill the Grid! Level " + version);
    }
    else if(version === 2) {
        PS.statusText("Or use arrow keys! Level " + version);
    }
    else if(version === 3) {
        PS.statusText("You got the hang of it. Level " + version)
    }
    else if(version > 3 && version < maxLevel) {
        PS.statusText("Level " + version);
    }

    if(version === maxLevel) {
        winStuff();
    }
};

PS.touch = function( x, y, data, options ) {
	"use strict";
	if(x === 0 && y === 0) {
        mouseDown = true;
        markEntered(x, y);
    }
};

PS.release = function( x, y, data, options ) {
	"use strict";
	mouseDown = false;

    checkWin();
};

PS.enter = function( x, y, data, options ) {
	"use strict";

    if(mouseDown === false && PS.data(x,y) === NOT_ENTERED) {       // turns bead gray when hovering over
        PS.color(x, y, 225, 225, 225);
    }
    else if (mouseDown === true && PS.data(x,y) !== ENTERED) {      // enables dragging
        PS.color(x, y, PS.COLOR_RED);
        PS.data(x, y, ENTERED);
        PS.audioPlay("fx_pop");
    }
    else if (mouseDown === true && PS.data(x,y) === ENTERED) {     // lose if player tries to go back over a bead
        loseStuff();
    }

    // console.log("Hello there"); // for debugging
};

PS.exit = function( x, y, data, options ) {
    "use strict";

    if(mouseDown === false && PS.data(x,y) === NOT_ENTERED) {       // removes gray from previous bead
        PS.color(x, y, 255, 255, 255);
    }
};

PS.exitGrid = function( options ) {
	"use strict";
	if(mouseDown === true) {    // lose if mouse leaves grid while dragging
	    loseStuff();
    }
};

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	if(key === PS.KEY_ARROW_DOWN) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            move(currentX, currentY + 1);
        }
    }
    else if(key === PS.KEY_ARROW_UP) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            move(currentX, currentY - 1);
        }
    }
    else if(key === PS.KEY_ARROW_LEFT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            move(currentX - 1, currentY);
        }
    }
    else if(key === PS.KEY_ARROW_RIGHT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            move(currentX + 1, currentY);
        }
    }
};
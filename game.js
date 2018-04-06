// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var firstKey = true;
var level = 1;
var maxLevel = 8;

var boardWidth = 9;
var currentX = 0;
var currentY = 0;

// possible bead states
var END_BEAD = 2;
var ENTERED = 1;
var NOT_ENTERED = 0;


function loseStuff() {
    PS.init();
    PS.audioPlay("fx_hoot");
}

function winStuff() {
    PS.data(PS.ALL, PS.ALL, 1);     // sets data to 1 so mouse does not change bead colors
    //PS.color(PS.ALL, PS.ALL, 150, 200, 0));
    PS.color(PS.ALL, PS.ALL, 133, 153, 0);
    PS.statusText("You solved all the puzzles!");
    PS.audioPlay("fx_tada");
}

function markEntered(x, y) {
    //PS.color(x, y, PS.color(x, y, 255, 100, 0));  //wine
    PS.color(x, y, PS.color(x, y, 211, 54, 130));   //magenta
    PS.glyphColor(x, y, 238, 232, 213);
    //PS.color(x, y, PS.color(x, y, 220, 50, 47));    //red
    //PS.color(x, y, PS.color(x, y, 203, 75, 22));    //orange
    //PS.color(x, y, PS.color(x, y, 38, 139, 210));   //blue
    PS.data(x, y, ENTERED);
}

function markStart(x, y) {
    PS.glyph(x, y, "S");
    PS.glyphColor(x, y, 100, 100, 100);
    currentX = x;
    currentY = y;
}

function markEnd(x, y) {
    PS.color(x, y, PS.color(x, y, 133, 153, 0));
    PS.glyph(x, y, "E");
    PS.data(x, y, END_BEAD);
    PS.glyphColor(x, y, 238, 232, 213);
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
        if(level < maxLevel) {
            level++;
        }
        PS.init();
        PS.audioPlay("fx_ding");
    }
}

function move(x, y) {
    if(x < 0 || y < 0 || x > boardWidth - 1 || y > boardWidth - 1) {
        loseStuff();
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

	if(level < 5) {    // 5x5 grid size for levels 1-4
        PS.gridSize(5,5);
    }
    if(level >= 5 && level < 7)    // for more levels with larger grids
    {
        PS.gridSize(7,7);
    }
    if(level >= 7)    // for more levels with larger grids
    {
        PS.gridSize(9,9);
    }

	PS.gridColor(238, 232, 213);
    PS.gridShadow(true, PS.COLOR_GRAY);
    PS.color(PS.ALL, PS.ALL, 238, 232, 213);
	PS.statusColor(88, 110, 117);   //dark gray
    PS.statusColor(100, 100, 100);
	PS.border( PS.ALL, PS.ALL, 0 );     // no border

    PS.data(PS.ALL, PS.ALL, 0);         // resets each bead to zero for new levels

    if (level === 1) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(2, 2);
    }
    if (level === 2) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(4, 4);
    }
    if (level === 3) {
        markEntered(0, 4);
        markEntered(1, 0);
        markEntered(2, 0);
        markEntered(3, 0);
        markEntered(2, 3);
        markEntered(4, 0);
        markStart(0, 0);
        markEnd(2, 4);
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
    }

    if(level ===1) {
        PS.statusText( "Drag to fill the Grid! Level " + level);
    }
    else if(level === 2) {
        PS.statusText("Or use arrow keys! Level " + level);
    }
    else if(level === 3) {
        PS.statusText("You got the hang of it. Level " + level)
    }
    else if(level > 3 && level < 7) {
        PS.statusText("Level " + level);
    }
    else if(level < maxLevel){
        PS.statusText("Final Level");
    }
    if(level === maxLevel) {
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
        PS.color(x, y, 218, 212, 193);
    }
    else if (mouseDown === true && PS.data(x,y) !== ENTERED) {      // enables dragging
        markEntered(x, y);
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
        PS.color(x, y, 238, 232, 213);
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

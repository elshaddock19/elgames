// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var firstKey = true;
var level = 1;
var maxLevel = 8;

var boardWidth = 0;
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
    //PS.color(x, y, PS.color(x, y, 255, 100, 0));    //wine
    PS.color(x, y, PS.color(x, y, 211, 54, 130));     //magenta
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

function isStart(x, y) {
    return x === 0 && y === 0;
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
        // do nothing
    } else {
        if(notEntered(x, y)) {
            if(isEnd(x, y)) {
                markEntered(x, y);
                currentBead(x, y);
                checkWin();
            } else {
                markEntered(x, y);
                currentBead(x, y);
                currentX = x;
                currentY = y;
                PS.audioPlay("fx_pop");
            }
        } else {
            loseStuff();
        }
    }
}

function currentBead(x, y) {
    PS.color(x, y, 191, 34, 110);
}

PS.init = function( system, options ) {
	"use strict";

    mouseDown = false;
    firstKey = true;

    PS.gridSize(15, 15);

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

    /*
    // screen mockup vertical version
    PS.color(2, 1, 30, 30, 30);         // dark bead
    PS.color(2, 2, 30, 30, 30);
    PS.color(5, 3, 30, 30, 30);
    PS.color(9, 4, 30, 30, 30);
    PS.color(14, 2, 30, 30, 30);
    PS.color(13, 2, 30, 30, 30);
    PS.color(12, 2, 30, 30, 30);

    //PS.scale(7, 13, 75);              // player bead
    PS.radius(7, 13, 50);
    PS.color(7, 13, 85, 85, 85);

    PS.scale(3, 7, 50);                 // health bead 1
    PS.radius(3, 7, 50);
    PS.color(3, 7, 200, 200, 200);

    PS.scale(13, 4, 75);                // health bead 1
    PS.radius(13, 4, 50);
    PS.color(13, 4, 200, 200, 200);
    */

    // screen mockup horizontal direction
    PS.color(14, 1, 30, 30, 30);         // dark bead
    PS.color(14, 2, 30, 30, 30);
    PS.color(12, 4, 30, 30, 30);
    PS.color(9, 9, 30, 30, 30);
    PS.color(14, 13, 30, 30, 30);
    PS.color(13, 13, 30, 30, 30);
    PS.color(12, 13, 30, 30, 30);

    //PS.scale(7, 13, 75);              // player bead
    PS.radius(1, 8, 50);
    PS.color(1, 8, 85, 85, 85);

    PS.scale(3, 10, 50);                 // health bead small
    PS.radius(3, 10, 50);
    PS.color(3, 10, 200, 200, 200);

    PS.scale(13, 4, 75);                // health bead medium
    PS.radius(13, 4, 50);
    PS.color(13, 4, 200, 200, 200);
};

PS.touch = function( x, y, data, options ) {
	"use strict";

};

PS.release = function( x, y, data, options ) {
	"use strict";

};

PS.enter = function( x, y, data, options ) {
	"use strict";
    // console.log("Hello there"); // for debugging

};

PS.exit = function( x, y, data, options ) {
    "use strict";

};

PS.exitGrid = function( options ) {
	"use strict";

};

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	if(key === PS.KEY_ARROW_DOWN) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 211, 54, 130);
            move(currentX, currentY + 1);
        }
    }
    else if(key === PS.KEY_ARROW_UP) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 211, 54, 130);
            move(currentX, currentY - 1);
        }
    }
    else if(key === PS.KEY_ARROW_LEFT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 211, 54, 130);
            move(currentX - 1, currentY);
        }
    }
    else if(key === PS.KEY_ARROW_RIGHT) {
        if(firstKey) {
            move(currentX, currentY);
            firstKey = false;
        } else {
            PS.color(currentX, currentY, 211, 54, 130);
            move(currentX + 1, currentY);
        }
    }
};

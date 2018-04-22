// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */


var db = null;

// Call this function to finalize initialization
// and start your game

var finalize = function () {
    // Finalizing code goes here

};

var level = 1;
var maxLevel = 3;

var boardWidth = 15;
var currentX = 0;
var currentY = 0;

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

function playerBead(x, y) {
    PS.color(x, y, 50, 50, 50);
}

function enemyBead(x, y) {
    PS.color(x, y, 250, 250, 250);
    PS.data(x, y, "enemy");
}

function checkWin() {
    var count = 0;
    for (var xNum = 0; xNum < 5; xNum++) {
        for (var yNum = 0; yNum < 5; yNum++) {
            if (PS.data(xNum, yNum) !== ENTERED) {     // if not all beads are entered (set to 1), increase count
                count++;
            }
        }
    }
    if (count > 0) {      // lose if not all beads are entered/red
        loseStuff();
    } else {            // move on to next level
        if (level < maxLevel) {
            level++;
        }
        PS.init();
        PS.audioPlay("fx_ding");
    }
}

function move(x, y) {
    if (x < 0) {
        playerBead(x + 1, y);
    } else if (y < 0) {
        playerBead(x, y + 1);
    } else if (x > boardWidth - 1) {
        playerBead(x - 1, y);
    } else if (y > boardWidth - 1) {
        playerBead(x, y - 1);
    } else {
        if (PS.data(x, y) === "enemy"){
            loseStuff();
            //console.log(5);
        }
        playerBead(x, y);
        currentX = x;
        currentY = y;
        PS.audioPlay("fx_pop");
    }
}

PS.init = function (system, options) {
    // resets all beads
    PS.data(PS.ALL, PS.ALL);
    currentX = 0;
    currentY = 0;
    level = 1;

    PS.gridSize(15, 15);
    PS.gridColor(10, 10, 10);                       // dark background
    PS.gridShadow(true, PS.COLOR_GRAY);             // glowing effect
    PS.color(PS.ALL, PS.ALL, 175, 175, 175);        // light board
    PS.statusColor(180, 180, 180);                  // light gray text over dark bg
    PS.statusText("Onward");                        // title
    PS.border(PS.ALL, PS.ALL, 0);                   // no border
    PS.bgAlpha(PS.ALL, PS.ALL, PS.ALPHA_OPAQUE);    // opaque bg
    PS.bgColor(PS.ALL, PS.ALL, 175, 175, 175);      // same color as board

    enemyBead(5, 5);
    enemyBead(10, 12);

    if (db) {
        db = PS.dbInit(db, {login: finalize});
        if (db === PS.ERROR) {
            db = null;
        }
    }
    else {
        finalize();
    }
};


// At major game events (end of a level,
// major victory, etc), add this bit of code
// to record the event in the database.

if (db && PS.dbValid(db)) {
    PS.dbEvent(db, "score", val); // val can be anything
}

// At the end of your game (or the
// end of the last available level),
// install this code to send the data.

if (db && PS.dbValid(db)) {
    PS.dbEvent(db, "gameover", true);
    PS.dbSend(db, "bmoriarty", {discard: true});
    db = null;
}

PS.keyDown = function (key, shift, ctrl, options) {
    "use strict";

    if (key === PS.KEY_ARROW_DOWN) {
        PS.color(currentX, currentY, 175, 175, 175);
        move(currentX, currentY + 1);
    }
    else if (key === PS.KEY_ARROW_UP) {
        PS.color(currentX, currentY, 175, 175, 175);
        move(currentX, currentY - 1);
    }
    else if (key === PS.KEY_ARROW_LEFT) {
        PS.color(currentX, currentY, 175, 175, 175);
        move(currentX - 1, currentY);
    }
    else if (key === PS.KEY_ARROW_RIGHT) {
        PS.color(currentX, currentY, 175, 175, 175);
        move(currentX + 1, currentY);
    }
};

// Add the code below to the
// PS.shutdown() event handler at the
// bottom of game.js to save your
// data in case the player closes
// the browser before finishing.

PS.shutdown = function (options) {
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "shutdown", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
    }
};

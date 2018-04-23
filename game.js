// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */


var db = "onward";

var level = 1;
var maxLevel = 3;
var boardWidth = 15;
var currentX = 0;
var currentY = 0;
var createdTimer = false;

var enemyXs = [];
var enemyYs = [];

var timerID;

var finalize = function () {
    if(!createdTimer) {
        timerID = PS.timerStart(60, myTimer);
        createdTimer = true;
    }
};

function myTimer() {
    var counter = 0;
    for(counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        moveEnemy(enemyX, enemyY);
    }
};

function playerBead(x, y) {
    PS.color(x, y, 50, 50, 50);
    PS.data(x, y, "player");
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
        if (PS.data(x, y) === "enemy") {
            lose();
            //console.log(5);
        } else {
            playerBead(x, y);
            currentX = x;
            currentY = y;
            PS.audioPlay("fx_pop");
        }
    }
}

function massDown() {

}

function massUp() {

}

function updateEnemyPosition(x, y, newX, newY) {
    PS.color(newX, newY, 250, 250, 250);
    PS.data(newX, newY, "enemy");

    var counter = 0;
    for(counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        if(enemyX === x && enemyY === y) {
            enemyXs[counter] = newX;
            enemyYs[counter] = newY;
        }
    }
}

function newEnemy(x, y) {
    PS.color(x, y, 250, 250, 250);
    PS.data(x, y, "enemy");
    enemyXs.push(x);
    enemyYs.push(y);
}

function moveEnemy(x, y) {
    reset(x, y);
    updateEnemyPosition(x, y, x, y + 1);
}

/*
function checkWin() {
    var count = 0;
    for (var xNum = 0; xNum < 5; xNum++) {
        for (var yNum = 0; yNum < 5; yNum++) {
            if (PS.data(xNum, yNum) !== ENTERED) {     // if not all 
beads are entered (set to 1), increase count
                count++;
            }
        }
    }
    if (count > 0) {      // lose if not all beads are entered/red
        lose();
    } else {            // move on to next level
        if (level < maxLevel) {
            level++;
        }
        PS.init();
        PS.audioPlay("fx_ding");
    }
}
*/

function lose() {

    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "gameover", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
        db = null;
    }

    PS.init();
    PS.audioPlay("fx_hoot");
}

function winStuff() {
    PS.color(PS.ALL, PS.ALL, 133, 153, 0);
    PS.audioPlay("fx_tada");
    PS.color(10, 10, 10);       // grid color same as bg color
}

function reset(x, y) {
    PS.data(x, y);
    PS.color(x, y, 175, 175, 175);
    console.log("reset");
}

PS.init = function (system, options) {


    PS.gridSize(15, 15);
    PS.gridColor(10, 10, 10);                       // dark background
    PS.gridShadow(true, PS.COLOR_GRAY);             // glowing effect
    PS.color(PS.ALL, PS.ALL, 175, 175, 175);        // light board
    PS.statusColor(180, 180, 180);                  // light gray text over dark bg
    PS.statusText("Onward");                        // title
    PS.border(PS.ALL, PS.ALL, 0);                   // no border
    PS.bgAlpha(PS.ALL, PS.ALL, PS.ALPHA_OPAQUE);    // opaque bg
    PS.bgColor(PS.ALL, PS.ALL, 175, 175, 175);      // same color as board

    // resets all beads
    PS.data(PS.ALL, PS.ALL);
    currentX = 7;
    currentY = 7;
    level = 1;
    playerBead(currentX, currentY);                 // moves player back to center

    enemyXs = [];
    enemyYs = [];

    newEnemy(5, 3);
    newEnemy(5, 2);
    newEnemy(10, 10);
    newEnemy(11, 10);
    newEnemy(12, 10);
    newEnemy(13, 10);
    newEnemy(14, 10);

    if (db) {
        db = PS.dbInit(db, {login: finalize});
        if (db === PS.ERROR) {
            db = null;
        }
    } else {
        finalize();
    }
};


// At major game events (end of a level,
// major victory, etc), add this bit of code
// to record the event in the database.


// At the end of your game (or the
// end of the last available level),
// install this code to send the data.


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

// ELGames
// Lisa Liao (lliao) &
// Ed Shaddock (elshaddock)
// Onward: an Abstract Game

// game.js for Perlenspiel 3.2
/*jslint nomen: true, white: true */
/*global PS */

var db = null;

var level = 1;
var maxLevel = 3;
var boardWidth = 15;
var currentX = 7;
var currentY = 7;
var createdTimer = false;
var currentLevelEndX;
var currentLevelEndY;
var checkpointCount = 0;

var enemyXs = [];
var enemyYs = [];
var checkpointsX = [];
var checkpointsY = [];

var PLAYER = "player";
var ENEMY = "enemy";
var START = "start";
var END = "end";
var CHECKPOINT = "checkpoint";

var timerID;

var finalize = function () {
    if (!createdTimer) {
        timerID = PS.timerStart(80, myTimer);
        createdTimer = true;
    }

    // resets data from previous level
    reset(PS.ALL, PS.ALL);
    if (level === 1) {
        playerBead(currentX, currentY);
    }
    //currentX = 7;
    //currentY = 7;
    enemyXs = [];
    enemyYs = [];
    checkpointCount = 0;

    // creates start, end, and checkpoints for each level
    if (level === 1) {
        createCheckpoint(5, 5);
        createEnd(14, 8);
    } else if (level === 2) {
        createCheckpoint(4, 8);
        createCheckpoint(8, 4);
        createEnd(14, 12);
    } else if (level === 3) {
        createCheckpoint(6, 7);
        createCheckpoint(4, 2);
        createCheckpoint(10, 11);
        createEnd(14, 1);
    }

    // creates enemies
    newEnemy(5, 3);
    newEnemy(5, 2);
    newEnemy(10, 10);
    newEnemy(11, 10);
    newEnemy(12, 10);
    newEnemy(13, 10);
    newEnemy(14, 10);
    newEnemy(7, 10);
    newEnemy(8, 11);
    newEnemy(8, 3);
    newEnemy(6, 4);

};

function myTimer() {
    console.log("tick");
    for (var counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        moveEnemy(enemyX, enemyY);
    }
}

function createCheckpoint(x, y) {
    PS.data(x, y, CHECKPOINT);
    PS.border(x, y, 5);
    PS.borderColor(x, y, 150, 150, 150);
    checkpointsX.push(x);
    checkpointsY.push(y);
}

function isPlayerAtCheckpoint(x, y) {
    return PS.data(x, y) === CHECKPOINT;
}

function createEnd(x, y) {
    PS.data(x, y, END);
    PS.border(x, y, 5);
    PS.borderColor(x, y, 100, 100, 100);
    currentLevelEndX = x;
    currentLevelEndY = y;
}

function isPlayerAtEnd(x, y) {
    return PS.data(x, y) === END;
}

function playerBead(x, y) {
    PS.color(x, y, 50, 50, 50);
    PS.data(x, y, PLAYER);
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
        // restarts level if player enters enemy bead
        if (PS.data(x, y) === ENEMY) {
            restart();
        } else if (isPlayerAtEnd(x, y)) {   // checks if necessary num of checkpoints have been passed
            if (level === 1) {
                if (checkpointCount === 1) {
                    levelUp();
                }
            } else if (level === 2) {
                if (checkpointCount === 2) {
                    levelUp();
                }
            } else if (level === 3) {
                if (checkpointCount === 3) {
                    win();
                }
            }
        } else if (isPlayerAtCheckpoint(x, y)) {
            console.log("checkpoint");
            checkpointCount++;
            reset(x, y);

            // send data point
            if (db && PS.dbValid(db)) {
                PS.dbEvent(db, "gameover", true);
                PS.dbSend(db, "bmoriarty", {discard: true});
                db = null;
            }
        }
        playerBead(x, y);
        currentX = x;
        currentY = y;
        PS.audioPlay("fx_pop");
    }
}

function updateEnemyPosition(x, y, newX, newY) {
    PS.color(newX, newY, 250, 250, 250);
    PS.data(newX, newY, ENEMY);
    PS.scale(newX, newY, 50);
    PS.scale(x, y);

    for (counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        if (enemyX === x && enemyY === y) {
            enemyXs[counter] = newX;
            enemyYs[counter] = newY;
        }
    }
}

function newEnemy(x, y) {
    PS.color(x, y, 250, 250, 250);
    PS.scale(x, y, 50);
    PS.data(x, y, ENEMY);
    enemyXs.push(x);
    enemyYs.push(y);
}

function moveEnemy(x, y) {
    xInc = getRandomMove(-1, 1);
    yInc = getRandomMove(-1, 1);
    if (isMoveValid(x + xInc, y + yInc)) {
        reset(x, y);
        updateEnemyPosition(x, y, x + xInc, y + yInc);
    } else {
        moveEnemy(x, y);
    }
}

function getRandomMove(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isMoveValid(newX, newY) {
    if (newX === 0 && newY === 0) {
        return true;
    } else if (newX > 0 && newX < boardWidth - 1 &&
        newY > 0 && newY < boardWidth - 1) {
        if (newX !== currentX && newY !== currentY) {
            if (!isEnemyHere(newX, newY)) {
                if (!isStartHere(newX, newY) &&
                    !isEndHere(newX, newY) &&
                    !isCheckpointHere(newX, newY)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isEnemyHere(x, y) {
    for (var counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        if (enemyX === x && enemyY === y) {
            return true;
        }
    }
    return false;
}

function isStartHere(x, y) {
    return PS.data(x, y) === START;
}

function isEndHere(x, y) {
    return PS.data(x, y) === END;
}

function isCheckpointHere(x, y) {
    return PS.data(x, y) === CHECKPOINT;
}

function levelUp() {
    level++;
    finalize();
}

function restart() {
    PS.init();
    PS.audioPlay("fx_hoot");

    //sends data point
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "gameover", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
        db = null;
    }
}

function win() {
    PS.timerStop(timerID);
    reset(PS.ALL, PS.ALL);
    PS.fade(PS.ALL, PS.ALL, 60);
    PS.color(PS.ALL, PS.ALL, 255, 255, 255);
    PS.audioPlay("fx_tada");
    //PS.color(10, 10, 10);       // grid color same as bg color

    // sends data point
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "gameover", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
        db = null;
    }
}

function reset(x, y) {
    PS.scale(x, y, 100);
    PS.border(x, y, 0);
    PS.borderColor(x, y);
    PS.data(x, y);
    // fade does not work ???
    //PS.fade(x, y, 60);
    PS.color(x, y, 175, 175, 175);
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

    playerBead(currentX, currentY);

    if (db) {
        db = PS.dbInit(db, {login: finalize});
        if (db === PS.ERROR) {
            db = null;
        }
    } else {
        finalize();
    }
};

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

// sends data if window is closed before game ends
PS.shutdown = function (options) {
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "shutdown", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
    }
};
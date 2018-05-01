// ELGames
// Lisa Liao (lliao) &
// Ed Shaddock (elshaddock)
// Onward: an Abstract Game

// game.js for Perlenspiel 3.2
/*jslint nomen: true, white: true */
/*global PS */

/*  TO DO:
    add more levels
    fix goal not registering bug
    make player bead flash? after touching white bead
    distinguish checkpoints from goals
*/

var db = null;

var level = 1;
var maxLevel = 3;
var boardWidth = 15;
var currentX = 1;
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

var checkpointsInLevel1 = 1;
var checkpointsInLevel2 = 2;
var checkpointsInLevel3 = 2;
var checkpointsInLevel4 = 3;
var checkpointsInLevel5 = 3;
var checkpointsInLevel6 = 4;

var timerID;

var finalize = function () {
    if (!createdTimer) {
        timerID = PS.timerStart(60, myTimer);
        createdTimer = true;
    }

    // resets data from previous level
    playerBead(currentX, currentY);
    resetBead(PS.ALL, PS.ALL);
    if (level === 1) {
        playerBead(currentX, currentY);
    }
    enemyXs = [];
    enemyYs = [];
    checkpointCount = 0;

    // creates start, end, and checkpoints for each level
    if (level === 1) {
        createCheckpoint(7, 7);
        createEnd(13, 7);
    } else if (level === 2) {
        createCheckpoint(1, 9);
        createCheckpoint(8, 4);
        createEnd(14, 12);

        // creates enemies
        newEnemy(5, 3);

    } else if (level === 3) {
        createCheckpoint(4, 13);
        createCheckpoint(13, 3);
        createEnd(2, 6);

        // creates enemies
        newEnemy(5, 3);
        newEnemy(5, 2);
        newEnemy(10, 10);
        newEnemy(11, 10);
        newEnemy(12, 10);
        newEnemy(13, 10);

    }else if (level === 4) {
        createCheckpoint(7, 13);
        createCheckpoint(13, 7);
        createCheckpoint(3, 9);
        createEnd(13, 1);

        // creates enemies
        newEnemy(5, 3);
        newEnemy(5, 2);
        newEnemy(10, 10);
        newEnemy(11, 10);
        newEnemy(12, 10);
        newEnemy(13, 10);

    } else if (level === 5) {
        createCheckpoint(6, 7);
        createCheckpoint(4, 2);
        createCheckpoint(10, 11);
        createEnd(4, 12);

        // creates enemies
        newEnemy(4, 3);
        newEnemy(5, 3);
        newEnemy(11, 11);
        newEnemy(11, 10);
        newEnemy(12, 10);
        newEnemy(13, 9);
        newEnemy(14, 10);
        newEnemy(7, 1);
        newEnemy(8, 11);
        newEnemy(8, 3);
        newEnemy(6, 4);
        newEnemy(6, 6);
        newEnemy(1, 8);

    }else if (level === 6) {
        createCheckpoint(6, 7);
        createCheckpoint(4, 2);
        createCheckpoint(10, 11);
        createCheckpoint(1, 11);
        createEnd(7, 3);

        // creates enemies
        newEnemy(4, 3);
        newEnemy(5, 3);
        newEnemy(11, 11);
        newEnemy(11, 10);
        newEnemy(12, 10);
        newEnemy(13, 9);
        newEnemy(14, 10);
        newEnemy(7, 1);
        newEnemy(8, 11);
        newEnemy(8, 3);
        newEnemy(6, 4);
        newEnemy(6, 6);
        newEnemy(1, 8);

    }
};

function myTimer() {
    for (var counter = 0; counter < enemyXs.length; counter++) {
        var enemyX = enemyXs[counter];
        var enemyY = enemyYs[counter];
        moveEnemy(enemyX, enemyY);
    }
}

function createCheckpoint(x, y) {
    PS.data(x, y, CHECKPOINT);
    PS.border(x, y, 4);
    PS.borderColor(x, y, 130, 130, 130);
    checkpointsX.push(x);
    checkpointsY.push(y);
}

function isPlayerAtCheckpoint(x, y) {
    return PS.data(x, y) === CHECKPOINT;
}

function createEnd(x, y) {
    PS.data(x, y, END);
    PS.border(x, y, 5);
    PS.borderColor(x, y, 75, 75, 75);
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
            // send data point
            if (db && PS.dbValid(db)) {
                PS.dbEvent(db, "gameover", level);
            }

            restart();
        } else if (isPlayerAtEnd(x, y)) {
            if (level === 1) {
                if (checkpointCount === checkpointsInLevel1) {    // checks if necessary num of checkpoints have been passed
                    levelUp();
                    PS.audioPlay("perc_block_high");
                }
            } else if (level === 2) {
                if (checkpointCount === checkpointsInLevel2) {
                    levelUp();
                    PS.audioPlay("perc_block_high");
                }
            } else if (level === 3) {
                if (checkpointCount === checkpointsInLevel3) {
                    levelUp();
                    PS.audioPlay("perc_block_high");
                }
            } else if (level === 4) {
                if (checkpointCount === checkpointsInLevel4) {
                    levelUp();
                    PS.audioPlay("perc_block_high");
                }
            } else if (level === 5) {
                if (checkpointCount === checkpointsInLevel5) {
                    levelUp();
                    PS.audioPlay("perc_block_high");
                }
            } else if (level === 6) {
                if (checkpointCount === checkpointsInLevel6) {
                    win();
                    PS.audioPlay("perc_block_high");
                }
            }
        } else if (isPlayerAtCheckpoint(x, y)) {
            checkpointCount++;
            resetBead(x, y);
            PS.audioPlay("perc_block_low");


            // send data point
            if (db && PS.dbValid(db)) {
                console.log("Checkpoint");
                PS.dbEvent(db, "score", checkpointCount);
            }
        }
        playerBead(x, y);
        currentX = x;
        currentY = y;
    }
}

function updateEnemyPosition(x, y, newX, newY) {
    PS.data(newX, newY, ENEMY);
    PS.data(x, y);
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
    if (xInc === 0 && yInc === 0) {
        resetBead(x, y);
        updateEnemyPosition(x, y, x + xInc, y + yInc);
    } else if (isEnemyMoveValid(x + xInc, y + yInc)) {
        resetBead(x, y);
        updateEnemyPosition(x, y, x + xInc, y + yInc);
    } else {
        moveEnemy(x, y);
    }
}

function getRandomMove(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEnemyMoveValid(newX, newY) {
    if (newX > 0 && newX < boardWidth - 1 &&
        newY > 0 && newY < boardWidth - 1) {
        if (newX !== currentX && newY !== currentY) {
            if (!isEnemyHere(newX, newY)) {
                if (!isStartHere(newX, newY) &&
                    !isEndHere(newX, newY) &&
                    !isCheckpointHere(newX, newY)) {
                    if (!isNextToPlayer(newX, newY)) {
                        return true;
                    }
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

function isNextToPlayer(x, y) {
    // checks 3x3 grid around player
    return (x - 1 === currentX && y - 1 === currentY ||
        x - 1 === currentX && y === currentY ||
        x - 1 === currentX && y + 1 === currentY ||
        x === currentX && y + 1 === currentY ||
        x + 1 === currentX && y + 1 === currentY ||
        x + 1 === currentX && y === currentY ||
        x + 1 === currentX && y - 1 === currentY);
}

function isStartHere(x, y) {
    return PS.data(x, y) === START;
}

function isEndHere(x, y) {
    if(x > 0 && x < boardWidth && y > 0 && y < boardWidth) {
        return PS.data(x, y) === END;
    } else {
        return false;
    }
}

function isCheckpointHere(x, y) {
    return PS.data(x, y) === CHECKPOINT;
}

function levelUp() {
    level++;
    finalize();
}

function restart() {
    currentX = 1;
    currentY = 1;
    finalize();
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
    resetBead(PS.ALL, PS.ALL);
    PS.fade(PS.ALL, PS.ALL, 60);
    PS.color(PS.ALL, PS.ALL, 175, 175, 175);
    PS.audioPlay("l_piano_c5")

    // sends data point
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "gameover", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
        db = null;
    }
}

function resetBead(x, y) {
    PS.color(x, y, 175, 175, 175);
    PS.scale(x, y, 100);
    PS.border(x, y, 0);
    PS.borderColor(x, y, 175, 175, 175);
    PS.data(x, y, 0);
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
        if(isEndHere(currentX, currentY + 1)) {
            if(level === 1 && checkpointCount !== checkpointsInLevel1) {
                move(currentX, currentY);
            } else if(level === 1 && checkpointCount === checkpointsInLevel1) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
            if(level === 2 && checkpointCount !== checkpointsInLevel2) {
                move(currentX, currentY);
            } else if(level === 2 && checkpointCount === checkpointsInLevel2) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
            if(level === 3 && checkpointCount !== checkpointsInLevel3) {
                move(currentX, currentY);
            } else if(level === 3 && checkpointCount === checkpointsInLevel3) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
            if(level === 4 && checkpointCount !== checkpointsInLevel4) {
                move(currentX, currentY);
            } else if(level === 4  && checkpointCount === checkpointsInLevel4) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
            if(level === 5 && checkpointCount !== checkpointsInLevel5) {
                move(currentX, currentY);
            } else if(level === 5  && checkpointCount === checkpointsInLevel5) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
            if(level === 6 && checkpointCount !== checkpointsInLevel6) {
                move(currentX, currentY);
            } else if(level === 6  && checkpointCount === checkpointsInLevel6) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY + 1);
            }
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX, currentY + 1);
        }
    }
    else if (key === PS.KEY_ARROW_UP) {
        if(isEndHere(currentX, currentY - 1)) {
            if(level === 1 && checkpointCount !== checkpointsInLevel1) {
                move(currentX, currentY);
            } else if(level === 1 && checkpointCount === checkpointsInLevel1) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
            if(level === 2 && checkpointCount !== checkpointsInLevel2) {
                move(currentX, currentY);
            } else if(level === 2 && checkpointCount === checkpointsInLevel2) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
            if(level === 3 && checkpointCount !== checkpointsInLevel3) {
                move(currentX, currentY);
            } else if(level === 3 && checkpointCount === checkpointsInLevel3) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
            if(level === 4 && checkpointCount !== checkpointsInLevel4) {
                move(currentX, currentY);
            } else if(level === 4  && checkpointCount === checkpointsInLevel4) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
            if(level === 5 && checkpointCount !== checkpointsInLevel5) {
                move(currentX, currentY);
            } else if(level === 5  && checkpointCount === checkpointsInLevel5) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
            if(level === 6 && checkpointCount !== checkpointsInLevel6) {
                move(currentX, currentY);
            } else if(level === 6  && checkpointCount === checkpointsInLevel6) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX, currentY - 1);
            }
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX, currentY - 1);
        }
    }
    else if (key === PS.KEY_ARROW_LEFT) {
        if(isEndHere(currentX - 1, currentY)) {
            if(level === 1 && checkpointCount !== checkpointsInLevel1) {
                move(currentX, currentY);
            } else if(level === 1 && checkpointCount === checkpointsInLevel1) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
            if(level === 2 && checkpointCount !== checkpointsInLevel2) {
                move(currentX, currentY);
            } else if(level === 2 && checkpointCount === checkpointsInLevel2) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
            if(level === 3 && checkpointCount !== checkpointsInLevel3) {
                move(currentX, currentY);
            } else if(level === 3 && checkpointCount === checkpointsInLevel3) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
            if(level === 4 && checkpointCount !== checkpointsInLevel4) {
                move(currentX, currentY);
            } else if(level === 4  && checkpointCount === checkpointsInLevel4) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
            if(level === 5 && checkpointCount !== checkpointsInLevel5) {
                move(currentX, currentY);
            } else if(level === 5  && checkpointCount === checkpointsInLevel5) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
            if(level === 6 && checkpointCount !== checkpointsInLevel6) {
                move(currentX, currentY);
            } else if(level === 6  && checkpointCount === checkpointsInLevel6) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX - 1, currentY);
            }
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX - 1, currentY);
        }
    }
    else if (key === PS.KEY_ARROW_RIGHT) {
        if(isEndHere(currentX + 1, currentY)) {
            if(level === 1 && checkpointCount !== checkpointsInLevel1) {
                move(currentX, currentY);
            } else if(level === 1 && checkpointCount === checkpointsInLevel1) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
            if(level === 2 && checkpointCount !== checkpointsInLevel2) {
                move(currentX, currentY);
            } else if(level === 2 && checkpointCount === checkpointsInLevel2) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
            if(level === 3 && checkpointCount !== checkpointsInLevel3) {
                move(currentX, currentY);
            } else if(level === 3 && checkpointCount === checkpointsInLevel3) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
            if(level === 4 && checkpointCount !== checkpointsInLevel4) {
                move(currentX, currentY);
            } else if(level === 4  && checkpointCount === checkpointsInLevel4) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
            if(level === 5 && checkpointCount !== checkpointsInLevel5) {
                move(currentX, currentY);
            } else if(level === 5  && checkpointCount === checkpointsInLevel5) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
            if(level === 6 && checkpointCount !== checkpointsInLevel6) {
                move(currentX, currentY);
            } else if(level === 6  && checkpointCount === checkpointsInLevel6) {
                PS.color(currentX, currentY, 175, 175, 175);
                move(currentX + 1, currentY);
            }
        } else {
            PS.color(currentX, currentY, 175, 175, 175);
            move(currentX + 1, currentY);
        }
    }
};

// sends data if window is closed before game ends
PS.shutdown = function (options) {
    if (db && PS.dbValid(db)) {
        PS.dbEvent(db, "shutdown", true);
        PS.dbSend(db, "bmoriarty", {discard: true});
    }
};
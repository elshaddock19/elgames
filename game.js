// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var version = 1;
var maxLevel = 5;


// Various possible states of the beads
var END_BEAD = 2;
var ENTERED = 1;
var NOT_ENTERED = 0;


function loseStuff()
{
    PS.init();
    PS.audioPlay("fx_hoot");
}

function winStuff()
{
    PS.data(PS.ALL, PS.ALL, 1);     // sets data to 1 so mouse does not change bead colors
    PS.color(PS.ALL, PS.ALL, PS.COLOR_RED);
    PS.statusText("You solved all the puzzles!");
    PS.audioPlay("fx_tada");
}

PS.init = function( system, options ) {
	"use strict";

    mouseDown = false;

	if(version < 5)     // 5x5 grid size for levels 1-4
    {
        PS.gridSize(5,5);
    }
    if(version >= 5)    // for more levels with larger grids
    {
        PS.gridSize(7,7);
    }

	PS.gridColor(255, 225, 225);
    PS.color(PS.ALL, PS.ALL, 255, 255, 255);
	PS.statusColor( PS.COLOR_BLACK );
	PS.border( PS.ALL, PS.ALL, 0 );     // no border

    PS.data(PS.ALL, PS.ALL, 0);         // resets each bead to zero for new levels

    PS.color(0,4,PS.COLOR_RED);
    PS.data(0,4, ENTERED);

    PS.color(1, 0, PS.COLOR_RED);
    PS.data(1,0, ENTERED);

    PS.color(2,0,PS.COLOR_RED);
    PS.data(2,0, ENTERED);

    PS.color(3, 0, PS.COLOR_RED);
    PS.data(3,0, ENTERED);

    PS.color(2,3,PS.COLOR_RED);
    PS.data(2,3, ENTERED);

    PS.color(4, 0, PS.COLOR_RED);
    PS.data(4,0, ENTERED);

    if (version === 1)
    {
        PS.color(2, 2, PS.COLOR_BLACK);
        PS.glyph(0, 0,  "Start");
        PS.glyph(2, 2, "END");
        PS.data(2,2, END_BEAD);
        PS.glyphColor(2, 2, PS.COLOR_WHITE);

    }
    if (version === 2)
    {
        PS.color(4, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyph(4, 4,  "END");
        PS.data(4,4, END_BEAD);
        PS.glyphColor(4, 4, PS.COLOR_WHITE);
    }
    if (version === 3)
    {
        PS.color(2, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(2, 4, PS.COLOR_WHITE);
        PS.glyph(2, 4,  "END");
        PS.data(2,4, END_BEAD);
    }
    if (version === 4)
    {
        PS.color(3, 1, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(3, 1, PS.COLOR_WHITE);
        PS.glyph(3, 1,  "END");
        PS.data(3,1, END_BEAD);
    }

    if(version ===1)
    {
        PS.statusText( "Drag to fill the Grid! Level " + version);
    }
    else if(version === 2)
    {
        PS.statusText("Or use arrow keys! Level " + version);
    }
    else if(version === 3)
    {
        PS.statusText("You got the hang of it. Level " + version)
    }
    else if(version > 3 && version < maxLevel)
    {
        PS.statusText("Level " + version);
    }

    if(version === maxLevel)
    {
        winStuff();
    }
};

PS.touch = function( x, y, data, options ) {
	"use strict";
	if(x === 0 && y === 0)
    {
        mouseDown = true;

        PS.color(x, y, PS.COLOR_RED);
        PS.data(x, y, ENTERED);       // flags bead as being traversed
    }
};

PS.release = function( x, y, data, options ) {
	"use strict";
	mouseDown = false;

    var count = 0;
	for(var xNum = 0 ; xNum < 5 ; xNum++)
	{
	    for(var yNum = 0 ; yNum < 5 ; yNum++)
	    {
            if (PS.data(xNum, yNum) !== ENTERED)      // if not all beads are entered (set to 1), increase count
            {
                count++;
            }
        }
    }
    if(count > 0)       // lose if not all beads are entered/red
    {
	    loseStuff();
    } else {            // move on to next level
	    if(version < 5)
        {
            version++;
        }
	    PS.init();
    }
};

PS.enter = function( x, y, data, options ) {
	"use strict";

    if(mouseDown === false && PS.data(x,y) === NOT_ENTERED)           // turns bead gray when hovering over
    {
        PS.color(x, y, 225, 225, 225);
    }
    else if (mouseDown === true && PS.data(x,y) !== ENTERED)      // enables dragging
    {
        PS.color(x, y, PS.COLOR_RED);
        PS.data(x, y, ENTERED);
        PS.audioPlay("fx_pop");
    }
    else if (mouseDown === true && PS.data(x,y) === ENTERED)      // lose if player tries to go back over a bead
    {
        loseStuff();
    }

    // console.log("Hello there"); // for debugging
};

PS.exit = function( x, y, data, options ) {
    "use strict";

    if(mouseDown === false && PS.data(x,y) === NOT_ENTERED) // removes gray from previous bead
    {
        PS.color(x, y, 255, 255, 255);
    }
};

PS.exitGrid = function( options ) {
	"use strict";
	if(mouseDown === true)      // lose if mouse leaves grid while dragging
	{
	    loseStuff();
    }
};

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

};

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

};

PS.swipe = function( data, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters

	/*
	 var len, i, ev;
	 PS.debugClear();
	 PS.debug( "PS.swipe(): start = " + data.start + ", end = " + data.end + ", dur = " + data.duration + "\n" );
	 len = data.events.length;
	 for ( i = 0; i < len; i += 1 ) {
	 ev = data.events[ i ];
	 PS.debug( i + ": [x = " + ev.x + ", y = " + ev.y + ", start = " + ev.start + ", end = " + ev.end +
	 ", dur = " + ev.duration + "]\n");
	 }
	 */

	// Add code here for when an input event is detected
};

PS.input = function( sensors, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};


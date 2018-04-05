// ELGames
// Puzzle
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var version = 1;

function loseStuff()
{
    PS.statusText("You Lose, Please Refresh Page");
    PS.audioPlay("fx_uhoh");
    PS.color(PS.ALL, PS.ALL, 150, 150, 255);
}

function winStuff()
{
    PS.statusText("You Win!");
    PS.audioPlay("fx_tada");
}

PS.init = function( system, options ) {
	"use strict";

    mouseDown = false;

    var r, g, b, r2, g2, b2;

	r = PS.random(256)-1;
	g = PS.random(256)-1;
	b = PS.random(256)-1;

    r2 = PS.random(256)-1;
    g2 = PS.random(256)-1;
    b2 = PS.random(256)-1;

	PS.gridSize( 5, 5 );
	PS.gridColor(255, 225, 225);
    PS.color(PS.ALL, PS.ALL, 255, 255, 255);
	PS.statusColor( PS.COLOR_BLACK );
	PS.border( PS.ALL, PS.ALL, 0 ); // no border

    PS.data(PS.ALL, PS.ALL, 0); // resets each bead to zero for new levels

    PS.color(0,4,PS.COLOR_RED);
    PS.data(0,4,1);

    PS.color(1, 0, PS.COLOR_RED);
    PS.data(1,0,1);

    PS.color(2,0,PS.COLOR_RED);
    PS.data(2,0,1);

    PS.color(3, 0, PS.COLOR_RED);
    PS.data(3,0,1);

    PS.color(2,3,PS.COLOR_RED);
    PS.data(2,3,1);

    PS.color(4, 0, PS.COLOR_RED);
    PS.data(4,0,1);

    //var version = PS.random(4);
    if (version === 1)
    {
        PS.color(2, 2, PS.COLOR_BLACK);
        PS.glyph(0, 0,  "Start");
        PS.glyph(2, 2, "END");
        //PS.data(2,3,1);
        PS.glyphColor(2, 2, PS.COLOR_WHITE);

    }
    if (version === 2)
    {
        PS.color(4, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyph(4, 4,  "END");
        PS.data(4,4,"e");
        PS.glyphColor(4, 4, PS.COLOR_WHITE);
    }
    if (version === 3)
    {
        PS.color(2, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(2, 4, PS.COLOR_WHITE);
        PS.glyph(2, 4,  "END");
        PS.data(2,4,"e");
    }
    if (version === 4)
    {
        PS.color(3, 1, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(3, 1, PS.COLOR_WHITE);
        PS.glyph(3, 1,  "END");
        PS.data(3,1,"e");
    }
    if(version === 5)
    {
        winStuff();
    }

    PS.statusText( "Drag to fill the Grid! v" + version);

};

PS.touch = function( x, y, data, options ) {
	"use strict";
	if(x === 0 && y === 0)
    {
        mouseDown = true;

        PS.color(x, y, PS.COLOR_RED);
        PS.data(x, y, 1); // the 1 indicates that we've been to this bead

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
            if (PS.data(xNum, yNum) !== 1)
            {
                count++;
            }
        }
    }
    if(count > 0)
    {
	    loseStuff();
    } else {
	    if(version < 5)
        {
            version++;
        }
	    PS.init();
    }

    // cannot end game when player finishes all levels ***
};

PS.enter = function( x, y, data, options ) {
	"use strict";
	//var next;
    if(mouseDown === false && PS.data(x,y) === 0) // turns bead gray when hovering over
    {
        PS.color(x, y, 225, 225, 225);
    }
    else if (mouseDown === true && PS.data(x,y) !== 1) // enables dragging
    {
        PS.color(x, y, PS.COLOR_RED);
        PS.data(x, y, 1);
    }
    else if (mouseDown === true && PS.data(x,y) === 1)
    {
        loseStuff();
    }

    // PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );
    // console.log("Hello there"); // for debugging

};

PS.exit = function( x, y, data, options ) {
    "use strict";

    if(mouseDown === false && PS.data(x,y) === 0) // removes gray from previous bead
    {
        PS.color(x, y, 255, 255, 255);
    }
};

PS.exitGrid = function( options ) {
	"use strict";
	if(mouseDown === true)
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


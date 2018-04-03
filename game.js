// ELGames
// Assignment 6: Make a Toy
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;
var rgbTriplet_red = (255 * 65536) + (0 * 256) + 0;
var rgbTriplet_white = (255 * 65536) + (255 * 256) + 255;
var rgbTriplet_gray = (225 * 65536) + (225 * 256) + 225;

PS.init = function( system, options ) {
	"use strict";

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
	PS.statusText( "Drag to fill the Grid!" );
	PS.border( PS.ALL, PS.ALL, 0 ); // no border
    PS.color(0,4,PS.COLOR_RED);
    PS.color(1, 0, PS.COLOR_RED);
    PS.color(2,0,PS.COLOR_RED);
    PS.color(3, 0, PS.COLOR_RED);
    PS.color(2,3,PS.COLOR_RED);

    PS.color(4, 0, PS.COLOR_RED);

    //PS.color(0,2,PS.COLOR_RED);

    var version = PS.random(4);

    if (version == 1)
    {
        PS.color(2, 2, PS.COLOR_BLACK);
        PS.glyph(0, 0,  "Start");
        PS.glyph(2, 2, "END");
        PS.glyphColor(2, 2, PS.COLOR_WHITE);


    }
    if (version == 2)
    {
        PS.color(4, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyph(4, 4,  "END");
        PS.glyphColor(4, 4, PS.COLOR_WHITE);
    }
    if (version == 3)
    {
        PS.color(2, 4, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(2, 4, PS.COLOR_WHITE);
        PS.glyph(2, 4,  "END");
    }
    if (version == 4)
    {
        PS.color(3, 1, PS.COLOR_BLACK);
        PS.glyph(0, 0, "Start");
        PS.glyphColor(3, 1, PS.COLOR_WHITE);
        PS.glyph(3, 1,  "END");
    }
};

PS.touch = function( x, y, data, options ) {
	"use strict";
    mouseDown = true;

    if(PS.color(x,y) == rgbTriplet_white) // if white, turn red
    {
        PS.color(x, y, PS.COLOR_RED);
    }
    else if(PS.color(x,y) == rgbTriplet_red) // if red, turn gray <- DOES NOT WORK
    {
        PS.color(x, y, PS.color(x, y, 225, 225, 225));
    }
    else if(PS.color(x,y) == rgbTriplet_gray) // if gray, turn red
    {
        PS.color(x, y, PS.COLOR_RED);
    }
};


PS.release = function( x, y, data, options ) {
	"use strict";
	mouseDown = false;
	if(mouseDown == false && PS.color(PS.ALL, PS.ALL) !== PS.COLOR_RED){
	    PS.statusText("You Lose, Please Refresh Page");
        PS.audioPlay("fx_uhoh");
        PS.color(PS.ALL, PS.ALL, 150, 150, 255);
    }

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );
};

PS.enter = function( x, y, data, options ) {
	"use strict";
	//var next;
    if(mouseDown == false && PS.color(x,y) == rgbTriplet_white) // turns bead gray when hovering over
    {
        PS.color(x, y, 225, 225, 225);
    }
    else if (mouseDown == true && PS.color(x,y) == rgbTriplet_white) // enables dragging
    {
        PS.color(x, y, PS.COLOR_RED);
    }
    else if (mouseDown == true && PS.color(x,y) == rgbTriplet_red)
    {
        //PS.color(x, y, PS.COLOR_WHITE);
        PS.statusText("You Lose, Please Refresh Page");
        PS.audioPlay("fx_uhoh");
        PS.color(PS.ALL, PS.ALL, 150, 150, 255);

    }
    else if (mouseDown == true && PS.color(x,y) == rgbTriplet_red) // dragging to remove red
    {
        PS.statusText("You Lose, Please Refresh Page");
        PS.audioPlay("fx_uhoh");
        PS.color(PS.ALL, PS.ALL, 150, 150, 255);
    }
    else if(mouseDown == true && PS.color(PS.ALL, PS.ALL) == rgbTriplet_red){
            PS.statusText("You Win!");
            PS.audioPlay("fx_tada");
    }
    else if(mouseDown == true && PS.color(PS.ALL,PS.ALL) !== rgbTriplet_red )
    {
        PS.statusText("You Lose, Please Refresh Page");
        PS.audioPlay("fx_uhoh");
        PS.color(PS.ALL, PS.ALL, 150, 150, 255);
    }
       // PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

};

PS.exit = function( x, y, data, options ) {
    "use strict";

    if(mouseDown == false && PS.color(x,y) == rgbTriplet_gray) // removes gray from previous bead
    {
        PS.color(x, y, 255, 255, 255);
    }
    else if(mouseDown == false && PS.color(x,y) == rgbTriplet_red) // keeps red beads
    {
        PS.color(x, y, PS.COLOR_RED);
    }
    else if(mouseDown == true && PS.color(x,y) == rgbTriplet_red) // dragging to remove red
    {
        PS.color(x, y, PS.COLOR_RED);
    }
    else if(mouseDown == true && PS.color(x,y) == rgbTriplet_gray) // changes first tile back to white
    {
        PS.color(x, y, PS.COLOR_WHITE);
    }

    //PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

};

PS.exitGrid = function( options ) {
	"use strict";

	// PS.debug( "PS.exitGrid() called\n" )

};

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";


	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

};

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

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


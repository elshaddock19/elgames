// ELGames
// Assignment 6: Make a Toy
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

var mouseDown = false;

PS.init = function( system, options ) {
	"use strict";

	var r, g, b, r2, g2, b2;

	r = PS.random(128)-1;
	g = PS.random(128)-1;
	b = PS.random(128)-1;

    r2 = PS.random(256)-1;
    g2 = PS.random(256)-1;
    b2 = PS.random(256)-1;

	PS.gridSize( 5, 5 );
	
	//PS.gridColor(r, g, b); // Random Background Theme
    PS.gridColor(r, g, b);
    PS.color(PS.ALL, PS.ALL, 256, 256, 256);
	PS.statusColor( PS.COLOR_BLACK );
	PS.statusText( "Puzzle" );

    PS.border( PS.ALL, PS.ALL, 0 ); // no border

};

PS.touch = function( x, y, data, options ) {
	"use strict";

    PS.color(x, y, PS.COLOR_RED);

    mouseDown = true;

    /*
    PS.color( x, y, data ); // set color and text
    if ( data === PS.color(x, y, 150, 170, 100)) {
        next = PS.color(x, y, 75, 170, 156);
    } else {
        next = PS.color(x, y, 150, 170, 100);
    }
    PS.data( x, y, next ); // remember color and text
    */
};


PS.release = function( x, y, data, options ) {
	"use strict";

	mouseDown = false;

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

};

PS.enter = function( x, y, data, options ) {
	"use strict";
	//var next;
    if(mouseDown == false) {
        PS.color(x, y, 225, 225, 225);
    } else{
        PS.color(x, y, PS.COLOR_RED);
    }
        //PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

};

PS.exit = function( x, y, data, options ) {
    "use strict";
    if(mouseDown == false) {
        PS.color(x, y, PS.COLOR_WHITE); // YELLOW THEME
    }
    //if(mouseDown == false && PS.color() == PS.makeRGB(255, 20, 20){
    //    PS.color(x, y, PS.COLOR_RED);
    //}
    else {
        PS.color(x, y, PS.COLOR_RED);
    }
    // PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

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


// ELGames
// Assignment 6: Make a Toy
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */

PS.init = function( system, options ) {
	"use strict";

	PS.gridSize( 8, 8 );
	
	PS.gridColor( 100, 200, 175 ); // GREEN THEME
    PS.gridColor(210, 160, 25); // YELLOW THEME

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "" );

	PS.audioLoad( "fx_click", { lock: true } ); // load & lock click sound

    PS.radius(PS.ALL, PS.ALL, 25 ); // set radius to 25 for all beads

    PS.border( PS.ALL, PS.ALL, 0 ); // no borders

    PS.scale(PS.ALL, PS.ALL, 80); // 80% scale

    PS.color(PS.ALL, PS.ALL, 50, 175, 75); // GREEN THEME
    // PS.color(2, 3, 25, 150, 50); // pressed button example
    PS.color(PS.ALL, PS.ALL, 190, 140, 15); // YELLOW THEME
    PS.color(4, 2, 160, 125, 20); // pressed button example


};

PS.touch = function( x, y, data, options ) {
	"use strict";
	var next;

    PS.color(x, y, 25, 150, 50); // GREEN THEME
    PS.color(x, y, 160, 125, 20); // YELLOW THEME

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

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );
    PS.color(x, y, 50, 175, 75); // GREEN THEME
    PS.color(x, y, 190, 140, 15); // YELLOW THEME

};

PS.enter = function( x, y, data, options ) {
	"use strict";
	var next;

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

};

PS.exit = function( x, y, data, options ) {
	"use strict";

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

    PS.gridShadow(false, PS.COLOR_WHITE);
    //PS.color(x, y, 50, 175, 75); // GREEN THEME
    PS.gridColor(210, 160, 25); // YELLOW THEME

};

PS.exitGrid = function( options ) {
	"use strict";

	// PS.debug( "PS.exitGrid() called\n" );

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


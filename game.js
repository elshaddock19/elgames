// ELGames
// Assignment 6: Make a Toy
// game.js for Perlenspiel 3.2

/*jslint nomen: true, white: true */
/*global PS */



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
	
	PS.gridColor(r, g, b); // Random Background Theme


	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Mix and Match Soundboard" );

    PS.radius(PS.ALL, PS.ALL, 50); // set radius to 25 for all beads

    PS.border( PS.ALL, PS.ALL, 0 ); // no borders

    PS.scale(PS.ALL, PS.ALL, 80); // 80% scale

    //PS.color(PS.ALL, PS.ALL, 50, 175, 75); // GREEN THEME
    // PS.color(2, 3, 25, 150, 50); // pressed button example
    //PS.color(PS.ALL, PS.ALL, 190, 140, 15); // YELLOW THEME
    //PS.color(4, 2, 160, 125, 20); // pressed button example

    // Individual button positions for coloring fun
    PS.color(0, 0, r2, g2, b2);
    PS.color(1, 0, r2, g2, b2);
    PS.color(2, 0, r2, g2, b2);
    PS.color(3, 0, r2, g2, b2);
    PS.color(4, 0, r2, g2, b2);
    PS.color(0, 1, r2, g2, b2);
    PS.color(1, 1, r2, g2, b2);
    PS.color(2, 1, r2, g2, b2);
    PS.color(3, 1, r2, g2, b2);
    PS.color(4, 1, r2, g2, b2);
    PS.color(0, 2, r2, g2, b2);
    PS.color(1, 2, r2, g2, b2);
    PS.color(2, 2, r2, g2, b2);
    PS.color(3, 2, r2, g2, b2);
    PS.color(4, 2, r2, g2, b2);
    PS.color(0, 3, r2, g2, b2);
    PS.color(1, 3, r2, g2, b2);
    PS.color(2, 3, r2, g2, b2);
    PS.color(3, 3, r2, g2, b2);
    PS.color(4, 3, r2, g2, b2);
    PS.color(0, 4, r2, g2, b2);
    PS.color(1, 4, r2, g2, b2);
    PS.color(2, 4, r2, g2, b2);
    PS.color(3, 4, r2, g2, b2);
    PS.color(4, 4, r2, g2, b2);






};

PS.touch = function( x, y, data, options ) {
	"use strict";

    // load & lock click sound

    //PS.color(x, y, 25, 150, 50); // GREEN THEME
    PS.color(x, y, 160, 125, 20); // YELLOW THEME
    PS.scale(x, y, 50);

    if(x == 0 && y == 0){
        PS.audioPlay("fx_click");
    }
    else if(x == 1 && y == 0){
        PS.audioPlay("fx_tick");
    }
    else if(x == 2 && y == 0){
        PS.audioPlay("fx_bang");
    }
    else if(x == 3 && y == 0){
        PS.audioPlay("fx_blip");
    }
    else if(x == 4 && y == 0){
        PS.audioPlay("fx_bloop");
    }
    else if(x == 0 && y == 1){
        PS.audioPlay("fx_boop");
    }
    else if(x == 1 && y == 1){
        PS.audioPlay("fx_beep");
    }
    else if(x == 2 && y == 1){
        PS.audioPlay("fx_pop");
    }
    else if(x == 3 && y == 1){
        PS.audioPlay("fx_chirp1");
    }
    else if(x == 4 && y == 1){
        PS.audioPlay("fx_chirp2");
    }
    else if(x == 0 && y == 2){
        PS.audioPlay("fx_bloink");
    }
    else if(x == 1 && y == 2){
        PS.audioPlay("fx_rip");
    }
    else if(x == 2 && y == 2){
        PS.audioPlay("fx_scratch");
    }
    else if(x == 3 && y == 2){
        PS.audioPlay("fx_squink");
    }
    else if(x == 4 && y == 2){
        PS.audioPlay("fx_squirp");
    }
    else if(x == 0 && y == 3){
        PS.audioPlay("fx_squish");
    }
    else if(x == 1 && y == 3){
        PS.audioPlay("fx_tweet");
    }
    else if(x == 2 && y == 3){
        PS.audioPlay("fx_zurp");
    }
    else if(x == 3 && y == 3){
        PS.audioPlay("fx_ding");
    }
    else if(x == 4 && y == 3){
        PS.audioPlay("fx_swoosh");
    }
    else if(x == 0 && y == 4){
        PS.audioPlay("fx_bucket");
    }
    else if(x == 1 && y == 4){
        PS.audioPlay("fx_drip1");
    }
    else if(x == 2 && y == 4){
        PS.audioPlay("fx_drip2");
    }
    else if(x == 3 && y == 4){
        PS.audioPlay("fx_squawk");
    }
    else if(x == 4 && y == 4){
        PS.audioPlay("fx_hoot");
    }
    else{
        PS.audioPlay("fx_whistle");
    }






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
    //PS.color(x, y, 50, 175, 75); // GREEN THEME
    PS.color(x, y, 190, 140, 15); // YELLOW THEME
    PS.scale(x, y, 80);




};

PS.enter = function( x, y, data, options ) {
	"use strict";
	//var next;

    if(x == 0 && y == 0){
        PS.statusText("click!");
    }
    else if(x == 1 && y == 0){
        PS.statusText("tick!");
    }
    else if(x == 2 && y == 0){
        PS.statusText("bang!");
    }
    else if(x == 3 && y == 0){
        PS.statusText("blip!");
    }
    else if(x == 4 && y == 0){
        PS.statusText("bloop!");
    }
    else if(x == 0 && y == 1){
        PS.statusText("boop!");
    }
    else if(x == 1 && y == 1){
        PS.statusText("beep!");
    }
    else if(x == 2 && y == 1){
        PS.statusText("pop!");
    }
    else if(x == 3 && y == 1){
        PS.statusText("chirp 1");
    }
    else if(x == 4 && y == 1){
        PS.statusText("chirp 2: electric bugaloo");
    }
    else if(x == 0 && y == 2){
        PS.statusText("bloink!");
    }
    else if(x == 1 && y == 2){
        PS.statusText("rip!");
    }
    else if(x == 2 && y == 2){
        PS.statusText("scratch!");
    }
    else if(x == 3 && y == 2){
        PS.statusText("squink!");
    }
    else if(x == 4 && y == 2){
        PS.statusText("squirp!");
    }
    else if(x == 0 && y == 3){
        PS.statusText("squish!");
    }
    else if(x == 1 && y == 3){
        PS.statusText("tweet!");
    }
    else if(x == 2 && y == 3){
        PS.statusText("zurp!");
    }
    else if(x == 3 && y == 3){
        PS.statusText("ding!");
    }
    else if(x == 4 && y == 3){
        PS.statusText("swoosh!");
    }
    else if(x == 0 && y == 4){
        PS.statusText("bucket!");
    }
    else if(x == 1 && y == 4){
        PS.statusText("drip 1");
    }
    else if(x == 2 && y == 4){
        PS.statusText("drip 2: the reckoning");
    }
    else if(x == 3 && y == 4){
        PS.statusText("squawk!");
    }
    else if(x == 4 && y == 4){
        PS.statusText("hoot!");
    }
    else{
        PS.statusText("whistle!");
    }

    //PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

};

PS.exit = function( x, y, data, options ) {
	"use strict";

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );
    //PS.color(x, y, 50, 175, 75); // GREEN THEME

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


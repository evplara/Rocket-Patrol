//Evan Lara
//Rocket Patrol Deluxe Edition 
//15 hours
//Implemented Background Music (1 Point), Toggle for Control for Rocket After it is Fired (1 Point),
//  A on screen timer (3 Points), 
// Time Mechanic that adds and subtracts time for hits and misses (5 Points,) Mouse Control Movement Option (5 points), and Particle Explosion when Ships are hit (5 Points)
//I \ used Phaser Documentation and Phaser Example Projects https://phaser.io/examples/v3.85.0 as well as  GitHub User rexrainbow Phaser Notes which I found through a Google Search https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ 
let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyDOWN, keyUP, keyT


//UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
	  super(scene, x, y, texture, frame)
  
	  // add object to existing scene
	  scene.add.existing(this)
	  this.isFiring = false;
	  this.moveSpeed = 2;
	  this.sfxShot = scene.sound.add('sfx-shot');
	  this.scene = scene
	  //define mouse control mode
	  this.mouse = game.settings.mouseMode

	  this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
		this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
		this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
		this.gameOver = true
	}, null, this)
	  //could do this.timer = game.seetings.gameTimer for a mechanic that takes away timer for missing and gives time for hitting
	  //put take away points in the reset on miss if statement
	  //do the same thing in Play.js but inside the rocket collision statements.
	}


	update(){
		
		console.log(this.timer)
		//mouse controls
		const pointer = this.scene.input.activePointer;
		if (this.mouse == true){
		if(!this.isFiring){
			this.x = pointer.worldX 
		}
		if(pointer.isDown && !this.isFiring){

			this.isFiring = true
			this.sfxShot.play()
		}}
		if(!this.isFiring) {
			if (keyLEFT.isDown && this.x >= borderUISize + this.width ){
				this.x -= this.moveSpeed
			} else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize- this.width) {
				this.x += this.moveSpeed
			}
		}
		//keyboard controls
		  //fire button
		  if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
			this.isFiring = true
			this.sfxShot.play()
		  }
		//if fired, move up
		if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
			this.y -= this.moveSpeed
		}

		//reset on miss
		if (this.y <= borderUISize * 3 + borderPadding){
			this.isFiring = false
			this.y = game.config.height - borderUISize - borderPadding
	 
		}
	}


	reset(){
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;
	}
  }
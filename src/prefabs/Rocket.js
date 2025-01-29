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
	  this.rocketMove = game.settings.allowRocketMove
	  console.log(this.rocketMove)
	}


	update(){
		// console.log(this.rocketMove)
		//mouse controls
		const pointer = this.scene.input.activePointer;
		if (this.mouse){
			if(!this.isFiring){
				this.x = pointer.worldX 
			}
			if(pointer.isDown && !this.isFiring){
				this.isFiring = true
				this.sfxShot.play()
			}
			if (this.rocketMove && this.isFiring) {
				this.x = pointer.worldX
		}
		
		}
		if (this.rocketMove && this.isFiring) {
			if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
				this.x -= this.moveSpeed;
			} else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
				this.x += this.moveSpeed;
			}
		}
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
			this.scene.adjustTimer(-10000)

	 
		}
	}


	reset(){
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;

	}
  }
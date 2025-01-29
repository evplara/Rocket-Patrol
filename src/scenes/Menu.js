class Menu extends Phaser.Scene {
	constructor(){
		super("menuScene");
	}
	preload() {
		//load audio
		this.load.audio('sfx-select', './assets/sfx-select.wav')
		this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
		this.load.audio('sfx-shot', './assets/sfx-shot.wav')
		this.load.audio('bckgrd', './assets/tubebackr & Tetuano - Spark.mp3')// Audio credits Music track: Spark by tubebackr & Tetuano Source: https://freetouse.com/music Royalty Free Background Music
		//load images/tile sprites
		this.load.image('rocket', './assets/rocket.png')
		this.load.image('spaceship', './assets/spaceship.png')
		this.load.image('starfield', './assets/starfield.png')
		this.load.image('spark', './assets/spark.png') //Created By myself

		// load spritesheet
		this.load.spritesheet('explosion', './assets/explosion.png', {
			frameWidth: 64,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 9
		})
	  }
	create(){
		// animation configuration
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
			frameRate: 30
		})
		let menuConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
			top: 5,
			bottom: 5,
			},
			fixedWidth: 0
		}
		this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5,2)
		this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5, 1.5)
		menuConfig.backgroundColor = '#00FF00'
		menuConfig.color = '#000'
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert\n Press ↓ (Novice) or ↑(Expert)\n with  mouse controls', menuConfig).setOrigin(0.5)
		// this.add.text(20, 20, "Rocket Patrol Menu");
		// this.scene.start("playScene")

		//define keys
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
		keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);	
		
		this.rocketMoveAfterFired = false; 
		//display toggle option
		this.toggleText = this.add.text(game.config.width / 2, game.config.height / 2 + 100,
			`Rocket Moves After Fire: ${this.rocketMoveAfterFired}`,
			{ fontFamily: 'Courier', fontSize: '24px', color: '#FFF' }
		).setOrigin(0.5);
		
	}
	update() {
		if (Phaser.Input.Keyboard.JustDown(keyT)) {
			this.rocketMoveAfterFired = !this.rocketMoveAfterFired;
			this.toggleText.setText(`Rocket Moves After Fire: ${this.rocketMoveAfterFired}`);
	}

		
		//mouse control modes
		if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
			game.settings = {
				mouseMode: true,
				spaceshipSpeed: 3,
				gameTimer:60000,
				allowRocketMove: this.rocketMoveAfterFired
			}
			this.sound.play('sfx-select')
			this.scene.start('playScene')
		}
		if (Phaser.Input.Keyboard.JustDown(keyUP)){
			game.settings = {
				mouseMode: true,
				spaceshipSpeed: 4,
				gameTimer:45000,
				allowRocketMove: this.rocketMoveAfterFired
			}
			this.sound.play('sfx-select')
			this.scene.start('playScene')
		}

		//keyboard controls modes
		if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
		  // easy mode
		  game.settings = {
			spaceshipSpeed: 3,
			gameTimer: 60000, 
            allowRocketMove: this.rocketMoveAfterFired
		}
		  this.sound.play('sfx-select')
		  this.scene.start('playScene')    
		}
		if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
		  // hard mode
		  game.settings = {
			spaceshipSpeed: 4,
			gameTimer: 5000,
            allowRocketMove: this.rocketMoveAfterFired
		}
		  this.sound.play('sfx-select')
		  this.scene.start('playScene')    
		}
	  }
}
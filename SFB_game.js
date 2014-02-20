/*
	"Save Flappy Birds" est un jeu créé en février 2014 par Aurélien Picolet pour la Flappy Jam.
	"Save Flappy Birds" is a game created in February 2014 by Aurélien Picolet for the Flappy Jam.
*/

SFB.Game = function (game) {

	this.game = game;
	this.bg = null;
	this.player = null;
	this.birds = null;
	this.currentScore = null;
	this.textCurrentScore = null;
	this.textBestScore = null;
	this.MKey = null;
	this.LKey = null;
	this.soundKey = null;
	this.jump = null;
	this.win = null;
	this.lose = null;
	this.accelerationM = 650;
	this.accelerationL = 400;
	this.velocity = -350;
	
};

SFB.Game.prototype = {
	
	create: function() {
	
		this.game.world.setBounds(0, 0, 320, 480);
		
		this.bg = this.game.add.sprite(0, 0, 'backgroundGame');
		
		this.currentScore = 0;
		this.textCurrentScore = this.game.add.bitmapText(this.game.world.centerX, 100, "" + this.currentScore, {
			font: "48px pixelfont",
			align: "center"
		});
		this.textCurrentScore.anchor.setTo(0.5, 0);
		
		this.textBestScore = this.game.add.bitmapText(this.game.world.centerX, 60, "" + SFB.bestScore, {
			font: "24px pixelfont",
			align: "center"
		});
		this.textBestScore.anchor.setTo(0.5, 0);
		
		this.game.world.setBounds(0, 0, 463, 480);
		this.game.physics.setBounds(-35, 0, 320, 346, true, false, false, true);
		
		this.player = this.game.add.sprite(60, 200, "playerML", 3);
		this.player.body.setRectangle(40, 68, 0, -8);
		this.player.body.collideWorldBounds = true;
		this.player.body.x = 60;
		this.player.body.y = 200;
		this.player.body.acceleration.y = this.accelerationM; // has to be the same as below for M
		
		this.MKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
		this.MKey.onDown.add(this.touchCallback, this);
		this.LKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
		this.LKey.onDown.add(this.touchCallback, this);
		this.game.input.onDown.add(this.touchCallback, this);
		
		this.soundKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
		this.soundKey.onDown.add(this.muteSound, this);
		
		this.birds = this.game.add.group();
		var newBird = this.birds.create(320+17, 316+15, "bird");
		newBird.anchor.setTo(0.5, 0.5);
		var color = Math.floor(Math.random()*3);
		newBird.animations.add("run", [color*2, color*2 + 1], 14, true);
		newBird.animations.play("run");
		newBird.body.velocity.x = - 100;
		newBird.events.onOutOfBounds.add(this.birdOnLeft, this);
		
		this.jump = this.game.add.audio('jump', 0.2);
		this.win = this.game.add.audio('win', 0.2);
		this.lose = this.game.add.audio('collision', 0.2);
		
	
	},
	
	update: function() {
		
		if (this.player.body.onFloor() && (this.player.frame % 2) === 1) {
			this.player.frame -= 1;
		}
		
		this.game.physics.overlap(this.birds, this.player, this.overlapWithPlayer, null, this);
		this.game.time.events.loop(Phaser.Timer.SECOND*2, this.birdGenerator, this);
		
	},
	
	destroyKilled: function(killed) {
	
		killed.destroy();
	
	},
	
	muteSound: function() {
	
		if (this.game.sound.mute) {
			this.game.sound.mute = false;
		} else if(!this.game.sound.mute) {
			this.game.sound.mute = true;;
		}
	
	},
	
	birdGenerator: function() {
	
			// this.birds.forEachDead(this.destroyKilled, this); --> useful ?
			
			var lastBirdIndex = this.birds.length-1;
			var lastBird = this.birds.getAt(lastBirdIndex);
			
			var birdsInARow = Math.floor(Math.random()*3) + 1;
			
			var distance = Math.floor(Math.random()*40) + 60;

			if (lastBird.x + lastBird.width + distance <= 320) {
			
				for(var i=0; i < birdsInARow; i++) {
				
					var newBird = this.birds.create(320+17 + i*36, 316+15, "bird"); // -> 462px amx
					newBird.anchor.setTo(0.5, 0.5);
					var color = Math.floor(Math.random()*3);
					newBird.animations.add("run", [color*2, color*2 + 1], 14, true);
					newBird.animations.play("run");
					newBird.body.velocity.x = - 100;
					newBird.events.onOutOfBounds.add(this.birdOnLeft, this);
				
				}
				
			}

	},
	
	birdOnLeft: function(bird) {
	
		bird.kill();

		this.currentScore++;
		this.win.play();
		if (this.currentScore > SFB.bestScore) {
		
			SFB.bestScore = this.currentScore;
			this.textBestScore.setText("" + SFB.bestScore);
		
		}
		this.textCurrentScore.setText("" + this.currentScore);
		
	},
	
	overlapWithPlayer: function(player, bird) {
	
		this.lose.play();
		this.birds.setAll('body.velocity.x', 0, true);
		this.birds.setAll('animations.currentAnim.paused', true, true);
		var tweenDead = this.game.add.tween(bird)	.to({ angle:"+90", x:"+10"}, 200, Phaser.Easing.Linear.In);
		tweenDead.onComplete.add(this.restartGame);
		tweenDead.start();
	
	},
	
	touchCallback: function(pointer) {
	
		if (this.player.body.onFloor() && (pointer.keyCode === Phaser.Keyboard.Y || pointer.keyCode === Phaser.Keyboard.T || (pointer.x <= 320 && pointer.x >= 0 && pointer.y <= 480 && pointer.y >= 0))) {
			this.player.body.velocity.y = this.velocity;
			this.player.frame += 1;
			this.jump.play();
		}
		
		if ((pointer.keyCode === Phaser.Keyboard.Y || (pointer.x >= this.game.width/2 && pointer.x <= 320 && pointer.y <= 480 && pointer.y >= 0)) && (this.player.frame === 0 || this.player.frame === 1)) {
			this.player.body.acceleration.y = this.accelerationM;
			this.player.frame += 2;
			this.player.body.setRectangle(40, 68, 0, -8);
		}		
		
		if ((pointer.keyCode === Phaser.Keyboard.T || (pointer.x < this.game.width/2 && pointer.x >= 0 && pointer.y <= 480 && pointer.y >= 0)) && (this.player.frame === 2 || this.player.frame === 3)) {
			this.player.body.acceleration.y = this.accelerationL;
			this.player.frame -= 2;
			this.player.body.setRectangle(32, 68, 4, 0);
		}
		
	},
	
	restartGame: function() {
	
		this.game.state.start('game');
	
	}

};
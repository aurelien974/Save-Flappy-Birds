/*
	"Save Flappy Birds" est un jeu créé en février 2014 par Aurélien Picolet pour la Flappy Jam.
	"Save Flappy Birds" is a game created in February 2014 by Aurélien Picolet for the Flappy Jam.
*/

SFB.Pregame = function (game) {

	this.game = game;
	this.bg = null;
	this.player = null;
	this.currentScore = null;
	this.textCurrentScore = null;
	this.textBestScore = null;
	this.tuto = null;
	this.MKey = null;
	this.LKey = null;
	this.soundKey = null;

};

SFB.Pregame.prototype = {
	
	create: function() {
		
		this.game.world.setBounds(0, 0, 320, 480);
		
		this.bg = this.game.add.sprite(0, 0, 'backgroundGame');
		
		this.player = this.game.add.sprite(60, 200, "playerML", 3);
		this.player.body.immovable = true;
		this.player.body.x = 60;
		this.player.body.y = 200;

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
		
		this.tuto = this.game.add.sprite(0, 50, 'tuto');
		var tweenTuto = this.game.add.tween(this.tuto)	.to({ y:'+30'}, 800,  Phaser.Easing.Cubic.Out)
														.to({ y:'-30'}, 800, Phaser.Easing.Cubic.Out)
														.loop()
														.start();
		
		this.MKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
		this.MKey.onDown.add(this.touchCallback, this);
		this.LKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
		this.LKey.onDown.add(this.touchCallback, this);
		this.game.input.onDown.add(this.touchCallback, this);
		this.soundKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
		this.soundKey.onDown.add(this.muteSound, this);
		
	},
	
	muteSound: function() {
	
		if (this.game.sound.mute) {
			this.game.sound.mute = false;
		} else if(!this.game.sound.mute) {
			this.game.sound.mute = true;;
		}
	
	},
	
	touchCallback: function(pointer) {
	
		if (pointer.keyCode === Phaser.Keyboard.Y || pointer.keyCode === Phaser.Keyboard.T || (pointer.x <= 320 && pointer.x >= 0 && pointer.y <= 480 && pointer.y >= 0)) {
			this.game.sound.play('win', 0.2);
			this.game.state.start('game');
		}
	
	}

};
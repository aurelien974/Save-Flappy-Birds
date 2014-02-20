/*
	"Save Flappy Birds" est un jeu créé en février 2014 par Aurélien Picolet pour la Flappy Jam.
	"Save Flappy Birds" is a game created in February 2014 by Aurélien Picolet for the Flappy Jam.
*/

SFB.Menu = function (game) {

	this.game = game;
	this.startButton = null;
	this.soundButton = null;
	this.bg = null;
	this.MKey = null;
	this.LKey = null;
	this.soundKey = null;
	this.music = null;

};

SFB.Menu.prototype = {

	create: function () {
	
		this.game.world.setBounds(0, 0, 320, 480);

		this.bg = this.game.add.sprite(0, 0, 'backgroundMenu');
		
		this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.height-96, 'startButton', this.startGame, this, 1, 0, 0, 0);
		this.startButton.anchor.setTo(0.5, 0.5);
		this.soundButton = this.game.add.button(this.game.world.centerX, this.game.world.height-176, 'soundButton', this.muteSound, this, 0, 0, 0);
		this.soundButton.anchor.setTo(0.5, 0.5);

		this.music = this.game.add.audio('music');
		this.music.play('', 0, 0.8, true);
		
		this.MKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
		this.MKey.onDown.add(this.startGame, this);
		this.LKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
		this.LKey.onDown.add(this.startGame, this);
		this.soundKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
		this.soundKey.onDown.add(this.muteSound, this);
		
	},
	
	muteSound: function() {
	
		this.soundButton.frame = (this.soundButton.frame + 1) % 2;
		this.soundButton.setFrames(this.soundButton.frame, this.soundButton.frame, this.soundButton.frame);

		if (this.game.sound.mute) {
			this.game.sound.mute = false;
		} else if(!this.game.sound.mute) {
			this.game.sound.mute = true;;
		}
	
	},
	
	startGame: function() {
	
		this.game.sound.play('win', 0.2);
		this.game.state.start('pregame');
	
	}
	
};
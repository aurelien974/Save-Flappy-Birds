/*
	"Save Flappy Birds" est un jeu créé en février 2014 par Aurélien Picolet pour la Flappy Jam.
	"Save Flappy Birds" is a game created in February 2014 by Aurélien Picolet for the Flappy Jam.
*/

SFB.Preloader = function (game) {

	this.game = game;
	this.loadingText = null;
	this.loadingBar = null;

};

SFB.Preloader.prototype = {

	preload: function () {
		
		this.game.stage.backgroundColor = '#000000';
		
		this.loadingBar = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY-8, 'loadingBar');
		this.game.load.setPreloadSprite(this.loadingBar);
		
		this.loadingText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-32, "Loading...", {
        font: "20px sans-serif",
        fill: "#ffffff"
		});
		this.loadingText.anchor.setTo(0.5, 0.5);
		var tweenLoading = this.game.add.tween(this.loadingText).to({ y:'-10'}, 800,  Phaser.Easing.Cubic.Out)
																.to({ y:'+10'}, 800, Phaser.Easing.Cubic.Out)
																.loop()
																.start();
		
		
		this.game.load.image('backgroundMenu', 'sfb_background_1.png');
		this.game.load.image('backgroundGame', 'sfb_background_2.png');
		this.game.load.image('tuto', 'sfb_tuto_1.png');
		this.game.load.audio('collision', ['sfb_collision_1.mp3', 'sfb_collision_1.ogg', 'sfb_collision_1.wav']);
		this.game.load.audio('jump', ['sfb_jump_1.mp3', 'sfb_jump_1.ogg', 'sfb_jump_1.wav']);
		this.game.load.audio('win', ['sfb_win_1.mp3', 'sfb_win_1.ogg', 'sfb_win_1.wav']);
		this.game.load.audio('music', ['sfb_music_1.mp3', 'sfb_music_1.ogg', 'sfb_music_1.wav']);
		this.game.load.bitmapFont('pixelfont', 'pixelfont.png', 'pixelfont.fnt');
		this.game.load.spritesheet('startButton', 'sfb_startbutton_1.png', 160, 64);
		this.game.load.spritesheet('soundButton', 'sfb_soundbutton_1.png', 160, 64);
		this.game.load.spritesheet('playerML', 'sfb_player_ml_1.png', 40, 68);
		this.game.load.spritesheet('bird', 'sfb_bird_1.png', 34, 30);
		
	},
	
	loadUpdate: function() {
	
		this.loadingText.setText("Loading : " + this.game.load.progress + "%");
	
	},
	
	create: function () {
	
		this.loadingText.setText("Loading : " + this.game.load.progress + "%");
		this.loadingBar.cropEnabled = false;
		
	},
	
	update: function() {
	
		if (this.cache.isSoundDecoded('music'))
		{
			this.game.state.start('menu');
		}
	
	}
	
};
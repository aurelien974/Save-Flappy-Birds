/*
	"Save Flappy Birds" est un jeu créé en février 2014 par Aurélien Picolet pour la Flappy Jam.
	"Save Flappy Birds" is a game created in February 2014 by Aurélien Picolet for the Flappy Jam.
*/

SFB.Boot = function (game) {
	
	this.game = game;
	
};

SFB.Boot.prototype = {

	preload: function () {
		
		this.game.stage.scale.pageAlignHorizontally = true;
		this.game.stage.scale.pageAlignVertically = true;
		// this.game.stage.scale.maxWidth = 320;	
		// this.game.stage.scale.maxHeight = 480;	
		// this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		this.game.stage.scale.refresh();
		
		this.game.stage.backgroundColor = '#000000';
		this.game.load.image('loadingBar', 'loading_bar_1.png');
		
	},
	
	create : function () {
	
		this.game.state.start('preloader');
		
	}
	
};
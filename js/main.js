/**
 * main.js
 * https://github.com/lekobarros/finder
 * version: 2.0.1
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Alex Vaconcelos
 * https://github.com/lekobarros/
 */
{
	'use strict';

	const configs = {
		imagePatch : "img/",
		playState : {
			init : "isWaiting",
			find : "isFinding",
			match : "isMatched",
			lyrics : "isLyrics"
		},
		icons : {
			microphone 	: "icon-microphone",
			matched 	: "icon-matched"
		},
		gradients : [
			["#08AEEA", "#2AF598"],
			["#21D4FD", "#B721FF"],
			["#FBDA61", "#FF5ACD"],
			["#0093E9", "#80D0C7"],
			["#FF9A8B", "#FF99AC"],
			["#08AEEA", "#2AF598"]
		],
		timeMatch : {
			find : 3000,
			changeIcon : 1000,
			showLyrics : 1500
		},
		artist : [
			{
				"name" : "Madeon",
				"track" : {
					"id" : 1,
					"name" : "Nonsense <span>(Feat. Mark Foster)</span>",
					"album" : "Adventure",
					"image" : "adventure.jpg",
					"lyrics" : [
						"Look, I am here for you",
						"Open up your eyes and don't look away",
						"And I'm dripping down from the fangs",
						"When I hear your name, I feel the pain."
					]
				}
			},
			{
				"name" : "Porter Robinson",
				"track" : {
					"id" : 5,
					"name" : "Fresh Static Snow",
					"album" : "Worlds",
					"image" : "worlds.jpg",
					"lyrics" : [
						"You fit perfectly to me in the loneliness, melt this curse away",
						"Though I'll never know your name I'll cry for you the same",
						"You fit perfectly to me in the loneliness",
						"Melt this curse away"
					]
				}
			},
			{
				"name" : "Foxes",
				"track" : {
					"id" : 9,
					"name" : "Echo",
					"album" : "Glorious Deluxe",
					"image" : "glorius_deluxe.jpg",
					"lyrics" : [
						"I can hear your thoughts",
						"Please don't leave me now",
						"I can't sleep alone",
						"Chasing the light until the dawn"
					]
				}
			},
			{
				"name" : "Galantis",
				"track" : {
					"id" : 2,
					"name" : "Hey Alligator",
					"album" : "The Aviary",
					"image" : "theaviary.jpg",
					"lyrics" : [
						"Hold me tight and pull me under",
						"You let me drown, you let me dream",
						"Well you should know by now my heart is in your teeth."
					]
				}
			}
		]
	}

 	class Track{
 		constructor(el){
			this.DOM = el;
			this.EL = {};
			this.track = {};
			this.init();
		}

		init(){
			this.EL.headTrackImage 		=	this.DOM.querySelector('.track__image > img');
			this.EL.headTrackTitle		= 	this.DOM.querySelector('.track__title > .track__name');
			this.EL.headTrackArtist		=	this.DOM.querySelector('.track__title > .track__artist');
			this.EL.listenTrackName		=	this.DOM.querySelector('.listen__track > .track__name');
			this.EL.listenTrackArtist	=	this.DOM.querySelector('.listen__track > .track__artist');
			this.EL.Lyrics				= 	this.DOM.querySelector('.section__lyrics');
			this.EL.LyricsChilds		=	this.DOM.querySelectorAll('.section__lyrics > p');
		}

		getRandomTrack(){
			let tracks = configs.artist.length;
			let RandTrack = Math.floor(Math.random() * tracks);
			let objTrack = configs.artist[RandTrack];

			this.track = {
				"id"			: objTrack.track.id,
				"name"			: objTrack.track.name,
				"album" 		: objTrack.track.album,
				"image"			: objTrack.track.image,
				"lyrics"		: objTrack.track.lyrics,
				"artist"		: objTrack.name,
			}
		}

		setTrackLayout(){
			this.EL.headTrackImage.setAttribute("src", 	configs.imagePatch + this.track.image);
			this.EL.headTrackTitle.innerHTML 		=	this.track.name;
			this.EL.headTrackArtist.innerHTML		=	this.track.artist;
			this.EL.listenTrackName.innerHTML		=	this.track.name;
			this.EL.listenTrackArtist.innerHTML		=	this.track.artist;

			// Construct Lyrics
			this.EL.LyricsChilds		=	this.DOM.querySelectorAll('.section__lyrics > p');
			if(this.EL.LyricsChilds.length == 0){
				for(let i = 0; i < this.track.lyrics.length;i++) {
					let countRowLyrics = this.track.lyrics.length;
					let childRow = document.createElement("p");
					childRow.innerHTML = this.track.lyrics[i];
					this.EL.Lyrics.appendChild(childRow);
				}
			}
			else{
				for(let i = 0; i < this.EL.LyricsChilds.length;i++) {
					this.EL.LyricsChilds[i].remove();
				}
				for(let i = 0; i < this.track.lyrics.length;i++) {
					let countRowLyrics = this.track.lyrics.length;
					let childRow = document.createElement("p");
					childRow.innerHTML = this.track.lyrics[i];
					this.EL.Lyrics.appendChild(childRow);
				}				
			}

			// Set background rand color
			let bgColor = configs.gradients;
			let randBgColor = Math.floor(Math.random() * bgColor.length);
			let style = `background-color: ${bgColor[randBgColor][0]}; background-image: linear-gradient(45deg, ${bgColor[randBgColor][0]} 0%, ${bgColor[randBgColor][1]} 100%);`;
			this.EL.Lyrics.setAttribute("style", style);
		}
 	}

	class MusiXMatch{
		constructor(el){
			this.DOM = el;
			this.EL = {};
			this.track = new Track(this.DOM);
			this.init();
		}

		init(){
			// Dom Elements
			this.EL.listenButton 	=	this.DOM.querySelector('.listen__button');
			this.EL.listenIcon		=	this.DOM.querySelector('.button__icon > use');
			this.EL.listenBorders 	= 	this.DOM.querySelectorAll('.listen__borders span');
			this.EL.listenWaves 	= 	this.DOM.querySelectorAll('.listen__waves span');
			this.EL.lyricsReset		=	this.DOM.querySelector('.header__reset');
			this.initEvents();
		}
		initEvents(){
			this.EL.listenButton.addEventListener('click', () => this.initFind());
			this.EL.lyricsReset.addEventListener('click', () => this.resetLyrics());
		}
		/* Events Button */
		initFind(){
			if(this.isAnimating) return;
			this.isAnimating = true;
			this.DOM.classList.remove(configs.playState.init);
			this.DOM.classList.add(configs.playState.find);
			this.track.getRandomTrack();
			this.track.setTrackLayout();

			return setTimeout( () => {
				this.initMatch();
			}, configs.timeMatch.find);
		}
		initMatch(){
			this.DOM.classList.remove(configs.playState.find);
			this.DOM.classList.add(configs.playState.match);
			// change icon
			setTimeout( () => {
				this.EL.listenIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${configs.icons.matched}`);
			}, configs.timeMatch.changeIcon);
			setTimeout( () => {
				this.initLyrics();
				this.isAnimating = !this.isAnimating;
			}, configs.timeMatch.showLyrics);
		}
		initLyrics(){
			this.DOM.classList.remove(configs.playState.match);
			this.DOM.classList.add(configs.playState.lyrics);
			this.EL.listenIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${configs.icons.microphone}`);
		}

		resetLyrics(){
			this.DOM.classList.remove(configs.playState.lyrics);
			this.DOM.classList.add(configs.playState.init);
		}


	}

	new MusiXMatch(document.querySelector('main'));
}
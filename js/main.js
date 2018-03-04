/**
 * main.js
 * https://github.com/lekobarros/finder
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Alex Vaconcelos
 * https://github.com/lekobarros/
 */
 
;(function(window){
	'use strict';
 
	var options = {
		"icons" : ["icon-microphone", "icon-matched"],
		"gradients" : [
			["#08AEEA", "#2AF598"],
			["#21D4FD", "#B721FF"],
			["#FBDA61", "#FF5ACD"],
			["#0093E9", "#80D0C7"],
			["#FF9A8B", "#FF99AC"],
			["#08AEEA", "#2AF598"]
		]
	}

	var data = {
		"artist" : [
			{
				"name" : "Madeon",
				"picture" : "img/profiles/madeon.jpg",
				"track" : {
					"id" : 1,
					"name" : "Nonsense <span>(Feat. Mark Foster)</span>",
					"album" : "Adventure Deluxe",
					"lyric" : "Look, I am here for you\r\nOpen up your eyes and don't look away\r\nAnd I'm dripping down from the fangs\r\nWhen I hear your name, I feel the pain."
				}
			}
			,
			{
				"name" : "Porter Robinson",
				"picture" : "img/profiles/porterrobinson.jpg",
				"track" : {
					"id" : 5,
					"name" : "Fresh Static Snow",
					"album" : "Worlds",
					"lyric" : "You fit perfectly to me in the loneliness, melt this curse away\r\nThough I'll never know your name I'll cry for you the same\r\nYou fit perfectly to me in the loneliness\r\nMelt this curse away"
				}
			}
			,
			{
				"name" : "Foxes",
				"picture" : "img/profiles/foxes.jpg",
				"track" : {
					"id" : 9,
					"name" : "Echo",
					"album" : "Glorious Deluxe",
					"lyric" : "I can hear your thoughts\r\nPlease don't leave me now\r\nI can't sleep alone\r\nChasing the light until the dawn"
				}
			}
			,
			{
				"name" : "Galantis",
				"picture" : "img/profiles/galantis.jpg",
				"track" : {
					"id" : 2,
					"name" : "Hey Alligator",
					"album" : "The Aviary",
					"lyric" : "Hold me tight and pull me under\r\nYou let me drown, you let me dream\r\nWell you should know by now my heart is in your teeth."
				}
			}
		]
	};
	
	var globalTrack;
	
	const /* Consts */
		sectionListen = 		document.querySelector('.sections'),
		buttonPlayer = 			document.querySelector('.section-listen__button'),
		buttonWavesContainer =	document.querySelector('.section-listen__waves'),
		buttonWaves = 			document.querySelectorAll('.section-listen__waves > span'),
		buttonPlayerSvgPatch =	document.querySelector('.section-listen__button > svg > use'),
		buttonResetPlayer =		document.querySelector('.lyric-menu > .lyric-menu__reset'),
		iconMicrophone =		options.icons[0],
		iconMatched = 			options.icons[1];
	
	const /* Consts .isMatched + .isLyrics  */
		matchedTrackArtist = 	document.querySelector('.matched__artist'),
		matchedTrackName =		document.querySelector('.matched__track'),
		cardLyric = 			document.querySelector('.section-lyrics'),
		lyricPicture =			document.querySelector('.lyric-header__picture img'),
		lyricTrackArtist =		document.querySelector('.lyric-header__track .track-artist'),
		lyricTrackName =		document.querySelector('.lyric-header__track .track-name'),
		lyricTrackLyric =		document.querySelector('.lyric-body p');
		
	/* Functions find track */
	function getTrackData(dataRand){
		var /* vars */
			array = data.artist,
			rand = dataRand,
			track = [];
		
		for (var i = 0; i < array.length; i++) {
			if ( i == rand ){
				var track = {
					"trackName"			: array[rand].track.name,
					"trackAlbum" 		: array[rand].track.album,
					"trackLyric"		: array[rand].track.lyric,
					"trackArtist"		: array[rand].name,
					"trackArtistPic"	: array[rand].picture
				}
			}
		}
		return track;
	}
	
	class Track{
		constructor(track){
			this.trackName		= track.trackName;
			this.trackAlbum		= track.trackAlbum;
			this.trackLyric		= track.trackLyric;
			this.trackArtist 	= track.trackArtist;
			this.trackArtistPic	= track.trackArtistPic;			
		}
		
		setMatched(){
			matchedTrackArtist.innerHTML = this.trackArtist;
			matchedTrackName.innerHTML = this.trackName;
		}
		
		setLyric(){
			lyricPicture.setAttribute("src", this.trackArtistPic);
			lyricTrackArtist.innerHTML = this.trackArtist;
			lyricTrackName.innerHTML = this.trackName;
			lyricTrackLyric.innerHTML = this.trackLyric;
		}
		
		setBackgroundCard(){
			var /* Variables */
				rand = Math.floor(Math.random() * options.gradients.length),
				array = options.gradients[rand];
				
			var style = `background-color: ${array[0]};background-image: linear-gradient(45deg, ${array[0]} 0%, ${array[1]} 100%);`;
			cardLyric.setAttribute("style", style);
		}
	}
	
	/* Functions control sections */
	function getMatchStats(){
		var query = sectionListen.className;
		
		if ( query.indexOf('isWaiting') ){
			return 1;
		}
		else if	( query.indexOf('isListeling') ){
			return 2;
		}
		else if	( query.indexOf('isMatched') ){
			return 3;
		}
		else if	( query.indexOf('isLyrics') ){
			return 4;
		}
		else{
			return 0;
		}
	}
	
	function changeIconNS(icon){
		return buttonPlayerSvgPatch.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${icon}`);
	}
				
	/* Call class and functions section */
	function callListeling(){
		var trackRand = Math.floor(Math.random() * data.artist.length);
		globalTrack = new Track(getTrackData(trackRand));	
		sectionListen.classList.remove('isWaiting');
		sectionListen.classList.add('isListeling');
		// Call matched music
		setTimeout(() => {
			callMatched();
		}, 3000);
	}
	
	function callMatched(){
		globalTrack.setMatched();
		sectionListen.classList.remove('isListeling');
		sectionListen.classList.add('isMatched');
		// Call animation waves back-in.
		setTimeout(() => {
			changeIconNS(iconMatched);
		}, 300);
		// Call the lyrics
		setTimeout(() => {
			callLyrics();
		}, 1500);
	}
	
	function callLyrics(){
		globalTrack.setLyric();
		globalTrack.setBackgroundCard()
		sectionListen.classList.remove('isMatched');
		sectionListen.classList.add('isLyrics');
	}
	
	function callReset(){
		changeIconNS(iconMicrophone);
		sectionListen.classList.remove('isLyrics');
		sectionListen.classList.add('isWaiting');
		
		// Fix Bug: The wave animation, where after "restart" a continuous animation from where it was stopped.
		var wavesCount = buttonWaves.length;
		
		for (var i = 0; i < wavesCount; i++){
			buttonWaves[i].remove()			
		}
		for (var i = 0; i < wavesCount; i++){
			var span = document.createElement("span")
			buttonWavesContainer.appendChild(span);
		}
	}
	
	/* EventListener in Button */
	buttonPlayer.addEventListener('click', (ev) => {
		ev.preventDefault();
		callListeling();	
	});
	
	buttonResetPlayer.addEventListener('click', (ev) => {
		ev.preventDefault();
		callReset();	
	});
	
})(window);

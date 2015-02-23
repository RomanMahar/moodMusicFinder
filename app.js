// first we create an object to act as a namespace

var musicApp = {};

musicApp.metrics = {'dance':null}

var mood = "";

$('.btn a#happy').on('click', function(e){
		mood = $(this).text();
		console.log("happyState");
		if ($(this).hasClass('selected')){
			$(this).removeClass('selected');
		}else{
			$(this).addClass('selected');
			$('.btn a#angry').removeClass('selected');
			$('.btn a#sad').removeClass('selected');
		};
	});

$('.btn a#angry').on('click', function(e){
		mood = $(this).text();
		console.log("angryState");
		if ($(this).hasClass('selected')){
			$(this).removeClass('selected');
		}else{
			$(this).addClass('selected');
			$('.btn a#happy').removeClass('selected');
			$('.btn a#sad').removeClass('selected');
		};
	});

$('.btn a#sad').on('click', function(e){
		mood = $(this).text();
		console.log("sadFace");
		if ($(this).hasClass('selected')){
			$(this).removeClass('selected');
		}else{
			$(this).addClass('selected');
			$('.btn a#happy').removeClass('selected');
			$('.btn a#angry').removeClass('selected');
		};
	});

$('.submit').on('click',function(e){
	musicApp.getMetrics();
	console.log('heya');
	});


musicApp.getMetrics = function(){
	var dance = $('#Danceability .range').slider("values");
	var energy = $('#Energy .range').slider("values");
	var words = $('#Speechiniess .range').slider("values");
	musicApp.getSongs(mood,dance,energy,words);
	//each
}

musicApp.init = function(){
	$('.sub').on('submit',function(e){
	e.preventDefault();
	musicApp.getMetrics();
	});
}


musicApp.getSongs = function(mood,dance,energy,words) {

	$.ajax({
		  url: 'http://developer.echonest.com/api/v4/song/search?bucket=id:7digital-US',
		  data : {
		  	api_key : musicApp.key,
		  	bucket:'tracks',
		  	min_danceability : dance[0],
		  	max_danceability : dance[1],
		  	min_energy : energy[0],
		  	max_energy : energy[1],
		  	min_speechiness : words[0],
		  	max_speechiness : words[1],
		  	artist_min_familiarity : 0.66,
		  	song_min_hotttnesss : 0.33,
		  	results : 100,
		  	mood : mood
		  },
// sort=song_hotttnesss-desc
		  success : function(result){
			console.log(result);
			// now that the data has come back.... let display it!!!
			musicApp.displaySongs(result);
		}
	});
}



musicApp.displaySongs = function(result){
	$('#artwork').html('');
	console.log("Ready to try displaying pieces");
	var songs = result.response.songs;
	// we now have an array of pieces, we need to loop through each one and display them
	// this will incrementally display them
	for(var i = 0; i < songs.length; i++){
		// create html element div with a class of piece
		var div = $('<div>').addClass('piece');
		// create an h2 element and set the title to be the current work title
		var h2 = $('<h2>').text(songs[i].title);
		// create a p with the class of artist and set the text to be artist
		var p = $('<p>').text(songs[i].artist_name).addClass('artist');
		
			div.append(h2,p);
			$('#artwork').append(div);
		

		
		// check if theres an image.... and if there is create it and specify the source
		// if(pieces[i].webImage){
		// 	var image = $('<img>').attr('src',pieces[i].webImage.url);
		// // put the image in the place
		// div.append(image);
		// }
		
	} // end for loop
} // end musicApp.displayPieces();


musicApp.key = 'YZ3HBMUVW61PG9SWN';

$(function() {
	musicApp.init();
});




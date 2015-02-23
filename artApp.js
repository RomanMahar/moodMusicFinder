// first we create an object to act as a namespace
// namespaces help us keep the global object spaces clean and prevent collisions between variable names
var musicApp = {};

// Every app needs an init function that will fet things started. 
// It usually listens for click handlers and such. Later we will be able to run it with musicApp.init();
musicApp.init = function() {
	$('.search').on('submit',function(e){
		// run this code:
		e.preventDefault();
		// grab the value from the input and store it as a variable
		var q = $('.q').val();
		console.log("We should search Rijks for " + q);
		musicApp.getPieces(q);
	});
}

// When we want pieces that will go and get pieces, we call musicApp.getPieces
musicApp.getPieces = function(q) {
	// in here we do AJAX request
	$.ajax({
		url : 'https://www.rijksmuseum.nl/api/en/collection/',
		// This "jsonp' tells jquery what to expect
		dataType : 'jsonp',
		type : 'GET',
		// in the following data property , we provide all of the params that need to go along with the request
		// for possible params visit the docs http://rijksmuseum.github.io/
		data : {
			key : musicApp.key,
			format : 'jsonp',
			// allows for searching on the variable q (which is also the parameter name)
			q : q
		},
		success : function(result){
			console.log('success, function called');
			// now that the data has come back.... let display it!!!
			musicApp.displayPieces(result);
		}
	});
} // end getpieces


// define the function that will be used ot display the pieces in html
musicApp.displayPieces = function(result){
	// we need to clear out any old artworks to make way for new ones
	$('#artwork').html('');
	console.log("Ready to display pieces with this data:", result);
	var pieces = result.artObjects;
	// we now have an array of pieces, we need to loop through each one and display them
	// this will incrementally display them
	for(var i = 0; i < pieces.length; i++){
	// this will console.log the individual pieces [i]
		// console.log(pieces[i]);
		// create html element div with a class of piece
		var div = $('<div>').addClass('piece');
		// create an h2 element and set the title to be the current work title
		var h2 = $('<h2>').text(pieces[i].title);
		// create a p with the class of artist and set the text to be artist
		var p = $('<p>').text(pieces[i].principalOrFirstMaker).addClass('artist');
		// create an image and set the src to be the webImage of the current piece

		// take the div we just created and put the h2 and p on it
		div.append(h2,p);
		// check if theres an image.... and if there is create it and specify the source
		if(pieces[i].webImage){
			var image = $('<img>').attr('src',pieces[i].webImage.url);
		// put the image in the place
		div.append(image);
		}
		$('#artwork').append(div);
	} // end for loop
} // end musicApp.displayPieces();

// This is my unique API key for the rijksmuseum
musicApp.key = 'bhVzgRq2';

$(function() {
	musicApp.init();
	musicApp.getPieces('dog');
});
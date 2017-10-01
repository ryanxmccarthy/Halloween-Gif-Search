var topics = ['wolf', 'bear', 'crow',]

$(document).ready(function() {
	function generateButtons() {
		for (var i = 0; i < topics.length; i++) {
			var name = topics[i]
			var button = $('<button>');
			button.text(name)
			button.attr('class', 'animalButton')
			button.attr('data-animal', name)
			$('#buttons').append(button)
		}
	}

	generateButtons();

	$(document).on('click', '.animalButton', function() {
		$('#gifs').text('');
		var animal = $(this).attr('data-animal');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	    $.ajax({
	    	url: queryURL,
	    	method: 'GET'
	    }).done(function(response) {
	    	var result = response.data;

	    	for (var i = 0; i < result.length; i++) {
	    		var gifDiv = $('<div>');
	    		var rating = result[i].rating;
	    		var p = $('<p>').text('Rating: ' + rating);
	    		var animalGif = $('<img>');
	    		animalGif.attr('src', result[i].images.fixed_height_still.url);
	    		gifDiv.prepend(p);
	    		gifDiv.prepend(animalGif);
	    		$('#gifs').prepend(gifDiv)
	    	}
	    })
	})

	$('#add').on('click', function() {
		$('#buttons').empty()
		var animal = $('#animal').val().trim()
		topics.push(animal)
		$('#animal').val('')
		generateButtons();
	})
})
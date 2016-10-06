(function() {

	var APIKEY = 'aafd229735b3c2bdc90b853e6a2be98e'
 	var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + APIKEY +
 						'&user_id=34181233@N06&photoset_id=72157624178395871&format=json&nojsoncallback=?&per_page=15'


	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = processRequest;

	// hit the flickr api
	function processRequest() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);

			var photo = response.photoset.photo;

			// loop thru the response data
			for (var i = 0; i < photo.length; i++){
				var photoUrl = 'https://farm' + photo[i].farm + '.staticflickr.com/' + photo[i].server + '/' + photo[i].id + '_' + photo[i].secret + '_z.jpg';

				// create containers for thumbs
				var div = document.createElement('div');

				div.className = 'thumbnail';

				div.innerHTML = '<img id="lightBoxThumb" src="' + photoUrl + '"/>';

				document.getElementById('thumbnailList').appendChild(div);

				// launch lightbox
				div.onclick = function(){
					showCurrent(this);
					launchLightBox();
				}
			}
		}

		var counter = 0; // current slide counter
		function showCurrent(photo) {

			var	$items = document.querySelectorAll('.thumbnail-list .thumbnail'),
					numItems = $items.length;

			// uses modulo and Math.abs to get the positive integer index of the thumbnail to lightbox
			// remainder of counter / items.length will always == the correct counter index
			var itemToShow = Math.abs(counter%numItems);

			// remove show from whichever element currently has it
			[].forEach.call( $items, function(el){
				el.classList.remove('show');
			});

			$items[itemToShow].classList.add('show');


			// define the container where the image goes
			var lightBoxPic = document.getElementById('lightBoxPic');

			var thumbnails = document.getElementsByClassName('thumbnail');
			// run thru the thumbs
			for (var i = 0; i < thumbnails.length; i++){
				var thumb = thumbnails[i];
				// find out which one has show class
				if (thumb.classList.contains('show') ) {
					var thumbUrl = thumb.children[0].src;
					// add to dom container
					lightBoxPic.innerHTML = '<img id="lightBoxImage" src="' + thumbUrl + '"/>'

				}
			}
		};

		// click events for flipper buttons
		document.querySelector('.next').addEventListener('click', function() {
			counter++;
			showCurrent();
		});

		document.querySelector('.prev').addEventListener('click', function() {
			counter--;
			showCurrent();
		});

	}

	function launchLightBox(photo){

		lightBoxPic.classList.add('active');

		var lightBoxBackground = document.getElementById('lightBoxBackground');
		lightBoxBackground.style.display = 'block';

		//show the flippers
		var prev = document.getElementById('prev'),
				next = document.getElementById('next');
		prev.style.display = 'block';
		next.style.display = 'block';

	}

})();

function dismiss(){
	var thumbnails = document.getElementsByClassName('thumbnail');
	for (var i = 0; i < thumbnails.length; i++){
		var thumb = thumbnails[i];
		// remove the show class from all
		thumb.className = thumb.className.replace(/\bshow\b/,'');
	}

	// hide the background and lightbox pic container
	lightBoxBackground.style.display = 'none';
	lightBoxPic.classList.remove('active');

	// hide the flippers
	prev.style.display = 'none';
	next.style.display = 'none';
}



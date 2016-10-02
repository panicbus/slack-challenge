(function() {

	var APIKEY = 'aafd229735b3c2bdc90b853e6a2be98e'
 	var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + APIKEY +
 						'&user_id=34181233@N06&photoset_id=72157624178395871&format=json&nojsoncallback=?&per_page=15'


	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = processRequest;

	$ = document.getElementById.bind(document);

	// hit the flickr api
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);

			// add the data to a var
			var photo = response.photoset.photo;

			// var photoUrl_l = 'https://farm' + photo[i].farm + '.staticflickr.com/' + photo[i].server + '/' + photo[i].id + '_' + photo[i].secret + '_z.jpg';

			// loop thru the response data
			for (var i = 0; i < photo.length; i++){
				// $('container').innerHTML = "";
				var photoUrl = 'https://farm' + photo[i].farm + '.staticflickr.com/' + photo[i].server + '/' + photo[i].id + '_' + photo[i].secret + '_z.jpg';

				// create containers for pics
				var div = document.createElement('div');

				// add class
				div.className = 'thumbnail';

				// add photo to thumb list
				div.innerHTML = '<img id="lightBoxThumb" src="' + photoUrl + '"/>';

				// set index attrs to thumb & lb list
				div.setAttribute('data-index', i+1);

				// append thumbs to dom thumbnail area
				document.getElementById('thumbnailList').appendChild(div);

				// launch lightbox
				div.onclick = function(){
					launchLightBox(this);
				}

			}
    }
	}

	function launchLightBox(photo){
		// grab the dom object
		var clickedLightBoxThumb = photo;

		var lbImageUrl = photo.children[0].src;
		// var lbImage = '<img id="lightBoxImage" src="' + lbImageUrl + '"/>'

		// define the locations
		var lightBoxPic = document.getElementById('lightBoxPic');

		// replace string with html
		lightBoxPic.innerHTML = '<img id="lightBoxImage" src="' + lbImageUrl + '"/>';
		var lightBoxBackground = document.getElementById('lightBoxBackground');

		// set childnodes and replace if node exists otherwise append
		// keeps dom from adding multiple lightboxes
		var lbChildren = lightBoxPic.childNodes;
		if (lbChildren[0]) {
		  lightBoxPic.replaceChild(lbChildren[0], lbChildren[0]);
		} else {
		  lightBoxPic.appendChild(lbChildren[0]);
		}

		// show the pic and apply the background
		lightBoxPic.style.display = 'block';
		lightBoxBackground.style.display = 'block';

	}

})();

function dismiss(){
	// var lightBoxBackground = document.getElementById('lightBoxBackground');
	// var lightBoxPic = document.getElementById('lightBoxPic');
	lightBoxBackground.style.display = 'none';
	lightBoxPic.style.display = 'none';
}

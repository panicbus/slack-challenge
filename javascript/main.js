(function() {

	var APIKEY = 'aafd229735b3c2bdc90b853e6a2be98e'
 	var url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + APIKEY +
 						'&user_id=34181233@N06&photoset_id=72157624178395871&format=json&nojsoncallback=?&per_page=15'


	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();

	xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);

			// console.log("please the json: " + response);

			var photo = response.photoset.photo;

			for (var i = 0; i < photo.length; i++){
				var div = document.createElement('div');
				div.className = 'thumbnail';
				var photoUrl = 'https://farm' + photo[i].farm + '.staticflickr.com/' + photo[i].server + '/' + photo[i].id + '_' + photo[i].secret + '_q.jpg';
				div.innerHTML = "<img src='" + photoUrl + "'/>";
				document.getElementById('thumbnailList').appendChild(div);

			}
    }
	}

})();


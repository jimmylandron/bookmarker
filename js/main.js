
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

function saveBookmarks(e){

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	var myForm = document.getElementById('myForm');

	if(!validateForm(siteName, siteUrl)){
		return false
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	};

	if(localStorage.getItem('bookmarks1') === null){
		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks1', JSON.stringify(bookmarks));
		
	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks1'));

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks1',JSON.stringify(bookmarks));		
	}

	showBookmarks();
	myForm.reset();

	e.preventDefault();

}

// fetch and show bookmarks
function showBookmarks(){

	// Fetch bookmarks
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks1'));
	var bookmarkResults = document.getElementById('bookmarkResults');
	console.log(bookmarks);

	if(bookmarks === null){
		return false;
	}
	
	// Show bookmarks
	bookmarkResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarkResults.innerHTML += '<div class="well">' + '<h3>' + name + ' ' + 
									 '<a href="'+url+'" class="btn btn-default" target="_blank">Visit</a>' +
									 ' <button onclick="deleteBookmark(\''+ url +'\')"  class="btn btn-danger">Delete</button> ' +
									 '</h3>' + 
									 '</div>';
	}
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks1'));

	for(var i = 0; i < bookmarks.length; i++){
		
		if(bookmarks[i].url === url){
			bookmarks.splice(i, 1);
		}
	}

	// Reset localStorage
	localStorage.setItem('bookmarks1', JSON.stringify(bookmarks));

	// Refetch Bookmarks
	showBookmarks();
	console.log(url);
	
}

function validateForm(siteName, siteUrl){
	
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	} 

	return true;
}
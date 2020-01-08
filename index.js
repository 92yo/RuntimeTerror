const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', searchByArtist)
/* Auxiliary functions */ 

// makes a fetch request to "url" , and runs callback on the fetchedData

var artist;

function makeRequest(url, callback) {
    fetch('https://cors-anywhere.herokuapp.com/' + url)
    .then(function(response) {
      return response.json();
    })
    .then(function(fetchedData) {
      console.log(fetchedData);
      callback(null, fetchedData);
    
    })
    .catch(function(error) {
    
      callback(error);
    
    })
  }

 

/******* ******************* */


/*** Main functions */

function searchByArtist (event) {
  event.preventDefault();
  var input = event.target.artistName.value;
 makeRequest('https://api.deezer.com/search/artist?q=' + input ,writeArtistInfo);
}

function getArtist (fetchedData) {
  return fetchedData.data[0];
}

function writeArtistInfo (error,fetchedData){
  //test for empty data
 if(checkData(fetchedData) === 'success'){
artist = getArtist(fetchedData);
document.getElementById('artistName').innerText = artist.name;
document.getElementById('artistPicture').src=artist.picture_medium;
document.getElementById('deezerLink').href=artist.link;
document.getElementById('deezerLink').innerText="       More on Deezer!"
fetchTopTracks();
}

}

 

function writeTopTracks (error, fetchedData) {
  var topTracks = fetchedData.data

  console.log('top tracks working');
var tracksArr =document.getElementsByClassName("topTrack");
  for (var i=0; i<5; i++ ){
  tracksArr[i].innerText=topTracks[i].title
  tracksArr[i].href=topTracks[i].link
  }

}

function fetchTopTracks (){
  makeRequest("https://api.deezer.com/artist/" + artist.id+ "/top", writeTopTracks)
}



/***************** */

/** Handling errors  */

// if no search results are found
function checkData (fetchedData){
  if(fetchedData.data.length < 1 )
  {
    return noData();
  }


  return 'success';
}

function noData() {
  document.getElementById('artistName').innerText = 'Not found!'
}


/***************** */


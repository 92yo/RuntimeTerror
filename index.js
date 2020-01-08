const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', searchByArtist)
/* Auxiliary functions */ 

// makes a fetch request to "url" , and runs callback on the fetchedData

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
var artist = getArtist(fetchedData);
document.getElementById('artistName').innerText = artist.name;
document.getElementById('artistPicture').src=artist.picture_medium;
document.getElementById('deezerLink').href=artist.link;
document.getElementById('deezerLink').innerText="Listen on Deezer!"
}

}



function logfetchedData (error,fetchedData){
  console.log(fetchedData);
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


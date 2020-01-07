const searchForm = document.getElementById("form");
searchForm.addEventListener('submit', searchByArtist)
/* Auxiliary functions */ 

// makes a fetch request to "url" , and runs callback on the info

function makeRequest(url, callback) {
    fetch('https://cors-anywhere.herokuapp.com/' + url)
    .then(function(response) {
      return response.json();
    })
    .then(function(info) {
      console.log(info);
      callback(null, info);
    
    })
    .catch(function(error) {
    
      callback(error);
    
    })
  }



/******* ******************* */


/*** Main functions */

function searchByArtist (event) {
  
  
makeRequest('	https://api.deezer.com/search?q=artist:"' + event+'"&output=JSON' ,writeArtistName);
}

function grabArtist (info) {
  return info.data[0].artist;
}

function writeArtistName (error,info){
document.getElementById('artist').innerText = grabArtist(info).name;
}

function loginfo (error,info){
  console.log(info);
}




/***************** */


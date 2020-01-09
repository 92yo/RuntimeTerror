const searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', searchByArtist)
    /* Auxiliary functions */

// makes a fetch request to "url" , and runs callback on the fetchedData

var artist;
const titleDiv = document.getElementById('title')
const proxy = 'https://cors-anywhere.herokuapp.com/'

function makeRequest(url, callback) {
    fetch(proxy + url)
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
function createElem(element) {
    return document.createElement(element)
}

function displayFiveTrack() {
    var header = createElem('h3');
    var text = document.createTextNode('Top Five Tracks');
    header.appendChild(text);
    titleDiv.appendChild(header);
}

function displayTrackLink() {
    document.getElementById('tracksDiv').style = '';

}

function searchByArtist(event) {
    event.preventDefault();
    var input = event.target.artistName.value;
    makeRequest('https://api.deezer.com/search/artist?q=' + input, writeArtistInfo);
}

function getArtist(fetchedData) {
    return fetchedData.data[0];
}

function writeArtistInfo(error, fetchedData) {
    //test for empty data]

    if (error !== null) {
        return 'Error'
    }

    if (checkData(fetchedData) === 'success') {
        artist = getArtist(fetchedData);
        document.getElementById('artistName').innerText = artist.name;
        document.getElementById('artistPicture').style = '';
        document.getElementById('artistPicture').src = artist.picture_medium;
        document.getElementById('deezerLink').href = artist.link;
        document.getElementById('deezerLink').innerText = "More on Deezer!"
        fetchTopTracks();
    }

}

function removeTitle() {
    if (titleDiv.lastElementChild)
        titleDiv.removeChild(titleDiv.lastElementChild);
}

function writeTopTracks(error, fetchedData) {
    if (error !== null) {
        return 'Error'
    }
    var topTracks = fetchedData.data
    removeTitle();
    console.log('top tracks working');
    displayFiveTrack();
    displayTrackLink();
    var tracksArr = document.getElementsByClassName("topTrack");
    for (var i = 0; i < 5; i++) {
        tracksArr[i].innerText = topTracks[i].title
        tracksArr[i].href = topTracks[i].link
    }

}

function fetchTopTracks() {
    makeRequest("https://api.deezer.com/artist/" + artist.id + "/top", writeTopTracks)
}



/***************** */

/** Handling errors  */

// if no search results are found
function checkData(fetchedData) {
    if (fetchedData.data.length < 1) {
        return noData();
    }


    return 'success';
}

function noData() {
    document.getElementById('artistName').innerText = 'Not found!';
    document.getElementById('tracksDiv').style = 'display: none;';
    document.getElementById('artistPicture').style = 'display: none;'
}


/***************** */
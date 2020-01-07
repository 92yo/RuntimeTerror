var url = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/search/track/autocomplete?limit=1&q=eminem'



fetch(url)
    .then(function(response) {
        return response.json();
    })

.then(function(data) {
    console.log(data)
})
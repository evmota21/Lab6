const API_KEY = "AIzaSyDPz8pSqI2vbyR8NN5yV4tQqI-q4ezbgdQ";
let nextPageToken = "";


function fetchVideos( searchTerm ){
    let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=10`;

    let settings = {
        method : 'GET'
    };

    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            nextPageToken = responseJSON.nextPageToken;
            console.log(nextPageToken);
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function fetchMoreVideos( searchTerm ){
    let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchTerm}&maxResults=10&pageToken=${nextPageToken}`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            nextPageToken = responseJSON.nextPageToken;
            console.log(nextPageToken);
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function displayResults( data ){
    let results = document.querySelector( '.results' );

    results.innerHTML = "";

    for( let i = 0; i < data.items.length; i ++ ){
        results.innerHTML += `
            <div>
                <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                <h2 class="videoTitle" id="${data.items[i].id.videoId}">
                    ${data.items[i].snippet.title}
                </h2>
                <div class="imgVideo" id="${data.items[i].id.videoId}">
                    <img src="${data.items[i].snippet.thumbnails.medium.url}" id="${data.items[i].id.videoId}"/>
                </div>
                </a>
            </div>
        `;
    }
    let getMoreButton = document.querySelector( '.moreResults' );

    getMoreButton.style.display = "inline";
    /*let body = document.getElementsByTagName('body');

    if(boolResults){
        body[0].innerHTML += `
            <button class="moreResults" type="submit">
                Get More Results
            </button>
        
        `;
        boolResults = false;
    }*/


    
}

/*function gotoVideo(){
    let resultsSection = document.querySelector( '.results' );

    resultsSection.addEventListener( 'click', ( event ) => {
        event.preventDefault();
        let videoId = event.target.id;
        console.log(videoId);
        let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log(videoUrl);
        
        window.open(videoUrl);

    });
}*/

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        let searchTerm = document.querySelector( '#searchTerm' ).value;
        console.log("retrieved!");
        fetchVideos( searchTerm );

        keyword = searchTerm;


        console.log(searchTerm);

    });
}

function getMoreResults(){
    let resultsButton = document.querySelector( '.moreResults' );

    resultsButton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        let searchTerm = document.querySelector( '#searchTerm' ).value;
        console.log("moreResults!");
        fetchMoreVideos( searchTerm );

        keyword = searchTerm;

    });
}

function init(){
    watchForm();
    getMoreResults();
}

let boolResults = true;
let keyword = "";


init();
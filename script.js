const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click',()=>{
    const lyrics = document.getElementById('lyrics');
    getLyrics(lyrics.value);
    lyrics.value = '';
})


function getLyrics(lyrics){
    fetch(`https://api.lyrics.ovh/suggest/${lyrics}`)
        .then(res => res.json())
        .then(data=>{
            const tenLyrics = data.data.slice(0,10);
            console.log(tenLyrics)            
            const displayResult = document.querySelector('.lyrics-details');
            tenLyrics.map(lyric => {
                const div = document.createElement('div');
                div.classList = 'single-result row align-items-center my-3 p-3';
                div.innerHTML = `
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${lyric.album.title}</h3>
                                    <p class="author lead">Album by <span>${lyric.artist.name}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button class="btn btn-success" onClick="getFullLyric('${lyric.artist.name}','${lyric.album.title}')">Get Lyrics</button>
                                </div>
                            `
                displayResult.appendChild(div);               
            });
        });
};

function getFullLyric(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
        })
};

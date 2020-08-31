const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click',()=>{
    const lyrics = document.getElementById('lyrics');
    getLyrics(lyrics.value);
})


function getLyrics(lyrics){
    fetch(`https://api.lyrics.ovh/suggest/${lyrics}`)
        .then(res => res.json())
        .then(data=>{
            const tenLyrics = data.data.slice(0,10);         
            const displayResult = document.querySelector('.lyrics-details');
            tenLyrics.map(lyric => {
                const div = document.createElement('div');
                div.classList = 'single-result row align-items-center my-3 p-3';
                div.innerHTML = `
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${lyric.title}</h3>
                                    <p class="author lead">Album by <span>${lyric.artist.name}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button class="btn btn-success" onClick="getFullLyric('${lyric.artist.name}','${lyric.title}')">Get Lyrics</button>
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
            const contentArea = document.querySelector('.content-area');
            errorData(data, contentArea, title);
        })
};

function errorData(data, contentArea, title){    
    const div = document.createElement('div');
    div.classList = 'single-lyrics text-center';
    div.innerHTML = `
                        <button class="btn go-back">&lsaquo;</button>
                        <h2 class="text-success mb-4">${title}</h2>                            
                    `
    const pre = document.createElement('pre');
    pre.classList = 'lyric text-white';
    if(data.error){        
        pre.innerHTML = '<h3>Lyrics Not Found</h3>' ;
    }else{
        pre.innerText = data.lyrics;
    }  
    const reloadBtn = document.createElement('button');
    reloadBtn.innerText = 'Search Again';
    reloadBtn.classList = 'btn btn-success btn-lg btn-block';
    reloadBtn.addEventListener('click',()=>{
        location.reload();
    })
    // contentArea.innerText = '';
    div.appendChild(pre);
    contentArea.append(div,reloadBtn);
}

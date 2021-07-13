const music = document.querySelector(".music");
const playBtn = document.querySelector(".play");
let nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const progressBar = document.querySelector('.progressBar')
const progressIn = document.querySelector(".progress-in");
const title = document.querySelector(".title");
const imgSrc = document.querySelector('.img_src');



let songs = ['kalush','pascal','dolbim','glory','numb','smuziKaver','wrongSide'];
let musicIndex = 0;


function load(song) {
    title.innerHTML = song;
    title.style.color = "#28648e";
    title.style.fontSize = 40 + 'px';
    music.src = `music/${song}.mp3`;
}

function playSong() {
    playBtn.classList.add('play');
    imgSrc.src = './img/pause.png';
    playBtn.classList.remove('pause');
    music.play()
}

function pauseSong() {
    playBtn.classList.remove('play');
    imgSrc.src = './img/play.png';
    playBtn.classList.add('pause');
    music.pause();
}

playBtn.addEventListener("click", () => {
    const playing = playBtn.classList.contains('play');
    if (!playing) {
        playSong();
    } else {
        pauseSong();
    }
});

function nextSong() {
    musicIndex++
    if (musicIndex == songs.length) {
        musicIndex = 0;
    }
    load(songs[musicIndex]);
    playSong();
}

function prevSong() {
    if (musicIndex === 0) {
        musicIndex = 0;
    } else {
        musicIndex--
        load(songs[musicIndex]);
        playSong();
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const click = e.offsetX;
    const duration = music.duration;
    music.currentTime = (click / width) * duration;
}

function randomMusic(){
    musicIndex = Math.floor(Math.random() * songs.length);
    load(songs[musicIndex]);
}


music.addEventListener("timeupdate", function () {
    progressIn.style.width = music.currentTime / music.duration * 100 + "%";
});
progressBar.addEventListener('click', setProgress);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('ended',nextSong);

window.addEventListener("load", function () {
    randomMusic();
    load(songs[musicIndex]);
});



const video=document.getElementById('video');
const play=document.getElementById('play');
const stop=document.getElementById('stop');
const progress=document.getElementById('progress');
const time=document.getElementById('time');

function playPauseVideo(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
};
function updateIcons(){
    if(video.paused){
        play.innerHTML='<i class="fa fa-play fa-2x"></i>';
    }
    else{
        play.innerHTML='<i class="fa fa-pause fa-2x"></i>';
    }
};
function updateProgress(){
    progress.value=(video.currentTime/video.duration)*100;
    let minutes=Math.floor(video.currentTime/60);
    if(minutes <10){
        minutes='0'+String(minutes);
    }
    let seconds= Math.floor(video.currentTime%60);
    if(seconds<10){
        seconds='0'+String(seconds);
    }
    time.innerHTML = `${minutes}:${seconds}`;


};
function stopVideo(){
    video.currentTime=0;
    video.pause();
};
function updateVideoProgress(){
    video.currentTime=(progress.value*video.duration)/100;
};


video.addEventListener('click',playPauseVideo);
video.addEventListener('pause', updateIcons);
video.addEventListener('play', updateIcons);
video.addEventListener('timeupdate',updateProgress);
play.addEventListener('click',playPauseVideo);
stop.addEventListener('click',stopVideo);
progress.addEventListener('change',updateVideoProgress);
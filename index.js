let arr = [
    {
      "id": "0",
      "author": "Beyonce",
      "name": "Don't Hurt Yourself",
      "img": "./assets/img/lemonade.png",
      "audio": "./assets/audio/beyonce.mp3",
      "durationTrack": "3:54"
    },
    {
      "id": "1",
      "author": "Dua Lipa",
      "name": "Don't Start Now",
      "img": "./assets/img/dontstartnow.png",
      "audio": "./assets/audio/dontstartnow.mp3",
      "durationTrack": "3:24"      
    },
    {
      "id": "2",
      "author": "Plazma",
      "name": "Take My Love",
      "img": "./assets/img/takemylove.jpg",
      "audio": "./assets/audio/plazma.mp3",
      "durationTrack": "3:43"      
    }
]

let index=0;
let indexPlayPause=0;

document.querySelector('.play').onclick = play;
document.querySelector('.next').onclick = next;
document.querySelector('.prev').onclick = prev;
document.querySelector('#audio-player').ontimeupdate = progressUpdate;
document.querySelector('#progress').onclick = audioRewind;
document.querySelector('#volume').oninput = audioVolume;

function play(){
  if (indexPlayPause===0){
    document.querySelector('.play').classList.toggle('pause');
    document.querySelector('#audio-player').play();
    indexPlayPause=1;
  } else if (indexPlayPause===1) {
    document.querySelector('.play').classList.toggle('pause');
    document.querySelector('#audio-player').pause();
    indexPlayPause=0;
  }
}

function next(){
  index++;
  if (index===arr.length){
    index=0;
  }
  document.querySelector('#audio-player').currentTime=0;
  document.querySelector('#out').innerHTML="0:0";
  document.querySelector('#progress').value=0;

  document.querySelector('.container').style.backgroundImage=`url('${arr[index].img}')`;
  document.querySelector('.image').style.backgroundImage=`url('${arr[index].img}')`;
  document.querySelector('.author').innerHTML=`${arr[index].author}`;
  document.querySelector('.track-name').innerHTML=`${arr[index].name}`;
  document.querySelector('#audio-player').src=`${arr[index].audio}`;
  document.querySelector('#duration-track').innerHTML=`${arr[index].durationTrack}`;

  if(document.querySelector('.play').classList.contains('pause')){
    document.querySelector('#audio-player').play();
  }
}

function prev(){
  index--;
  if (index===-1){
    index=arr.length-1;
  }
  document.querySelector('#audio-player').currentTime=0;
  document.querySelector('#out').innerHTML="0:0";
  document.querySelector('#progress').value=0;

  document.querySelector('.container').style.backgroundImage=`url('${arr[index].img}')`;
  document.querySelector('.image').style.backgroundImage=`url('${arr[index].img}')`;
  document.querySelector('.author').innerHTML=`${arr[index].author}`;
  document.querySelector('.track-name').innerHTML=`${arr[index].name}`;
  document.querySelector('#audio-player').src=`${arr[index].audio}`;
  document.querySelector('#duration-track').innerHTML=`${arr[index].durationTrack}`;

  if(document.querySelector('.play').classList.contains('pause')){
    document.querySelector('#audio-player').play();
  }
}

function progressUpdate(){
  let d = document.querySelector('#audio-player').duration;
  let c = document.querySelector('#audio-player').currentTime;
  document.querySelector('#progress').value = (100 * c) / d;

  let minutes=Math.floor(document.querySelector('#audio-player').currentTime/60);
  let seconds=Math.ceil(document.querySelector('#audio-player').currentTime%60);
  if (seconds===60){
    seconds = 0;
    document.querySelector('#out').innerHTML=`${minutes+1}:${seconds}`;
  } else {
    document.querySelector('#out').innerHTML=`${minutes}:${seconds}`;
  } 
  if(document.querySelector('#audio-player').currentTime===document.querySelector('#audio-player').duration){
    next();
  } 
}

function audioRewind(){
  let w=this.offsetWidth;
  let o=event.offsetX;
  this.value = 100 * o / w;
  // document.querySelector('#audio-player').pause();
  document.querySelector('#audio-player').currentTime = document.querySelector('#audio-player').duration * (o/w);
  // document.querySelector('#audio-player').play();
}

function audioVolume(){
  document.querySelector('#audio-player').volume= this.value/100;
}
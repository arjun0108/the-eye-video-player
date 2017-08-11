// Video Player - An open source project

var supportsVideo = !!document.createElement('video').canPlayType;
if(supportsVideo){

	//Setting Up Custom Controls
	var videoControlsAndProgress = document.getElementById('videoControlsAndProgress');
	var videoContainer = document.getElementById('videoContainer');
	var video = document.getElementById('video');
	var playPause = document.getElementById('playPause');
	var stop = document.getElementById('stop');
	var time = document.getElementById('time');

	//Hide "default" video-controls
	video.controls = false;

	//Show "Custom" Video-Controls
	videoControlsAndProgress.style.display = 'block';

	//On Video (Trigger Play/Pause Events onClick)

	video.addEventListener('click', function(){
		playPauseFun();
	});

	//Play/Pause Button event handler
	playPause.addEventListener('click', function(){
		playPauseFun();
	});

	//Stop Button Event Handler
	stop.addEventListener('click', function(){
		video.pause();
		video.currentTime = 0;
		progress.value = 0;
		setPlayPauseData(false);
	});

	//Time (Video Duration)

	video.addEventListener('canplay', function(){
	    time.innerHTML = getTime();
	}, false);

	function getTime(){
        var seconds = Math.round(video.currentTime);
        var minutes = Math.floor(seconds/60);
        if(minutes > 0) seconds -= minutes*60;
        if(seconds.toString().length === 1) seconds = '0' + seconds;
        if(minutes.toString().length === 1) minutes = '0' + minutes;
        
        var totalSeconds = Math.round(video.duration);
        var totalMinutes = Math.floor(totalSeconds/60);
        if(totalMinutes > 0) totalSeconds -= totalMinutes*60;
        if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;
        if(totalMinutes.toString().length === 1) totalMinutes = '0' + totalMinutes;

        return minutes + ':' +seconds + ' / ' +  totalMinutes + ':' + totalSeconds;
    }

    //Updating the time
    video.addEventListener('timeupdate', function(){
    	time.innerHTML = getTime();
    });




	//Functions or Handlers

	// Set the play button state (True = if playing, False = if not playing)
        var setPlayPauseData = function(state){
            playPause.setAttribute('data-play', !!state);
        }
        
        var isPlayPause = function() {
            return !!(video.pause || video.ended);
        }
        
        var handlePlayPause = function() {
            if (isPlayPause()) {
                setPlayPauseData(true);
            }
            else {
                setPlayPauseData(false);
            }
        }
        

	//Play/Pause Function
	function playPauseFun(e){
        handlePlayPause();
        if (video.paused || video.ended){
            setPlayPauseData(true);
            video.play();
        } 
        else if(video.play){ 
            setPlayPauseData(false);
            video.pause();
        }
        else if(video.ended){
            setPlayPauseData(false);
        }
    }


}
/*
var timeout;
videoContainer.onmousemove = function(){
	videoControlsAndProgress.style.display='block';
	clearTimeout(timeout);
  	timeout = setTimeout(function(){videoControlsAndProgress.style.display='none';}, 2500);
}
*/
// Jquery Events 

$(document).ready(function(){
	var timeout;
	$('#videoContainer').on('mousedown, mouseup', function(){
		$('#videoControlsAndProgress').css({'display':'block'});
	   	clearTimeout(timeout);
		timeout = setTimeout(function(){ $('#videoControlsAndProgress').fadeOut(500);}, 2500);
	});

	$('#videoContainer').mousemove(function(){
		$('#videoControlsAndProgress').css({'display':'block'});
		clearTimeout(timeout);
		timeout = setTimeout(function(){ $('#videoControlsAndProgress').fadeOut(500);}, 2500);
	});
});
// Video Player - An open source project

var supportsVideo = !!document.createElement('video').canPlayType;
if(supportsVideo){

	//Setting Up Custom Controls
	var videoTopBar = document.getElementById('videoTopBar');
	var videoName = document.getElementById('video-name');
	var videoSource = document.getElementById('videoSource');
	var videoControlsAndProgress = document.getElementById('videoControlsAndProgress');
	var videoContainer = document.getElementById('videoContainer');
	var video = document.getElementById('video');
	var playPause = document.getElementById('playPause');
	var stop = document.getElementById('stop');
	var time = document.getElementById('time');
	var fullscreen = document.getElementById('fs');

	// Top Bar Stuff
	console.log(videoSource.src.slice(0,-4))

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

        checkPos(minutes,seconds, totalMinutes, totalSeconds);
        return minutes + ':' +seconds + ' / ' +  totalMinutes + ':' + totalSeconds;
    }

    //Check whether video is complete or not
    //If completed, then change the play button to pause button
    function checkPos(min, sec, totalMin, totalSec) {
    	if((min===totalMin) && ((sec)===totalSec)) 
    	{
    		setPlayPauseData(false);
    	}
    }

    //Updating the time
    video.addEventListener('timeupdate', function(){
    	time.innerHTML = getTime();
    });

    // Check if the browser supports the Fullscreen API
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

    // If the browser doesn't support the Fulscreen API then hide the fullscreen button
    if (!fullScreenEnabled) {
      fullscreen.style.display = 'none';
    }

     // Set the video container's fullscreen state
        var setFullscreenData = function(state) {
            videoContainer.setAttribute('data-fullscreen', !!state);
        }
        
        // Checks if the document is currently in fullscreen mode
        var isFullScreen = function() {
            return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
        }

        // Fullscreen
        var handleFullscreen = function() {
            // If fullscreen mode is active...	
                if (isFullScreen()) {
                    // ...exit fullscreen mode
                    if (document.exitFullscreen) document.exitFullscreen();
                    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                    else if (document.msExitFullscreen) document.msExitFullscreen();
                    setFullscreenData(false);
                }
                else {
                  // ...otherwise enter fullscreen mode
					if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
                  	else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
                  	else if (videoContainer.webkitRequestFullScreen) {
						video.webkitRequestFullScreen();
						video.removeAttribute("controls");
                    }
                    else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
                    setFullscreenData(true);
                }
        }

        fs.addEventListener('click', function(e) {
   			handleFullscreen();
   		});
        
        document.addEventListener('fullscreenchange', function(e) {
   			setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
   		});
   		document.addEventListener('webkitfullscreenchange', function() {
   			setFullscreenData(!!document.webkitIsFullScreen);
   		});
   		document.addEventListener('mozfullscreenchange', function() {
   			setFullscreenData(!!document.mozFullScreen);
   		});
   		document.addEventListener('msfullscreenchange', function() {
   			setFullscreenData(!!document.msFullscreenElement);
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

    function handleKeyPress(event) {
        var x = event.which;
        if(x=='32'){
            playPauseFun(e);
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
		$('#videoControlsAndProgress').fadeIn(350);
		$('#videoTopBar').fadeIn(350);
	   	clearTimeout(timeout);
		timeout = setTimeout(function(){ 
			$('#videoControlsAndProgress').fadeOut(500);
			$('#videoTopBar').fadeOut(500);
		}, 1200);
	});

	$('#videoContainer').mousemove(function(){
		$('#videoControlsAndProgress').fadeIn(350);
		$('#videoTopBar').fadeIn(350);
		clearTimeout(timeout);
		timeout = setTimeout(function(){ 
			$('#videoControlsAndProgress').fadeOut(500);
			$('#videoTopBar').fadeOut(500);
	}, 1200);
	});
});
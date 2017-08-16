// Video Player - An open source project

$(document).ready(function(){
	$("#video, #playPause").click(function(){
		if($("#video").get(0).paused){
			$("#centerPlayPause").addClass("fa-pause");
			$("#centerPlayPause").removeClass("fa-play");
			$("#centerPlayPause").fadeIn(100).fadeOut(200);
		}
		else{
			$("#centerPlayPause").addClass("fa-play");
			$("#centerPlayPause").removeClass("fa-pause");
			$("#centerPlayPause").fadeIn(100).fadeOut(200);
		}
	});

/*
	$("#videoContainer").keydown(function(event){ 
    	if(event.which=='32')
		{
			alert("Space bar is pressed!")
		}
    });
*/
});
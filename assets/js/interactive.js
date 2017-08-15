// Video Player - An open source project

$(document).ready(function(){
	$("#videoContainer").keydown(function(event){ 
    	if(event.which=='32')
		{
			alert("Space bar is pressed!")
		}
    });
});
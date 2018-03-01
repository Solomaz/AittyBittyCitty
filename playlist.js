var tracklist = {
	title: [
	"NightRise",
	"Cherry",
	"Happiness,Free,For Everyone, and Let No One Be Forgotten"
	],
	artist: [
	"Jen East",
	"Nctrnm",
	"ROZKOL"
	]
}

var trackNum = 1;

function playlist(){


	addText("'" + tracklist.title[trackNum] + "' by " + tracklist.artist[trackNum], "white");


}

function bumpList(dir){
	trackNum +=dir;
	if(trackNum < 0) {
		trackNum = tracklist.title.length-1;
	}
	if(trackNum > tracklist.title.length-1) {
		trackNum = 0;
	}
}
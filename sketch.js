var ma;
var gravity = 0.15;
var zoomOut = 4;
var objs = [];
var img =[];
var windSpeed = 0;
var textures ={
	logo: 'assets/logo.png',
	dirt: 'assets/dirt.png'
}

function preload() {

	img[0] = loadImage(textures.logo);
	img[1] = loadImage(textures.dirt);
	ma = atan(1/sqrt(2));
	camZoom.byVol = 0;
	canvasView.rotation.x = ma;
	canvasView.rotation.dir.x = -1;
	canvasView.rotation.limit.x = ma;
	pixelDensity(2);
	frameRate(60);
	spawn();
}

function setup() {
	createCanvas(920,640, WEBGL);
	ortho( width*zoomOut, -width*zoomOut, height*zoomOut, -height*zoomOut, -width * zoomOut, width * zoomOut);
 	pointLight(255,255,255, 0, height*zoomOut, 0);

 	playlist();
}

function startFlash() {
	canvasView.logoflash = true;
	console.log("Start Flashing!");
}

function flashLogo(){
		
	canvasView.rotation.x += (QUARTER_PI/256) * canvasView.rotation.dir.x;

	if(canvasView.rotation.x >= canvasView.rotation.limit.x && canvasView.rotation.dir.x == 1 ){
		canvasView.rotation.dir.x = -1;
		canvasView.logoflash = false;
	}
	if(canvasView.rotation.x < -canvasView.rotation.limit.x  && canvasView.rotation.dir.x == -1){
		canvasView.rotation.dir.x = 1;
	}
}

function dayNightCycle() {
	if(daycycle.sun == "rise") {
		daycycle.time += daycycle.speed;
	 	if(daycycle.time >= daycycle.midDay){daycycle.sun = "set";}
	} else if(daycycle.sun == "set") {
		daycycle.time -= daycycle.speed;
		if(daycycle.time <= daycycle.midNight){daycycle.sun = "rise";}
	}
}

setInterval( startFlash,60000);

function draw() {

	visualize();

	dayNightCycle();

	background( 0 , daycycle.time, daycycle.time);
	pointLight( 255,255,255, 0, 1000, 0);//daycycle.time, daycycle.time , daycycle.time , 0, 1100, 0);
	ambientLight( daycycle.time );

	//increase zoom distance out by avrgVolume incrementally and shirnk by gravity
	camZoom.inc -= (avrgVolume * 0.0000041);
	camZoom.inc += gravity *0.5;
	if(camZoom.inc <= 1) camZoom.inc = 1;
	if(camZoom.inc >= 1.5) camZoom.inc = 1.5;

	//console.log("Inc " + camZoom.inc);
	camZoom.byVol = Math.max( camZoom.inc, 1);
	ortho( width*zoomOut * camZoom.byVol, -width*zoomOut * camZoom.byVol,
		height*zoomOut * camZoom.byVol, -height*zoomOut*camZoom.byVol,
		 -width * zoomOut * camZoom.byVol, width * zoomOut * camZoom.byVol);

	if(canvasView.logoflash)
	flashLogo();

//canvasView offset
	canvasView.rotation.y += (QUARTER_PI/512);
	//canvasView.rotation.z += (QUARTER_PI/256);

	rotateX( canvasView.rotation.x );
	rotateY(-(QUARTER_PI + canvasView.rotation.y)  );
	//rotateZ(canvasView.rotation.z);
	//orbitControl();
	translate(0, -(height* 2), 0);

	//Wind
	windSpeed = avrgVolume * 0.000125;

	//Car movement
	//car.pos.z = -(canvasView.rotation.x  * 12);

	//Terrain update and draw
	if(objs.length > 0) {
		for(let b = 0; b < objs.length; b++){
			if(objs[b] != null) {		
				objs[b].update();
			}
		}
	}
	if(objs.length > 0) {
		for(let b = 0; b < objs.length; b++){
			if(objs[b] != null) {		
				objs[b].draw();
			}
		}
	}

	drawParticles();
}
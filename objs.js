var obj = {
	color: { r:200, g: 0, b: 255, a: 255},
	pos: { x: 0, y: 0, z: 0},
	velocity: { x: 0, y: 0, z: 0},
	maxVel: { x: 100, y: 300, z: 100},
	radius: 36,
	mass: 1,
	bounce: 0.25,
	dimes: { x: 24, y:24, z:24}
};

var hidden = {
	color:{r:0,g:0,b:0,a:0}
};

var camZoom = {
	byVol: 0,
	inc: 1
};

var canvasView = {
	rotation: {
		x:0,
		y:0,
		z:0,
		dir: {x:-1,y:1,z:1},
		limit:{x:0,y:0,z:0}
	},
	logoflash: false
};

var daycycle = {
	sun: "rise",
	time: 25.0,
	speed: 0.125,
	midNight: 25,
	midDay: 225
};

var clouds = { 
	pos: {x:0,y:0,z:0},
	velocity: { x: 1, y: 0, z: 0},	
	maxVel: { x: 100, y: 300, z: 100},
	floatSpeed: 20,
	color: {r:235,g:235,b:235,a:50},
	lowerdimes: {x:300,y:50,z:300},
	upperdimes: {x:800,y:150,z:800}
};

var building = { 
	pos: {x:0,y:0,z:0},
	color: {r:180,g:180,b:200,a:255},
	dimes: {x:600,y:400,z:1600}
};

var tree = {
	trunk: {
		lowerdimes: {x:50,y:100,z:50},
		upperdimes: {x:100,y:250,z:100},
		color: {r:255,g:200,b:80,a:255} 
	},
	branch: { 
		lowerdimes: {x:150,y:100,z:150},
		upperdimes: {x:400,y:300,z:400},
		color: {r:60,g:200,b:0,a:255}
	}
};

var car = { 
	pos: {x:0,y:0,z:0},
	speed: 1,
	direction: 1,
	tirecolor: {r:0,g:0,b:0,a:255},
	color: {r:200,g:50,b:50,a:255},
	tiredimes: {x:25,y:25,z:25},
	botdimes: {x:125,y:75,z:300},
	topdimes: {x:125,y:50,z:100}
};

var strip = { 
	pos: {x:0,y:0,z:0},
	color: {r:255,g:255,b:0,a:255},
	dimes: {x:25,y:2,z:150}
};

var street = {
	pos: {x:0,y:0,z:0},
	color: {r:75,g:75,b:75,a:255},
	dimes: {x:600,y:50,z:2200}
};
var sidewalk = {
	pos: {x:0,y:0,z:0},
	color: {r:128,g:128,b:128,a:255},
	dimes: {x:140,y:25,z:240}
};

var grass = {
	color: {r:160,g:200,b:60,a:255},
	dimes: {x:140,y:100,z:265}
};

var dirt = {
	color: {r:140,g:120,b:100,a:255},
	dimes: {x:140,y:100,z:265}
};
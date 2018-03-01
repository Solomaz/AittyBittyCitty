function object( name, id, shape, incolor, pos, vel, maxVel, mass, radius, dimes, breathes, area, yOff, speed, foundations){

	//objs[this.id] = new AAO();

	this.name = name;
	this.id = id;
	this.shape = shape;
	this.color = incolor;
	this.pos = pos;
	this.offsets = { x: 0, y:0, z: 0};
	this.velocity = vel;
	this.maxVel = maxVel;
	this.mass = Math.max( 0.25, 24 - (this.id * 0.25));// mass; //
	this.radius = radius;
	this.dimes = dimes;
	this.bounce = {x:0.1,y: 0.12, z:0.1};
	this.randOff = { x: 0, y:0, z: 0, dir:0};
	this.heightOff = dimes.y;
	this.scale = {x:1,y:1,z:1};
	this.breathes = breathes;
	this.bump = 0;
	this.area = area;
	this.yOff = yOff;
	this.speed = speed;
	this.foundations = foundations || [];
	this.getRandomPosOffset = function() {
		this.randOff.x = random(0.5,2);
		this.randOff.y = random(-1,1);
		this.randOff.z = random(1,2);
		this.randOff.dir = random(-1,1);		
	}

	this.outPOS = {x:0,y:0,z:0};

	//Special Initializtion cases
	if(this.name.includes("cloud")){
		this.getRandomPosOffset();
	}
	if(this.name.includes("car")){
		this.offsets = this.pos;
	}


	this.terrain = function() {

		let d2floorTer = round(dist(this.pos.x, this.pos.y, this.pos.x,this.pos.y + this.heightOff));
		let restingH = this.dimes.y/4;
		let hlfH = restingH/2;		
		let strechedH = this.dimes.y;
		let rangeY = strechedH - restingH;

		this.velocity.y -= this.mass * gravity;

		if(resSetting > 0 && d2floorTer <= restingH + hlfH) {
			this.velocity.y += this.bump * this.bounce.y;
		}

		if( this.velocity.y < -this.maxVel.y) this.velocity.y = -this.maxVel.y;	
		if( this.velocity.y > this.maxVel.y) this.velocity.y = this.maxVel.y;

		this.heightOff += this.velocity.y;

		if(this.heightOff <= restingH) { this.heightOff = restingH; }//this.velocity.y *= -this.bounce.y; }
		if(this.heightOff >= strechedH) { this.heightOff = strechedH; }//this.velocity.y *= -this.bounce.y; }

		let normBounce = this.heightOff / rangeY;

		if(this.name.includes("clouds")){
			var halfBounce = normBounce * 0.5;
			this.scale.y = halfBounce;
			this.scale.x = halfBounce;
			this.scale.z = halfBounce;
		} else {

			this.scale.y = normBounce;

			if(this.breathes) {
				this.scale.x =  1 + (normBounce * this.bounce.x);
				this.scale.z = 1 + (normBounce * this.bounce.z);
			}
		}
	}

	this.stripVolume = function() {
		let bumpSV = 0;
		if(resSetting > 0) {

			bumpSV = freqHeights[ this.id ];
			if(bumpSV < 170) { bumpSV = 0; }

			this.color.r = 128 + (bumpSV * (this.id * 0.5) * this.bounce.y);
			this.color.g = this.color.r;
		}
	}

	this.mmhcloudy = function(){

		 this.pos.x += windSpeed * this.randOff.x;
		// this.pos.y += this.speed * this.randOff.y * 0.25;
		 //this.pos.z += windSpeed * this.randOff.z;

		if(this.pos.x > this.area.x || this.pos.x < -this.area.x ||
			this.pos.y > this.area.y + this.yOff || this.pos.y < this.area.y - yOff ||
			this.pos.z > this.area.z || this.pos.z < -this.area.z) {

			if(this.bump > 170) {
				this.speed = this.bump / 40;
				this.color.a = Math.max(clouds.color.a, this.bump / 5);
				if(this.color.a < 15){this.color.a = 15;}
			}
			this.getRandomPosOffset();

			this.pos.x = -(this.area.x );
			//this.pos.x = random(-(this.area.x - 50), (this.area.x - 50) );
			this.pos.y = random(this.area.y - this.yOff, this.area.y + this.yOff);
			this.pos.z = random(-(this.area.z - 50), (this.area.z - 50));

			let sX = random(clouds.lowerdimes.x,clouds.upperdimes.x);
			let sY = random(clouds.lowerdimes.y,clouds.upperdimes.y);
			let sZ = random(clouds.lowerdimes.z,clouds.upperdimes.z);

			this.dimes = {x: sX, y: sY, z: sZ};

		}
	}

	this.update = function() {

		this.outPOS.y = this.pos.y;

		this.bump = freqHeights[ this.id ];

		if(this.bump < 170) { this.bump = 0; }

		if(this.name.includes( "terrain")){
			this.terrain();
		}
		// if(this.name.includes("car")) {
		// 	this.pos.z = car.pos.z + this.offsets.z;
		// }
		if(this.name.includes( "light") ){
			this.stripVolume();
		}
		if(this.name.includes( "clouds") ){
			this.mmhcloudy();
		}

		if(this.foundations.length > 0) {
			this.outPOS.y = 0;

			for(let nl = 0 ; nl < this.foundations.length; nl++){
				var base = this.foundations[nl];
		 		if(base < this.id) {
					var base = this.foundations[nl];
					this.outPOS.y += objs[base].pos.y + (objs[base].dimes.y * objs[base].scale.y);
		 		}
			}
		}
	}

	this.draw = function() {
		//draw
		push();

		var outTransOff = ((this.dimes.y * this.scale.y)/2);

		translate(this.pos.x, this.outPOS.y + outTransOff,this.pos.z);

		if(this.name.includes("sidewalk")){
			strokeWeight(5);
			stroke(0);//sidewalk.color/2);
		} else {
			noStroke();
		}

		if(this.name.includes( "spec") ){
			specularMaterial( this.color.r, this.color.g, this.color.b, this.color.a);
		}else if(this.name.includes( "norm") ) {
			normalMaterial();		
		} else {
			ambientMaterial( this.color.r, this.color.g, this.color.b, this.color.a);
		}

		if(this.name.includes("img")) {
			texture(img[0]);
		}

		var outV = createVector( 
			this.dimes.x * this.scale.x,
			this.dimes.y * this.scale.y,
			this.dimes.z * this.scale.z);
		if(outV.x < 0) {outV.x = 0;}
		if(outV.y < 0) {outV.y = 0;}
		if(outV.z < 0) {outV.z = 0;}

		if(this.shape == "sphere") {
			sphere(this.radius);
		} else if(this.shape == "box") {
			box(outV);
		} else if(this.shape == "cone") {
			cone((this.dimes.x/2) * this.scale.x, this.dimes.y * this.scale.y);
		} else if(this.shape == "cylinder") {
			cylinder(this.dimes.x * this.scale.x, this.dimes.y * this.scale.x);
		}

		pop();
	}
}

class AAO{

	constructor() {

	}
}
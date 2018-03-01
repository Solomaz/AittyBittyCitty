var particles = [];

function drawParticles() {
	if(freqHeights[10] > 170){

	var randCount = random(2,10);
	for(var cnt = 0; cnt < randCount; cnt++) {
		let p = new Particle();
			particles.push(p);
		}
	}

	particles.sort((a,b) => a.alpha - b.alpha);

	for(let part of particles){
		part.update();
		part.show();
	}

	particles = particles.filter(p => !p.finished());

//Find and display center of particles
	// let sumV = createVector(-650,300,700);
	// if(particles.length > 0) {
	// 	sumV = particles.reduce((v,p) => v.add(p.x,p.y,p.z), createVector(0,0,0));
	// 	sumV.div(particles.length);
	// }

	// push();
	// translate(sumV.x,sumV.y,sumV.z);
	// noStroke();
	// fill(255,0,0);
	// sphere(25);
	// pop();
}

class Particle {

	constructor() {
		//this.startPos = objs[36].pos;
		this.x = -650;//this.startPos.x;
		this.y = 300;//this.startPos.y;
		this.z = 700;//this.startPos.z;

		this.col = random(50,80);
		this.alpha = 50;
		this.radius = random(25, 100);

	}

	update() {
		this.x += random(-50,50);
		this.y += random(25,50);
		this.z += random(-50,50);

		this.alpha -= 1;
		this.radius -= 1;

	}
	show() {
		push();
		translate(this.x, this.y, this.z);
		noStroke();
		fill(this.col, this.col, this.col, this.alpha);
		box(this.radius);
		//sphere(this.radius );
		pop();
	}
	finished() {
		return this.alpha < 0;
	}
}
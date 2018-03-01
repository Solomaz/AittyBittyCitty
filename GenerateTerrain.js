function Generate(type, amt, start, yOff, jumps, expands, dir, dimes, layer, shape) {

	var startID = objs.length;
	var bldID;
	var outBldPos;
	var outShape;
	var outBldDimes;
	var outBldColor;
	var outBldName;
	var outBase = layer.slice();
	var outYOff;

	if (type == "clouds") {
		let cloudID = objs.length;

		for(let clds = 0; clds < amt; clds++){

			let cX = random(-start.x, start.x);
			let cY = random(start.y - yOff, start.y + yOff);
			let cZ = random(-start.z, start.z);

			let sX = random(clouds.lowerdimes.x,clouds.upperdimes.x);
			let sY = random(clouds.lowerdimes.y,clouds.upperdimes.y);
			let sZ = random(clouds.lowerdimes.z,clouds.upperdimes.z);
			//Clouds
			objs[cloudID] = new object( 
				"clouds terrain", cloudID,
				"box", clouds.color,
				{x:cX,y:cY,z:cZ},
				clouds.velocity, clouds.maxVel,
				0.25, 300,
				{x:sX,y:sY,z:sZ}, true,
				start, yOff, clouds.floatSpeed);
			cloudID++;
		}
	}

	if(type == "sidewalk") {
		//var baseID = objs.length-1;
		var swID = objs.length;
		var outPos = {x:0,y:0,z:0};
		var outDimes = {x:sidewalk.dimes.x,y:50,z:sidewalk.dimes.z};
		var outColor = {r:255,g:0,b:255,a:255};
		var outName = "terrain";

		var lowerBase = layer;
		var upperBase = [];

		for( var i = 0; i < layer.length; i++) {
			upperBase[i] = layer[i];
		}

		for(let sws = 0; sws < amt*2; sws++){
			
			var newBase = [];

			var modS = sws % 2;

			if(modS < 1) {
				outPos.y = -(sidewalk.dimes.y/3);
				outDimes.y = sidewalk.dimes.y;
				outName = "terrain";
				outColor = hidden.color;
				outBase = lowerBase;			
				upperBase[layer.length] = swID;
			} else if(modS > 0) {
				outPos.z += (sidewalk.dimes.z) * dir;
				outName = "sidewalk ";
				outDimes.y = sidewalk.dimes.y;
				outColor = sidewalk.color;
				outBase = upperBase;
			
			}

			for( var i = 0; i < outBase.length; i++) {
				newBase[i] = outBase[i];
			}

			objs[swID] = new object( outName, swID,
			"box", outColor,
			{x:start.x, y: start.y + outPos.y, z: start.z + outPos.z },
			{ x: 0, y: 0, z: 0},{ x: 300, y: 300, z: 300},
			0.5, 300,
			{x:outDimes.x,y:outDimes.y,z:outDimes.z},
			false,
			{x:0,y:0,z:0}, 0, 0,
			newBase);

			swID++;

		}
	}

	if(type == "tree") {
		bldID = objs.length;
		outBldPos = {x:0,y:0,z:0};
		outBldName = "terrain tree";

		var randTX;
		var randTY;
		var randBX;
		var randBY;


		if(dimes == null || dimes == {} || dimes == "random") {
			randTX = random(tree.trunk.lowerdimes.x, tree.trunk.upperdimes.x);
			randTY = random(tree.trunk.lowerdimes.y, tree.trunk.upperdimes.y);

			randBX = random(tree.branch.lowerdimes.x, tree.branch.upperdimes.x);
			randBY = random(tree.branch.lowerdimes.y, tree.branch.upperdimes.y);	
		} else {
			randTX = dimes.x/2;
			randTY = dimes.y/2;
			randBX = dimes.x;
			randBY = dimes.y;
		}

		outBldDimes = {x:randTX,y:randTY,z:randTX};

		for(let sws = 0; sws < amt; sws++){
			
			if(sws=== 0) {
				outBldColor = tree.trunk.color;

			} else if(sws == 1){
				outBldColor = tree.branch.color;
				outBldDimes = {x:randBX,y:randBY,z:randBX};

				outBase[outBase.length] = bldID-1;
			} else {

				outBase[outBase.length] = bldID-1;
			}

			objs[bldID] = new object( outBldName, bldID,
				 "box", outBldColor,
				  {x:start.x + outBldPos.x, y: start.y + outBldPos.y, z: start.z + outBldPos.z },
				  { x: 0, y: 0, z: 0},{ x: 300, y: 300, z: 300},
				  0.5, 300,
				  {x:outBldDimes.x,y:outBldDimes.y,z:outBldDimes.z},
				  expands,
				  {x:0,y:0,z:0}, 0, 0,
				  outBase);
			bldID++;

			outBldDimes.x -= 100;
			outBldDimes.z = outBldDimes.x;
			outBldDimes.y *= 0.6;

			if(outBldDimes.x <= 25) {
				outBldDimes.x = 25;
			}			
			if(outBldDimes.y <= 25) {
				outBldDimes.y = 25;
			}
			if(outBldDimes.z <= 25) {
				outBldDimes.z = 25;
			}
		}

	}

	if(type == "building") {

		bldID = objs.length;
		outBldPos = {x:0,y:0,z:0};
		outBldDimes = {x:dimes.x,y:50,z:dimes.z};
		outBldColor = {r:255,g:0,b:255,a:255};
		outBldName = "terrain building spec";
		outBase = layer.slice();

		for(let sws = 0; sws < amt; sws++){
			
			if(sws=== 0) {
				outBldColor = building.color;
			} else if(sws == 1){
				outBldColor = building.color;
				outBldDimes.y = dimes.y;
				outBase[outBase.length] = bldID-1;
			} else {
				outBase[outBase.length] = bldID-1;
			}

			objs[bldID] = new object( outBldName, bldID,
				 "box", outBldColor,
				  {x:start.x + outBldPos.x, y: start.y + outBldPos.y, z: start.z + outBldPos.z },
				  { x: 0, y: 0, z: 0},{ x: 300, y: 300, z: 300},
				  0.5, 300,
				  {x:outBldDimes.x,y:outBldDimes.y,z:outBldDimes.z},
				  false,
				  {x:0,y:0,z:0}, 0, 0,
				  outBase);
			bldID++;

			if(yOff > 0) {
				outYOff = yOff;
			} else {
				outYOff = 100;
			}

			outBldDimes.x -= outYOff;
			outBldDimes.z -= outYOff;
			outBldDimes.y *= (outYOff * 0.006);

			if(outBldDimes.x <= 50) {
				outBldDimes.x = 50;
			}			
			if(outBldDimes.y <= 50) {
				outBldDimes.y = 50;
			}
			if(outBldDimes.z <= 50) {
				outBldDimes.z = 50;
			}
		}
	}

	if(type.includes("car") ) {

		objs[startID] = new object(
			type, startID, "box",
			car.tirecolor,
			{x:start.x + 50,y:start.y,z: start.z +100},
			{x:0,y:0,z:0}, obj.maxVel, 1,
			300, car.tiredimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			outBase);
		startID++;
		objs[startID] = new object(
			type, startID, "box",
			car.tirecolor,
			{x:start.x - 50,y:start.y,z:start.z - 100},
			{x:0,y:0,z:0}, obj.maxVel, 1,
			300, car.tiredimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			outBase);
		startID++;
		objs[startID] = new object(
			type, startID, "box",
			car.tirecolor,
			{x:start.x + 50,y:start.y,z: start.z - 100},
			{x:0,y:0,z:0}, obj.maxVel, 1,
			300, car.tiredimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			outBase);
		startID++;
		objs[startID] = new object(
			type, startID, "box",
			car.tirecolor,
			{x:start.x - 50,y:start.y,z: start.z + 100},
			{x:0,y:0,z:0}, obj.maxVel, 1,
			300, car.tiredimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			outBase);
		startID++;
		var carID = layer.slice();
		carID[carID.length] = startID-1;

		objs[startID] = new object(
			type, startID, "box",
			car.color,
			{x:start.x,y:start.y,z: start.z},
			{x:0,y:0,z:0}, obj.maxVel, 1,
			300, car.botdimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			carID);
		startID++;

		carID[carID.length] = startID-1;

		objs[startID] = new object(
			type, startID, "box",
			car.color,
			{x:start.x,y:start.y,z: start.z},
			{x:0,y:0,z:0}, obj.maxVel,
			2,
			300, car.topdimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			carID);
		startID++;
	}

	if(type == "strip")  {

		var streetID = layer.slice();

	//Stripe
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: 900},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: 600},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: 300},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: 0},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: -300},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: -600},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip light", startID, "box",
			strip.color,
			{x:250,y:25,z: -900},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, strip.dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		
		objs[startID] = new object(
			"strip ", startID, "box",
			{r:255,g:255,b:255,a:255},
			{x:25,y:25,z: 0},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, {x:strip.dimes.x,y:strip.dimes.y,z:dimes.z},
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
		objs[startID] = new object(
			"strip ", startID, "box",
			{r:255,g:255,b:255,a:255},
			{x:475,y:25,z: 0},
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, {x:strip.dimes.x,y:strip.dimes.y,z:dimes.z},
			false,
			{x:0,y:0,z:0}, 0, 0,
			streetID);
		startID++;
	}

	if(type.includes( "ground") ) {
		
		if(shape == null || shape == "") {
			outShape = "box";
		} else {
			outShape = shape;
		}

		if(type.includes("concrete")) {
			outBldColor = sidewalk.color;
		} else if(type.includes("grass")){
			outBldColor = grass.color;
		} else if(type.includes("dirt")){
			outBldColor = dirt.color;
		} else if(type.includes("street")){
			outBldColor = street.color;
		} else {
			outBldColor = obj.color;
		}

		objs[startID] = new object(
			type, startID, outShape,
			outBldColor,
			start,
			{x:0,y:0,z:0}, obj.maxVel, 2,
			300, dimes,
			false,
			{x:0,y:0,z:0}, 0, 0,
			layer);

	}
}
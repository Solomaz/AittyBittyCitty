function spawn(){

	var layers = [];

   	Generate("ground img", 				1, {x:0,y:0,z:0}, 			0,	true, true, 1, {x:2100,y:1,z:2100}, []);

    Generate("ground dirt terrain", 	1, {x:0,y:0,z: 0}, 			0,	true, true, 1, {x:2200,y:300,z:2200}, [0]) ;
    Generate("ground dirt terrain", 	1, {x:0,y:0,z: 0}, 			0, 	true, true, 1, {x:2300,y:400,z:2300}, [0,1]);

   	Generate("ground concrete terrain", 1, {x:-725,y:0,z: 0},		0, 	true, true, 1, {x:950,y:100,z:2400}, [0,1,2]);
   	Generate("ground street spec", 			1, {x:250,y: 0,z: 0}, 		0, 	true, true, 1, {x:700,y:50,z:2400}, [0,1,2]);
   	Generate("ground grass terrain", 	1, {x:900,y:0,z: 0}, 		0, 	true, true, 1, {x:600,y:100,z:2400}, [0,1,2]);

   	Generate("strip", 			1, {x:250,y: 0,z: 0}, 		0, 	true, true, 1, {x:700,y:100,z:2400}, [0,1,2, 4]);

	Generate("sidewalk",		10, {x:-175,y:0,z:1325},	0, 	true, false, -1, sidewalk.dimes, [0,1,2]);

   	Generate("car terrain spec",6, {x:100,y:0, z: 0}, 		0, 	true, true, 1, {}, [0,1,2,4] );

  	Generate("building", 		5, {x:-700,y:0, z: -700}, 		100, 	true, false, 1, {x:500,y:1000, z: 500}, [0,1,2,3] );
  	Generate("building", 		4, {x:-750,y:0, z: 0}, 			50, 	true, false, 1, {x:400,y:700, z: 600}, [0,1,2,3] );
   	Generate("building", 		1, {x:-800,y:0, z: 700}, 		150, 	true, false, 1, {x:300,y:400, z: 500}, [0,1,2, 3] );

  	Generate("tree", 			6, {x:950,y:0, z: -700},		0, 	true, true, 1, "random", [0,1,2,5] );
  	Generate("tree", 			4, {x:850,y:0, z: -400},		0, 	true, true, 1, "random", [0,1,2,5] );
  	Generate("tree", 			3, {x:900,y:0, z: -100},		0, 	true, true, 1, "random", [0,1,2,5] );
  	Generate("tree", 			4, {x:850,y:0, z: 200},			0, 	true, true, 1, "random", [0,1,2,5] );

  	Generate("building", 		3, {x:900,y:0, z: 500},			25, 	true, true, 1, {x:400,y:350, z: 400}, [0,1,2,5] );

   	Generate("tree", 			5, {x:900,y:0, z: 800},			0, 	true, true, 1, "random", [0,1,2,5] );

	Generate("clouds", 		   	8, {x:1200,y:2200,z:1200},	100, true, true, 1, clouds.lowerdimes, [0,1,2, 5] );

}
'use strict';

function makeCamera(position, fov = 75, near = 0.01, far = 100) {
	const aspect = 2;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(...position);
	return camera;
}

function makeLight(position, color = 0xFFFFFF, intensity = 1) {	
  	const light = new THREE.DirectionalLight(color, intensity);  	
  	light.position.set(...position);
  	return light;
}

function makeCube(size, color, position) {	
	const geometry = new THREE.BoxGeometry(size, size, size);	
	const material = new THREE.MeshPhongMaterial({color: color});
	const cube = new THREE.Mesh(geometry, material);
	cube.position.set(...position);
	return cube;
}

function getRandomInt(max) {
	return Math.floor(Math.random()*max)
}

function getRandomReal(min, max) {
	return Math.random()*(max - min) + min;
}

function getRandomColor() {
	const red = getRandomInt(256);
	const green = getRandomInt(256);
	const blue = getRandomInt(256);
	return `rgb(${red}, ${green}, ${blue})`;
}

function main() {
	const canvas = document.getElementById('canvas');
  	const renderer = new THREE.WebGLRenderer({canvas});

  	const camera = makeCamera([0, 0, 5]);	

	const scene = new THREE.Scene();

	const numOfCubes = 25;

	let cubes = [];

	for (let i = 0; i < numOfCubes; i++) {
		const cubeSize = getRandomReal(0.05, 1.5);
		const cubeColor = getRandomColor();		
		const cubePos = [getRandomReal(-3.0, 3.0), getRandomReal(-3.0, 3.0), getRandomReal(-1.0, 1.0)];
		cubes.push(makeCube(cubeSize, cubeColor, cubePos));
	}	

	for (const cube of cubes) {
		scene.add(cube);
	}	

	const light = makeLight([-1, 2, 4]);	
  	scene.add(light);

	function render(time) {
		ThreeUtil.fitRendererSizeToCanvas(renderer, camera);		

  		time *= 0.001;  // convert time to seconds
 
 		cubes.forEach((cube, index) => {
 			const speed = 1 + (index * 0.5)/numOfCubes;
    		const rot = time * speed;
 			cube.rotation.x = rot;
  			cube.rotation.y = rot;	
 		});
  		 
  		renderer.render(scene, camera);
 
  		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);	
}


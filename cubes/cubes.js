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

function main() {
	const canvas = document.getElementById('canvas');
  	const renderer = new THREE.WebGLRenderer({canvas});

  	const camera = makeCamera([0, 0, 5]);	

	const scene = new THREE.Scene();

	const cubes = [
		makeCube(1.0, 0x44aa88, [-2, -2, 0]),
		makeCube(2.0, 0x88aa44, [0, 0, 0]),
		makeCube(1.5, 0xaa4488, [2, 2, 0])
	];

	for (const cube of cubes) {
		scene.add(cube);
	}	

	const light = makeLight([-1, 2, 4]);	
  	scene.add(light);

	function render(time) {
		ThreeUtil.fitRendererSizeToCanvas(renderer, camera);		

  		time *= 0.001;  // convert time to seconds
 
 		cubes.forEach((cube, index) => {
 			const speed = 1 + index * 0.1;
    		const rot = time * speed;
 			cube.rotation.x = rot;
  			cube.rotation.y = rot;	
 		});
  		 
  		renderer.render(scene, camera);
 
  		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);	
}


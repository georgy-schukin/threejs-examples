'use strict';

var ThreeUtil = ThreeUtil || {};

(function (module) {

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function fitRendererSizeToCanvas(renderer, camera) {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
  		camera.aspect = canvas.clientWidth / canvas.clientHeight;
  		camera.updateProjectionMatrix();
	}	
}

module.fitRendererSizeToCanvas = fitRendererSizeToCanvas;

})(ThreeUtil);

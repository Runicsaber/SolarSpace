/* 
3 things always 

scene
camera
renderer

most geometry requires light source but basic materials dont
*/

import * as three from 'three';

//setting up the 3 main 'components'
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new three.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//renderer.render(scene, camera); //render scene and camera

const geometry = new three.TorusGeometry(10, 3, 16, 100);
const material = new three.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new three.Mesh(geometry, material);

scene.add(torus);

function mainAnimate() {
  requestAnimationFrame(mainAnimate);
  renderer.render(scene, camera);
}

mainAnimate();
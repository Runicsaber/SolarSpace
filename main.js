/* 
3 things always 

scene
camera
renderer

most geometry requires light source but basic materials dont

hyml acts as root

MAKE A GUI FOR THE APP!!!!!!!!!!!!!!!!!
*/

import * as THREE from 'three';
import { GUI } from 'dat.gui';


//setting up the main 'components'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//renderer.render(scene, camera); //render scene and camera



const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({color: 0x8B516A, wireframe: true}); //8B516A //0xB70AFA
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// const ambientLight = new THREE.ambientLight(0xFFFFFF);
// scene.add(ambientLight);

//setting background audio
const audioListener = new THREE.AudioListener();
camera.add(audioListener);

const bgAudio = new THREE.Audio(audioListener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/bgAudio.mp3', function(buffer) {
  bgAudio.setBuffer(buffer);
  bgAudio.setLoop(true);
  bgAudio.setVolume(0.1);
  bgAudio.play();
})

//DEV GUI 
const gui = new GUI();

const sphereData = {
  radius: 1,
  widthSegements: 8,
  heightSegements: 6,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
}

const sphereFolder = gui.addFolder('Sphere Geometry');
sphereFolder.add(sphereData, 'radius', 0, 30).onChange(regenerateSphere);
sphereFolder.add(sphere.material, 'wireframe');
// gui.add(bgAudio, 'setVolume', 0, 1).name('Background Audio Volume')
// sphereFolder.add(sphere.scale, 'y', 0, 50).name('Scale Y Axis');
// sphereFolder.add(sphere.scale, 'z', 0, 50).name('Scale Z Axis');



function regenerateSphere () {
  const newGeometry = new THREE.SphereGeometry(
    sphereData.radius,
    sphereData.widthSegments,
    sphereData.heightSegments,
    sphereData.phiStart,
    sphereData.phiLength,
    sphereData.thetaStart,
    sphereData.thetaLength
  )
  sphere.geometry.dispose();
  sphere.geometry = newGeometry
}

//main animation loop
function mainAnimate() {
  requestAnimationFrame(mainAnimate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);
}

mainAnimate();
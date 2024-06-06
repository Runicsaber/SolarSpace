/* 
3 things always 

scene
camera
renderer

most geometry requires light source but basic materials dont

hyml acts as root

MAKE A GUI FOR THE APP!!!!!!!!!!!!!!!!!
*/
import './style.css'

import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


//setting up the main 'components'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  // alpha: true
});

// const video = document.getElementById('bg-video');
// const bgVideoTexture = new THREE.VideoTexture(video);
// scene.background = bgVideoTexture;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(new THREE.Color('#110018'), 1)
camera.position.setZ(30);

//renderer.render(scene, camera); //render scene and camera


//creating sphere
const geometry = new THREE.SphereGeometry(15, 64, 64);
const material = new THREE.MeshStandardMaterial({color: 0x8B516A}); //8B516A //0xB70AFA
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//creating particles
const particleMaterial = new THREE.PointsMaterial({
  size: 0.005
})
const particleGeometry = new THREE.BufferGeometry;
const particleCount = 10000;

const posArr = new Float32Array(particleCount * 3) // TL;DR each arr is xyz, xyz, xyz, etc.

for (let i = 0; i < particleCount * 3; i++) {
  posArr[i] = (Math.random() - 0.5) * 200
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);

//creating Point Light
const pointLight = new THREE.PointLight(0xFFFFFF, 5);
pointLight.position.set(10, 10, 10)
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

//creating Helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight, 2, 0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

const orbitControls = new OrbitControls(camera, renderer.domElement);

//setting background audio
const audioListener = new THREE.AudioListener();
camera.add(audioListener);

const bgAudio = new THREE.Audio(audioListener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/bgAudio.mp3', function(buffer) {
  bgAudio.setBuffer(buffer);
  bgAudio.setLoop(true);
  bgAudio.setVolume(0.1);
  //bgAudio.play();
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

const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight.position, 'x', 0, 100).name('X Position');
pointLightFolder.add(pointLight.position, 'y', 0, 100).name('Y Position');
pointLightFolder.add(pointLight.position, 'z', 0, 100).name('Z Position');
pointLightFolder.add(pointLight,'intensity', 0, 100).name('Point Light Intensity');
pointLightFolder.add(pointLight, 'distance', 0, 100).name('Point Light Distance')



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



window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

window.addEventListener('fullscreenchange', () => {
  // sizes.width = window.innerWidth;
  // sizes.height = window.innerHeight;
  // camera.updateProjectionMatrix();
  // camera.aspect = sizes.width / sizes.height;
  // renderer.setSize(sizes.width, sizes.height);
  window.location.reload();
})

//main animation loop
function mainAnimate() {
  window.requestAnimationFrame(mainAnimate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);

  orbitControls.update();
}

mainAnimate();


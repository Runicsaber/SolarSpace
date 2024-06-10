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
renderer.setClearColor(new THREE.Color('#0b0010'), 1)
camera.position.setZ(30);

//renderer.render(scene, camera); //render scene and camera

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

//creating sun
const sunTexture = new THREE.TextureLoader().load('./assets/sunAssets/8k_sun.jpg')
//const sunNormalTexture = new THREE.TextureLoader().load('./assets/earthAssets/')
const sunGeometry = new THREE.SphereGeometry(15, 64, 64);
const sunMaterial = new THREE.MeshPhysicalMaterial({
  map: sunTexture
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//creating mercury
const mercuryTexture = new THREE.TextureLoader().load('./assets/mercuryAssets/8k_mercury.jpg')
const mercuryGeometry = new THREE.SphereGeometry(15, 64, 64);
const mercuryMaterial = new THREE.MeshPhysicalMaterial({
  map: mercuryTexture
});

const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
mercury.position.setY(-50);

//creating venus
const venusTexture = new THREE.TextureLoader().load('./assets/venusAssets/8k_venus_surface.jpg')
const venusGeometry = new THREE.SphereGeometry(15, 64, 64);
const venusMaterial = new THREE.MeshPhysicalMaterial({
  map: venusTexture
});

const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);
venus.position.setY(-100);

//creating earth
const earthTexture = new THREE.TextureLoader().load('./assets/earthAssets/8k_earth_nightmap.jpg')
const earthNormalTexture = new THREE.TextureLoader().load('./assets/earthAssets/earth-normal-map.jpeg')
const earthGeometry = new THREE.SphereGeometry(15, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  //color: 0x8B516A,
  map: earthTexture,
  normalMap: earthNormalTexture
}); //8B516A //0xB70AFA
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

earth.position.setY(-150)

//creating moon (earth moon)
const moonTexture = new THREE.TextureLoader().load('./assets/moonAssets/8k_moon.jpg')
const moonGeometry = new THREE.SphereGeometry(15, 64, 64);
const moonMaterial = new THREE.MeshPhysicalMaterial({
  map: moonTexture
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.setY(-200);
// moon.position.setX(50);

//creating mars
const marsTexture = new THREE.TextureLoader().load('./assets/marsAssets/8k_mars.jpg')
const marsGeometry = new THREE.SphereGeometry(15, 64, 64);
const marsMaterial = new THREE.MeshPhysicalMaterial({
  map: marsTexture
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
mars.position.setY(-250);

//creating jupiter
const jupiterTexture = new THREE.TextureLoader().load('./assets/jupiterAssets/8k_jupiter.jpg')
const jupiterGeometry = new THREE.SphereGeometry(15, 64, 64);
const jupiterMaterial = new THREE.MeshPhysicalMaterial({
  map: jupiterTexture
});

const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);
jupiter.position.setY(-300);

//creating saturn
const saturnTexture = new THREE.TextureLoader().load('./assets/saturnAssets/8k_saturn.jpg')
const saturnGeometry = new THREE.SphereGeometry(15, 64, 64);
const saturnMaterial = new THREE.MeshPhysicalMaterial({
  map: saturnTexture
});

const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn);
saturn.position.setY(-350);
//creating saturn's ring
const saturnRingTexture = new THREE.TextureLoader().load('./assets/saturnAssets/8k_saturn_ring_alpha.png')
const saturnRingGeometry = new THREE.RingGeometry(23, 25, 32);
const saturnRingMaterial = new THREE.MeshPhysicalMaterial({
  map: saturnRingTexture
});

const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
scene.add(saturnRing);
saturnRing.position.setY(-350);


//creating uranus
const uranusTexture = new THREE.TextureLoader().load('./assets/uranusAssets/2k_uranus.jpg')
const uranusGeometry = new THREE.SphereGeometry(15, 64, 64);
const uranusMaterial = new THREE.MeshPhysicalMaterial({
  map: uranusTexture
});

const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus);
uranus.position.setY(-400);

//creating neptune
const neptuneTexture = new THREE.TextureLoader().load('./assets/neptuneAssets/2k_neptune.jpg')
const neptuneGeometry = new THREE.SphereGeometry(15, 64, 64);
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture
});

const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune);
neptune.position.setY(-450);

//creating particles
const particleMaterial = new THREE.PointsMaterial({
  size: 0.005
})
const particleGeometry = new THREE.BufferGeometry;
const particleCount = 10000;

const posArr = new Float32Array(particleCount * 3) // TL;DR each arr is xyz, xyz, xyz, etc.

for (let i = 0; i < particleCount * 3; i++) {
  posArr[i] = (Math.random() - 0.5) * 1000
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);

//creating Point Light
const pointLight = new THREE.PointLight(0xFFFFFF, 5);
pointLight.position.set(10, 10, 10)
scene.add(pointLight);
//creating ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
scene.add(ambientLight);

//creating Helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight, 2, 0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLightHelper, gridHelper);

const orbitControls = new OrbitControls(camera, renderer.domElement);

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

const Speed = {
  speedY: 0.0005
}

const ObjectPosition = {
  positionX: 0,
  positionY: 0,
  positionZ: 0
}

const earthFolder = gui.addFolder('Earth Geometry');
earthFolder.add(sphereData, 'radius', 0, 30).onChange(() => {regenerateSphere(earth)});
earthFolder.add(earth.material, 'wireframe');

const moonFolder = gui.addFolder('Moon Geometry');
moonFolder.add(sphereData, 'radius', 0, 30).onChange(() => {regenerateSphere(moon)});
moonFolder.add(Speed, 'speedY', 0.0001, 0.005).name('Y rotation');
moonFolder.add(ObjectPosition, 'positionX', 0, 1).name('Position: X')
moonFolder.add(ObjectPosition, 'positionY', 0, 1).name('Position: Y')
moonFolder.add(ObjectPosition, 'positionZ', 0, 1).name('Position: Z')

const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight.position, 'x', 0, 100).name('X Position');
pointLightFolder.add(pointLight.position, 'y', 0, 100).name('Y Position');
pointLightFolder.add(pointLight.position, 'z', 0, 100).name('Z Position');
pointLightFolder.add(pointLight,'intensity', 0, 1000).name('Point Light Intensity');
pointLightFolder.add(pointLight, 'distance', 0, 100).name('Point Light Distance')



function regenerateSphere (planet) {
  const newGeometry = new THREE.SphereGeometry(
    sphereData.radius,
    sphereData.widthSegments,
    sphereData.heightSegments,
    sphereData.phiStart,
    sphereData.phiLength,
    sphereData.thetaStart,
    sphereData.thetaLength
  )
  planet.geometry.dispose();
  planet.geometry = newGeometry
}

function changeSpeed (num) {
  Speed.speed = num;
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

// window.addEventListener('fullscreenchange', () => {
//   // sizes.width = window.innerWidth;
//   // sizes.height = window.innerHeight;
//   // camera.updateProjectionMatrix();
//   // camera.aspect = sizes.width / sizes.height;
//   // renderer.setSize(sizes.width, sizes.height);
//   window.location.reload();
// })

function moveCamera () {
  const top = document.body.getBoundingClientRect().top;

  camera.position.setZ(top * -0.01);
  camera.position.setX(top * -0.01);
  camera.position.setY(top * -0.01);
}

// window.addEventListener('scroll', moveCamera);
document.body.onscroll = moveCamera;

//main animation loop
function mainAnimate() {
  window.requestAnimationFrame(mainAnimate);
  sun.rotation.y += 0.0005;
  mercury.rotation.y += 0.0005;
  venus.rotation.y += 0.0005;
  earth.rotation.y += 0.0005;
  moon.rotation.y += Speed.speedY;
  mars.rotation.y += 0.0005;
  jupiter.rotation.y += 0.0005;
  saturn.rotation.y += 0.0005;
  uranus.rotation.y += 0.0005;
  neptune.rotation.y += 0.0005;
  saturnRing.rotation.x = -90;

  moon.position.x += ObjectPosition.positionX;
  moon.position.y += ObjectPosition.positionY;
  moon.position.z += ObjectPosition.positionZ;

  particleMesh.rotation.x += 0.0002
  particleMesh.rotation.y -= 0.0002
  particleMesh.rotation.z += 0.0001

  renderer.render(scene, camera);

  orbitControls.update();
}

mainAnimate();


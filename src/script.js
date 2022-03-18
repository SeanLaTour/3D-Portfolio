import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();
const earthTexture = textureLoader.load("/textures/tympSEc.jpeg");
const earthPhoto = textureLoader.load("/textures/earthMap.jpeg");
const moonTexture = textureLoader.load("/textures/moonNormalMap.png");
const moonPhoto = textureLoader.load("/textures/moonMap.jpeg");
const asteroidTexture = textureLoader.load("/textures/asteroidNormalMap.jpeg");
const asteroidPhoto = textureLoader.load("/textures/asteroidMap.jpg");
const asteroidRocksPhoto = textureLoader.load("/textures/asteroidSurface.jpg");

// Debug


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const earthGeometry = new THREE.SphereBufferGeometry(1, 64, 64);
const moonGeometry = new THREE.SphereBufferGeometry(0.2, 55, 55);
const shootingStarGeometry = new THREE.SphereBufferGeometry(0.01, 40, 40);
const astroidGeometry = new THREE.SphereBufferGeometry(0.08, 22, 22);

// Materials

const earthMaterial = new THREE.MeshStandardMaterial({ map: earthPhoto });
earthMaterial.metalness = 0.7;
earthMaterial.roughness = 0.2;
earthMaterial.normalMap = earthTexture;

const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonPhoto,
  normalMap: moonTexture,
  metalness: 0.7,
  roughness: 0.2,
});

const shootingStarMaterial = new THREE.MeshStandardMaterial({
  opacity: 0.2,
});

const asteroidMaterial = new THREE.MeshStandardMaterial({
  map: asteroidRocksPhoto,
  normalMap: asteroidTexture,
});

// Mesh
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

const shootingStar = new THREE.Mesh(shootingStarGeometry, shootingStarMaterial);

const asteroidOne = new THREE.Mesh(astroidGeometry, asteroidMaterial);
asteroidOne.metalness = 0.9;
asteroidOne.roughness = 0.2;
asteroidOne.position.y = -6;
scene.add(asteroidOne);

const asteroidTwo = new THREE.Mesh(astroidGeometry, asteroidMaterial);
asteroidTwo.metalness = 0.9;
asteroidTwo.roughness = 0.2;
asteroidTwo.position.y = -6;
scene.add(asteroidTwo);

const asteroidThree = new THREE.Mesh(astroidGeometry, asteroidMaterial);
asteroidThree.metalness = 0.9;
asteroidThree.roughness = 0.2;
asteroidThree.position.y = -6;
scene.add(asteroidThree);

const asteroidFour = new THREE.Mesh(astroidGeometry, asteroidMaterial);
asteroidFour.metalness = 0.9;
asteroidFour.roughness = 0.2;
asteroidFour.position.y = -6;
scene.add(asteroidFour);

const asteroidFive = new THREE.Mesh(astroidGeometry, asteroidMaterial);
asteroidFive.metalness = 0.9;
asteroidFive.roughness = 0.2;
asteroidFive.position.y = -6;
scene.add(asteroidFive);
// for (let i = 0; i < 20; i++) {
//     const asteroid = new THREE.Mesh(astroidGeometry, asteroidMaterial)

//     scene.add(asteroid)
// }

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 4;
pointLight.position.y = 5;
pointLight.position.z = 6;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const shootingStarLight = new THREE.PointLight(0x884488, -0.005);
pointLight.position.x = -5;
pointLight.position.y = 1;
pointLight.position.z = 1;
scene.add(shootingStarLight);
shootingStarLight.position.x = -20;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 6;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

let movingMouse = false;

function onDocumentMouseMove(event) {
  mouseX = event.clientX * 10 - windowHalfX;
  movingMouse = true;
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      movingMouse = false;
    }, 10);
  };
}

document.addEventListener("scroll", onDocumentScrollMove);

function onDocumentScrollMove(event) {
  earth.position.z = window.scrollY * 0.001;
  moon.position.z = window.scrollY * 0.001;
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    shootingStar.position.x = (window.scrollY - 1199) * 0.01 - 5;
    shootingStar.position.y = (window.scrollY - 1199) * 0.007 - 4;
    shootingStarLight.position.x = (window.scrollY - 1199) * 0.01 - 5;
    shootingStarLight.position.y = (window.scrollY - 1199) * 0.007 - 4;
    asteroidOne.position.y = (window.scrollY - 1199) * 0.007 - 5.3;
    asteroidOne.position.x = (window.scrollY - 1199) * 0.008 - 4.3;
    asteroidTwo.position.y = (window.scrollY - 1199) * 0.007 - 5.9;
    asteroidTwo.position.x = (window.scrollY - 1199) * 0.008 - 6;
    asteroidThree.position.y = (window.scrollY - 1199) * 0.007 - 4.7;
    asteroidThree.position.x = (window.scrollY - 1199) * 0.005 - 5.3;
    asteroidFour.position.y = (window.scrollY - 1199) * 0.007 - 3.6;
    asteroidFour.position.x = (window.scrollY - 1199) * 0.007 - 8.7;
    asteroidFive.position.y = (window.scrollY - 1199) * 0.007 - 5;
    asteroidFive.position.x = (window.scrollY - 1199) * 0.005 - 0.1;
  }
  if (window.scrollY > 1200) {
    shootingStarLight.intensity = window.scrollY * 0.00075;
    console.log("intense", shootingStarLight.intensity);
    earth.position.y = (window.scrollY - 1199) * 0.005;
    moon.position.y = (window.scrollY - 1199) * 0.005;
  }
}

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.0001;
  targetY = mouseY * 0.0001;
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  asteroidOne.rotation.y = 0.5 * elapsedTime;
  asteroidOne.rotation.z = 0.5 * elapsedTime;
  asteroidTwo.rotation.y = 0.2 * elapsedTime;
  asteroidTwo.rotation.x = 0.7 * elapsedTime;
  asteroidThree.rotation.y = 0.5 * elapsedTime;
  asteroidThree.rotation.z = 0.8 * elapsedTime;
  asteroidFour.rotation.x = 0.5 * elapsedTime;
  asteroidFour.rotation.y = 0.4 * elapsedTime;
  asteroidFive.rotation.y = 0.9 * elapsedTime;
  asteroidFive.rotation.x = 0.1 * elapsedTime;

  earth.rotation.y = -0.5 * elapsedTime;
  moon.rotation.y = -0.5 * elapsedTime;
  moon.position.x = Math.sin(elapsedTime / 2) * 3;
  moon.position.z = Math.cos(elapsedTime / 2) * 3;
  if (window.scrollY < 1200) {
    moon.position.y = Math.cos(elapsedTime / 2) * -0.7;
  }

  earth.rotation.y = targetX - earth.rotation.y;
  moon.rotation.y = targetX - moon.rotation.y;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()
const imageLoader= new THREE.ImageLoader()
const earthTexture = textureLoader.load('/textures/tympSEc.jpeg')
const earthPhoto = textureLoader.load('/textures/earthMap.jpeg')
const moonTexture = textureLoader.load('/textures/moonNormalMap.png')
const moonPhoto = textureLoader.load('/textures/moonMap.jpeg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
const earthGeometry = new THREE.SphereBufferGeometry(.5, 64, 64);
const moonGeometry = new THREE.SphereBufferGeometry(.2, 64, 64);

// Materials

const earthMaterial = new THREE.MeshStandardMaterial({map: earthPhoto})
// earthMaterial.normalMap = earthPhoto
earthMaterial.metalness = 0.7
earthMaterial.roughness = 0.2
earthMaterial.normalMap = earthTexture

const moonMaterial = new THREE.MeshStandardMaterial({map: moonPhoto, normalMap: moonTexture, metalness: 0.7, roughness: 0.2})



// Mesh
const earth = new THREE.Mesh(earthGeometry,earthMaterial)
scene.add(earth)

const moon = new THREE.Mesh(moonGeometry,moonMaterial)
scene.add(moon)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 4
pointLight.position.y = 5
pointLight.position.z = 6
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
 let mouseX = 0 
 let mouseY = 0

 let targetX = 0
 let targetY = 0

 const windowHalfX = window.innerWidth / 2
 const windowHalfY = window.innerHeight / 2

 function onDocumentMouseMove(event) {
     mouseX = (event.clientX * 10 - windowHalfX)
 }

document.addEventListener('scroll', onDocumentScrollMove)

function onDocumentScrollMove(event) {
    earth.position.z = window.scrollY * 0.0005
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.0001
    targetY = mouseY * 0.0001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    earth.rotation.y = -.5 * elapsedTime
    moon.rotation.y = .5 * elapsedTime
    moon.position.x = Math.sin(elapsedTime/2) * 3;
    moon.position.z = Math.cos(elapsedTime/2) * 3;

    earth.rotation.y =   (targetX - earth.rotation.y)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
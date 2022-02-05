import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()
const imageLoader= new THREE.ImageLoader()
const earthTexture = textureLoader.load('/textures/tympSEc.jpeg')
const earthPhoto = textureLoader.load('/textures/earthMap.jpeg')
const spaceBackground = imageLoader.load('/textures/spaceBackground.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({map: earthPhoto})
// material.normalMap = earthPhoto
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = earthTexture

// Mesh
const sphere = new THREE.Mesh(sphereGeometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
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
     mouseX = (event.clientX * 4 - windowHalfX)
     mouseY = (event.clientY * 4 - windowHalfY)
 }

document.addEventListener('scroll', onDocumentScrollMove)

function onDocumentScrollMove(event) {

}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.0001
    targetY = mouseY * 0.0001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = -.5 * elapsedTime
    sphere.rotation.y =   (targetX - sphere.rotation.y)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
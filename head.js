// CSS 
import './style.css'

// import ThreeJS and instantiate objects. 
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene Object
const scene1 = new THREE.Scene();


// Camera Object (FOV, Aspect Ratio, Far)
// 40-45 or less FOV will cause less distortion when objects are moved.
const camera1 = new THREE.PerspectiveCamera( 43, window.innerWidth/window.innerHeight, 1, 1000 );


// Renderer Object
const render1 = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#model-1'),
  alpha: true
});

render1.setPixelRatio( window.devicePixelRatio );
render1.setSize( window.innerWidth, window.innerHeight );

camera1.position.setZ(26);



// Lights & Light-helpers (Temporarily Blue because of the sign)
//const flashlight = new THREE.PointLight(0x005BBB, 18);
const flashlight = new THREE.PointLight(0xF5AC27, 18);
flashlight.position.set(-1, 4, 15);
//const notInvis = new THREE.PointLightHelper(flashlight);
const spotlight = new THREE.AmbientLight(0xFFFFFF);




// scene1.background = new THREE.Color(0xFFFFE4);

// Create scene w/ all objects.
scene1.add(
    flashlight,
    spotlight
    //,notInvisModifier
);




// Model #1
let horseMan;
// Taken from https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
// And slightly modified.
function loadBlenderRobot() {
    const loader = new GLTFLoader();

loader.load( 'model/HorseManV2.gltf', function ( gltf ) {

    horseMan = gltf.scene;

	scene1.add( horseMan );

    horseMan.scale.set(10, 10, 10);
    horseMan.position.x = 5;
    horseMan.position.y = -2;
  // horseMan.position.z = 15;
    horseMan.rotation.x = 0.3;
  // horseMan.rotation.y = -0.1;

}, undefined, function ( error ) {

	console.error( error );

} );
}




// function scrollEvent() {
//   const currentScreen = document.body.getBoundingClientRect().top;


//   camera1.position.x = currentScreen * -3;
//   camera1.rotation.y = currentScreen * -0.08;
//   camera1.position.z = currentScreen * 2;
// }
// document.body.onscroll = scrollEvent;


// Function to continually render scenes. 
function animate() {

  requestAnimationFrame( animate );

 
  // For more detailed view of the scene.
  // controls.update();
  horseMan.rotation.y += 0.007;

  render1.render( scene1, camera1 );

}
loadBlenderRobot();
animate();
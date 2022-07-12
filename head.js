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
  canvas: document.querySelector('#mon1')
});

render1.setPixelRatio( window.devicePixelRatio );
render1.setSize( window.innerWidth, window.innerHeight );

camera1.position.setZ(30);



// Lights & Light-helpers
const flashlight = new THREE.PointLight(0x005BBB);
flashlight.position.set(1, 1, 1);

const spotlight = new THREE.AmbientLight(0xFFFFFF);





// scene1.background = new THREE.Color(0xFFFFE4);

// Create scene w/ all objects.
scene1.add(
    flashlight,
    spotlight
);




// Robot Model (Conflicting name with the gltf file)
let android;
// Taken from https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
// And slightly modified.
function loadBlenderRobot() {
    const loader = new GLTFLoader();

loader.load( 'model/robot.gltf', function ( gltf ) {

  android = gltf.scene;

	scene1.add( android );

  android.scale.set(5, 5, 5);
  android.position.x = 10;
  android.position.y = -18;
  // android.position.z = 15;
  android.rotation.x = 0.3;
  // android.rotation.y = -0.1;

}, undefined, function ( error ) {

	console.error( error );

} );
}




// function scrollEvent() {
//   const currentScreen = document.body.getBoundingClientRect().top;

//   android.position.z = 1;

//   camera1.position.x = currentScreen * -0.002;
//   camera1.rotation.y = currentScreen * -0.002;
//   camera1.position.z = currentScreen * -0.01;
// }
// document.body.onscroll = scrollEvent


// Function to continually render scenes. 
function animate() {

  requestAnimationFrame( animate );

 
  // For more detailed view of the scene.
  // controls.update();
  //android.rotation.y += 0.007;

  render1.render( scene1, camera1 );

}
loadBlenderRobot();
animate();
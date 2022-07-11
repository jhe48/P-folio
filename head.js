// CSS 
import './style.css'

// import ThreeJS and instantiate objects. 
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene Object
const scene1 = new THREE.Scene();


// Camera Object (FOV, Aspect Ratio, Far)
// 40-45 or less FOV will cause less distortion when objects are moved.
const camera1 = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 1000 );


// Renderer Object
const render1 = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#mon1')
});

render1.setPixelRatio( window.devicePixelRatio );
render1.setSize( window.innerWidth, window.innerHeight );

camera1.position.setZ(30);



// Lights & Light-helpers
const flashlight = new THREE.PointLight(0xffffff);
flashlight.position.set(1, 1, 1);

const spotlight = new THREE.AmbientLight(0xffffff);






// Create scene w/ all objects.
scene1.add(
    flashlight,
    spotlight
);




// Taken from https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
// And slightly modified.
function loadBlenderHead() {
    const loader = new GLTFLoader();

loader.load( 'model/headShape.gltf', function ( gltf ) {

    let face = gltf.scene;

	scene1.add( face );

    face.scale.set(2, 2, 2);
    face.position.x = 4;
    face.position.y = 2;
    face.position.z = 15;
    face.rotation.x = 0.15;
    face.rotation.y = 0.15;

}, undefined, function ( error ) {

	console.error( error );

} );
}


// Function to continually render scenes. 
function animate() {

  requestAnimationFrame( animate );

 
  // For more detailed view of the scene.
  // controls.update();

  render1.render( scene1, camera1 );

}
loadBlenderHead();
animate();
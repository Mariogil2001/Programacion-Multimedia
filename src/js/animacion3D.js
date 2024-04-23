import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.151.3/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.151.3/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
let camera;
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById("animacion");
const loader = new GLTFLoader();
let controls;
var gltfModel;

function init() {
  renderer.setSize(window.innerWidth / 1.65, window.innerHeight / 1.65);
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 30;
  // White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 10 );
directionalLight.target
scene.add( directionalLight );

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

async function loadGLTFModels() {
  var gltfAsset = await loader.loadAsync("./src/models/tv.glb");
  gltfModel = gltfAsset.scene;
  gltfModel.position.y = -10;
  gltfModel.scale.set(5, 5, 5);
  scene.add(gltfModel);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Agrega esta línea para actualizar los controles en cada frame

  renderer.render(scene, camera);
}

init();
loadGLTFModels();
animate();

window.addEventListener("resize", () => {
  // Actualiza el tamaño del renderizador
  renderer.setSize(window.innerWidth / 1.65, window.innerHeight / 1.65);

  // Actualiza la relación de aspecto de la cámara
  camera.aspect = window.innerWidth / window.innerHeight;

  // Aplica los cambios a la cámara
  camera.updateProjectionMatrix();
});
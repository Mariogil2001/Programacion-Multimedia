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
  setupRenderer();
  setupCamera();
  setupControls();
  setupLights();
  addSkybox();
}

function setupRenderer() {
  renderer.setSize(window.innerWidth / 1.65, window.innerHeight / 1.65);
  container.appendChild(renderer.domElement);
}

function setupCamera() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 30;
}

function setupControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
}

function setupLights() {
  addDirectionalLight();
  addSpotLight();
  addAmbientLight();
}

function addDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  scene.add(directionalLight);
}

function addSpotLight() {
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(15, 40, 35);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  scene.add(spotLight);
}

function addAmbientLight() {
  const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
  scene.add(ambientLight);
}

async function loadGLTFModels() {
  var gltfAsset = await loader.loadAsync(
    "./src/models/small_coffee_shop/scene.gltf"
  );
  gltfModel = gltfAsset.scene;
  gltfModel.position.y = -5.5;
  gltfModel.rotation.y =  -Math.PI / 2;
  gltfModel.scale.set(7, 7, 7);
  scene.add(gltfModel);
}

async function addSkybox() {
  const loader = new THREE.TextureLoader();
  loader.load(
    "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
    function (texture) {
      scene.background = texture;
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();
loadGLTFModels();
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth / 1.65, window.innerHeight / 1.65);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

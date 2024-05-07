import * as THREE from "https://unpkg.com/three@0.151.3/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.151.3/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.151.3/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
let camera;
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById("animacion");
const loader = new GLTFLoader();
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const progressBar = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x2effd7 })
);
let controls;
var gltfModel;
var gltfModelFood;
var models = [
  { path: "./src/models/GLTFformat/bacon.glb"},
  { path: "./src/models/GLTFformat/bread.glb"},
  { path: "./src/models/GLTFformat/cheese.glb"},
  { path: "./src/models/GLTFformat/egg.glb"},
  { path: "./src/models/GLTFformat/lollypop.glb"},
  { path: "./src/models/GLTFformat/tomato.glb"},
  { path: "./src/models/GLTFformat/taco.glb"},
  { path: "./src/models/GLTFformat/soda.glb"},
  { path: "./src/models/GLTFformat/wholeHam.glb"},
  { path: "./src/models/GLTFformat/pizza.glb"},
  { path: "./src/models/GLTFformat/sausage.glb"},
  { path: "./src/models/GLTFformat/chinese.glb"},
  { path: "./src/models/GLTFformat/cake.glb"},
  { path: "./src/models/GLTFformat/pear.glb"},
  { path: "./src/models/GLTFformat/pumpkinBasic.glb"},
  { path: "./src/models/GLTFformat/sandwich.glb"},
  { path: "./src/models/GLTFformat/riceBall.glb"},
  { path: "./src/models/GLTFformat/rollingPin.glb"},
  { path: "./src/models/GLTFformat/waffle.glb"},
  { path: "./src/models/GLTFformat/watermelon.glb"},
  { path: "./src/models/GLTFformat/skewerVegetables.glb"},
  { path: "./src/models/GLTFformat/potStew.glb"},
  { path: "./src/models/GLTFformat/pie.glb"},
];

function init() {
  setupRenderer();
  setupCamera();
  setupControls();
  setupLights();
  addSkybox();
  setupParedes();
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
  camera.position.z = -30;
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

function setupParedes(){
  const geometrypared1 = new THREE.BoxGeometry( 56, 20, 0 );
  const materialpared1 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  const pared1 = new THREE.Mesh( geometrypared1, materialpared1 );
  pared1.position.z = 24.5;
  pared1.position.x = 1.5;
  pared1.position.y = 4.8;
  scene.add( pared1 );

  const geometrypared2 = new THREE.BoxGeometry( 56, 20, 0 );
  const materialpared2 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  const pared2 = new THREE.Mesh( geometrypared2, materialpared2 );
  pared2.position.z = -3.5;
  pared2.position.x = 29.5;
  pared2.position.y = 4.8;
  pared2.rotation.y = Math.PI / 2;
  scene.add( pared2 );

  const geometrypared3 = new THREE.BoxGeometry( 56, 20, 0 );
  const materialpared3 = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  const pared3 = new THREE.Mesh( geometrypared3, materialpared3 );
  pared3.position.z = -3.5;
  pared3.position.x = -26.5;
  pared3.position.y = 4.8;
  pared3.rotation.y = Math.PI / 2;
  scene.add( pared3 );
}

function addDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  scene.add(directionalLight);
}

function addSpotLight() {
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(15, 40, -35);
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
  
  scene.add(progressBar);
  const manager = new THREE.LoadingManager();
 

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = itemsLoaded / itemsTotal;
    progressBar.scale.x = progress;
  };

  manager.onLoad = function () {
    scene.remove(progressBar);
  };

  manager.onError = function (url) {
    console.log('There was an error loading ' + url);
  };

  const loader = new GLTFLoader(manager);

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

window.addEventListener("click", function (event) {
  console.log(event.clientX, event.clientY);
  pointer.x = (event.clientX / window.innerWidth)* 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight)* 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersect = raycaster.intersectObjects(scene.children, true);
  const interseccionModelo = intersect.some(intersect => intersect.object === gltfModel);

  if(interseccionModelo){
    console.log(pointer.x, pointer.y);
    console.log(gltfModel.position.x, gltfModel.position.y);
  }
  let indice = Math.floor(Math.random() * (models.length+1));

  loadGLTFood(models[indice].path);
});

async function loadGLTFood(modelo){
  if(gltfModelFood){
    scene.remove(gltfModelFood);
  }
  var gltfAsset = await loader.loadAsync(modelo);
  gltfModelFood = gltfAsset.scene;
  gltfModelFood.position.y = 2.5;
  gltfModelFood.position.z = -5.5;
  gltfModelFood.position.x = 2;
  gltfModelFood.rotation.y =  -Math.PI / 2;
  gltfModelFood.scale.set(7, 7, 7);
  scene.add(gltfModelFood);

}
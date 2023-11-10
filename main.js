import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const grid = new THREE.GridHelper(20);
scene.add(grid);
// Oxygen Atoms (Protons)
const protonGeometry = new THREE.SphereGeometry(1, 32, 32);
const protonMaterial = new THREE.MeshStandardMaterial({ color: "#ff0000" });

const proton1 = new THREE.Mesh(protonGeometry, protonMaterial);
proton1.position.x = -2;
scene.add(proton1);

const proton2 = new THREE.Mesh(protonGeometry, protonMaterial);
proton2.position.x = 2;
scene.add(proton2);

// Electrons (Spheres)
const electronGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const electronMaterial = new THREE.MeshStandardMaterial({ color: "#00ff00" });

const electron1 = new THREE.Mesh(electronGeometry, electronMaterial);
electron1.position.x = -4;
scene.add(electron1);

const electron2 = new THREE.Mesh(electronGeometry, electronMaterial);
electron2.position.x = 4;
scene.add(electron2);

// Light
const light = new THREE.AmbientLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate protons
  proton1.rotation.y += 0.01;
  proton2.rotation.y += 0.01;

  // Orbit electrons
  const electronOrbitSpeed = 0.005;
  const electronOrbitRadius = 6;

  electron1.position.x =
    Math.cos(Date.now() * electronOrbitSpeed) * electronOrbitRadius;
  electron1.position.z =
    Math.sin(Date.now() * electronOrbitSpeed) * electronOrbitRadius;

  electron2.position.x =
    Math.cos(Date.now() * electronOrbitSpeed + Math.PI) * electronOrbitRadius;
  electron2.position.z =
    Math.sin(Date.now() * electronOrbitSpeed + Math.PI) * electronOrbitRadius;

  // Render the scene
  renderer.render(scene, camera);
}

animate();

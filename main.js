import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Scene

const scene = new THREE.Scene();

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#f0f8ff" });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Light
const light = new THREE.PointLight(0xffffff, 70, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
); //! LEARN ABOUT THE CAMERA PERSPECTIVE

camera.position.z = 10;
scene.add(camera);
// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 4;
// Resize

window.addEventListener("resize", () => {
  // Update Sizes

  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
const loop = () => {
  const time = Date.now() * 0.0005; // Adjust the speed of the orbit

  const radius = 5; // Adjust the radius of the orbit
  const xPos = Math.cos(time) * radius;
  const zPos = Math.sin(time) * radius;

  mesh.position.set(xPos, 0, zPos);
  mesh.rotation.y += 0.01; // Adjust the rotation speed as needed

  // Calculate the distance of the camera from the sphere
  const cameraDistance = radius + mesh.geometry.parameters.radius;

  // Adjust the camera position and field of view
  const fov = 90; // Adjust the field of view as needed
  const aspectRatio = sizes.width / sizes.height;
  const cameraHeight = cameraDistance * Math.tan((fov / 2) * (Math.PI / 180));
  const cameraWidth = cameraHeight * aspectRatio;

  camera.position.set(0, cameraDistance, cameraHeight);
  camera.lookAt(scene.position);
  camera.fov = fov;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

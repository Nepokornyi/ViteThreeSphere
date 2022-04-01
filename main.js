import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
//vite don't know how to import glsl
//npm install --save-dev vite-plugin-string
//https://www.npmjs.com/package/vite-plugin-string
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import { Float32BufferAttribute } from 'three';

const canvasContainer = document.querySelector('#canvasContainer');

//Scene
const scene = new THREE.Scene();

//Camera
// const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, .1, 1000);
const camera = new THREE.PerspectiveCamera(
  75,
  canvasContainer.offsetWidth / canvasContainer.offsetHeight,
  .1,
  1000
  );
camera.position.z = 15;

//Renderer ---
const renderer = new THREE.WebGLRenderer(
  {
    //more smooth texture / cut bad pixels on corners/edges
    antialias:true,
    canvas: document.querySelector('canvas')
  }
);


console.log(canvasContainer);
// renderer.setSize(innerWidth, innerHeight);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//------------
//Sphere /Earth
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,30, 30),
  //Basic material changed to Shader (after creating glsl file)
  new THREE.ShaderMaterial({
    // map: new THREE.TextureLoader().load('./textures/uvEarthMap.jpg')
    vertexShader, //alternative form of vertexShader:vertexShader,
    fragmentShader,
    uniforms:{
      globeTexture:{
        value:new THREE.TextureLoader().load('./textures/uvEarthMap.jpg')
      }
    }
  })
);
//Sphere /Atmosphere

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,30, 30),
  //Basic material changed to Shader (after creating glsl file)
  new THREE.ShaderMaterial({
    // map: new THREE.TextureLoader().load('./textures/uvEarthMap.jpg')
    vertexShader:atmosphereVertexShader, //alternative form of vertexShader:vertexShader,
    fragmentShader:atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    })
);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere); // group is like scene - container with which we only want to interact
scene.add(group);
//------------

//Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({color:0xffffff});
const stars = new THREE.Points(starGeometry, starMaterial);

const starVertices = []
for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 2000;  
  const y = (Math.random() - 0.5) * 2000;  
  const z = -Math.random() * 2000;
  
  starVertices.push(x,y,z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

scene.add(stars);

//-------
const mouse = {
  x: 0,
  y: 0
};

//Animation
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotation.y += .002;
  gsap.to(group.rotation,{
    x: -mouse.y * 0.2,
    y: mouse.x * 0.4,
    duration:2,
  })
}
animate()

//listeners
window.addEventListener('resize', ()=>{

  camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
  camera.updateProjectionMatrix();

  // renderer.setSize(innerWidth, innerHeight);
  renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener('mousemove', (e)=>{
  //normalize mouse movement to get proper + - axis values
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;


})

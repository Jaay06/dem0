import { shaderMaterial } from '@react-three/drei';
import { extend, type ThreeElement } from '@react-three/fiber';
import fragmentShader from '../shaders/fire/fragment.glsl';
import vertextShader from '../shaders/fire/vertex.glsl';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const fireTexture = textureLoader.load('/textures/fire_01.png');

const FireShaderMaterial = shaderMaterial(
  {
    uSize: 3,
    uColorA: new THREE.Color(),
    uColorB: new THREE.Color(),
    uTexture: fireTexture,
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uLife: 1.0,
  },
  vertextShader,
  fragmentShader
);

extend({ FireShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    fireShaderMaterial: ThreeElement<typeof FireShaderMaterial>;
  }
}

export { FireShaderMaterial };

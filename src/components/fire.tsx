import CSM from 'three-custom-shader-material';

import * as THREE from 'three';
import fragmentShader from '../shaders/fire/fragment.glsl';
import vertextShader from '../shaders/fire/vertex.glsl';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export const Fire = () => {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null!);

  const fireTexture = useTexture('/textures/fire_01.png');

  const pixelRatioRef = useRef<number>(null!);

  const { uColorA, uColorB, uLife, uSize, timeMuliplierValue, particlesCount } =
    useControls('fire', {
      uColorA: '#ffbf00',
      uColorB: '#ff1108',
      uLife: {
        value: 1.0,
        min: 0.1,
        max: 1.0,
        step: 0.01,
      },
      uSize: {
        value: 0.03,
        min: 0.01,
        max: 0.1,
        step: 0.01,
      },
      timeMuliplierValue: {
        value: 0.9,
        min: 0.001,
        max: 0.9,
        step: 0.001,
      },
      particlesCount: {
        value: 500,
        min: 100,
        max: 2000,
        step: 1,
      },
    });

  useLayoutEffect(() => {
    const count = particlesCount;

    const positionArray = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);
    const timeMultiplier = new Float32Array(count);

    const radius = 0.3;

    for (let i = 0; i < count; i++) {
      sizeArray[i] = Math.random() * 0.5;
      timeMultiplier[i] = Math.random() + timeMuliplierValue;

      const shape = new THREE.Cylindrical(
        radius,
        Math.random() * Math.PI * 2,
        0.1
      );

      new THREE.CircleGeometry();

      const position = new THREE.Vector3();
      position.setFromCylindrical(shape);

      const i3 = i * 3;
      positionArray[i3] = position.x;
      positionArray[i3 + 1] = position.y;
      positionArray[i3 + 2] = position.z;
    }

    const bufferAttribute = new THREE.Float32BufferAttribute(positionArray, 3);
    const sizeAttribute = new THREE.Float32BufferAttribute(sizeArray, 1);
    const timeMultiplierAttribute = new THREE.Float32BufferAttribute(
      timeMultiplier,
      1
    );

    if (bufferGeometryRef.current) {
      bufferGeometryRef.current.setAttribute('position', bufferAttribute);
      bufferGeometryRef.current.setAttribute('aSize', sizeAttribute);
      bufferGeometryRef.current.setAttribute(
        'timeMultiplier',
        timeMultiplierAttribute
      );
    }
  }, [timeMuliplierValue, particlesCount]);

  const uniforms = useMemo(() => {
    return {
      uSize: new THREE.Uniform(uSize),
      uColorA: new THREE.Uniform(new THREE.Color(uColorA)),
      uColorB: new THREE.Uniform(new THREE.Color(uColorB)),
      uTexture: new THREE.Uniform(fireTexture),
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      uLife: new THREE.Uniform(uLife),
    };
  }, [fireTexture, uColorA, uColorB, uLife, uSize]);
  useEffect(() => {
    pixelRatioRef.current = Math.min(window.devicePixelRatio, 2);

    window.addEventListener('resize', () => {
      uniforms.uResolution.value = new THREE.Vector2(
        window.innerWidth * pixelRatioRef.current,
        window.innerHeight * pixelRatioRef.current
      );
    });
  }, [uniforms.uResolution]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points position={[0, -0.5, 0]}>
      <bufferGeometry ref={bufferGeometryRef} />
      <CSM
        baseMaterial={THREE.PointsMaterial}
        fragmentShader={fragmentShader}
        vertexShader={vertextShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent={true}
      />
    </points>
  );
};

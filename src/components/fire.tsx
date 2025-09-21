import * as THREE from 'three';
import { FireShaderMaterial } from '../libs/fire-shader';
import { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree, type ThreeElements } from '@react-three/fiber';
import { useControls } from 'leva';

export const Fire = () => {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null!);

  const { size, viewport } = useThree();

  const fireShaderRef = useRef<ThreeElements['fireShaderMaterial']>(null!);

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
        value: 3,
        min: 1,
        max: 10,
        step: 0.1,
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
        0.01
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

  useFrame((state) => {
    fireShaderRef.current.uTime = state.clock.getElapsedTime();
  });

  return (
    <points position={[0, -0.5, 0]}>
      <bufferGeometry ref={bufferGeometryRef} />
      <fireShaderMaterial
        key={FireShaderMaterial.key}
        ref={fireShaderRef}
        uSize={uSize}
        uColorA={uColorA}
        uColorB={uColorB}
        uLife={uLife}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent={false}
      />
    </points>
  );
};

import {
  GizmoHelper,
  GizmoViewport,
  MeshReflectorMaterial,
  KeyboardControls,
} from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';
import { Perf } from 'r3f-perf';
import GroundCells from './libs/GroundCells.tsx';
import Ecctrl from 'ecctrl';
import { Physics, RigidBody } from '@react-three/rapier';
import { Model } from './components/model.tsx';

const Experience = () => {
  /**
   * Delay physics
   */
  const [pausedPhysics, setPausedPhysics] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPausedPhysics(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ];

  const { physics } = useControls('World settings', {
    physics: true,
  });

  return (
    <>
      {perfVisible && <Perf position='top-left' />}
      <GroundCells />

      {/* lights */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight />

      <Physics paused={pausedPhysics} debug={physics} timeStep={'vary'}>
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            /**
             * NOTE:
             * bug with position parameter, where it affects the character animation load
             * uncomment/comment to see
             */
            // position={[0, 0, 0]}
            debug
            animated
            followLight
            springK={2}
            dampingC={0.2}
            autoBalanceSpringK={1.2}
            autoBalanceDampingC={0.04}
            autoBalanceSpringOnY={0.7}
          >
            <Model />
          </Ecctrl>
        </KeyboardControls>
        {/* floor */}
        <RigidBody type='fixed' colliders='trimesh'>
          <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={20}>
            <planeGeometry args={[1, 10]} />
            <MeshReflectorMaterial
              resolution={512}
              blur={[1000, 1000]}
              mixBlur={0.9}
              color='grey'
              mirror={0.5}
            />
          </mesh>
        </RigidBody>
      </Physics>

      {/* GizmoHelper */}
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport labelColor='white' axisHeadScale={1} />
      </GizmoHelper>
    </>
  );
};

export default Experience;

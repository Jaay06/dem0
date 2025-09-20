import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import GroundCells from './libs/GroundCells.tsx';

import { Fire } from './components/fire.tsx';

const Experience = () => {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  return (
    <>
      {perfVisible && <Perf position='top-left' />}
      <GroundCells />
      <OrbitControls />

      {/* lights */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight />

      <Fire />

      {/* GizmoHelper */}
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport labelColor='white' axisHeadScale={1} />
      </GizmoHelper>
    </>
  );
};

export default Experience;

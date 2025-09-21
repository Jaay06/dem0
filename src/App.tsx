import './index.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import Interface from './Interface';

function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 8],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
}

export default App;

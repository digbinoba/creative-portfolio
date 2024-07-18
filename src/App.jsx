import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Experience2 } from "./components/Experience2";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5] }}>
        {/* <color attach="background" args={["#ececec"]} /> */}
        <ScrollControls pages={4} damping={0.1}>
          <Experience2 />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>

    </>

  );
}

export default App;

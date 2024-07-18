import { Environment, OrbitControls, Sky, ContactShadows } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Typing",
      options: ["Typing", "Falling Idle", "Flair", "Taunt", "Male Dynamic Pose", "Bicycle Crunch", "Shuffling", "Situps", "Standing Idle"],
    },
  });
  return (
    <>
      <OrbitControls />
      <Sky />
      <Environment preset="sunset" />
      <group position-y={-1}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Avatar animation={animation} />

        //Render the chair when the animation is Typing
        {animation == "Typing" && (
          <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25}>
            <boxGeometry />
            <meshStandardMaterial color={"white"} />
          </mesh>
        )}

        <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={0.001}>
          <planeGeometry />
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>
    </>
  );
};

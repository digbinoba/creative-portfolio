import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { useThree, useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import * as THREE from "three";
import { Projects } from "./Projects";
import { Background } from "./Background";

export const Experience2 = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();
  const [section, setSection] = useState(0);
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const characterContainerAboutRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useEffect(() => {
    setCharacterAnimation("Male Dynamic Pose");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Flair");
    }, 600);
  }, [section]);
  useFrame((state) => {
    let currSection = Math.floor(data.scroll.current * data.pages);
    if (currSection > 3) {
      currSection = 3;
    }
    if (currSection !== section) {
      setSection(currSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // const position = new THREE.Vector3();
    // characterContainerAboutRef.current.getWorldPosition(position);
    // //console.log([position.x, position.y, position.z]);

    // const quarternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quarternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quarternion, "XYZ");

    // console.log([euler.x, euler.y, euler.z]);
  });
  return (
    <>
      <Background />
      <motion.group
        position={[1.903475129345044, 0.2187, 2.680529156259918]}
        rotation={[-3.141592653589793, 1.2043981633974483, 3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: 0.9,
            scaleY: 0.9,
            scaleZ: 0.9,
          },
          1: {
            y: -viewport.height + 0.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          2: {
            x: -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.3,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
          },
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.066, 0.243, -0.568]}
          rotation={[-Math.PI, 0.419, -Math.PI]}
        ></group>
      </motion.group>
      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        {/* <group scale={[2, 2, 2]} position-y={-1.5}>
          <Avatar animation={section === 0 ? "Falling Idle" : "Flair"} />
        </group> */}
      </motion.group>
      {/* PROJECTS */}
      <Projects />
    </>
  );
};

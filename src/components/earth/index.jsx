import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three'

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg'
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg'
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg'
import { OrbitControls, Stars } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import { cloudsPositionState, earthPositionState, earthStatusState } from '../../gameState';
import './style.css'

export const Earth = (props) => {
   const [earthPosition] = useRecoilState(earthPositionState)
   const [cloudsPosition] = useRecoilState(cloudsPositionState)
   const [earth, setEarth] = useRecoilState(earthStatusState)
   const [colorMap, normalMap, specularMap, cloudMap] = useLoader(
      TextureLoader,
      [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);

   const earthRef = useRef();
   const cloudsRef = useRef();
   const controls = useRef();

   useFrame(() => {
      // console.log(earthPosition)
      earthRef.current.rotation.y = earthPosition.rotation.y
      cloudsRef.current.rotation.y = cloudsPosition.rotation.y
      // console.log(controls.current)
      // controls.current.reset()
   })


   // const baseEarth = loadEarth()
   return (
      <>
         {/* <ambientLight intensity={1} /> */}
         {/* <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1.2} /> */}
         <Stars
            radius={300}
            depth={60}
            count={7000}
            factor={7}
            saturation={0.1}
            fade={true} />
         <mesh ref={cloudsRef}>
            <sphereGeometry args={[earth.size + .005, 32, 32]} />
            <meshPhongMaterial
               map={cloudMap}
               opacity={0.4}
               depthWrite={true}
               transparent={true}
               side={THREE.DoubleSide} />
         </mesh>
         <mesh ref={earthRef}>
            <sphereGeometry args={earth.geometry} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7} />
            <OrbitControls
               enableZoom={true}
               enablePan={false}
               enableRotate={true}
               zoomSpeed={1}
               panSpeed={0.5}
               rotateSpeed={0.7}
               ref={controls}
            />
            {/* <Html distanceFactor={10}>
               <div class="earth">
                  {earth.curHp}
               </div>
            </Html> */}
         </mesh>
      </>
   )
}
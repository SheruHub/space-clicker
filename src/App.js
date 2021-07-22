// import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil';
import { Main } from './Main';
import * as THREE from 'three'

const CanvasContainer = styled.div`
  width:100%;
  height:100%;
`;


function App() {
  // function ZoomIn() {
  //   const vec = new THREE.Vector3(0, 15, 30)
  //   return useFrame(({ camera }) => camera.position.lerp(vec, 0.1))
  // }
  return <CanvasContainer>
    {/* <Canvas camera={{ position: [0, 15, 1000], fov: 70 }}> */}
    <Canvas>

      <RecoilRoot>
        <Suspense fallback={null}>
          {/* <ZoomIn /> */}
          <Main />
        </Suspense>
      </RecoilRoot>
    </Canvas>
  </CanvasContainer>
}

export default App;

import { extend, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

export function Bloom({ children }) {
   const { gl, camera, size } = useThree()
   const [scene, setScene] = useState()
   const composer = useRef()
   useEffect(() => void scene && composer.current.setSize(size.width, size.height), [size])
   useFrame(() => scene && composer.current.render(), 1)
   return (
      <>
         <scene ref={setScene}>{children}</scene>
         <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
         </effectComposer>
      </>
   )
}
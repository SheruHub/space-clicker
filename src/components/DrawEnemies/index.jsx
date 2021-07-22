import React from 'react'
import { useRecoilState } from 'recoil'
import { enemyPositionState } from '../../gameState'
import { Html } from '@react-three/drei'
import './style.css'

export function DrawEnemies() {

   const [enemies] = useRecoilState(enemyPositionState)
   // if (enemies.length === 0) return null
   return (
      <>
         {
            enemies.map((enemy) => {
               if (!enemy) return null
               return (
                  <group position={[enemy.x, enemy.y, enemy.z]} >
                     <mesh key={`${enemy.id}`} scale={[enemy.s, enemy.s, enemy.s]}>
                        <sphereGeometry args={enemy.geometry} />
                        <meshStandardMaterial color={enemy.color} roughness={1} />
                        <Html distanceFactor={100}>
                           <div class="content">
                              {enemy.curHp}
                           </div>
                        </Html>
                     </mesh>
                  </group>
               )
            })

         }
      </>
   )
}
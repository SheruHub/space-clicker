import React from 'react'
import { useRecoilState } from 'recoil'

import { projectilePositionState } from '../../gameState'

export function DrawProjectiles() {

   const [projectiles] = useRecoilState(projectilePositionState)
   if (projectiles.length === 0) return null

   return (
      <>
         {projectiles.map((projectile) =>
            <mesh
               key={`${projectile.id}`}
               position={[projectile.x, projectile.y, projectile.z]}
               scale={[projectile.s, projectile.s, projectile.s]}>
               <sphereGeometry args={projectile.geometry} />
               <meshStandardMaterial color="#FF0000" roughness={0} />
            </mesh>
         )}
      </>
   )
}
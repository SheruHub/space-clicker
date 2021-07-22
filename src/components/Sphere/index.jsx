import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil';
import { enemyPositionState } from '../../gameState';

export function Sphere({ geometry, x, y, z, s }) {

  const [spherePosition, setSpherePosition] = useRecoilState(enemyPositionState)
  // setSpherePosition({ x, y, z })
  const id = Math.random()
  // setSpherePosition(...spherePosition, { id: id, x: x, y: y, z: z })
  // console.log(spherePosition)

  let speed = 1;

  const ref = useRef()
  useFrame((state) => {

    let curx = ref.current.position.x
    let cury = ref.current.position.y
    let curz = ref.current.position.z

    const normalize = (x, y, z) => {
      let delta = Math.sqrt(
        (curx * curx) +
        (cury * cury) +
        (curz * curz))

      return (
        { x: x / delta, y: y / delta, z: z / delta }
      )
    }
    const norm = normalize(curx, cury, curz)
    let newx, newy, newz

    if (Math.abs(curx) > 0.5) newx = curx - norm.x * speed / 10;
    else newx = Math.random() * 50 - 25
    if (Math.abs(cury) > 0.5) newy = cury - norm.y * speed / 10;
    else newy = Math.random() * 50 - 25
    if (Math.abs(curz) > 0.5) newz = curz - norm.z * speed / 10;
    else newz = Math.random() * 50 - 25

    // setSpherePosition({ x: newx, y: newy, z: newz })
    ref.current.position.x = newx
    ref.current.position.y = newy
    ref.current.position.z = newz

  })
  return (
    <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry}>
      <meshStandardMaterial color="hotpink" roughness={1} />
    </mesh>
  )
}
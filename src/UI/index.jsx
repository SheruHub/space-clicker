import React from 'react'
import { useRecoilState } from 'recoil'
import { earthStatusState, levelDataState } from '../gameState'
import { Html } from '@react-three/drei'
import './style.css'

export function UI() {
   const [levelData, setLevelData] = useRecoilState(levelDataState)
   const [earth, setEarth] = useRecoilState(earthStatusState)
   return (
      <Html distanceFactor={10}>
         <div class="score">
            Health: <span class="health">{earth.curHp}</span><br />
            Level: {levelData.level}<br />
            Kills: {levelData.killed}

         </div>
      </Html>
   )
}
import React from 'react'
import { useRecoilState } from 'recoil'
import { earthStatusState, enemyPositionState, levelDataState, projectilePositionState, _gameState } from '../gameState'
import { isCollision } from './gameFunctions'


export const DoCollisions = () => {
   const [enemies, setEnemies] = useRecoilState(enemyPositionState)
   const [projectiles, setProjectiles] = useRecoilState(projectilePositionState)
   const [earth, setEarth] = useRecoilState(earthStatusState)
   const [levelData, setLevelData] = useRecoilState(levelDataState)
   const [gameState, setGameState] = useRecoilState(_gameState)

   // ENEMY VS
   //--------------------------------

   // enemy vs earth
   if (enemies.length > 0) {
      enemies.map((enemy) => {
         if (isCollision(enemy, earth)) {
            let tempEarth = { ...earth }
            tempEarth.curHp -= enemy.damage
            if (tempEarth.curHp <= 0) {
               setGameState({ ...gameState, state: gameState.options.GAMEOVER })
            }
            setEarth({ ...tempEarth })
            setEnemies(enemies.filter((en) => en !== enemy))
         }
      })
   }

   // PROJECTILE VS
   //--------------------------------

   // projectile vs enemies
   if (projectiles.length > 0 && enemies.length > 0) {
      projectiles.map((projectile) => {
         enemies.map((enemy, idx) => {
            if (isCollision(projectile, enemy)) {
               // console.log("Collision!")
               let tempData = [...enemies]
               let tempEnemy = { ...tempData[idx] }
               tempEnemy.curHp -= projectile.damage
               tempData[idx] = tempEnemy
               setProjectiles(projectiles.filter((proj) => proj !== projectile))
               if (tempData[idx].curHp <= 0) {
                  setEnemies(enemies.filter((en) => en !== enemy))
                  setLevelData({ level: levelData.killed > 0 && levelData.killed % 10 === 0 ? levelData.level + 1 : levelData.level, killed: levelData.killed + 1 })
               }
               else {
                  setEnemies(tempData)
               }
               // console.log(levelData)
            }
         })

      })
   }
   return null
}
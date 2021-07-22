import { useFrame } from '@react-three/fiber'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { loadEnemy } from '../../gameData/enemyData'
import { baseWeapon, loadWeapon } from '../../gameData/weaponData'
import { cloudsPositionState, earthPositionState, earthStatusState, enemyPositionState, levelDataState, projectilePositionState } from '../../gameState'


export function GameTimer() {
   const [enemies, setEnemies] = useRecoilState(enemyPositionState)
   const [projectiles, setProjectiles] = useRecoilState(projectilePositionState)
   const [earthPosition, setEarthPosition] = useRecoilState(earthPositionState)
   const [cloudsPosition, setCloudsPosition] = useRecoilState(cloudsPositionState)
   // const [earth, setEarth] = useRecoilState(earthStatusState)
   const [enemyTimer, setEnemyTimer] = useState(false)
   const [projectileTimer, setProjectileTimer] = useState(0)
   const [levelData, setLevelData] = useRecoilState(levelDataState)

   const square = (num) => {
      return num * num
   }

   const normalize = (x, y, z) => {
      let delta = Math.sqrt(
         (x * x) +
         (y * y) +
         (z * z))

      return (
         { x: x / delta, y: y / delta, z: z / delta }
      )
   }

   const getDistance = (mob1, mob2) => {
      let xDist = mob1.x - mob2.x
      let yDist = mob1.y - mob2.y
      let zDist = mob1.z - mob2.z
      return Math.sqrt(square(xDist) + square(yDist) + square(zDist))
   }

   const findNearestToEarth = () => {
      let nearestDist = 100
      // let nearestDist
      let all = []
      // let test = []
      enemies.map((enemy) => {
         let dist = getDistance(enemy, { x: 0, y: 0, z: 0 })
         if (dist < nearestDist) {
            nearestDist = dist
            all.push(enemy)
            // test.push(dist)
         }
      })
      // console.log(test)
      return all[all.length - 1]
   }

   // const weaponData = baseWeapon



   useFrame(({ clock }) => {

      // ROTATE EARTH AND CLOUDS
      const elapsedTime = clock.getElapsedTime();
      const seconds = Math.floor(elapsedTime)

      setEarthPosition({
         ...earthPosition,
         rotation: { y: elapsedTime / 10 }
      })
      setCloudsPosition({
         ...cloudsPosition,
         rotation: { y: elapsedTime / 8 }
      })


      // MOVE ENEMIES
      if (enemies.length > 0) {
         setEnemies(
            enemies.map(
               (enemy) => {
                  return ({
                     id: enemy.id,
                     geometry: enemy.geometry,
                     size: enemy.size,
                     damage: enemy.damage,
                     speed: enemy.speed,
                     maxHp: enemy.maxHp,
                     curHp: enemy.curHp,
                     color: enemy.color,
                     x: enemy.x - enemy.velocity.x,
                     y: enemy.y - enemy.velocity.y,
                     z: enemy.z - enemy.velocity.z,
                     s: enemy.s,
                     velocity: {
                        x: enemy.velocity.x,
                        y: enemy.velocity.y,
                        z: enemy.velocity.z
                     }

                  })
               }
            )
         )
      }

      // MOVE PROJECTILES
      if (projectiles.length > 0) {
         setProjectiles(
            projectiles.map(
               (projectile) => ({
                  id: projectile.id,
                  geometry: projectile.geometry,
                  damage: projectile.damage,
                  speed: projectile.speed,
                  x: projectile.x + projectile.velocity.x,
                  y: projectile.y + projectile.velocity.y,
                  z: projectile.z + projectile.velocity.z,
                  s: projectile.s,
                  velocity: {
                     x: projectile.velocity.x,
                     y: projectile.velocity.y,
                     z: projectile.velocity.z
                  }


               }
               ))
         )
      }


      // SPAWN ENEMIES      
      if (seconds % 2 === 0) {
         if (!enemyTimer && enemies.length < 15) {

            setEnemyTimer(true)

            let enemyPoints = {
               x: Math.random() * 100 - 50,
               y: Math.random() * 100 - 50,
               z: Math.random() * 100 - 50
            }

            let newEnemy = loadEnemy(levelData.level)
            let enemyVelocity = normalize(enemyPoints.x, enemyPoints.y, enemyPoints.z)

            setEnemies([
               ...enemies,
               {
                  id: Math.random(),
                  geometry: [0.1 * newEnemy.size, 32, 32],
                  size: newEnemy.size,
                  speed: newEnemy.speed,
                  damage: newEnemy.damage,
                  maxHp: newEnemy.maxHp,
                  curHp: newEnemy.maxHp,
                  color: newEnemy.color,
                  x: enemyPoints.x,
                  y: enemyPoints.y,
                  z: enemyPoints.z,
                  s: Math.random() + 1,
                  velocity: {
                     x: enemyVelocity.x * newEnemy.speed / 15,
                     y: enemyVelocity.y * newEnemy.speed / 15,
                     z: enemyVelocity.z * newEnemy.speed / 15
                  }
               }
            ])
         }
      } else {
         setEnemyTimer(false)
      }

      // SPAWN PROJECTILES  
      if (enemies.length > 0) {
         if (seconds !== projectileTimer) {
            setProjectileTimer(seconds)

            let projectilePoints = {
               x: 0,
               y: 0,
               z: 0
            }

            let nearestEnemy = findNearestToEarth()
            let newProjectile = loadWeapon()
            let projectileVelocity = normalize(nearestEnemy.x, nearestEnemy.y, nearestEnemy.z)

            setProjectiles([
               ...projectiles,
               {
                  id: Math.random(),
                  geometry: [0.03 * newProjectile.size, 32, 32],
                  damage: newProjectile.damage,
                  speed: newProjectile.speed,
                  x: projectilePoints.x,
                  y: projectilePoints.y,
                  z: projectilePoints.z,
                  s: Math.random() + 1,
                  velocity: {
                     x: projectileVelocity.x * newProjectile.speed / 15,
                     y: projectileVelocity.y * newProjectile.speed / 15,
                     z: projectileVelocity.z * newProjectile.speed / 15
                  }
               }
            ])
         }
      }



   })


   return null

}
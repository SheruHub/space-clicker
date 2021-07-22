import React from 'react'
// import { useRecoilState } from 'recoil';
// import { enemyPositionState } from '../gameState';

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

export const getDistance = (mob1, mob2) => {
   let xDist = mob1.x - mob2.x
   let yDist = mob1.y - mob2.y
   let zDist = mob1.z - mob2.z
   return Math.sqrt(square(xDist) + square(yDist) + square(zDist))
}

export function isCollision(first, second) {
   let firstSpeed = first.speed ? first.speed : 0
   let secondSpeed = second.speed ? second.speed : 0

   return getDistance(first, second) <= (first.geometry[0] + second.geometry[0]) + Math.min(firstSpeed, secondSpeed)
}



let baseHp = 100

export const baseEarth = {
   x: 0,
   y: 0,
   z: 0,
   maxHp: baseHp,
   curHp: baseHp,
   geometry: [1, 32, 32],
   size: 1
}

export const loadEarth = () => {
   // if (level > enemyLevels.length) level = enemyLevels.length
   // return enemyLevels[level - 1]
   return baseEarth
}
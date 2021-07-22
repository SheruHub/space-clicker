export const baseWeapon = {
   damage: 10,
   speed: 5,
   color: 'red',
   size: 1
}

export const loadWeapon = () => {
   // if (level > enemyLevels.length) level = enemyLevels.length
   // return enemyLevels[level - 1]
   return baseWeapon
}
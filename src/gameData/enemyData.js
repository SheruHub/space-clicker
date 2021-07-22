export const baseEnemy = {
   maxHp: 10,
   speed: 5,
   size: 2,
   damage: 1,
   color: 'hotpink'
}

export const enemyLevels = [
   {
      maxHp: baseEnemy.maxHp,
      speed: baseEnemy.speed,
      size: baseEnemy.size,
      damage: baseEnemy.damage,
      color: baseEnemy.color
   },
   {
      maxHp: baseEnemy.maxHp * 1.5,
      speed: baseEnemy.speed,
      size: baseEnemy.size * 1.2,
      damage: baseEnemy.damage * 2,
      color: 'green'
   },
   {
      maxHp: baseEnemy.maxHp * 2,
      speed: baseEnemy.speed * 1.2,
      size: baseEnemy.size * 1.5,
      damage: baseEnemy.damage * 5,
      color: 'orange'
   },
   {
      maxHp: baseEnemy.maxHp * 2.5,
      speed: baseEnemy.speed * 1.4,
      size: baseEnemy.size * 1.7,
      damage: baseEnemy.damage * 7,
      color: 'blue'
   },
   {
      maxHp: baseEnemy.maxHp * 3,
      speed: baseEnemy.speed * 1.6,
      size: baseEnemy.size * 1.7,
      damage: baseEnemy.damage * 10,
      color: 'red'
   },
]

export const loadEnemy = (level) => {
   if (level > enemyLevels.length) level = enemyLevels.length
   return enemyLevels[level - 1]
}
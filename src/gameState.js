import { atom } from 'recoil'
import { loadEarth } from './gameData/earthData'


// GAME STATE
export const _gameState = atom({
   key: "gameState",
   default: {
      options: {
         GAMEOVER: "GAMEOVER",
         RUNNING: "RUNNING",
         MENU: "MENU",
         SHOWSCORE: "SHOWSCORE"
      },
      state: "MENU",
   }
})

// MOBILES
export const enemyPositionState = atom({
   key: "enemyPosition",
   default: []
})

export const projectilePositionState = atom({
   key: 'projectilePosition',
   default: []
})


// EARTH STUFF
export const earthPositionState = atom({
   key: 'earthPositionState',
   default: { x: 0, y: 0, z: 0, rotation: { x: 0, y: 0, z: 0 }, speed: 1 }
})

export const cloudsPositionState = atom({
   key: 'cloudsPositionState',
   default: { x: 0, y: 0, z: 0, rotation: { x: 0, y: 0, z: 0 }, speed: 1 }
})

export const earthStatusState = atom({
   key: 'earthStatusState',
   default: loadEarth()
})

// UI STUFF
export const levelDataState = atom({
   key: 'levelDataState',
   default: { level: 1, killed: 0 }
})

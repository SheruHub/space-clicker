import React from 'react'
import { useRecoilState } from 'recoil'
import { Bloom } from './components/Bloom'
import { DrawEnemies } from './components/DrawEnemies'
import { DrawProjectiles } from './components/DrawProjectiles'
import { Earth } from './components/earth'
import { GameTimer } from './components/GameTimer'
import { DoCollisions } from './gameFunctions/collisions'
import { UI } from './UI'
import { earthStatusState, levelDataState, _gameState } from './gameState'
import { Html } from '@react-three/drei'
import { loadGameState } from './gameData/gameData'
import { loadEarth } from './gameData/earthData'

export const Main = () => {

   const [gameState, setGameState] = useRecoilState(_gameState)
   const [levelState, setLevelState] = useRecoilState(levelDataState)
   const [earthState, setEarthState] = useRecoilState(earthStatusState)
   // console.log(gameState.state)

   const newGame = () => {
      setEarthState(loadEarth())
      setLevelState(loadGameState())
      setGameState({ ...gameState, state: gameState.options.RUNNING })
   }

   const menu = () => {
      setGameState({ ...gameState, state: gameState.options.MENU })
   }

   return (
      <>
         {gameState.state === gameState.options.MENU &&
            <>
               <Html distanceFactor={100}>
                  <div class="menu-text">
                     Welcome to space-clicker-thing
                  </div>
                  <button class="start" onClick={() => newGame()}>Start game!</button>
               </Html>
            </>
         }
         {gameState.state === gameState.options.RUNNING &&
            <>
               <UI />
               <Bloom>
                  <ambientLight />
                  <Earth />
                  <DrawEnemies />
                  <DrawProjectiles />
                  <DoCollisions />
               </Bloom>
               <GameTimer />
            </>
         }
         {gameState.state === gameState.options.GAMEOVER &&
            <>
               <>
                  <Html distanceFactor={100}>
                     <div class="menu-text">
                        Game Over
                     </div>
                     <button class="start" onClick={() => menu()}>Back to main menu</button>
                  </Html>
               </>
            </>
         }
      </>
   )
}

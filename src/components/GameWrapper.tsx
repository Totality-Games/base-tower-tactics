import { Color, Engine, Resolution } from 'excalibur';
import { onMount } from 'solid-js';

// import all scenes
import { StartScreen, startScreenLoader } from '../scenes/TitleMenu/Scene';
import { useGameContext } from '../context/store';
import { SCENE_NAMES } from '../constants';
import { BattleOne, battleOneSceneLoader } from '../scenes/BattleOne/Scene';

export function GameWrapper() {
  const { setGlobalStore } = useGameContext();

  onMount(() => {
    // start the game with Excalibur.js
    const game = new Engine({
      canvasElementId: 'game-canvas',
      backgroundColor: Color.Black,
      pixelArt: true,
      pixelRatio: 10,
      resolution: Resolution.NintendoDS,
      scenes: {
        start: {
          scene: new StartScreen(useGameContext()), // must pass the globalStore context into scenes to update it
          loader: startScreenLoader,
        },
        battleOne: {
          scene: new BattleOne(useGameContext()),
          loader: battleOneSceneLoader,
        },
      },
    });

    // start the game
    game.start().then(async () => {
      setGlobalStore('gameEngine', game);
      game.goToScene(SCENE_NAMES.START);
      setGlobalStore('currentScene', SCENE_NAMES.START);
    });
  });

  return (
    <>
      <canvas id='game-canvas'></canvas>
    </>
  );
}

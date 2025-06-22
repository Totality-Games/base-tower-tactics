import { Color, Engine, Resolution } from 'excalibur';
import { onMount } from 'solid-js';

// import all scenes
import { StartScreen, startScreenLoader } from '../scenes/TitleMenu/Scene';

export function GameWrapper() {
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
          scene: new StartScreen(), // must pass the globalStore context into scenes to update it
          loader: startScreenLoader,
        },
      },
    });

    // start the game
    game.start().then(async () => {
      game.goToScene('start');
    });
  });

  return (
    <>
      <canvas id='game-canvas'></canvas>
    </>
  );
}

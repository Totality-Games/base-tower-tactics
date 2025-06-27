import { Show } from 'solid-js';
import { useGameContext } from '../../context/store';
import { SCENE_STATE } from '../../constants';

export function CombatMenu() {
  const { globalStore } = useGameContext();

  return (
    <>
      <Show when={globalStore.sceneState === SCENE_STATE.COMBAT}>
        <div
          class='absolute h-[20vh] w-1/5 top-4 left-4'
          style={{
            'z-index': '99',
            'font-family': '"Jersey 10", serif',
          }}>
          <div class='absolute w-full h-full top-0 left-0 text-black z-[101] bg-white/90 rounded-2xl'>
            <div class='flex flex-col justify-start items-start h-full w-full px-6 py-4'>
              <span class='flex flex-col justify-start items-start'>
                <h1 class='text-4xl underline mb-1'>Combat Menu</h1>
              </span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

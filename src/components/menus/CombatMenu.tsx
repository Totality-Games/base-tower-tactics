import { For, Show } from 'solid-js';
import { useGameContext } from '../../context/store';
import { SCENE_STATE } from '../../constants';

export function CombatMenu() {
  const { globalStore } = useGameContext();

  return (
    <>
      <Show when={globalStore.sceneState === SCENE_STATE.COMBAT}>
        <div
          class='absolute h-full w-1/5 top-4 left-4'
          style={{
            'z-index': '99',
            'font-family': '"Jersey 10", serif',
          }}>
          <div class='absolute w-full  top-0 left-0 text-black z-[101] bg-white/90 rounded-2xl'>
            <div class='flex flex-col justify-start items-start  w-full px-6 py-4'>
              <span class='flex flex-col justify-start items-start'>
                <h1 class='text-5xl underline mb-1'>Combat Menu</h1>
                <h1 class='text-4xl mb-1'>Initiative Order:</h1>
                <For
                  each={globalStore.initiativeOrder}
                  fallback={<></>}>
                  {(combatUnit, index) => (
                    <div
                      data-index={index()}
                      class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'>
                      {combatUnit.name}
                    </div>
                  )}
                </For>
              </span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

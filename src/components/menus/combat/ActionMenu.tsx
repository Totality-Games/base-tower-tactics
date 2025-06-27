import { Show } from 'solid-js';
import { useGameContext } from '../../../context/store';

export function ActionMenu() {
  const { globalStore } = useGameContext();

  return (
    <>
      <Show when={globalStore.actionMenu}>
        <div
          class='absolute h-full w-1/5 top-4 right-4'
          style={{
            'z-index': '99',
            'font-family': '"Jersey 10", serif',
          }}>
          <div class='absolute w-full  top-0 right-0 text-black z-[101] bg-white/90 rounded-2xl'>
            <div class='flex flex-col justify-start items-start  w-full px-6 py-4'>
              <span class='flex flex-col justify-start items-start'>
                <h1 class='text-5xl underline mb-1'>Action Menu</h1>

                <div class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'>
                  Move
                </div>
                <div class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'>
                  Attack
                </div>
              </span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

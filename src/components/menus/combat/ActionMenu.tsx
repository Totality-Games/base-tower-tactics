import { Show } from 'solid-js';
import { useGameContext } from '../../../context/store';

export function ActionMenu() {
  const { globalStore, setGlobalStore } = useGameContext();

  // this component needs access to the info from the current turn unit:
  // I can log the total number of units with initiativeOrder.length -- done
  // Perhaps I can have a simple incrementer (from 0 to initiativeOrder.length - 1) to mark turns; -- done
  // The incrementer will always match only one of the units initiativeOrder indexes. -- true
  // the unit that matches the incrementer is the current turn unit. -- done

  // incrementer will increase after attack is performed.

  // clicking on Move should display the current turn unit's movement squares
  function handleMovementClick() {
    const currentTurnUnit =
      globalStore.initiativeOrder![globalStore.currentCombatTurnValue];

    if (!currentTurnUnit.hasMoved) {
      currentTurnUnit.showMovementSquares = true;
      setGlobalStore('actionMenu', false);
    } else {
      alert('already moved!');
    }
  }

  function handleAttackClick() {
    return true;
  }

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

                <div
                  class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                  onclick={handleMovementClick}>
                  Move
                </div>
                <div
                  class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                  onclick={handleAttackClick}>
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

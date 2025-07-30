import { createSignal, Show } from 'solid-js';
import { useGameContext } from '../../../context/store';

export function ActionMenu() {
  const { globalStore, setGlobalStore } = useGameContext();
  const [isMoving, setIsMoving] = createSignal(false);
  const [originalPos, setOriginalPos] = createSignal({ x: 0, y: 0 });

  // this component needs access to the info from the current turn unit:
  // I can log the total number of units with initiativeOrder.length -- done
  // Perhaps I can have a simple incrementer (from 0 to initiativeOrder.length - 1) to mark turns; -- done
  // The incrementer will always match only one of the units initiativeOrder indexes. -- true
  // the unit that matches the incrementer is the current turn unit. -- done
  // incrementer will increase after attack is performed.

  // the player should be able to perform these actions on each unit in their party:
  // 1. move:
  //    a. click on unit or press enter when selector is highlighting them
  //    b. click on square to travel to or press enter when selector is highlighting that square
  //    c. the moving animation should play as the unit moves
  //    d. after moving, a menu with these options should be available:
  //      - Stay/No Action
  //      - Action (Either attack or cast)
  //      - Open Inventory
  //      - Cancel Movement (returns unit to starting square, plays movement animation)
  // 2. action:
  //    a. Melee Attack
  //    b. Cast Spell
  // 3. inventory
  //    a. opens a new menu for player to scroll through their party or unit inventory

  // clicking on Move should display the current turn unit's movement squares
  function handleMovementClick() {
    const currentTurnUnit =
      globalStore.initiativeOrder![globalStore.currentCombatTurnValue];

    if (!currentTurnUnit.hasMoved) {
      currentTurnUnit.showMovementSquares = true;
      setIsMoving(true);
      setOriginalPos({ x: currentTurnUnit.pos.x, y: currentTurnUnit.pos.y });
      // setGlobalStore('actionMenu', false);
    } else {
      alert('already moved!');
    }
  }

  function handleCancelMovementClick() {
    const currentTurnUnit =
      globalStore.initiativeOrder![globalStore.currentCombatTurnValue];
    currentTurnUnit.hasMoved = false;
    setIsMoving(false);
    currentTurnUnit.pos.x = originalPos().x;
    currentTurnUnit.pos.y = originalPos().y;
  }

  function handleAttackClick() {
    const currentTurnUnit =
      globalStore.initiativeOrder![globalStore.currentCombatTurnValue];

    if (!currentTurnUnit.hasAttacked) {
      currentTurnUnit.showAttackSquares = true;
      setGlobalStore('actionMenu', false);
    } else {
      alert('already attacked!');
    }
  }

  function handleStayClick() {
    const currentTurnUnit =
      globalStore.initiativeOrder![globalStore.currentCombatTurnValue];
    currentTurnUnit.hasAttacked = true;
    setGlobalStore('actionMenu', false);
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

                <Show when={!isMoving()}>
                  <div
                    class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                    onclick={handleMovementClick}>
                    Move
                  </div>
                </Show>
                <Show when={isMoving()}>
                  <div
                    class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                    onclick={handleCancelMovementClick}>
                    Cancel Movement
                  </div>
                </Show>
                <div
                  class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                  onclick={handleAttackClick}>
                  Attack
                </div>
                <div
                  class='text-3xl cursor-pointer m-4 text-slate-700 hover:text-black'
                  onclick={handleStayClick}>
                  No Action
                </div>
              </span>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

import { createSignal, For, Show } from 'solid-js';
import { useGameContext } from '../../../context/store';
import { SCENE_STATE } from '../../../constants';
import type { CombatUnit } from '../../../actors/combatUtils/CombatUnit';

export function CombatMenu() {
  const { globalStore, setGlobalStore } = useGameContext();
  const [combatUnitDetails, setCombatUnitDetails] = createSignal<
    CombatUnit | undefined
  >(undefined);

  function handleUnitNameClick(combatUnit: CombatUnit) {
    const currentMenuOpen = combatUnit.menuOpen; // store value when clicked

    // reset ui
    setGlobalStore('showCombatUnitMenu', false);
    globalStore.initiativeOrder?.map((unit) => {
      unit.menuOpen = false;
    });

    if (!currentMenuOpen) {
      // if false when clicked, set true and show;
      combatUnit.menuOpen = true;
      setCombatUnitDetails(combatUnit);
      setGlobalStore('showCombatUnitMenu', true);

      // set action menu to false if unit detail menu is displayed since they occupy the same space
      setGlobalStore('actionMenu', false);
    }

    // if true when clicked, do nothing because ui was already reset.
  }

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
                <h2 class='text-4xl mb-1'>Initiative Order:</h2>
                <For
                  each={globalStore.initiativeOrder}
                  fallback={<></>}>
                  {(combatUnit, index) => (
                    <>
                      <div
                        data-index={index()}
                        class={`text-3xl cursor-pointer m-4 ${combatUnit.isInParty ? 'text-slate-700 hover:text-black' : 'text-red-700 hover:text-red-900'}`}
                        onclick={() => handleUnitNameClick(combatUnit)}>
                        {combatUnit.name}
                      </div>
                    </>
                  )}
                </For>
              </span>
            </div>
          </div>
        </div>

        <Show when={globalStore.showCombatUnitMenu}>
          <CombatUnitDetailUI unit={combatUnitDetails()} />
        </Show>
      </Show>
    </>
  );
}

function CombatUnitDetailUI(props: { unit?: CombatUnit }) {
  return (
    <>
      <div
        class='absolute h-full w-1/5 top-4 right-4'
        style={{
          'z-index': '99',
          'font-family': '"Jersey 10", serif',
        }}>
        <div class='absolute w-full  top-0 right-0 text-black z-[101] bg-white/90 rounded-2xl'>
          <div class='flex flex-col justify-start items-start  w-full px-6 py-4'>
            <span class='flex flex-col justify-start items-start'>
              <h1
                class={`text-5xl underline mb-1 ${props.unit?.isInParty ? 'text-slate-700 ' : 'text-red-700'}`}>
                {props.unit?.name}
              </h1>

              <div>
                <h3 class='text-4xl'>Stats:</h3>

                <div class='text-3xl flex flex-col gap-2 ml-4'>
                  <div>
                    <span>Strength</span>: {props.unit?.stats.strength}.
                  </div>
                  <div>
                    <span>Dexterity</span>: {props.unit?.stats.dexterity}.
                  </div>
                  <div>
                    <span>Constitution</span>: {props.unit?.stats.constitution}.
                  </div>
                  <div>
                    <span>Wisdom</span>: {props.unit?.stats.wisdom}.
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

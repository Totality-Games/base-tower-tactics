import { createContext, useContext, type JSXElement } from 'solid-js';
import { createStore, type SetStoreFunction } from 'solid-js/store';
import { SCENE_STATE } from '../constants';
import { type Engine, type Sound } from 'excalibur';
import type { CombatUnit } from '../actors/combatUtils/CombatUnit';

export interface GlobalStoreType {
  gameEngine?: Engine;
  sceneState: SCENE_STATE;
  currentScene: string;
  currentSong?: Sound;
  initiativeOrder?: CombatUnit[];
  actionMenu: boolean;
  showCombatUnitMenu: boolean;
}

export type SetGlobalStoreType = SetStoreFunction<GlobalStoreType>;
export interface ContextProps {
  globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
}

const GameContext = createContext<ContextProps>();

export function GameContextProvider(props: { children: JSXElement }) {
  const [globalStore, setGlobalStore] = createStore({
    sceneState: SCENE_STATE.INITIAL_LOAD,
    currentScene: 'start',
    actionMenu: false,
    showCombatUnitMenu: false,
  });

  return (
    <GameContext.Provider value={{ globalStore, setGlobalStore }}>
      {props.children}
    </GameContext.Provider>
  );
}

export const useGameContext = () => useContext(GameContext)!;

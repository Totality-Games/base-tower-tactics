import { TitleMenu } from './components/menus/TitleMenu.tsx';
import { GameWrapper } from './components/GameWrapper.tsx';
import { GameContextProvider } from './context/store.tsx';
import { CombatMenu } from './components/menus/combat/CombatMenu.tsx';
import { ActionMenu } from './components/menus/combat/ActionMenu.tsx';

function App() {
  return (
    <GameContextProvider>
      {/* Menus */}
      <TitleMenu />
      <CombatMenu />
      <ActionMenu />

      {/* Game */}
      <GameWrapper />
    </GameContextProvider>
  );
}

export default App;

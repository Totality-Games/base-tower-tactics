import { TitleMenu } from './components/menus/TitleMenu.tsx';
import { GameWrapper } from './components/GameWrapper.tsx';
import { GameContextProvider } from './context/store.tsx';
import { CombatMenu } from './components/menus/CombatMenu.tsx';

function App() {
  return (
    <GameContextProvider>
      {/* Menus */}
      <TitleMenu />
      <CombatMenu />

      {/* Game */}
      <GameWrapper />
    </GameContextProvider>
  );
}

export default App;

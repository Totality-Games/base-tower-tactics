import { TitleMenu } from './components/menus/TitleMenu.tsx';
import { GameWrapper } from './components/GameWrapper.tsx';
import { GameContextProvider } from './context/store.tsx';

function App() {
  return (
    <GameContextProvider>
      {/* Menus */}
      <TitleMenu />

      {/* Game */}
      <GameWrapper />
    </GameContextProvider>
  );
}

export default App;

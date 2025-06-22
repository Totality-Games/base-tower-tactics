import { TitleMenu } from './components/menus/TitleMenu.tsx';
import { GameWrapper } from './components/GameWrapper.tsx';

function App() {
  return (
    <>
      {/* Menus */}
      <TitleMenu />

      {/* Game */}
      <GameWrapper />
    </>
  );
}

export default App;

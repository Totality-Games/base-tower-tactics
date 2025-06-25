export function TitleMenu() {
  function handleNewGameClick() {
    alert(true);
  }

  return (
    <>
      <div
        class='absolute h-full w-full flex flex-col items-center justify-center'
        style={{
          'z-index': '100',
        }}>
        <div
          class='w-[525px] h-[70vh] text-center text-black text-6xl z-[101] bg-white/40 rounded-2xl flex flex-row items-center justify-center gap-4'
          style={{ 'font-family': '"Jersey 10", serif' }}>
          <div class='flex flex-col justify-around items-center h-full'>
            <h1 class=''>Base Tower Tactics</h1>
            <span class='flex flex-col gap-4'>
              <button
                class={`hover:cursor-pointer hover:text-slate-500`}
                onclick={handleNewGameClick}>
                NEW GAME
              </button>
            </span>

            <div class='w-[500px] h-[100px] text-center text-2xl text-slate-950 flex flex-row items-center justify-center gap-4'>
              <img
                src='./assets/images/logos/ex-logo.png'
                alt='Excalibur.js'
                class='w-[20px] h-[20px]'
              />
              Made with Excalibur.js
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

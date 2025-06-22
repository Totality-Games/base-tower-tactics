/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import './index.css';

// render the ui with SolidJS
const game_div = document.getElementById('game_div');
render(() => <App />, game_div!);

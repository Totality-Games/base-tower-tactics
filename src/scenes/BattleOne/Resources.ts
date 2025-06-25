import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Resource } from 'excalibur';

// import map
import battleOneMapPath from '/assets/tmx/combat1.tmx?url';

// // import music
// import harborMP3 from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).mp3';
// import harborOgg from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).ogg';
// import harborWav from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).wav';

// import spritesheets
// import heroPath from '/assets/sprites/characters/main/player/Character006.png?url';
import castleInterriorsSetPath from '/assets/tilesets/RPG_Buildings_CASTLE_v1.0/castle_interriors.png?url';

// import tilesets
import castleInterriorsTsxPath from '/assets/tsx/castle_interriors.tsx?url';

export const battleOneResources = {
  //   HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  //   Music: new Sound(harborMP3, harborWav, harborOgg),
  TiledMap: new TiledResource(battleOneMapPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'combat1.tmx', output: battleOneMapPath }, // map
      { path: 'castle_interriors.png', output: castleInterriorsSetPath }, // spritesheet
    ],
  }),
  castleInterriorsTsxResource: new Resource(castleInterriorsTsxPath, 'text'),
} as const;

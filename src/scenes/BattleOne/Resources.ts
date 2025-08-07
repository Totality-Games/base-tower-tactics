import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageFiltering, ImageSource, Resource, Sound } from 'excalibur';

// import map
import battleOneMapPath from '/assets/tmx/combat1.tmx?url';

// // import music
// import harborMP3 from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).mp3';
// import harborOgg from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).ogg';
// import harborWav from '/assets/audio/music/Harbor 1 - Treasure Island (Loopable).wav';

// import sounds
import attackSound from '/assets/audio/sounds/melee/Stab4-1.wav';
import partyDeathSound from '/assets/audio/sounds/death/Quest_Abandoned.wav';

// import spritesheets
import heroPath from '/assets/sprites/characters/main/player/Character006.png?url';
import delsaranPath from '/assets/sprites/characters/main/Delsaran/Character041.png?url';
import wolfkinPath from '/assets/sprites/characters/wolfkin/beast_tribe_1.png?url';
import castleInterriorsSetPath from '/assets/tilesets/RPG_Buildings_CASTLE_v1.0/castle_interriors.png?url';

// import tilesets
import castleInterriorsTsxPath from '/assets/tsx/castle_interriors.tsx?url';

export const battleOneResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  DelsaranSpriteSheetPng: new ImageSource(
    delsaranPath,
    false,
    ImageFiltering.Pixel
  ),
  WolfkinSpriteSheetPng: new ImageSource(
    wolfkinPath,
    false,
    ImageFiltering.Pixel
  ),
  //   Music: new Sound(harborMP3, harborWav, harborOgg),
  AttackSound: new Sound(attackSound),
  DeathSound: new Sound(partyDeathSound),
  TiledMap: new TiledResource(battleOneMapPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'combat1.tmx', output: battleOneMapPath }, // map
      { path: 'castle_interriors.png', output: castleInterriorsSetPath }, // spritesheet
    ],
  }),
  castleInterriorsTsxResource: new Resource(castleInterriorsTsxPath, 'text'),
} as const;

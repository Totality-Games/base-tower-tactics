import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageFiltering, ImageSource, Resource, Sound } from 'excalibur';

// import map
import battleOneMapPath from '/assets/tmx/combat1.tmx?url';

// // import music
import combatOneMP3 from '/assets/audio/music/combat/RPG Combat 1 - Training Wheels (Loopable).mp3';
import combatOneOgg from '/assets/audio/music/combat/RPG Combat 1 - Training Wheels (Loopable).ogg';
import combatOneWav from '/assets/audio/music/combat/RPG Combat 1 - Training Wheels (Loopable).wav';

// import sounds
import attackSound from '/assets/audio/sounds/melee/Stab4-1.wav';
import partyDeathSound from '/assets/audio/sounds/death/Quest_Abandoned.wav';

// import spritesheets
import heroPath from '/assets/sprites/characters/main/player/Character006.png?url';
import delsaranPath from '/assets/sprites/characters/main/Delsaran/Character041.png?url';
import iadosPath from '/assets/sprites/characters/main/Iados/Character159.png?url';
import zephyriusPath from '/assets/sprites/characters/main/Zephyrius/Character026.png?url';
import wolfkinPath from '/assets/sprites/characters/wolfkin/beast_tribe_1.png?url';
import structurePath from '/assets/sprites/structures/Structure-2.png?url';
import angelBluePath from '/assets/sprites/deities/Angel_blue-Sheet.png?url';
import agisPath from '/assets/sprites/deities/Agis.png?url';
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
  IadosSpriteSheetPng: new ImageSource(iadosPath, false, ImageFiltering.Pixel),
  ZephyriusSpriteSheetPng: new ImageSource(
    zephyriusPath,
    false,
    ImageFiltering.Pixel
  ),
  WolfkinSpriteSheetPng: new ImageSource(
    wolfkinPath,
    false,
    ImageFiltering.Pixel
  ),
  StructureSpriteSheetPng: new ImageSource(
    structurePath,
    false,
    ImageFiltering.Pixel
  ),
  AngelSpriteSheetPng: new ImageSource(
    angelBluePath,
    false,
    ImageFiltering.Pixel
  ),
  AgisSpriteSheetPng: new ImageSource(agisPath, false, ImageFiltering.Pixel),
  Music: new Sound(combatOneMP3, combatOneWav, combatOneOgg),
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

// enums
export enum SCENE_STATE {
  INITIAL_LOAD = 'SCENE_STATE_INITIAL_LOAD', // for the StartLoader
  LOADING = 'SCENE_STATE_LOADING', // when resources or data are loading
  READY = 'SCENE_STATE_READY', // when resources and data are done loading
  CUTSCENE = 'SCENE_STATE_CUTSCENE', // when the player is watching a cutscene
  PLAYING = 'SCENE_STATE_PLAYING', // when the game is being played
  COMBAT = 'SCENE_STATE_COMBAT', // when the player is in combat
  INTERACTING = 'SCENE_STATE_INTERACTING', // when the player is talking or investigating
  TITLE = 'SCENE_STATE_TITLE', // when the player is on the title menu
  PAUSED = 'SCENE_STATE_PAUSED', // when the game is paused
  GAMEOVER = 'SCENE_STATE_GAMEOVER', // when the user dies
  ERROR = 'SCENE_STATE_ERROR', // when there is an error in the game
}

export enum DIRECTIONS {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum MOVEMENT {
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
}

export enum SEXES {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum RACES {
  ACCURSED = 'ACCURSED',
  ELF = 'ELF',
  HALF_ELF = 'HALF_ELF',
  HUMAN = 'HUMAN',
  NIX_FORGED = 'NIX_FORGED',
}

export enum CLASSES {
  CLERIC = 'CLERIC',
  THIEF = 'THIEF',
  WARRIOR = 'WARRIOR',
  WIZARD = 'WIZARD',
}

export enum SCENE_NAMES {
  START = 'start', // TitleMenu Scene
  BATTLE_ONE = 'battleOne',
}

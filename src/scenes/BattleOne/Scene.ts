import {
  BoundingBox,
  DefaultLoader,
  Engine,
  vec,
  type SceneActivationContext,
} from 'excalibur';
import { battleOneResources } from './Resources';
import { BaseSceneWithContext } from '../BaseSceneWithContext';
import { SCENE_STATE } from '../../constants';
import { MainGuy } from '../../actors/main/Player';
import { gridCells } from '../../utils';
import { Guard } from '../../actors/npcs/Guard';
import { Delsaran } from '../../actors/main/Delsaran';
import { Iados } from '../../actors/main/Iados';
import { Zephyrius } from '../../actors/main/Zephyrius';

export class BattleOne extends BaseSceneWithContext {
  onInitialize(engine: Engine): void {
    this.setCameraBoundaries(engine);
    engine.currentScene.camera.zoom = 0.7;

    const player = new MainGuy(
      vec(gridCells(2), gridCells(6)),
      battleOneResources,
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      true // isInParty
    );
    const player2 = new Delsaran(
      vec(gridCells(3), gridCells(6)),
      battleOneResources,
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      true // isInParty
    );
    const player3 = new Iados(
      vec(gridCells(4), gridCells(6)),
      battleOneResources,
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      true // isInParty
    );
    const player4 = new Zephyrius(
      vec(gridCells(5), gridCells(6)),
      battleOneResources,
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      true // isInParty
    );
    engine.currentScene.add(player);
    engine.currentScene.add(player2);
    engine.currentScene.add(player3);
    engine.currentScene.add(player4);
    this.setGlobalStore('initiativeOrder', [player, player2, player3, player4]);

    battleOneResources.TiledMap.addToScene(engine.currentScene);

    const enemies = this.setupEnemies();
    enemies.map((enemy) => {
      engine.currentScene.add(enemy);
      this.setGlobalStore('initiativeOrder', [
        ...this.globalStore.initiativeOrder!,
        enemy,
      ]);
    });

    this.setGlobalStore(
      'currentCombatUnitTotal',
      this.globalStore.initiativeOrder!.length - 1
    );
  }

  async onActivate(_context: SceneActivationContext<unknown>): Promise<void> {
    this.setGlobalStore('currentSong', () => battleOneResources.Music);
    this.setGlobalStore('sceneState', SCENE_STATE.COMBAT);
    if (this.globalStore.currentSong?.isLoaded()) {
      this.globalStore.currentSong.loop = true;
      this.globalStore.currentSong?.play(0.1); // begin Chapter One Combat music
    }
  }

  onDeactivate(_context: SceneActivationContext): void {}

  onPreUpdate(_engine: Engine, _delta: number): void {}

  private setupEnemies() {
    const guardOne = new Guard(
      vec(gridCells(9), gridCells(1)),
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      battleOneResources,
      'Wolfkin Guard One'
    );
    const guardTwo = new Guard(
      vec(gridCells(1), gridCells(1)),
      {
        globalStore: this.globalStore,
        setGlobalStore: this.setGlobalStore,
      },
      battleOneResources,
      'Wolfkin Guard Two'
    );

    return [guardOne, guardTwo];
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = battleOneResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = battleOneResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = battleOneResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 90,
      right: tilemap.pos.y + tileHeight * 32,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }
}

// loader
export const battleOneSceneLoader = new DefaultLoader();
for (const resource of Object.values(battleOneResources)) {
  battleOneSceneLoader.addResource(resource);
}

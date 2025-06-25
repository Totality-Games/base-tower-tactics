import {
  vec,
  Actor,
  Engine,
  CoordPlane,
  Sprite,
  type SceneActivationContext,
  DefaultLoader,
} from 'excalibur';

import { titleMenuResources } from './Resources';
import { BaseSceneWithContext } from '../BaseSceneWithContext';
import { SCENE_STATE } from '../../constants';

const SCALE = vec(1, 1);

export class StartScreen extends BaseSceneWithContext {
  background!: Actor;
  background2!: Actor;
  bgsprite?: Sprite;

  override onInitialize(_engine: Engine): void {
    this.background = new Actor({
      name: 'background',
      pos: vec(0, 0),
      coordPlane: CoordPlane.Screen,
      z: -10,
    });
    this.background.scale = SCALE;
    this.bgsprite = titleMenuResources.BackgroundPng.toSprite();
    this.background.graphics.use(this.bgsprite);

    this.background2 = new Actor({
      name: 'background2',
      pos: vec(200, 200),
      coordPlane: CoordPlane.Screen,
      z: -10,
    });
    this.background2.scale = SCALE;
    this.bgsprite = titleMenuResources.Background2Png.toSprite();
    this.background2.graphics.use(this.bgsprite);

    this.add(this.background);
    this.add(this.background2);
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    this.setGlobalStore('sceneState', SCENE_STATE.TITLE);
  }
}

// loader
export const startScreenLoader = new DefaultLoader();
for (const resource of Object.values(titleMenuResources)) {
  startScreenLoader.addResource(resource);
}

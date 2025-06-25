import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Sprite,
  SpriteSheet,
  Vector,
} from "excalibur";
import { DIRECTIONS, SCENE_STATE } from "../../constants";
import { createEffect } from "solid-js";
import type {
  GlobalStoreType,
  SetGlobalStoreType,
  ContextProps,
} from "../../context/store";

export class Guard extends Actor {
  private globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
  direction: DIRECTIONS;
  spriteSheet: SpriteSheet;
  constructor(
    pos: Vector,
    context: ContextProps,
    spriteSheet: SpriteSheet,
    name: string,
    direction?: DIRECTIONS,
  ) {
    super({
      pos,
      radius: 10,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(1.8, 1.8);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.spriteSheet = spriteSheet;
    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
    this.name = name;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();

    createEffect(() => {
      // 1.8 for default scale; 1.0 for combat scale
      this.scale =
        this.globalStore.sceneState === SCENE_STATE.COMBAT
          ? new Vector(1, 1)
          : new Vector(1.8, 1.8);
    });
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  private addAnimations() {
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 0), // downIdle is 10,0
          duration: 150,
        },
      ],
    });
    this.graphics.add("down-idle", downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add("left-idle", leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add("right-idle", rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add("up-idle", upIdle);
  }
}

import { Actor, Vector, CollisionType, Engine, vec } from "excalibur";
import { createEffect } from "solid-js";
import { DIRECTIONS, SCENE_STATE, type CLASSES } from "../../constants";
import type {
  GlobalStoreType,
  SetGlobalStoreType,
  ContextProps,
} from "../../context/store";
import { GridMovementSquareChild } from "./GridMovementSquares";

export class CombatUnit extends Actor {
  globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
  public direction: DIRECTIONS;
  public class?: CLASSES;
  public stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    wisdom: number;
  };
  constructor(pos: Vector, context: ContextProps) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.direction = DIRECTIONS.DOWN;
    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
    this.stats = {
      strength: 1,
      dexterity: 2,
      constitution: 1,
      wisdom: 1,
    };
  }

  onInitialize(engine: Engine): void {
    console.log("initialize combat unit");
    engine.input.pointers.on("down", this.combatMovement.bind(this));

    createEffect(() => {
      const sceneState = this.globalStore.sceneState;
      // 1.8 for default scale; 1.0 for combat scale
      this.scale =
        sceneState === SCENE_STATE.COMBAT
          ? new Vector(1, 1)
          : new Vector(1.8, 1.8);
    });
  }

  combatMovement() {
    if (this.globalStore.sceneState === SCENE_STATE.COMBAT) {
      this.events.once("pointerdown", () => {
        switch (this.stats.dexterity) {
          case 1: {
            const childLeft = new GridMovementSquareChild(vec(-32, 0));
            const childRight = new GridMovementSquareChild(vec(32, 0));
            const childUp = new GridMovementSquareChild(vec(0, -32));
            const childDown = new GridMovementSquareChild(vec(0, 32));

            this.addChild(childLeft);
            this.addChild(childRight);
            this.addChild(childUp);
            this.addChild(childDown);

            break;
          }
          case 2: {
            const childTwoLeft = new GridMovementSquareChild(vec(-64, 0));
            const childTwoRight = new GridMovementSquareChild(vec(64, 0));
            const childTwoUp = new GridMovementSquareChild(vec(0, -64));
            const childTwoDown = new GridMovementSquareChild(vec(0, 64));

            const childUpLeft = new GridMovementSquareChild(vec(-32, -32));
            const childUpRight = new GridMovementSquareChild(vec(32, -32));
            const childDownLeft = new GridMovementSquareChild(vec(-32, 32));
            const childDownRight = new GridMovementSquareChild(vec(32, 32));

            const childLeft = new GridMovementSquareChild(vec(-32, 0));
            const childRight = new GridMovementSquareChild(vec(32, 0));
            const childUp = new GridMovementSquareChild(vec(0, -32));
            const childDown = new GridMovementSquareChild(vec(0, 32));

            this.addChild(childTwoLeft);
            this.addChild(childTwoRight);
            this.addChild(childTwoUp);
            this.addChild(childTwoDown);
            this.addChild(childUpLeft);
            this.addChild(childUpRight);
            this.addChild(childDownLeft);
            this.addChild(childDownRight);
            this.addChild(childLeft);
            this.addChild(childRight);
            this.addChild(childUp);
            this.addChild(childDown);

            break;
          }

          default: {
            const childLeft = new GridMovementSquareChild(vec(-32, 0));
            const childRight = new GridMovementSquareChild(vec(32, 0));
            const childUp = new GridMovementSquareChild(vec(0, -32));
            const childDown = new GridMovementSquareChild(vec(0, 32));

            this.addChild(childLeft);
            this.addChild(childRight);
            this.addChild(childUp);
            this.addChild(childDown);
            break;
          }
        }
      });
    }
  }
}

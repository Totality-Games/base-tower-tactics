import { Actor, Vector, CollisionType, Engine, vec } from 'excalibur';
import { DIRECTIONS, type CLASSES } from '../../constants';
import type {
  GlobalStoreType,
  SetGlobalStoreType,
  ContextProps,
} from '../../context/store';
import { GridMovementSquareChild } from './GridMovementSquares';

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
  menuOpen: boolean;
  isInParty: boolean;
  constructor(pos: Vector, context: ContextProps, isInParty?: boolean) {
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
      dexterity: 1,
      constitution: 1,
      wisdom: 1,
    };
    this.scale = new Vector(1, 1);
    this.menuOpen = false;
    this.isInParty = isInParty || false;
  }

  onInitialize(_engine: Engine): void {
    console.log('initialize combat unit');
    this.combatActions();
  }

  combatActions() {
    this.events.on('pointerdown', () => {
      // activate action menu
      this.setGlobalStore('actionMenu', !this.globalStore.actionMenu);

      // player movement by dex score
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

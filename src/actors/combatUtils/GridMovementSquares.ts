import {
  Actor,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Rectangle,
  Side,
  vec,
  Vector,
} from 'excalibur';
import type { CombatUnit } from './CombatUnit';
import type {
  ContextProps,
  GlobalStoreType,
  SetGlobalStoreType,
} from '../../context/store';

const rect = new Rectangle({
  width: 32,
  height: 32,
  color: Color.Gray,
});

export class GridMovementSquareChild extends Actor {
  globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
  constructor(pos: Vector, context: ContextProps) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Passive,
    });

    this.z = 103;
    this.scale = new Vector(1, 1);
    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
  }

  onInitialize(_engine: Engine): void {
    console.log(this.name, ': movement grid created');
    this.combatMovement();
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.graphics.use(rect);
    // const parent = this.parent as CombatUnit;
    // const absoluteX = parent?.pos.x + this.pos.x;
    // // const absoluteY = parent?.pos.y + this.pos.y;
    // if (
    //   // this.globalStore.combatTilemapBoundaries.leftBoundary > absoluteX
    //   //  ||
    //   absoluteX < this.globalStore.combatTilemapBoundaries.rightBoundary
    // ) {
    //   this.kill();
    // }
    // if (this.pos.x < 0 || this.pos.y < 0) {
    //   console.log(this.name, this.pos.x, this.pos.y);
    //   console.log(
    //     this.name,
    //     'left/right',
    //     this.globalStore.combatTilemapBoundaries.leftBoundary,
    //     this.globalStore.combatTilemapBoundaries.rightBoundary
    //   );
    //   console.log(
    //     this.name,
    //     'up/down',
    //     this.globalStore.combatTilemapBoundaries.upBoundary,
    //     this.globalStore.combatTilemapBoundaries.downBoundary
    //   );
    //   console.log(this.name, parent?.name, parent?.pos.x, parent?.pos.y);
    // }
  }

  onCollisionStart(
    _self: Collider,
    _other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    this.kill();
  }

  combatMovement() {
    this.on('pointerdown', () => {
      if (this.parent === null) return;
      const parent = this.parent as CombatUnit;
      parent.actions.moveBy(vec(this.pos.x, this.pos.y), 200);
      parent.hasMoved = true;
      parent.showMovementSquares = false;
      parent.children.map((child) => child.kill());
      parent.removeAllChildren();
    });
  }
}

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

const rect = new Rectangle({
  width: 32,
  height: 32,
  color: Color.Gray,
});

export class GridMovementSquareChild extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Passive,
    });

    this.z = 103;
    this.scale = new Vector(1, 1);
  }

  onInitialize(_engine: Engine): void {
    console.log('movement grid created');
    this.combatMovement();
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.graphics.use(rect);
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
      // TODO: remove
      parent.isTurnUnit = false;
    });
  }
}

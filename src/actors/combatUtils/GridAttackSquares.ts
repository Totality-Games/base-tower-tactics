import {
  Actor,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Rectangle,
  Side,
  // vec,
  Vector,
} from 'excalibur';
import type { CombatUnit } from './CombatUnit';
// import type { CombatUnit } from './CombatUnit';

const rect = new Rectangle({
  width: 32,
  height: 32,
  color: Color.fromRGB(249, 250, 251, 0.35),
});

export class GridAttackSquareChild extends Actor {
  unitInRange?: CombatUnit;
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Passive,
    });

    this.z = 0;
    this.scale = new Vector(1, 1);
  }

  onInitialize(_engine: Engine): void {
    console.log('attack grid created');
    this.combatAttack();
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.graphics.use(rect);
  }

  onCollisionStart(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    console.log(other.owner.name);
    if (other.owner.name === 'Walls') {
      this.kill();
    } else {
      this.unitInRange = other.owner as CombatUnit;
    }
  }

  combatAttack() {
    this.on('pointerdown', () => {
      if (this.parent === null) return;
      const parent = this.parent as CombatUnit;
      if (this.unitInRange) {
        // this.unitInRange.kill();
        this.unitInRange.currentHP = Number(this.unitInRange.currentHP) - 1;
        parent.hasAttacked = true;
        parent.showAttackSquares = false;
        parent.children.map((child) => child.kill());
        parent.removeAllChildren();
        // end turn after attack
        parent.isTurnUnit = false;
      }
    });
  }
}

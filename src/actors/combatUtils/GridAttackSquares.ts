import {
  Actor,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Label,
  Rectangle,
  Side,
  // vec,
  Vector,
} from 'excalibur';
import type { CombatUnit } from './CombatUnit';
import { produce } from 'solid-js/store';
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

  onInitialize(engine: Engine): void {
    console.log('attack grid created');
    this.combatAttack(engine);
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
      console.log('inrange:', this.unitInRange);
    }
  }

  combatAttack(engine: Engine) {
    this.on('pointerdown', () => {
      if (this.parent === null) return;
      const parent = this.parent as CombatUnit;
      if (this.unitInRange) {
        const unitInRange = this.unitInRange;

        // produce
        parent.setGlobalStore(
          'initiativeOrder',
          produce((units) => {
            return units?.map((unit) => {
              if (unit === unitInRange) {
                unit.currentHP += -1;
              }
              return unit;
            });
          })
        );

        unitInRange.actions.flash(Color.Red, 750);
        unitInRange.damageVisual.text = '-1';
        unitInRange.addChild(unitInRange.damageVisual as Label);

        engine.currentScene.camera.shake(2, 2, 250);

        parent.hasAttacked = true;
        parent.showAttackSquares = false;
        parent.children.map((child) => child.kill());
        parent.removeAllChildren();
        setTimeout(() => {
          unitInRange.children.map((child) => child.kill());
          unitInRange.removeAllChildren();
        }, 1000);
      }
    });
  }
}

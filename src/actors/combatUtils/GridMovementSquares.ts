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
      const parent = this.parent as Actor;
      parent.actions.moveBy(vec(this.pos.x, this.pos.y), 200);
      parent.children.map((child) => child.kill());
      parent.removeAllChildren();
    });
  }
}

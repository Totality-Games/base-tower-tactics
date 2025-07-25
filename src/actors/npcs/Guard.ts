import { Animation, Engine, Sprite, SpriteSheet, Vector } from 'excalibur';
import { DIRECTIONS } from '../../constants';
import type { ContextProps } from '../../context/store';
import { EnemyUnit } from '../combatUtils/EnemyUnit';

export class Guard extends EnemyUnit {
  direction: DIRECTIONS;
  spriteSheet: SpriteSheet;
  constructor(
    pos: Vector,
    context: ContextProps,
    spriteSheet: SpriteSheet,
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos, context);

    this.z = 100;
    this.scale = new Vector(1, 1);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.spriteSheet = spriteSheet;
    this.name = name;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addAnimations();
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
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
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}

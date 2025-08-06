import {
  Animation,
  Engine,
  ImageSource,
  Sound,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { DIRECTIONS } from '../../constants';
import type { ContextProps } from '../../context/store';
import { EnemyUnit } from '../combatUtils/EnemyUnit';

export class Guard extends EnemyUnit {
  direction: DIRECTIONS;
  resources: { WolfkinSpriteSheetPng: ImageSource; AttackSound: Sound };
  constructor(
    pos: Vector,
    context: ContextProps,
    resources: {
      WolfkinSpriteSheetPng: ImageSource;
      AttackSound: Sound;
    },
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos, context, resources.AttackSound);

    this.z = 100;
    this.scale = new Vector(1, 1);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.resources = resources;
    this.name = name;
    this.stats.constitution = 2;
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
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: wolfkinSpriteSheet.getSprite(10, 0), // downIdle is 10,0
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: wolfkinSpriteSheet.getSprite(10, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: wolfkinSpriteSheet.getSprite(10, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: wolfkinSpriteSheet.getSprite(10, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}

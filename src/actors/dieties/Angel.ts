import {
  Animation,
  Engine,
  ImageSource,
  Sound,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { DIRECTIONS } from '../../constants';
import type { ContextProps } from '../../context/store';
import { EnemyUnit } from '../combatUtils/EnemyUnit';

export class Angel extends EnemyUnit {
  direction: DIRECTIONS;
  resources: { AngelSpriteSheetPng: ImageSource; AttackSound: Sound };
  constructor(
    pos: Vector,
    context: ContextProps,
    resources: {
      AngelSpriteSheetPng: ImageSource;
      AttackSound: Sound;
      DeathSound: Sound;
    },
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos, context, resources);

    this.z = 100;
    this.scale = new Vector(1, 1);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.resources = resources;
    this.name = name;
    this.stats = {
      strength: 2, // for melee damage
      dexterity: 2, // for movement speed
      constitution: 2, // for hp
      wisdom: 2, // for mana
    };
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addAnimations();
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    // this.graphics.use(`${this.direction}-idle`);
    this.graphics.use(`reappear`);
  }

  private addAnimations() {
    const angelSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.AngelSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 128,
        spriteHeight: 192,
        rows: 3,
        columns: 20,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: angelSpriteSheet.getSprite(0, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(1, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(2, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(3, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(4, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(5, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(6, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(7, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(8, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(9, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(10, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(11, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(12, 1), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: angelSpriteSheet.getSprite(13, 1), // downIdle is 10,0
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const disappear = new Animation({
      frames: [
        {
          graphic: angelSpriteSheet.getSprite(0, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(1, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(2, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(3, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(4, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(5, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(6, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(7, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(8, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(9, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(10, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(11, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(12, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(13, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(14, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(15, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(16, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(17, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(18, 2), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(19, 2), // downIdle is 10,0
          duration: 50,
        },
      ],
    });
    this.graphics.add('disappear', disappear);

    const reappear = new Animation({
      frames: [
        {
          graphic: angelSpriteSheet.getSprite(0, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(1, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(2, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(3, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(4, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(5, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(6, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(7, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(8, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(9, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(10, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(11, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(12, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(13, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(14, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(15, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(16, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(17, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(18, 0), // downIdle is 10,0
          duration: 50,
        },
        {
          graphic: angelSpriteSheet.getSprite(19, 0), // downIdle is 10,0
          duration: 50,
        },
      ],
    });
    this.graphics.add('reappear', reappear);
  }
}

import {
  Animation,
  Engine,
  ImageSource,
  Sound,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { MOVEMENT } from '../../constants';
import { CombatUnit } from '../combatUtils/CombatUnit';
import type { ContextProps } from '../../context/store';

export class Zephyrius extends CombatUnit {
  movement: MOVEMENT;
  resources: {
    ZephyriusSpriteSheetPng: ImageSource;
    AttackSound: Sound;
    DeathSound: Sound;
  };
  constructor(
    pos: Vector,
    resources: {
      ZephyriusSpriteSheetPng: ImageSource;
      AttackSound: Sound;
      DeathSound: Sound;
    },
    context: ContextProps,
    isInParty?: boolean
  ) {
    super(pos, context, resources, isInParty);

    this.resources = resources;
    this.name = 'Zephyrius';
    this.movement = MOVEMENT.IDLE;
    this.characterPortrait = '/assets/images/portraits/64x64/011.png';
    // base thief stats
    this.stats = {
      strength: 3, // for melee damage
      dexterity: 6, // for movement speed
      constitution: 5, // for hp
      wisdom: 4, // for mana
    };
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addAnimations();
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    super.onPreUpdate(engine, elapsedMs);
    this.movement = MOVEMENT.IDLE;
    this.graphics.use(`${this.direction}-${this.movement}`);
  }

  // onPostUpdate(_engine: Engine, _delta: number): void {
  //   // if Delsaran moves in any direction, his direction and movement should be updated
  //   if (this.vel.x < 0) {
  //     this.direction = DIRECTIONS.LEFT;
  //     this.movement = MOVEMENT.WALK;
  //     this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
  //   }
  //   if (this.vel.x > 0) {
  //     this.direction = DIRECTIONS.RIGHT;
  //     this.movement = MOVEMENT.WALK;
  //     this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
  //   }
  //   if (this.vel.y < 0) {
  //     this.direction = DIRECTIONS.UP;
  //     this.movement = MOVEMENT.WALK;
  //     this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
  //   }
  //   if (this.vel.y > 0) {
  //     this.direction = DIRECTIONS.DOWN;
  //     this.movement = MOVEMENT.WALK;
  //     this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
  //   }
  // }

  addAnimations() {
    const zephyriusSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.ZephyriusSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 3,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: zephyriusSpriteSheet.getSprite(0, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: zephyriusSpriteSheet.getSprite(2, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: zephyriusSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);
  }
}

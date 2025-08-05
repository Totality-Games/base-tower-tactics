import {
  Animation,
  Engine,
  ImageSource,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { DIRECTIONS, MOVEMENT } from '../../constants';
import { CombatUnit } from '../combatUtils/CombatUnit';
import type { ContextProps } from '../../context/store';

export class Delsaran extends CombatUnit {
  movement: MOVEMENT;
  resources: ImageSource;
  constructor(
    pos: Vector,
    resources: ImageSource,
    context: ContextProps,
    isInParty?: boolean
  ) {
    super(pos, context, isInParty);

    this.resources = resources;
    this.name = 'Delsaran';
    this.movement = MOVEMENT.IDLE;
    this.characterPortrait = '/assets/images/portraits/64x64/011.png';
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addAnimations();
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.movement = MOVEMENT.IDLE;
    this.graphics.use(`${this.direction}-${this.movement}`);
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    // if Delsaran moves in any direction, his direction and movement should be updated
    if (this.vel.x < 0) {
      this.direction = DIRECTIONS.LEFT;
      this.movement = MOVEMENT.WALK;
      this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
    }
    if (this.vel.x > 0) {
      this.direction = DIRECTIONS.RIGHT;
      this.movement = MOVEMENT.WALK;
      this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
    }
    if (this.vel.y < 0) {
      this.direction = DIRECTIONS.UP;
      this.movement = MOVEMENT.WALK;
      this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
    }
    if (this.vel.y > 0) {
      this.direction = DIRECTIONS.DOWN;
      this.movement = MOVEMENT.WALK;
      this.graphics.use(`${this.direction}-${MOVEMENT.WALK}`);
    }
  }

  addAnimations() {
    const delsaranSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources as ImageSource,
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
          graphic: delsaranSpriteSheet.getSprite(1, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(0, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: delsaranSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: delsaranSpriteSheet.getSprite(2, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: delsaranSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);
  }
}

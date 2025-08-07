import {
  Animation,
  Collider,
  CollisionContact,
  Engine,
  ImageSource,
  Side,
  Sound,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { CombatUnit } from '../combatUtils/CombatUnit';
import type { ContextProps } from '../../context/store';

export class MainGuy extends CombatUnit {
  public nearToNPC: unknown;
  public nearToObject: unknown;
  public resources: {
    HeroSpriteSheetPng: ImageSource;
    AttackSound: Sound;
    DeathSound: Sound;
  };
  constructor(
    pos: Vector,
    resources: {
      HeroSpriteSheetPng: ImageSource;
      AttackSound: Sound;
      DeathSound: Sound;
    },
    context: ContextProps,
    isInParty?: boolean
  ) {
    super(pos, context, resources, isInParty);
    this.resources = resources;
    this.name = 'Vajhir';
    this.characterPortrait = '/assets/images/portraits/64x64/006.png';
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addAnimations();
  }

  onPreUpdate(engine: Engine, elapsedMs: number): void {
    super.onPreUpdate(engine, elapsedMs);
    this.vel = Vector.Zero;

    // if in combat, use walking down for idle, or any walking animation if moving
    this.graphics.use(`${this.direction}-idle`);
  }

  onPreCollisionResolve(
    _self: Collider,
    _other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {}

  onCollisionEnd(_self: Collider, _other: Collider): void {
    console.log('collision ended');
  }

  addAnimations() {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroSpriteSheetPng as ImageSource,
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
          graphic: playerSpriteSheet.getSprite(1, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 2) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 2) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 1) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 0) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 0) as Sprite,
          duration: 200,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);
  }
}

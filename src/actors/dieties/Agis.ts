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

export class Agis extends EnemyUnit {
  direction: DIRECTIONS;
  resources: { AgisSpriteSheetPng: ImageSource; AttackSound: Sound };
  constructor(
    pos: Vector,
    context: ContextProps,
    resources: {
      AgisSpriteSheetPng: ImageSource;
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
    this.graphics.use(`${this.direction}-idle`);
  }

  private addAnimations() {
    const agisSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.AgisSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 224,
        spriteHeight: 240,
        rows: 1,
        columns: 15,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: agisSpriteSheet.getSprite(0, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(1, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(2, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(3, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(4, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(5, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(6, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(7, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(8, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(9, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(10, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(11, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(12, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(13, 0), // downIdle is 10,0
          duration: 150,
        },
        {
          graphic: agisSpriteSheet.getSprite(14, 0), // downIdle is 10,0
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);
  }
}

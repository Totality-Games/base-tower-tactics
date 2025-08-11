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

export class Structure extends EnemyUnit {
  direction: DIRECTIONS;
  resources: { StructureSpriteSheetPng: ImageSource; AttackSound: Sound };
  constructor(
    pos: Vector,
    context: ContextProps,
    resources: {
      StructureSpriteSheetPng: ImageSource;
      AttackSound: Sound;
      DeathSound: Sound;
    },
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos, context, resources, false, { width: 78, height: 192 });

    this.z = 100;
    // this.scale = new Vector(0.3, 0.3);
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

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);

    if (this.takingAction) return;
    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      this.beginNextTurn();
    }
  }

  private addAnimations() {
    const structureSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.StructureSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 78,
        spriteHeight: 192,
        rows: 1,
        columns: 6,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: structureSpriteSheet.getSprite(0, 0),
          duration: 150,
        },
        {
          graphic: structureSpriteSheet.getSprite(1, 0),
          duration: 150,
        },
        {
          graphic: structureSpriteSheet.getSprite(2, 0),
          duration: 150,
        },
        {
          graphic: structureSpriteSheet.getSprite(3, 0),
          duration: 150,
        },
        {
          graphic: structureSpriteSheet.getSprite(4, 0),
          duration: 150,
        },
        {
          graphic: structureSpriteSheet.getSprite(5, 0),
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);
  }
}

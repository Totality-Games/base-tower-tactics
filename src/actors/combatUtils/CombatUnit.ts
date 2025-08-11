import {
  Actor,
  Vector,
  CollisionType,
  Engine,
  vec,
  Label,
  Color,
  Sound,
} from 'excalibur';
import { DIRECTIONS, type CLASSES } from '../../constants';
import type {
  GlobalStoreType,
  SetGlobalStoreType,
  ContextProps,
} from '../../context/store';
import { GridMovementSquareChild } from './GridMovementSquares';
import { GridAttackSquareChild } from './GridAttackSquares';
import { createSignal } from 'solid-js';

export class CombatUnit extends Actor {
  #isDying: boolean;
  globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
  public direction: DIRECTIONS;
  public class?: CLASSES;
  public stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    wisdom: number;
  };
  menuOpen: boolean;
  isInParty: boolean;
  showMovementSquares: boolean;
  showAttackSquares: boolean;
  hasMoved: boolean;
  hasAttacked: boolean;
  isTurnUnit: boolean;
  totalHP: number;
  #currentHP = createSignal<number>(0);
  get currentHP() {
    return this.#currentHP[0]();
  }
  set currentHP(value: number) {
    this.#currentHP[1](value);
  }
  damageVisual: Label;
  characterPortrait: string;
  attackSound: Sound;
  deathSound: Sound;
  constructor(
    pos: Vector,
    context: ContextProps,
    sounds: {
      AttackSound: Sound;
      DeathSound: Sound;
    },
    isInParty?: boolean,
    customDimensions?: {
      width: number;
      height: number;
    }
  ) {
    super({
      pos,
      width: customDimensions?.width ?? 32,
      height: customDimensions?.height ?? 32,
      collisionType: CollisionType.Fixed,
    });

    this.#isDying = false;
    this.z = 100;
    this.direction = DIRECTIONS.DOWN;
    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
    /**
     * STATS:
     * A. All 1's for non-specialist units, like commoners
     * B. Warriors have more Strength
     *      Base: 6, 4, 5, 3
     * C. Thieves have more Dexterity
     *      Base: 3, 6, 5, 4
     * D. Clerics have more Constitution
     *      Base: 3, 4, 6, 5
     * E. Wizards have more Wisdom
     *      Base: 3, 4, 5, 6
     */
    this.stats = {
      strength: 1, // for melee damage
      dexterity: 1, // for movement speed
      constitution: 1, // for hp
      wisdom: 1, // for mana
    };
    this.scale = new Vector(1, 1);
    this.menuOpen = false;
    this.isInParty = isInParty || false;
    this.characterPortrait = '/assets/images/portraits/64x64/001.png';
    this.attackSound = sounds.AttackSound;
    this.deathSound = sounds.DeathSound;
    this.showMovementSquares = false;
    this.showAttackSquares = false;
    this.hasMoved = false;
    this.hasAttacked = false;
    this.isTurnUnit = false;
    this.z = 100;
    this.totalHP = this.calculateHP();
    this.currentHP = this.calculateHP();
    this.damageVisual = new Label({
      color: Color.Red,
      text: '',
      pos: new Vector(15, -16),
    });
  }

  onInitialize(_engine: Engine): void {
    console.log('initialize combat unit');
    this.combatActions();
  }

  onPreUpdate(_engine: Engine, _elapsed: number): void {
    if (this.currentHP === 0 && !this.#isDying) {
      this.unitDeath();
    }

    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      if (this.hasAttacked) {
        this.beginNextTurn();
      }
    }

    if (this.showMovementSquares) {
      if (this.children.length === 0) {
        this.createMovementSquares();
        return;
      }
    }

    if (this.showAttackSquares) {
      if (this.children.length === 0) {
        this.createAttackSquares();
        return;
      }
    }
  }

  beginNextTurn() {
    const nextValue =
      this.globalStore.currentCombatTurnValue ===
      this.globalStore.currentCombatUnitTotal
        ? 0
        : this.globalStore.currentCombatTurnValue + 1;
    this.setGlobalStore('currentCombatTurnValue', nextValue);

    if (nextValue === 0) {
      this.globalStore.initiativeOrder?.map((unit) => {
        unit.hasMoved = false;
        unit.hasAttacked = false;
      });
    }
  }

  private calculateHP() {
    return this.stats.constitution * 2;
  }

  combatActions() {
    if (this.isInParty) {
      this.events.on('pointerdown', () => {
        if (
          this.globalStore.initiativeOrder?.[
            this.globalStore.currentCombatTurnValue
          ] === this
        ) {
          // activate action menu
          this.setGlobalStore('actionMenu', !this.globalStore.actionMenu);

          // set unit detail menu to false if action menu is displayed since both menus occupy the same space
          this.setGlobalStore('showCombatUnitMenu', false);
        }
      });
    }
  }

  unitDeath() {
    this.#isDying = true;
    setTimeout(() => {
      this.deathSound.play();
    }, 1000);
    this.actions.flash(Color.Red, 750).die();
    this.setGlobalStore('initiativeOrder', (units) => {
      if (!units?.length) return;
      const newOrder = units.filter((unit) => {
        return this !== unit;
      });
      this.setGlobalStore('currentCombatUnitTotal', newOrder.length - 1);
      console.log(this.globalStore.currentCombatTurnValue);
      return newOrder;
    });
  }

  createMovementSquares() {
    const globalStore = this.globalStore;
    const setGlobalStore = this.setGlobalStore;
    const context = { globalStore, setGlobalStore };

    // base cross movement
    const childLeft = new GridMovementSquareChild(vec(-32, 0), context);
    const childRight = new GridMovementSquareChild(vec(32, 0), context);
    const childUp = new GridMovementSquareChild(vec(0, -32), context);
    const childDown = new GridMovementSquareChild(vec(0, 32), context);
    // base diagonals
    const childDiagonalTopLeft = new GridMovementSquareChild(
      vec(-32, -32),
      context
    );
    const childDiagonalTopRight = new GridMovementSquareChild(
      vec(32, -32),
      context
    );
    const childDiagonalBottomLeft = new GridMovementSquareChild(
      vec(-32, 32),
      context
    );
    const childDiagonalBottomRight = new GridMovementSquareChild(
      vec(32, 32),
      context
    );
    // double cross movement
    const childDoubleLeft = new GridMovementSquareChild(vec(-64, 0), context);
    const childDoubleRight = new GridMovementSquareChild(vec(64, 0), context);
    const childDoubleUp = new GridMovementSquareChild(vec(0, -64), context);
    const childDoubleDown = new GridMovementSquareChild(vec(0, 64), context);
    // double diagonals
    const childDoubleDiagonalTopLeft = new GridMovementSquareChild(
      vec(-64, -32),
      context
    );
    const childDoubleDiagonalTopLeft2 = new GridMovementSquareChild(
      vec(-32, -64),
      context
    );
    const childDoubleDiagonalTopRight = new GridMovementSquareChild(
      vec(64, -32),
      context
    );
    const childDoubleDiagonalTopRight2 = new GridMovementSquareChild(
      vec(32, -64),
      context
    );
    const childDoubleDiagonalBottomLeft = new GridMovementSquareChild(
      vec(-64, 32),
      context
    );
    const childDoubleDiagonalBottomLeft2 = new GridMovementSquareChild(
      vec(-32, 64),
      context
    );
    const childDoubleDiagonalBottomRight = new GridMovementSquareChild(
      vec(64, 32),
      context
    );
    const childDoubleDiagonalBottomRight2 = new GridMovementSquareChild(
      vec(32, 64),
      context
    );
    // triple cross movement
    const childTripleLeft = new GridMovementSquareChild(vec(-96, 0), context);
    const childTripleRight = new GridMovementSquareChild(vec(96, 0), context);
    const childTripleUp = new GridMovementSquareChild(vec(0, -96), context);
    const childTripleDown = new GridMovementSquareChild(vec(0, 96), context);

    // player movement by dex score
    switch (this.stats.dexterity) {
      case 1: {
        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);
        break;
      }
      case 2: {
        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);
        this.addChild(childDiagonalTopLeft);
        this.addChild(childDiagonalTopRight);
        this.addChild(childDiagonalBottomLeft);
        this.addChild(childDiagonalBottomRight);
        this.addChild(childDoubleLeft);
        this.addChild(childDoubleRight);
        this.addChild(childDoubleUp);
        this.addChild(childDoubleDown);
        break;
      }
      case 3: {
        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);
        this.addChild(childDiagonalTopLeft);
        this.addChild(childDiagonalTopRight);
        this.addChild(childDiagonalBottomLeft);
        this.addChild(childDiagonalBottomRight);
        this.addChild(childDoubleLeft);
        this.addChild(childDoubleRight);
        this.addChild(childDoubleUp);
        this.addChild(childDoubleDown);
        this.addChild(childDoubleDiagonalTopLeft);
        this.addChild(childDoubleDiagonalTopLeft2);
        this.addChild(childDoubleDiagonalTopRight);
        this.addChild(childDoubleDiagonalTopRight2);
        this.addChild(childDoubleDiagonalBottomLeft);
        this.addChild(childDoubleDiagonalBottomLeft2);
        this.addChild(childDoubleDiagonalBottomRight);
        this.addChild(childDoubleDiagonalBottomRight2);
        this.addChild(childTripleLeft);
        this.addChild(childTripleRight);
        this.addChild(childTripleUp);
        this.addChild(childTripleDown);
        break;
      }
      default: {
        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);
        break;
      }
    }
  }

  createAttackSquares() {
    // player movement by dex score
    switch (this.stats.strength) {
      case 1: {
        const childLeft = new GridAttackSquareChild(vec(-32, 0));
        const childRight = new GridAttackSquareChild(vec(32, 0));
        const childUp = new GridAttackSquareChild(vec(0, -32));
        const childDown = new GridAttackSquareChild(vec(0, 32));

        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);

        break;
      }
      default: {
        const childLeft = new GridAttackSquareChild(vec(-32, 0));
        const childRight = new GridAttackSquareChild(vec(32, 0));
        const childUp = new GridAttackSquareChild(vec(0, -32));
        const childDown = new GridAttackSquareChild(vec(0, 32));

        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);
        break;
      }
    }
  }
}

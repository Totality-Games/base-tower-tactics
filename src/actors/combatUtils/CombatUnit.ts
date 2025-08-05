import {
  Actor,
  Vector,
  CollisionType,
  Engine,
  vec,
  Label,
  Color,
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
  constructor(pos: Vector, context: ContextProps, isInParty?: boolean) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.direction = DIRECTIONS.DOWN;
    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
    this.stats = {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      wisdom: 1,
    };
    this.scale = new Vector(1, 1);
    this.menuOpen = false;
    this.isInParty = isInParty || false;
    this.characterPortrait = '/assets/images/portraits/64x64/001.png';
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
    if (this.currentHP === 0) {
      this.actions.flash(Color.Red, 750).die();
    }

    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      if (this.hasAttacked) {
        const nextValue =
          this.globalStore.currentCombatTurnValue ===
          this.globalStore.currentCombatUnitTotal
            ? 0
            : this.globalStore.currentCombatTurnValue + 1;
        this.setGlobalStore('currentCombatTurnValue', nextValue);

        if (nextValue === 0) {
          this.globalStore.initiativeOrder.map((unit) => {
            unit.hasMoved = false;
            unit.hasAttacked = false;
          });
        }
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

  createMovementSquares() {
    // player movement by dex score
    switch (this.stats.dexterity) {
      case 1: {
        const childLeft = new GridMovementSquareChild(vec(-32, 0));
        const childRight = new GridMovementSquareChild(vec(32, 0));
        const childUp = new GridMovementSquareChild(vec(0, -32));
        const childDown = new GridMovementSquareChild(vec(0, 32));

        this.addChild(childLeft);
        this.addChild(childRight);
        this.addChild(childUp);
        this.addChild(childDown);

        break;
      }
      default: {
        const childLeft = new GridMovementSquareChild(vec(-32, 0));
        const childRight = new GridMovementSquareChild(vec(32, 0));
        const childUp = new GridMovementSquareChild(vec(0, -32));
        const childDown = new GridMovementSquareChild(vec(0, 32));

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

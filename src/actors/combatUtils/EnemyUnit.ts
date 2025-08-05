import { Color, Label, vec, type Engine } from 'excalibur';
import { CombatUnit } from './CombatUnit';
import type { GridMovementSquareChild } from './GridMovementSquares';
import type { GridAttackSquareChild } from './GridAttackSquares';

export class EnemyUnit extends CombatUnit {
  shouldMoveFirst?: boolean;
  onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      // if an enemy is already in range, attack.
      if (!this.shouldMoveFirst && !this.hasAttacked) {
        this.showAttackSquares = true;
        setTimeout(() => {
          this.combatAttack(engine);
        }, 1500);
      }
      // if no enemy in range, move first
      if (this.shouldMoveFirst && !this.hasMoved) {
        this.showMovementSquares = true;
        setTimeout(() => {
          this.combatMovement();
        }, 1500);
      }

      if (this.hasMoved && !this.hasAttacked) {
        this.showAttackSquares = true;
        setTimeout(() => {
          this.combatAttack(engine);
        }, 1500);
      }

      if (this.hasMoved && this.shouldMoveFirst) {
        this.showAttackSquares = false;
        this.showMovementSquares = false;
        this.hasAttacked = true;
      }
    }
  }

  async combatMovement() {
    const children = this.children as GridMovementSquareChild[];

    const randomChild =
      children[Math.floor(Math.random() * children.length - 1)];

    this.actions.moveBy(vec(randomChild.pos.x, randomChild.pos.y), 200);
    this.hasMoved = true;
    this.showMovementSquares = false;
    children.map((child) => child.kill());
    this.removeAllChildren();
  }

  async combatAttack(engine: Engine) {
    const children = this.children as GridAttackSquareChild[];
    const enemySquares = children.filter((square) => {
      return Boolean(square.unitInRange);
    });

    if (!enemySquares.length) {
      this.shouldMoveFirst = true;
      this.children.map((child) => child.kill());
      this.removeAllChildren();
    } else {
      const randomChild =
        enemySquares[Math.floor(Math.random() * enemySquares.length - 1)];

      const unitInRange = randomChild.unitInRange!;
      unitInRange.currentHP = unitInRange.currentHP - 1;
      unitInRange.actions.flash(Color.Red, 750);
      unitInRange.damageVisual.text = '-1';
      unitInRange.addChild(unitInRange.damageVisual as Label);

      engine.currentScene.camera.shake(2, 2, 250);

      this.hasAttacked = true;
      this.showAttackSquares = false;
      this.children.map((child) => child.kill());
      this.removeAllChildren();
      setTimeout(() => {
        unitInRange.children.map((child) => child.kill());
        unitInRange.removeAllChildren();
      }, 1000);
    }
  }
}

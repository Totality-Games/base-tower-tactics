import { Color, Label, vec, type Engine } from 'excalibur';
import { CombatUnit } from './CombatUnit';
import type { GridMovementSquareChild } from './GridMovementSquares';
import type { GridAttackSquareChild } from './GridAttackSquares';

export class EnemyUnit extends CombatUnit {
  takingAction?: boolean;
  onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    if (this.takingAction) return;
    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      // check for attack first
      if (!this.hasMoved && !this.hasAttacked) {
        this.showAttackSquares = true;
        setTimeout(() => {
          this.combatAttack(engine).then((isUnitInRange) => {
            console.log(elapsed);
            // if Promise returned true, don't move.
            if (isUnitInRange) {
              return this.endTurn();
            }
            // if false, move then try to move toward enemy, then attack
            this.showMovementSquares = true;
            setTimeout(() => {
              this.combatMovement().then(() => {
                this.combatAttack(engine).then(() => this.endTurn());
              });
            }, 1000);
          });
        }, 1000);
      }
      this.takingAction = true;

      // if no enemy in range, move first

      //    if an enemy is in range, attack.

      // end turn
    }
  }

  combatMovement = () =>
    new Promise<boolean>((resolve) => {
      const children = this.children as GridMovementSquareChild[];

      const randomChild = children[Math.floor(Math.random() * children.length)];

      if (!randomChild) {
        return resolve(false);
      }

      this.actions.moveBy(vec(randomChild.pos.x, randomChild.pos.y), 200);
      this.hasMoved = true;
      this.showMovementSquares = false;
      children.map((child) => child.kill());
      this.removeAllChildren();
      console.log('all movement children dead');
      resolve(true);
    });

  // make into Promise. Return true if unitInRange, return false otherwise.
  combatAttack = (engine: Engine) =>
    new Promise<boolean>((resolve) => {
      const children = this.children as GridAttackSquareChild[];
      const enemySquares = children.filter((square) => {
        return Boolean(square.unitInRange);
      });

      if (!enemySquares.length) {
        this.showAttackSquares = false;
        this.children.map((child) => child.kill());
        this.removeAllChildren();
        console.log('all attack children dead');
        resolve(false); // no unit in range
      } else {
        const randomChild =
          enemySquares[Math.floor(Math.random() * enemySquares.length)];
        if (!randomChild.unitInRange) return;

        const unitInRange = randomChild.unitInRange;
        unitInRange.currentHP = unitInRange.currentHP - 1;
        unitInRange.actions.flash(Color.Red, 750);
        unitInRange.damageVisual.text = '-1';
        unitInRange.addChild(unitInRange.damageVisual as Label);

        engine.currentScene.camera.shake(2, 2, 250);

        this.showAttackSquares = false;
        this.children.map((child) => child.kill());
        this.removeAllChildren();
        console.log('all attack children dead');
        setTimeout(() => {
          unitInRange.children.map((child) => child.kill());
          unitInRange.removeAllChildren();
          console.log('all unitInRange children dead');
        }, 1000);
        resolve(true); // unit in range, and attacked
      }
    });

  endTurn() {
    this.hasAttacked = true;
    this.takingAction = false;
  }
}

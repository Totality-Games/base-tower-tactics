import { vec, type Engine } from 'excalibur';
import { CombatUnit } from './CombatUnit';
import type { GridMovementSquareChild } from './GridMovementSquares';

export class EnemyUnit extends CombatUnit {
  onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      this.showMovementSquares = true;
      setTimeout(() => {
        this.combatMovement();
      }, 1500);
    }
  }

  async combatMovement() {
    const children = this.children as GridMovementSquareChild[];
    console.log(children);

    const randomChild =
      children[Math.floor(Math.random() * children.length - 1)];

    console.log(randomChild);
    this.actions.moveBy(vec(randomChild.pos.x, randomChild.pos.y), 200);
    this.hasMoved = true;
    this.showMovementSquares = false;
    children.map((child) => child.kill());
    this.removeAllChildren();
  }
}

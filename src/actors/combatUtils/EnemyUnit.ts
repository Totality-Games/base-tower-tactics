import { vec, type Engine } from 'excalibur';
import { CombatUnit } from './CombatUnit';
import { DIRECTIONS } from '../../constants';

export class EnemyUnit extends CombatUnit {
  onPreUpdate(engine: Engine, elapsed: number): void {
    super.onPreUpdate(engine, elapsed);

    if (
      this.globalStore.initiativeOrder?.[
        this.globalStore.currentCombatTurnValue
      ] === this
    ) {
      function randomDir() {
        const allDirs = [
          DIRECTIONS.DOWN,
          DIRECTIONS.UP,
          DIRECTIONS.LEFT,
          DIRECTIONS.RIGHT,
        ];
        const randomNum = Math.floor(Math.random() * 3);
        return allDirs[randomNum];
      }

      const dir = randomDir();
      switch (this.stats.dexterity) {
        case 1: {
          switch (dir) {
            case DIRECTIONS.UP:
              this.actions.moveBy(vec(0, -32), 200);
              this.hasMoved = true;
              break;
            case DIRECTIONS.DOWN:
              this.actions.moveBy(vec(0, 32), 200);
              this.hasMoved = true;
              break;
            case DIRECTIONS.LEFT:
              this.actions.moveBy(vec(-32, 0), 200);
              this.hasMoved = true;
              break;
            case DIRECTIONS.RIGHT:
              this.actions.moveBy(vec(32, 0), 200);
              this.hasMoved = true;
              break;
            default:
              break;
          }
          break;
        }
      }
    }
  }
}

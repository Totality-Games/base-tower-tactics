import { Scene } from 'excalibur';
import type {
  ContextProps,
  GlobalStoreType,
  SetGlobalStoreType,
} from '../context/store';

// adds Solid.js globalStore context to every scene
// since all scenes extend this class
export class BaseSceneWithContext extends Scene {
  globalStore: GlobalStoreType;
  setGlobalStore: SetGlobalStoreType;
  constructor(context: ContextProps) {
    super();

    this.globalStore = context.globalStore;
    this.setGlobalStore = context.setGlobalStore;
  }
}

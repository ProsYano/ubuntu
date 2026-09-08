import "server-only";
import { openDatabase } from "./database";
import { Store } from "./store";

const globalStore = globalThis as typeof globalThis & { rentxStore?: Store };
export function store() {
  if (globalStore.rentxStore && (globalStore.rentxStore.db.pragma("user_version", { simple: true }) as number) < 3) {
    globalStore.rentxStore.db.close();
    globalStore.rentxStore = undefined;
  }
  if (!globalStore.rentxStore) globalStore.rentxStore = new Store(openDatabase());
  return globalStore.rentxStore;
}

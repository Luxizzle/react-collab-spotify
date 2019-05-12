/**
 * Saves a zustand store in LocalStorage.
 *
 * @param {string} key The key to store the data in.
 * @param {string} version The current version. Changing
 * this will invalidate earlier data versions.
 * @param {any} zustandStoreApi The api object you receive
 * as the second argument from creating a zustand store.
 * @param {(state: Object) => Object} [filter] A function that will be called before data is saved to LocalStorage. Use it to remove any items.
 */
export function localStorageSync(
  key,
  version,
  zustandStoreApi,
  filter = s => s,
) {
  let storageData = {};

  try {
    storageData = JSON.parse(window.localStorage.getItem(key)) || {};
  } catch (e) {}

  if (storageData.__sync_version === version) {
    zustandStoreApi.setState(storageData);
  } else {
    window.localStorage.removeItem(key);
  }

  if (!zustandStoreApi.getState().__sync_version) {
    zustandStoreApi.setState({ __sync_version: version });
  }

  zustandStoreApi.subscribe(newState => {
    const dataState = filter(Object.assign({}, newState));

    window.localStorage.setItem(key, JSON.stringify(dataState));
  });
}

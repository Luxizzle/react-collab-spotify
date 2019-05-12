import store from 'zustand';
import { localStorageSync } from './local-storage-sync';

export const SPOTIFY_STORE_KEY = 'spotify-store';
export const SPOTIFY_STORE_VERSION = '1';

const [useSpotifyStore, spotifyStoreApi] = store((set, get) => ({
  /**
   * @type {string}
   */
  token: null,

  lastPath: null,

  actions: {
    /**
     * @param {string} token
     */
    setToken: token => set({ token }),
    /**
     * @param {string} lastPath
     */
    setLastPath: lastPath => set({ lastPath }),
  },
}));

localStorageSync(
  SPOTIFY_STORE_KEY,
  SPOTIFY_STORE_VERSION,
  spotifyStoreApi,
  ({ actions, ...state }) => state,
);

export { useSpotifyStore, spotifyStoreApi };

import { useState, useEffect } from 'react';
import { useSpotifyAuth } from './useSpotifyAuth';

/**
 * @typedef SpotifyUserObject
 * @property {string} display_name
 * @property {{ [key: string]: string }[]} external_urls
 * @property {{ href?: string, total: number }} followers
 * @property {string} href
 * @property {string} id
 * @property {{ height?: number, width?: number, url: string }[]} images
 * @property {'user'} type
 * @property {string} uri
 */

/**
 *
 *
 * @param {string} [userId] The user id or 'me'
 *
 * @returns {[SpotifyUserObject | undefined]}
 */
export function useSpotifyProfile(userId = 'me') {
  const { authFetch, isAuthenticated } = useSpotifyAuth();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      authFetch(userId === 'me' ? '/v1/me' : `/v1/users/${userId}`)
        .then(setProfileData)
        .catch(console.error);
    }
  }, [isAuthenticated, userId, authFetch]);

  return [profileData];
}

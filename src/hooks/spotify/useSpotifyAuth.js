import React, { useEffect, useCallback } from 'react';
import { spotify } from '../../config';
import { useSpotifyStore } from '../../store/spotify';
import queryString from 'query-string';

export const AUTH_CALLBACK_PATH = '/auth-spotify-callback';

export class SpotifyError extends Error {
  constructor(error) {
    super(error.message);

    this.name = this.constructor.name;
    this.status = error.status || 500;
    this.reason = error.reason;

    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function useSpotifyAuth() {
  const {
    token,
    actions: { setToken, setLastPath },
  } = useSpotifyStore(state => ({
    token: state.token,
    actions: state.actions,
  }));

  const login = () => {
    const queryObject = {
      client_id: spotify.CLIENT_ID,
      response_type: 'token',
      redirect_uri:
        window.location.protocol +
        '//' +
        window.location.host +
        AUTH_CALLBACK_PATH,
      scope:
        'user-read-playback-state user-modify-playback-state user-read-currently-playing',
    };

    const query = queryString.stringify(queryObject);
    const url = 'https://accounts.spotify.com/authorize?' + query;

    setLastPath(window.location.pathname);

    window.location.href = url;
  };

  const logout = () => {
    setToken(null);
  };

  const authFetch = useCallback(
    (input, init = {}) => {
      if (!token) throw new Error('Not authenticated');

      input = 'https://api.spotify.com' + input;

      Object.assign(init, {
        headers: { Authorization: token },
      });
      return fetch(input, init)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            if (data.error.status === 401) {
              setToken(null);
            }

            throw new SpotifyError(data.error);
          }

          return data;
        });
    },
    [setToken, token],
  );

  return { login, logout, authFetch, isAuthenticated: Boolean(token) };
}

export function AuthPath({ navigate }) {
  const {
    lastPath,
    actions: { setToken },
  } = useSpotifyStore(state => ({
    lastPath: state.lastPath,
    actions: state.actions,
  }));

  useEffect(() => {
    const query = queryString.parse(
      window.location.hash || window.location.search,
    );

    if (query.error) {
      console.error(query);
    } else if (query.access_token) {
      setToken(`${query.token_type} ${query.access_token}`);

      if (lastPath) {
        navigate(lastPath);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash, window.location.search]);

  return <div className="AuthPath" />;
}

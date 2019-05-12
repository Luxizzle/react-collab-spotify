import React from 'react';
import { useSpotifyAuth } from '../hooks/spotify/useSpotifyAuth';
import { useSpotifyStore } from '../store/spotify';
import { Button, NonIdealState } from '@blueprintjs/core';

import './Main.scss';

export function Main() {
  const { token } = useSpotifyStore(state => ({ token: state.token }));
  const { authenticate } = useSpotifyAuth();

  return (
    <div className="Main">
      {!token && (
        <NonIdealState
          icon="error"
          title="Not logged in"
          description="Seems like you are not logged in."
          action={<Button text="Login" onClick={authenticate} />}
        />
      )}
    </div>
  );
}

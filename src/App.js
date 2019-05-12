// @ts-nocheck
import React from 'react';
import { Index } from './routes/Index';
import { Router } from '@reach/router';
import { AuthPath, AUTH_CALLBACK_PATH } from './hooks/spotify/useSpotifyAuth';

function App() {
  return (
    <div className="bp3-dark">
      <Router>
        <Index path="/" />

        <AuthPath path={AUTH_CALLBACK_PATH} />
      </Router>
    </div>
  );
}

export default App;

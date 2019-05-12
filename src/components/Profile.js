import React, { useEffect, useCallback } from 'react';
import { useSpotifyAuth } from '../hooks/spotify/useSpotifyAuth';
import { Button } from '@blueprintjs/core';
import { User } from './User';
import { useSpotifyProfile } from '../hooks/spotify/useSpotifyProfile';
import { useFireBaseStore } from '../hooks/firebase/useFirebaseStore';
import './Profile.scss';

export function Profile() {
  const { login, logout, isAuthenticated } = useSpotifyAuth();
  const [profileData] = useSpotifyProfile('me');

  const getRef = useCallback(
    db => {
      if (profileData) {
        return db.ref(`spotify_users/${profileData.id}`);
      }
    },
    [profileData],
  );

  const [data, reference] = useFireBaseStore(getRef);

  console.log({ profileData, data, val: data ? data.val() : null, reference });

  useEffect(() => {
    if (profileData && reference) {
      reference.update({
        display_name: profileData.display_name,
        id: profileData.id,
        uri: profileData.uri,
      });
    }
  }, [profileData, reference]);

  return (
    <div className="Profile">
      {!isAuthenticated ? (
        <Button minimal text="Login to spotify" fill onClick={login} />
      ) : (
        <Button minimal text="Logout" fill onClick={logout} />
      )}
      {isAuthenticated && profileData ? (
        <User
          imageUrl={
            profileData.images && profileData[0]
              ? profileData.images[0].url
              : null
          }
          username={profileData.display_name}
        />
      ) : null}
      {data && <div>Synced with firebase</div>}
    </div>
  );
}

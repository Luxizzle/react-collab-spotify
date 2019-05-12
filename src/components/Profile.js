import React, { useState, useEffect } from 'react';
import { useSpotifyAuth } from '../hooks/spotify/useSpotifyAuth';
import { H3, Text, Button } from '@blueprintjs/core';
import { If } from 'react-extras';
import './Profile.scss';
import { User } from './User';
import { useSpotifyProfile } from '../hooks/spotify/useSpotifyProfile';

export function Profile() {
  const { login, logout, isAuthenticated } = useSpotifyAuth();
  const [profileData] = useSpotifyProfile('me');

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
    </div>
  );
}

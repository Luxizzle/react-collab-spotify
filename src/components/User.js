import React from 'react';
import { H3 } from '@blueprintjs/core';
import './User.scss';

/**
 *
 * @param {Object} props
 * @param {string} [props.imageUrl]
 * @param {string} props.username
 */
export function User({ imageUrl, username }) {
  return (
    <div className="User">
      {imageUrl && (
        <div className="User--left">
          <img alt="Profile" src="imageUrl" />
        </div>
      )}
      <div className="User--right">
        <H3 className="User--right--username">{username}</H3>
      </div>
    </div>
  );
}

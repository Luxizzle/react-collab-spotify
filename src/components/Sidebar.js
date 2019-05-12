import React from 'react';
import './Sidebar.scss';
import { Profile } from './Profile';
import { Divider } from '@blueprintjs/core';

export function Sidebar() {
  return (
    <div className="Sidebar">
      <Profile />
      <Divider />
    </div>
  );
}

import React from 'react';
import './Sidebar.scss';
import { Profile } from './Profile';
import { Divider } from '@blueprintjs/core';
import { useFireBaseStore } from '../hooks/firebase/useFirebaseStore';

export function Sidebar() {
  const { reference } = useFireBaseStore('queues');

  console.log(reference);

  return (
    <div className="Sidebar">
      <Profile />
      <Divider />
    </div>
  );
}

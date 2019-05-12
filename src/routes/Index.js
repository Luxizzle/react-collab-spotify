import React from 'react';
import { GridLayout } from '../components/GridLayout';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Main } from '../components/Main';

export function Index() {
  return (
    <GridLayout>
      <Header />
      <Sidebar />
      <Main />
    </GridLayout>
  );
}

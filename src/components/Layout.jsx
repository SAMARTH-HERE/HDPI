import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ paddingTop: '60px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

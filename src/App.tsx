import React from 'react';
import AuthProvider from './helpers/AuthProvider';
import Routes from './routes';

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;

import React from "react";
import AuthProvider from "./helpers/AuthProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;

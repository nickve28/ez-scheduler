import React from "react";
import { PrimeReactProvider } from "primereact/api";
import HomePage from "./pages/HomePage";
import { AccountConfig, DirectoryConfig, ImageWithPath } from "./backend_types";

declare global {
  interface Window {
    api: {
      readDirectoryConfig: () => Promise<DirectoryConfig[]>;
      readAccountConfig: () => Promise<AccountConfig[]>;
      readPendingImages: () => Promise<ImageWithPath[]>;
    };
  }
}

function App() {
  window.api.readDirectoryConfig().then(console.log);
  return (
    <PrimeReactProvider>
      <HomePage />
    </PrimeReactProvider>
  );
}

export default App;

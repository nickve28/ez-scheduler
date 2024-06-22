import React from "react";
import { PrimeReactProvider } from "primereact/api";
import HomePage from "./pages/HomePage";
import { AccountConfig, DirectoryConfig, ImageWithPath } from "./backend_types";
import { Button } from "primereact/button";

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
  return (
    <HomePage />
  );
}

export default App;

import { useEffect, useState } from "react";
import { AccountConfig, DirectoryConfig, ImageWithPath } from "../backend_types";

export const useDirectoryConfig = () => {
  const [config, setConfig] = useState<DirectoryConfig[] | null>(null);
  useEffect(() => {
    window.api.readDirectoryConfig().then(setConfig);
  }, []);
  return config;
};

export const useAccountConfig = () => {
  const [accountConfigs, setAccountConfigs] = useState<AccountConfig[] | null>(
    null
  );
  useEffect(() => {
    window.api.readAccountConfig().then(setAccountConfigs);
  }, []);
  return accountConfigs;
};

export const useImagesWithPaths = () => {
  const [imagesWithPaths, setImagesWithPaths] = useState<
    ImageWithPath[] | null
  >(null);
  useEffect(() => {
    window.api.readPendingImages().then(setImagesWithPaths);
  }, []);
  return imagesWithPaths;
};

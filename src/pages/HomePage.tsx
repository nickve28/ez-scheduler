import React, { useEffect, useState } from "react";
import {
  AccountConfig,
  DirectoryConfig,
  ImageWithPath,
} from "../backend_types";

const useDirectoryConfig = () => {
  const [config, setConfig] = useState<DirectoryConfig[] | null>(null);
  useEffect(() => {
    window.api.readDirectoryConfig().then(setConfig);
  }, []);
  return config;
};

const useAccountConfig = () => {
  const [accountConfigs, setAccountConfigs] = useState<AccountConfig[] | null>(
    null
  );
  useEffect(() => {
    window.api.readAccountConfig().then(setAccountConfigs);
  }, []);
  return accountConfigs;
};

const useImagesWithPaths = () => {
  const [imagesWithPaths, setImagesWithPaths] = useState<
    ImageWithPath[] | null
  >(null);
  useEffect(() => {
    window.api.readPendingImages().then(setImagesWithPaths);
  }, []);
  return imagesWithPaths;
};

const HomePage = () => {
  const directoryConfig = useDirectoryConfig();
  const accountConfig = useAccountConfig();
  const imagesWithPaths = useImagesWithPaths();

  return (
    <div>
      <ul>
        {imagesWithPaths?.map(({ image, imagePath }) => {
          return (
            <li key={`${imagePath}`}>
              <div>{imagePath}</div>
              <img width={600} height={800} src={image} alt="from system" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;

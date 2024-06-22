import React, { useEffect, useState } from "react";
import { Galleria } from "primereact/galleria";
import {
  AccountConfig,
  DirectoryConfig,
  ImageWithPath,
} from "../backend_types";
import { Image } from "primereact/image";

const useDirectoryConfig = () => {
  const [config, setConfig] = useState<DirectoryConfig[] | null>(null);
  useEffect(() => {
    window.api.readDirectoryConfig().then(setConfig);
  }, []);
  return config;
};

const useAccountConfig = () => {
  const [accountConfigs, setAccountConfigs] = useState<AccountConfig[] | null>(
    null,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const directoryConfig = useDirectoryConfig();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const accountConfig = useAccountConfig();
  const imagesWithPaths = useImagesWithPaths();

  return (
    <div>
      <Galleria
        value={imagesWithPaths || []}
        numVisible={5}
        item={({ imagePath, image }) => (
          <Image src={image} alt="Pending image" width="600" height="800" />
        )}
      />
    </div>
  );
};

export default HomePage;

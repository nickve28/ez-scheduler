import React, { useEffect, useState } from 'react'
import { AccountConfig, DirectoryConfig } from '../backend_types';


const useDirectoryConfig = () => {
    const [config, setConfig] = useState<DirectoryConfig[] | null>(null);
    useEffect(() => {
      window.api.readDirectoryConfig().then(setConfig)
    }, []);
    return config;
};

const useAccountConfig = () => {
     const [accountConfigs, setAccountConfigs] = useState<AccountConfig[] | null>(null);
    useEffect(() => {
      window.api.readAccountConfig().then(setAccountConfigs)
    }, []);
    return accountConfigs;
}

const HomePage = () => {
    const directoryConfig = useDirectoryConfig();
    const accountConfig = useAccountConfig();

    return (
        <div>
            {JSON.stringify(directoryConfig)}
            {JSON.stringify(accountConfig)}
        </div>
    )
};

export default HomePage;

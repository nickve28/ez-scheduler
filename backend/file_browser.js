const jsYaml = require("js-yaml");
const path = require("path");
const fs = require('fs/promises');

const rootPath = path.resolve(__dirname);

const findDirectoryConfig = async () => {
    const file = await fs.readFile(
        `${rootPath}/../env/directories.yml`
    );
    return jsYaml.load(file);
};

const findAccounts = async () => {
    const file = await fs.readFile(
        `${rootPath}/../env/accounts.yml`
    );
    return jsYaml.load(file);
};

module.exports = {
   findDirectoryConfig,
   findAccounts
};

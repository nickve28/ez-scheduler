const jsYaml = require("js-yaml");
const path = require("path");
const fs = require("fs/promises");
const glob = require("glob");

const rootPath = path.resolve(__dirname);

const findDirectoryConfig = async () => {
  const file = await fs.readFile(`${rootPath}/../env/directories.yml`);
  return jsYaml.load(file);
};

const findAccounts = async () => {
  const file = await fs.readFile(`${rootPath}/../env/accounts.yml`);
  return jsYaml.load(file);
};

const readAndEncodeImage = (filePath) => {
  const imagePromise = fs.readFile(filePath);
  return imagePromise.then((image) => {
    const encodedImage = `data:image/jpeg;base64,${image.toString("base64")}`;
    return {
      path: filePath,
      image: encodedImage,
    };
  });
};

const readFromDirectoryConfig = async (directoryConfig) => {
  const { directory_pattern, output_directory, file_pattern } = directoryConfig;
  const pattern = `${directory_pattern}/${file_pattern}`;
  const queuedImages = await glob.glob(pattern);

  // needs to be a while loop so we can utilize async/await
  return Promise.all(queuedImages.map(readAndEncodeImage));
};

const findImages = async () => {
  const directories = await findDirectoryConfig();
  const results = await Promise.all(directories.map(readFromDirectoryConfig));
  return results.reduce((memo, results) => memo.concat(results));
};

module.exports = {
  findDirectoryConfig,
  findAccounts,
  findImages,
};

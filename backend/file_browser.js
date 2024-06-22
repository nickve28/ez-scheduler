const jsYaml = require("js-yaml");
const path = require("path");
const fs = require("fs/promises");
const glob = require("glob");
const piexif = require("piexifjs")

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
    const base64Image = image.toString("base64")
    const encodedImage = `data:image/jpeg;base64,${base64Image}`;

    const binary = Buffer.from(base64Image, 'base64').toString('binary');
    const exifObj = piexif.load(binary);

    const subject = exifObj['0th'][piexif.ImageIFD.XPSubject];
     // Remove null characters and other non-printable characters from the end of the string
    const caption = subject ? Buffer.from(subject).toString('utf16le').replace(/\0[\s\S]*$/g, '') : null;

    return {
      path: filePath,
      caption: caption,
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
  console.log(results)
  return results.reduce((memo, results) => memo.concat(results));
};

module.exports = {
  findDirectoryConfig,
  findAccounts,
  findImages,
};

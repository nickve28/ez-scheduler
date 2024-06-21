const jsYaml = require("js-yaml")
const path = require("path")
const fs = require('fs/promises')

const findFiles = async () => {
    const rootPath = path.resolve(__dirname)
    const file = await fs.readFile(
        `${rootPath}/../env/directories.yml`
    )
    return jsYaml.load(file)
}

module.exports = {
    findFiles
}

const { readdir, writeJson, readJson, lstatSync } = require('fs-extra');
const { fold } = require('path');

(async () => {
  const manifestsFolder = `${process.cwd()}/manifests`;
  const manifestIndex = `${process.cwd()}/index.json`;
  const manifestApps = `${process.cwd()}/applications.json`;

  const directories = (await readdir(manifestsFolder)).filter(file => lstatSync(`${manifestsFolder}/${file}`).isDirectory() );

  await writeJson(manifestIndex, {
      applications: directories
  }, {
    spaces: 2
  });

  const applicationsData = [];
  

  for (const directory of directories) {
    const manifestFile = `${manifestsFolder}/${directory}/manifest.json`;

    const fileContent = await readJson(manifestFile);
    applicationsData.push(fileContent);
  }

  await writeJson(manifestApps, applicationsData);
})();
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const editJsonFile = require("edit-json-file");

const version = process.argv.slice(2)[0];

fs.readdirSync(path.join(process.cwd(), 'packages')).forEach(pack => {
   childProcess.execSync(`cd packages && cd ${pack} && npm version ${version} --allow-same-version`);
});

const projectTemplatePackage = editJsonFile(path.join(__dirname, '..', '/packages/cli/project-template/package.json'), {});
projectTemplatePackage.set('dependencies.@lio-spa/core', `^${version}`);
projectTemplatePackage.set('dependencies.@lio-spa/build-app', `^${version}`);
projectTemplatePackage.set('dependencies.@lio-spa/cli', `^${version}`);
projectTemplatePackage.save();


console.log(`Set version of all packages to: ${version}`);
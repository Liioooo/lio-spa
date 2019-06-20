const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const version = process.argv.slice(2)[0];

fs.readdirSync(path.join(process.cwd(), 'packages')).forEach(pack => {
   childProcess.execSync(`cd packages && cd ${pack} && npm version ${version} --allow-same-version`);
});

console.log(`Set version of all packages to: ${version}`);
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

fs.readdirSync(path.join(process.cwd(), 'packages')).forEach(pack => {
    childProcess.exec(`cd packages && cd ${pack} && npm publish`, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
});
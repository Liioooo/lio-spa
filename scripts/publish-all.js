const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const simpleGit = require('simple-git')(__dirname);

simpleGit.diff([], (err, data) => {
    console.log(data);
});

// fs.readdirSync(path.join(process.cwd(), 'packages')).forEach(pack => {
//     childProcess.exec(`cd packages && cd ${pack} && npm run publish-package`, (error, stdout, stderr) => {
//         console.log(stdout);
//         console.log(stderr);
//     });
// });
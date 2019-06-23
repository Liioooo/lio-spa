const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const simpleGit = require('simple-git')(__dirname);
const version = require('../package').version;

simpleGit.diff([], (err, data) => {
    if(!data) {
        publish();
    } else {
        console.log('Commit all changes before publishing!');
    }
});


function publish() {
    simpleGit.addTag(`v${version}`, () => {
        fs.readdirSync(path.join(process.cwd(), 'packages')).forEach(pack => {
            childProcess.exec(`cd packages && cd ${pack} && npm run publish-package`, (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
            });
        });
        simpleGit.pushTags('origin');
    });
}
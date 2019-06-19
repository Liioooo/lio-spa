import {Command, flags} from '@oclif/command';
import * as Parser from '@oclif/parser';
import * as path from 'path';
import * as fs from 'fs';

export default class Serve extends Command {
    static description = 'Serves the application in the working directory.';

    static examples = [
        `$ lio-spa serve
Serves the application in the working directory
`,
    ];

    static flags = {
        help: flags.help({char: 'h'}),
    };

    async run() {
        const {args} = this.parse(Serve);

        const workingDir = process.cwd();

        if (!fs.existsSync(path.join(workingDir, 'package.json'))) {
            this.error('package.json does not exist in this workspace!', {exit: 1});
        }

    }
}

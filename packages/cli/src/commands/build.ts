import {Command, flags} from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';

export default class Build extends Command {
    static description = 'Builds the application.';

    static examples = [
        `$ lio-spa build
Builds the application
`,
    ];

    static flags = {
        help: flags.help({char: 'h'}),
    };

    async run() {
        const {flags} = this.parse(Build);

        const workingDir = process.cwd();

        if (!fs.existsSync(path.join(workingDir, 'package.json'))) {
            this.error('package.json does not exist in this workspace!', {exit: 1});
        }

        this.log('Building app...');

        const config = require(path.join(__dirname, '..', '..', 'webpack-configs', 'webpack.prod.js'));
        webpack(config, (err: any, stats: any) => {
            if (err) {
                console.log(err);
            }
            console.log(stats.toString({
                chunks: false,
                colors: true
            }));
        });
    }
}

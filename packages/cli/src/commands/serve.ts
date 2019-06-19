import {Command, flags} from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

export default class Serve extends Command {
    static description = 'Serves the application in the working directory.';

    static examples = [
        `$ lio-spa serve
Serves the application in the working directory
`,
    ];

    static flags = {
        help: flags.help({char: 'h'}),
        port: flags.integer({
            required: false,
            default: (context) => 8200
        })
    };

    async run() {
        const {flags} = this.parse(Serve);

        const workingDir = process.cwd();

        if (!fs.existsSync(path.join(workingDir, 'package.json'))) {
            this.error('package.json does not exist in this workspace!', {exit: 1});
        }

        this.log('Starting app...');

        const config = require(path.join(__dirname, '..', '..', 'webpack-configs', 'webpack.dev.js'));
        const server = new WebpackDevServer(webpack(config));

        server.listen(flags.port, (err: any) => {
            if (err) {
                console.log(err);
            }
            console.log('WebpackDevServer listening at localhost:', flags.port);
        });
    }
}

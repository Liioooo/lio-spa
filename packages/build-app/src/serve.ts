import * as path from 'path';
import * as WebpackDevServer from 'webpack-dev-server';
import * as webpack from 'webpack';

export function serve(port: number) {
    const config = require(path.join(__dirname, '..', 'webpack-configs', 'webpack.dev.js'));
    const server = new WebpackDevServer(webpack(config), {});

    server.listen(port, (err: any) => {
        if (err) {
            console.log(err);
        }
        console.log('WebpackDevServer listening at localhost:', port);
    });
}
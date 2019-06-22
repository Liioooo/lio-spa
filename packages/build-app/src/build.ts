import * as path from 'path';
import * as webpack from 'webpack';

export function build() {
    const config = require(path.join(__dirname, '..', 'webpack-configs', 'webpack.prod.js'));
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
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfigBuilder from '../webpack.config';
import open from 'open';

const config = webpackConfigBuilder('development');
const port = 3000;
const baseUrl = 'http://localhost';
const url = baseUrl + ':' + port;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: 'src/',
  stats: { colors: true }, // pretty colored output
  noInfo: true, // Set to false to display a list of each file that is being bundled.
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err); //eslint-disable-line no-console
  }

  console.log(`Listening at ${url}`); //eslint-disable-line no-console
  open(`${url}`);
});

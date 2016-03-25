import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfigBuilder from '../webpack.config';
import open from 'open';
import colors from 'colors';

/*eslint-disable no-console */

const config = webpackConfigBuilder('development');

let app = express();
let compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

const port = 3000;
app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  const url = `http://localhost:${port}`;
  open(url);
});


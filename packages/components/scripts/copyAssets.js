/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const images = path.resolve(__dirname, '../src/images');
const videos = path.resolve(__dirname, '../src/videos');
const lib = path.resolve(__dirname, '../lib');

fs.copySync(images, path.join(lib, 'images'));
fs.copySync(videos, path.join(lib, 'videos'));

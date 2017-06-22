const fs = require('fs');
const path = require('path');
const async = require('async');
const  _ = require('underscore');
const svg = require('./svg');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const ttf2woff2 = require('ttf2woff2');

let config = {
  fontfileName: 'webFont',
  charmap: [
    /*{
     unicode: '&#xf000;',
     cssCode: '\f000',
     file: path.join(inputDir, '网络.svg')
     }*/
  ]
};
/**
 * 遍历输入目录下的svg图片列表
 * @param {string} path 入口目录
 */
const ScanDir = (path) => {
  let that = this
  if (fs.statSync(path).isFile()) {
    const length = config.charmap.length;
    const NUM = length < 10 ? `00${length}` : (length < 100 ? `0${length}` : length);
    return config.charmap.push({
      /*unicode: `&#xf${NUM};`,*/
      unicode: `&#xf${NUM};`,
      cssCode: `\\f${NUM}`,
      file: path
    });
  }
  try {
    fs.readdirSync(path).forEach((file) => {
      ScanDir.call(that, path + '/' + file)
    })
  } catch (e) {}
};
const createSvg = (dir, config, done) => {
  config = config || {};
  const mapFunction = (charConfig, done) => {
    const file = path.resolve(dir, charConfig.file);
    svg.optimize(config, file, (err, data) => {
      if (err) {
        return done(err);
      }
      return done(null, {
        unicode: charConfig.unicode,
        d: data
      });
    });
  };
  async.map(config.charmap, mapFunction, (err, data) => {
    if (err) {
      return done(err);
    }
    svg.create(_.extend({}, config, { charmap: data }), done);
  });
};
const createTtf = (svgFile, outputDir) => {
  const svgMetadata = fs.readFileSync(svgFile, 'utf-8');
  const ttf = new Buffer(svg2ttf(svgMetadata).buffer);
  const ttfFile = path.resolve(outputDir, `${config.fontfileName}.ttf`);
  fs.writeFile(ttfFile, ttf, function (err) {
    const newttfFile = new Uint8Array(fs.readFileSync(ttfFile));
    const woff = new Buffer(ttf2woff(newttfFile).buffer);
    const eot = new Buffer(ttf2eot(svg2ttf(svgMetadata).buffer).buffer);
    const woff2 = ttf2woff2(fs.readFileSync(ttfFile));
    const woffFile = path.resolve(outputDir, `${config.fontfileName}.woff`);
    const woff2File = path.resolve(outputDir, `${config.fontfileName}.woff2`);
    const eotFile = path.resolve(outputDir, `${config.fontfileName}.eot`);
    fs.writeFile(woffFile, woff, function (err) {});
    fs.writeFile(woff2File, woff2, function (err) {});
    fs.writeFile(eotFile, eot, function (err) {});
  });
};
const createDemoHtml = (outputDir) => {

  const DEMO_TEMPLATE_FILE = 'demo.tpl';
  const CSS_TEMPLATE_FILE = 'css.tpl';
  const cssConfig = {
    fontfileName: config.fontfileName,
    charmap: config.charmap,
  }
  fs.readFile(path.join(__dirname, CSS_TEMPLATE_FILE), 'utf-8', (err, template) => {
    if (err) {
      return done(err);
    }
    const cssTmp = _.template(template, cssConfig);
    const demoConfig = {
      fontfileName: config.fontfileName,
      cssStyle: cssTmp,
      charmap: config.charmap
    }
    const htmlFile = path.resolve(outputDir, demoConfig.fontfileName + '.html');
    fs.readFile(path.join(__dirname, DEMO_TEMPLATE_FILE), 'utf-8', (err, template) => {
      if (err) {
        return done(err);
      }
      const tmp = _.template(template, demoConfig);
      fs.writeFile(htmlFile, tmp, function (err) {});
    });
  });



}
const generateFont = (inputDir, outputDir, fontName, done) => {
  config.charmap = [];
  config.fontfileName = fontName;
  ScanDir(inputDir);

  createSvg(inputDir, config, function(err, result) {
    const file = path.resolve(outputDir, `${config.fontfileName}.svg`);
    fs.writeFile(file, result, function (err) {
      if (err) {
        return done(err);
      }
      createTtf(file, outputDir);
      createDemoHtml(outputDir);
      return done(null, file);
    });
  });
};

exports.generateFont = generateFont;

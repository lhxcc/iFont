const fs = require('fs');
const config = require('config');
const path = require('path');
const async = require('async');
const  _ = require('underscore');
const svg = require('./lib/svg');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2eot = require('ttf2eot');
const ttf2woff2 = require('ttf2woff2');
const zip = require("node-native-zip");
const UTIL = require('../common/util');
let newDownloadDir = '';

// 判断上传文件临时存放文件夹是否存在，不存在则创建此文件夹
let downloadDir = path.join(__dirname, `../../${config.fileCfg.downloadDir}`);
if(!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

let iconDefaultcfg = {
  fontfileName: 'iconfont',
  charmap: []
};
/**
 * 遍历输入目录下的svg图片列表
 * @param {string} path 入口目录
 */
const ScanList = (list) => {
  list.map(item => {
    const length = iconDefaultcfg.charmap.length;
    const NUM = length < 10 ? `00${length}` : (length < 100 ? `0${length}` : length);
    iconDefaultcfg.charmap.push({
      unicode: `&#xf${NUM};`,
      cssCode: `\\f${NUM}`,
      file: item.show_svg
    })
  });
};
const createSvg = (iconDefaultcfg, done) => {
  iconDefaultcfg = iconDefaultcfg || {};
  const mapFunction = (charConfig, done) => {
    const file = charConfig.file;
    svg.optimize(iconDefaultcfg, file, (err, data) => {
      if (err) {
        return done(err);
      }
      return done(null, {
        unicode: charConfig.unicode,
        d: data
      });
    });
  };
  async.map(iconDefaultcfg.charmap, mapFunction, (err, data) => {
    if (err) {
      return done(err);
    }
    svg.create(_.extend({}, iconDefaultcfg, { charmap: data }), done);
  });
};
const createDemoZip = (outputDir, done) => {
  const list = [
    { name: `iconfont.html` , path: `${outputDir}/iconfont.html`},
    { name: `iconfont.css` , path: `${outputDir}/iconfont.css`},
    { name: `iconfont.svg` , path: `${outputDir}/iconfont.svg`},
    { name: `iconfont.ttf` , path: `${outputDir}/iconfont.ttf`},
    { name: `iconfont.eot` , path: `${outputDir}/iconfont.eot`},
    { name: `iconfont.woff` , path: `${outputDir}/iconfont.woff`},
    { name: `iconfont.woff2` , path: `${outputDir}/iconfont.woff2`}
  ];
  const archive = new zip();
  archive.addFiles(list, function (err) {
    if (err) {
      return done(err);
    }
    var buff = archive.toBuffer();
    const zipFile = `${outputDir}/example.zip`;
    fs.writeFile(zipFile, buff, function (err) {
      if (err) {
        return done(err);
      }
      return done(null, `/download/${newDownloadDir}/example.zip`);
    });
  });

}
const createDemoHtml = (cssTmp, outputDir, done) => {
  const DEMO_TEMPLATE_FILE = './lib/demo.tpl';
  const demoConfig = {
    fontfileName: iconDefaultcfg.fontfileName,
    cssStyle: cssTmp,
    charmap: iconDefaultcfg.charmap
  }
  const htmlFile = path.resolve(outputDir, demoConfig.fontfileName + '.html');
  fs.readFile(path.join(__dirname, DEMO_TEMPLATE_FILE), 'utf-8', (err, template) => {
    if (err) {
      return done(err);
    }
    const tmp = _.template(template, demoConfig);
    fs.writeFile(htmlFile, tmp, function (err) {
      if (err) {
        return done(err);
      }
      createDemoZip(outputDir, done);
    });
  });
}
const createDemoCss = (outputDir, done) => {
  const CSS_TEMPLATE_FILE = './lib/css.tpl';
  const cssConfig = {
    fontfileName: iconDefaultcfg.fontfileName,
    charmap: iconDefaultcfg.charmap,
  }
  fs.readFile(path.join(__dirname, CSS_TEMPLATE_FILE), 'utf-8', (err, template) => {
    if (err) {
      return done(err);
    }
    const cssTmp = _.template(template, cssConfig);
    const cssFile = path.resolve(outputDir, iconDefaultcfg.fontfileName + '.css');
    fs.writeFile(cssFile, cssTmp, function (err) {
      if (err) {
        return done(err);
      }
      createDemoHtml(cssTmp, outputDir, done);
    });
  });
}
const createWoff2 = (ttfFile, outputDir, done) => {
  const woff2 = ttf2woff2(fs.readFileSync(ttfFile));
  const woff2File = path.resolve(outputDir, `${iconDefaultcfg.fontfileName}.woff2`);
  fs.writeFile(woff2File, woff2, function (err) {
    if(err) {
      return done(err);
    }
    createDemoCss(outputDir, done);
  });
}
const createWoff = (ttfFile, outputDir, done) => {
  const newttfFile = new Uint8Array(fs.readFileSync(ttfFile));
  const woffBuffer = new Buffer(ttf2woff(newttfFile).buffer);
  const woffFile = path.resolve(outputDir, `${iconDefaultcfg.fontfileName}.woff`);
  fs.writeFile(woffFile, woffBuffer, function (err) {
    if(err) {
      return done(err);
    }
    createWoff2(ttfFile, outputDir, done);
  });
}
const createEot = (svgMetadata, ttfFile, outputDir, done) => {
  const eot = new Buffer(ttf2eot(svg2ttf(svgMetadata).buffer).buffer);
  const eotFile = path.resolve(outputDir, `${iconDefaultcfg.fontfileName}.eot`);
  fs.writeFile(eotFile, eot, function (err) {
    if(err) {
      return done(err);
    }
    createWoff(ttfFile, outputDir, done);
  });
}
const createTtf = (svgFile, outputDir, done) => {
  const svgMetadata = fs.readFileSync(svgFile, 'utf-8');
  const ttf = new Buffer(svg2ttf(svgMetadata).buffer);
  const ttfFile = path.resolve(outputDir, `${iconDefaultcfg.fontfileName}.ttf`);
  fs.writeFile(ttfFile, ttf, function (err) {
    if(err) {
      return done(err);
    }
    createEot(svgMetadata, ttfFile, outputDir, done);
  });
};

const generateFont = (downList, done) => {
  newDownloadDir = `ifont_${UTIL.UUID()}`;
  const outputDir = `${downloadDir}/${newDownloadDir}`;
  fs.mkdirSync(outputDir);
  const list = JSON.parse(downList);
  iconDefaultcfg.charmap = [];
  iconDefaultcfg.fontfileName = 'iconfont';
  ScanList(list);
  createSvg(iconDefaultcfg, function(err, result) {
    const file = path.resolve(outputDir, `${iconDefaultcfg.fontfileName}.svg`);
    fs.writeFile(file, result, function (err) {
      if (err) {
        return done(err);
      }
      createTtf(file, outputDir, done);
    });
  });
};

exports.generateFont = generateFont;

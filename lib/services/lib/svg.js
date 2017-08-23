const fs = require('fs');
const async = require('async');
const xml2js = require('xml2js');
const svgo = require('svgo');
const path = require('path');
const _ = require('underscore');
const SvgPath = require('svgpath');

const svgOptimizer = new svgo();
const xml2jsParser = new xml2js.Parser();

const TEMPLATE_FILE = 'svg.tpl';

const SVG_CONFIG_DEFAULTS = {
  horizAdvX: 1024,
  unitsPerEm: 1024,
  ascent: 1024,
  descent: 0,
};
const preProcessing = [
  function stripFills (xml) {
    return xml.replace(/ fill=".*?"/gi, '');
  }
]
const xml2json = (data, done) => {
  xml2jsParser.parseString(data, done);
};

const preProcess = (xml, next) => {
  preProcessing.forEach((func) => {
    xml = func.call(this, xml);
  });
  return next(null, xml);
};
const normalizePath = (config, svg, done) => {
  let viewBox, path, fontHeight,scale, svgConfig = _.extend({}, SVG_CONFIG_DEFAULTS, config);

  if (! svg || ! svg.$ || ! svg.$.viewBox) {
    return done(null, 'No bounding box information could be found for this SVG.');
  }

  viewBox = svg.$.viewBox.split(' ').slice(2);
  fontHeight = svgConfig.ascent - svgConfig.descent;
  scale = fontHeight / Number(viewBox[1]);

  path = _.reduce(svg.path, function (memo, path) {
    memo += path.$.d;
    return memo;
  }, '');

  path = new SvgPath(path).scale(scale, -scale).translate(0, fontHeight).abs().round(0);
  return done(null, path);
}

// 优化整理svg图片线条等
const optimize = (config, file, done) => {
  async.waterfall([
    // 读取svg文件
    (next) => {
      return next(null, file)
    },
    // xml处理svg文件
    (xml, next) => {
      if(xml.indexOf('width="') !== -1 && xml.indexOf('height="')){
        const w = xml.match(/width="[0-9]+"/gi);
        const h = xml.match(/height="[0-9]+"/gi);
        if(w.length > 0 && h.length > 0) {
          const width = w[0].split('"')[1];
          const height = h[0].split('"')[1];
          if(width !== height) {
            if(width > height) {
              xml = xml.replace(h[0], w[0]);
            }else{
              xml = xml.replace(w[0], h[0]);
            }
          }
        }
      }
      if(xml.indexOf('viewBox') !== -1) {
        const v = xml.match(/viewBox="[0-9 ]+"/gi);
        if(v.length > 0) {
          const viewBox = v[0].split('"')[1];
          if(viewBox) {
            const viewBoxVal = viewBox.split(' ');
            const xv = viewBoxVal[0];
            const yv = viewBoxVal[1];
            const wv = viewBoxVal[2];
            const hv = viewBoxVal[3];
            if(wv !== hv) {
              if(wv > hv) {
                xml = xml.replace(v[0], 'viewBox="' + xv + ' ' + yv + ' ' + wv + ' ' + wv + '"');
              }else{
                xml = xml.replace(v[0], 'viewBox="' + xv + ' ' + yv + ' ' + hv + ' ' + hv + '"');
              }
            }
          }
        }
      }
      preProcess(xml, next);
    },
    // 优化svg线条
    (xml, next) => {
      svgOptimizer.optimize(xml, function (optimized) {
        next(null, xml, optimized)
      });
    },
    (xml, optimized, next) => {
      if (!optimized.data) {
        return next('Could not optimize SVG');
      }
      xml2json(optimized.data, next);
    },
    (optimizedJson, next) => {
      normalizePath(config, optimizedJson.svg, next);
    }
  ], done);
};
// 创建svg 字体返回字体模板对应font
const create = (config, done) => {
  const svgConfig = _.extend({}, SVG_CONFIG_DEFAULTS, config);
  fs.readFile(path.join(__dirname, TEMPLATE_FILE), 'utf-8', (err, template) => {
    if (err) {
      return done(err);
    }
    const tmp = _.template(template, svgConfig);
    return done(null, tmp);
  });
};

exports.optimize = optimize;
exports.create = create;

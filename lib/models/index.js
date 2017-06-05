/**
 * Created by feichenxi on 2016/5/20.
 */

'use strict';

const path = require('path');
const sequelize = require('../common/sequelize');

/**
 * 加载model
 * @param name
 * @returns {*}
 */
function load(name) {
    return sequelize.import(path.join(__dirname, name));
}

module.exports = {
    sequelize: sequelize,
    SourceInfo: load('source_info'),
    SourceColumn: load('source_column'),
    MetadataInfo:load('metadata_info'),
    MetadataColumn:load('metadata_column'),
    MetadataTransform:load('metadata_transform'),
    MetadataStore:load('metadata_store'),
    MetadataJob:load('metadata_job'),
    MetadataJobParameter:load('metadata_job_parameter'),
};

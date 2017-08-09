/**
 * Created by yaoguofeng on 2017/08/09.
 *
 * 错误码定义
 *
 */

'use strict';

/**
 * 错误码说明
 * @type {{}}
 */
const MSG = module.exports.MSG = {};


function defineCode(code, msg) {
  MSG[code] = msg;
  return code;
}

module.exports.CODE = {
  NONSUPPORT: defineCode(-2, '未开发'),
  ERROR: defineCode(-1, '异常'),
  SUCCESS: defineCode(0, '成功'),
  AUTH_FAILED: defineCode(1000, '认证失败'),
  PARAM_ERROR: defineCode(1010, '参数错误'),
  METADARA_EXIST: defineCode(3000, '元数据名称已存在'),
  METADARA_JOB_EXIST: defineCode(4000, '元数据任务名称已存在'),
  METADARA_JOB_NO_METADATA: defineCode(5000, '未选择元数据'),
  METADARA_JOB_NO_START: defineCode(5001, '未配置开始时间'),
  METADARA_JOB_NO_END: defineCode(5002, '未配置结束时间'),
  METADARA_JOB_START_BIG_END: defineCode(5003, '开始时间不能大于等于结束时间'),
  METADARA_JOB_NO_FREQUENCY: defineCode(5004, 'cron表达式为空'),
  METADARA_JOB_NO_SOURCE_COLUMN: defineCode(5005, '元数据未配置原始数据结构'),
  METADARA_JOB_CREATE_File_FAILED: defineCode(5006, 'etl目录创建失败'),
  METADARA_JOB_UPLOAD_ETL_File_FAILED: defineCode(5007, 'etl文件上传失败'),
  METADARA_JOB_UPLOAD_WORKFLOW_File_FAILED: defineCode(5008, 'workflow文件上传失败'),
  METADARA_JOB_UPLOAD_COORDINATOR_File_FAILED: defineCode(5009, 'coordinator文件上传失败'),
  METADARA_JOB_START_FAILED: defineCode(5010, '启动失败，请检查配置是否正确~'),

};

/**
 * Created by yaoguofeng on 2017/5/10.
 *
 */

'use strict';

const config = require('config');
/**
 * 时间格式
 * @param time 需要转换的时间如：new Date()
 * @param fmt 时间格式：如：'yyyy-MM-dd hh:mm:ss'
 * @returns 返回安装时间格式的时间
 */
const format= (time, fmt) => {
  let result = fmt;
  const o = {
    'y+': time.getFullYear(),
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
  };
  if (/(y+)/.test(fmt)) {
    const fullYear = time.getFullYear();
    result = fmt.replace(RegExp.$1, (`${fullYear}`).substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((item) => {
    const value = o[item];
    if (new RegExp(`(${item})`).test(result)) {
      result = result.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? value : ((`00${value}`).substr(`${value}`.length)));
    }
  });
  return result;
};
module.exports.transformCoordinatorContent = ((opt) => {
  const start = format(new Date(opt.metadataJobParameterStart.parameter_value), 'yyyy-MM-ddThh:mm');
  const end = format(new Date(opt.metadataJobParameterEnd.parameter_value), 'yyyy-MM-ddThh:mm');
  return `<!--
name：建议以etl为前缀，coron为后缀，名称最好与workflow对应
start、end：表示任务的执行时间范围
frequency：cron表达式，示例表示每天凌晨两天执行
-->
<coordinator-app name="etl_${opt.MetadataJobInfo.metadata_job_name}_cron" frequency="${opt.metadataJobParameterFrequency.parameter_value}"
    start="${start}+0800" end="${end}+0800" timezone="Asia/Shanghai" xmlns="uri:oozie:coordinator:0.2">
    <action>
        <workflow>
            <!--要执行的workflow配置文件在hdfs的路径，根据实际情况设置-->
            <app-path>${config.hdfs.nameNode}${config.hdfs.directoryPath}/${opt.MetadataJobInfo.metadata_job_name}_etl_workflow.xml</app-path>
            <configuration>
                <property>
                    <name>jobTracker</name>
                    <value>${config.hdfs.jobTracker}</value>
                </property>
                <property>
                    <name>nameNode</name>
                    <value>${config.hdfs.nameNode}</value>
                </property>
            </configuration>
        </workflow>
    </action>
</coordinator-app>`;
});

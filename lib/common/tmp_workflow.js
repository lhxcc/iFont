/**
 * Created by yaoguofeng on 2017/5/9.
 *
 */

'use strict';

const config = require('config');

const actionTpl = (list) => {
  let result = '';
  let newxEtlName = '';
  let newLineTag = '';
  for(let i in list) {
    if(i == list.length-1){
      newxEtlName = 'end';
      newLineTag = '';
    } else {
      newxEtlName = list[(Number(i)+1)].etlName;
      newLineTag = '\n    ';
    }
    result += `<action name="${list[i].etlName}"> 
        <java> 
            <job-tracker>${config.hdfs.jobTracker}</job-tracker> 
            <name-node>${config.hdfs.nameNode}</name-node> 
            <main-class>org.apache.spark.deploy.SparkSubmit</main-class>
            <arg>--class</arg>
            <arg>${config.hdfs.spark_main_class}</arg>
            <arg>--master</arg>
            <arg>${config.hdfs.spark_master}</arg>
            <arg>--executor-memory</arg>
            <!--根据一次数据预处理的大小进行实际调整-->
            <arg>${config.hdfs.executor_memory}</arg>                          
            <arg>--total-executor-cores</arg>
            <!--根据一次数据预处理的大小进行实际调整-->
            <arg>${config.hdfs.cores_max}</arg>
            <arg>${config.hdfs.nameNode}${config.hdfs.directoryPath}${config.hdfs.jar_path}</arg>
            <!--jar包是通用的数据预处理工具，不同的元数据生产使用的配置定义-->
            <arg>${list[i].etlPath}</arg>
        </java>
        <!--如一类元数据需要对多类原始数据进行处理，将ok设置为下一个ETL任务名称即可如果失败，跳转到发送错误邮件动作-->
        <ok to="${newxEtlName}" />
        <error to="error_email" />
    </action>${newLineTag}`;
  }
  return result;
}


module.exports.transformWorkflowContent = ((etlFileList,opt) => {
  const etlList = actionTpl(etlFileList);
  return `<workflow-app name="etl_${opt.MetadataJobInfo.metadata_job_name}" xmlns="uri:oozie:workflow:0.2"> 
    <start to="${etlFileList[0].etlName}"/>
    ${etlList}
    <!--发送错误邮件动作-->
    <action name="error_email">
        <email xmlns="uri:oozie:email-action:0.1">
             <to>daijunyan@hikvision.com.cn</to>
             <subject>\${wf:id()} failed</subject>
             <body>\${wf:errorMessage(wf:lastErrorNode())}</body>
        </email>
        <ok to="fail" />
        <error to="fail" />
    </action>
    <kill name="fail">
        <message>
          Spark failed, error message[\${wf:errorMessage(wf:lastErrorNode()) }]
        </message>
    </kill>
    <end name="end"/>  
</workflow-app>`;
});

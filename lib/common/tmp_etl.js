'use strict';

module.exports.transformEtlContent = ((opt) => {
  let ColumnListObjToString = '';
  const sourceColumnList = opt.sourceColumnList;
  for(let i in sourceColumnList){
    ColumnListObjToString += `${i != 0 ? '        ' : ''}${sourceColumnList[i].dataValues.source_column_name}: ${sourceColumnList[i].dataValues.source_column_index || 0}${i == sourceColumnList.length-1 ? '' : '\n'}`;
  }
  return `data {
  partition.number = 0
  //外部依赖参数
  depend {
    //自定义ip能力转换依赖参数
    ip.library.path = "/depend/ip.datx"
    //自定义手机号码能力转换依赖参数
    mobile.library.path = "/depend/dmn_mobile_belong.csv"
  }
  etl {
    input {
      //原始数据类型
      type = "${opt.SourceInfo.source_type}"
      //压缩格式
      compress = "${opt.SourceInfo.source_compress}"
      //单次执行数据范围：day/week/month
      roundUnit = "day"
      //原始数据URL
      path = "${opt.SourceInfo.source_hdfs}"
      //字段描述
      column = {
        ${ColumnListObjToString}
      }
    }
    //数据清洗、转换规则参数
    transform {
      ${opt.MetadataTransformInfo.transform_logic}
    }
    //元数据存储参数
    output {
      ${opt.MetadataStoreInfo.store_value}
    }
  }
}`;
});

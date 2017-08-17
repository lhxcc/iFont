/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import './Icon.less';

export default class Icon extends Component {
  constructor(props) {
    super(props);
  };
  /**
   * 组件生命周期：正在渲染
   * @returns {XML}
     */
  render() {
    const item = this.props.info;
    return (
      <li className="icon-item-box">
        <div dangerouslySetInnerHTML={{__html: item.show_svg}} />
        <span className="icon-name">{item.name}</span>
        <div className="icon-cover" pid={item.id}>
          <span title="添加入库" className="cover-item iconfont cover-item-line icon-shoucang" />
          <span title="添加入库" className="cover-item iconfont cover-item-line icon-shanchu" />
        </div>
      </li>
    );
  };
};

/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import './Icon.less';

export default class Icon extends Component {
  constructor(props) {
    super(props);
  };
  renderTodos(todos) {
    let todosHTML = [];
    todos.map(item => {

      switch(item) {
        case 'del':
          todosHTML.push('<span title="删除" class="cover-item iconfont cover-item-line icon-delete"></span>');
          break;
        case 'fav':
          todosHTML.push('<span title="添加入库" class="cover-item iconfont cover-item-line icon-favorite"></span>');
          break;
      }
    });
    return todosHTML.join('');
  }
  /**
   * 组件生命周期：正在渲染
   * @returns {XML}
     */
  render() {
    const item = this.props.info;
    const todosHTML = this.renderTodos(this.props.todos || []);
    return (
      <li className="icon-item-box">
        <div dangerouslySetInnerHTML={{__html: item.show_svg}} />
        <span className="icon-name">{item.name}</span>
        <div className="icon-cover" pid={item.id}  dangerouslySetInnerHTML={{__html: todosHTML}} >
        </div>
      </li>
    );
  };
};

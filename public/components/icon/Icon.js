/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import store from 'store';
import './Icon.less';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      show_svg: '',
      isFoved: false
    };

    this.delIcon = this.delIcon.bind(this);
    this.favIcon = this.favIcon.bind(this);

  };
  componentWillMount() {
    this.rederIconItemInfo();
  }
  /**
   * 更新icon信息
   */
  rederIconItemInfo() {
    let ifontFavIcons = store.get("_ifont_fav_icons") || [];
    let isFoved = false;
    const {id, name, show_svg} = this.props.info;
    ifontFavIcons.map(item => {
      if(item.id == id){
        isFoved = true;
      }
    });
    this.setState({
      id,
      name,
      show_svg,
      isFoved
    });
  }
  /**
   * 渲染icon元素
   * @param  {array} todos  icon可操作的事件'fav','del'等
   * @param  {object} info  icon信息
   * @return {string}       html
   */
  renderTodos(todos, info) {
    let todosHTML = [];
    let coverItemCls = '';
    const len = todos.length;
    switch(len) {
      case 1:
        coverItemCls = 'cover-item-single';
        break;
      case 2:
        coverItemCls = 'cover-item-double';
        break;
    }
    let btnTitle = '';
    let btnIcon = '';
    let btnEvt = () => {};
    return todos.map(item => {
      switch(item) {
        case 'del':
          btnTitle = '删除';
          btnIcon = 'icon-delete';
          btnEvt = this.delIcon;
          break;
        case 'fav':
          btnTitle = info.isFoved ? '取消入库' : '添加入库';
          btnIcon = info.isFoved ? 'icon-favoritesfilling' : 'icon-favorite';
          btnEvt = this.favIcon;
          break;
      }
      return (<span key={`${btnIcon}_{info.id}`} id={info.id} title={btnTitle} onClick={btnEvt} className={`cover-item iconfont ${btnIcon} ${coverItemCls}`}></span>);
    });
  }
  /**
   * 点击删除icon事件
   */
  delIcon (e) {}
  /**
   * 点击收藏/取消icon事件
   */
  favIcon (e) {
    const id = e.target.getAttribute("id");
    const { isFoved } = this.state;
    let ifontFavIcons = store.get("_ifont_fav_icons") || [];
    let newArray = [];
    if(isFoved) {
      ifontFavIcons.map(item => {
        if(item.id !== id){
          newArray.push(item);
        }
      });
    } else {
      newArray = ifontFavIcons;
      newArray.push({
        id
      });
    }
    store.remove('_ifont_fav_icons');
    if (newArray.length > 0) {
      store.set("_ifont_fav_icons", newArray);
    }
    this.setState({
      isFoved: !this.state.isFoved
    });

  }
  /**
   * 组件生命周期：正在渲染
   * @returns {XML}
     */
  render() {
    const item = this.state;
    const todosHTML = this.renderTodos(this.props.todos || [], item);
    return (
      <li className={`icon-item-box ${item.isFoved ? 'selected' : ''}`}>
        <div dangerouslySetInnerHTML={{__html: item.show_svg}} />
        <span className="icon-name">{item.name}</span>
        <div className="icon-cover">
          {todosHTML}
        </div>
      </li>
    );
  };
};

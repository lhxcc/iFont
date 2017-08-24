import React, { Component } from 'react';
import store from 'store';
import FetchData from './../../base/scripts/FetchData.js';
import Icon from './../icon/Icon';
import './Download.less';

class Download extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      show: false,
      loading: false,
      downloadLink: ''
    };
    this.clearHandler = this.clearHandler.bind(this);
    this.startDownloadIcons = this.startDownloadIcons.bind(this);
  }
  componentWillMount() {
    this.refreshDownloadIcons();
  }
  // 显示该组件
  show() {
    this.setState({
      show: true
    });
    setTimeout( () => {
      this.setState({
        loading: true
      });
    }, 0);
  }
  // 隐藏该组件
  hide() {
    this.setState({
      loading: false
    });
    setTimeout( () => {
      this.setState({
        show: false
      });
    }, 300);
  }
  /**
   * 一键清空
   */
  clearHandler() {
    store.remove('_ifont_fav_icons');
    this.props.refreshStore();
  }
  // 下载代码
  startDownloadIcons() {
    const list = this.state.list;
    if(list.length == 0) return false;
    const idList = [];
    list.map(item => {
      idList.push({
        id: item.id
      })
    })
    const fetchData = new FetchData({
      url: '/api/font/download',
      method: 'POST',
      data: {
        idList: JSON.stringify(idList)
      }
    });
    fetchData.then((res) => {
      const url = res.data.file;
      this.setState({
        downloadLink: url
      });
      this.refs.downloadLink.click();
    });
  }
  /**
   * 渲染已选择的icons
   * @param  {array} data 已选择的icons数组
   */
  renderList(data) {
    const _this = this;
    if(data.length > 0) {
      return data.map((item,i) => {
        const todos = ['fav'];
        return (
          <Icon className="download-icon-item" key={item.id} info={item} todos={todos}  refreshStore={() => {this.props.refreshStore()}}/>
        );
      });
    } else {
      return (
        <li className="no-result">
          暂未添加任何图标，请添加~~
        </li>
      )
    }
  }
  /**
   * 重新渲染列表
   */
  refreshDownloadIcons() {
    const ifontFavIcons = store.get("_ifont_fav_icons") || [];
    this.setState({
      list: ifontFavIcons
    });
  }
  render() {
    const iconList = this.renderList(this.state.list);
    return (
      <div className={`download-box ${this.state.show ? '' : 'hide'}`} >
        <div className="mask" onClick={() => {this.hide()}} />
        <div className={`download-main ${this.state.loading ? 'show' : ''}`}>
          <div className="download-header">
            <span className="top-back iconfont icon-right" onClick={() => {this.hide()}} />
            <span className="icon-box">
              <i className="iconfont icon-download" />
              <span className="icon-fav-count">{this.state.list.length}</span>
            </span>
            <span className="top-btn-wrap" onClick={this.clearHandler}>
              <span className="iconfont icon-clear" />
              一键清除
            </span>
          </div>
          <div className="download-icons-box">
            <div className="download-icons">
              {iconList}
            </div>
          </div>
          <div className="download-btn-group">
            <a className="downloadLink" href={this.state.downloadLink} ref="downloadLink"></a>
            <div onClick={this.startDownloadIcons} className={`btn btn-normal download-btn ${this.state.list.length > 0 ? '' : 'btn-disabled'}`}>代码下载</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Download;

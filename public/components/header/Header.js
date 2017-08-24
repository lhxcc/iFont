import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from 'store';
import MainContent from './../mainContent/MainContent';
import Download from './../../components/download/Download';
import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      refreshing: false,
      count: 0
    };
  }
  componentWillMount() {
    this.caulFavIconCount();
  }
  /**
   * 计算被收藏要下载的icon数
   */
  caulFavIconCount() {
    let ifontFavIcons = store.get("_ifont_fav_icons") || [];
    this.setState({
      count: ifontFavIcons.length
    });
  }
  refreshHeadIcon() {
    let ifontFavIcons = store.get("_ifont_fav_icons") || [];
    this.setState({
      count: ifontFavIcons.length,
      refreshing: true
    });
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    },1000);
    this.refs.download.refreshDownloadIcons();
  }
  render() {
    return (
      <div className="Header">
        <MainContent>
          <div className="HeaderContent">
            <div className="HeaderLeft">
              <span className="HeaderLogo" />
            </div>
            <nav className="nav-box">
              <ul className="nav-list clearfix">
                <li className={`nav-item ${this.state.active === 'home' ? 'current' : ''}`}>
                  <Link to='/'>首页</Link>
                </li>
                <li className={`nav-item ${this.state.active === 'lib' ? 'current' : ''}`}>
                  <Link to='/lib/1'>图标库</Link>
                </li>
                <li className={`hide nav-item ${this.state.active === 'manage' ? 'current' : ''}`}>
                  <Link to='/manage'>项目管理</Link>
                </li>
              </ul>
            </nav>
            <div className="quick-menu">
              <ul className="clearfix">
                <li onClick={() => {this.refs.download.show()}}>
                  <span className="icon-box icon-fav">
                    <i className="iconfont icon-download" />
                    <span id="J_icon_fav_count" className={`icon-fav-count ${this.state.refreshing ? 'count-ani' : ''}`}>{this.state.count}</span>
                  </span>
                </li>
                <li>
                  <span className="icon-box icon-login">
                    <i className="iconfont icon-people" />
                    <span className="icon-login-user">admin</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </MainContent>
        <div className="Header-line" />
        <Download ref="download" refreshStore={this.props.refreshStore} />
      </div>
    );
  }
}
export default Header;

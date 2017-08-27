import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import store from 'store';
import MainContent from './../mainContent/MainContent';
import Download from './../../components/download/Download';
import './Header.less';
const Search = Input.Search;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      refreshing: false,
      count: 0,
      query: this.props.query || ' '
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentWillMount() {
    this.caulFavIconCount();
  }
  componentWillReceiveProps(nextProps) {
    const oldQuery = this.props.query;
    const newQuery = nextProps.query;
    if(oldQuery !== newQuery ) {
      this.setState({
        query: newQuery || ''
      });
    }
  }
  changeHandler(e) {
    this.setState({
      query: e.target.value || ' '
    });
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
              <Link className="HeaderLogo" to='/' />
            </div>
            <nav className="nav-box">
              <ul className="nav-list clearfix">
                <li className={`nav-item ${this.state.active === 'home' ? 'current' : ''}`}>
                  <Link to='/'>首页</Link>
                </li>
                <li className={`nav-item ${this.state.active === 'lib' ? 'current' : ''}`}>
                  <Link to={`/lib/${encodeURIComponent(' ')}/1`}>图标库</Link>
                </li>
                <li className={`hide nav-item ${this.state.active === 'manage' ? 'current' : ''}`}>
                  <Link to='/manage'>项目管理</Link>
                </li>
              </ul>
            </nav>
            <div className="quick-menu">
              <ul className="clearfix">
                {!this.props.hideSearch &&
                  <li>
                    <Search
                      value={this.state.query.trim()}
                      placeholder="请输入搜素内容"
                      onChange={this.changeHandler}
                      onSearch={value => {
                        this.props.onSearch(value);
                      }}
                    />
                  </li>
                }
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

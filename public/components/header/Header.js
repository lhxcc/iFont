import React, { Component } from 'react';
import MainContent from './../mainContent/MainContent';
import './Header.less';

class Header extends Component {
  constructor() {
    super();
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
                <li className="nav-item current"><a href="/index">首页</a></li>
                <li className="nav-item"><a>图标库</a></li>
                <li className="nav-item"><a>图标管理</a></li>
              </ul>
            </nav>
          </div>
        </MainContent>
        <div className="Header-line" />
      </div>
    );
  }
}
export default Header;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainContent from './../mainContent/MainContent';
import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active
    };
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
                  <Link to='/lib'>图标库</Link>
                </li>
                <li className={`nav-item ${this.state.active === 'manage' ? 'current' : ''}`}>
                  <Link to='/manage'>项目管理</Link>
                </li>
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

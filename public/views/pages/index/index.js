import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// 引入React-Router模块
import { HashRouter, HashRouter as Router, Route, Redirect } from 'react-router-dom';
// bundle模型用来异步加载组件
import Bundle from './../../../base/scripts/bundle';
// 同步引入
import Home from './../../../routes/home/Home';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Router basename="/">
          <div>
            <Redirect to="/home" />
            <Route exact path="/home" component={Home} />
          </div>
        </Router>
      </HashRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
App.defaultProps = {
  children: null,
};
ReactDOM.render(<App />, document.getElementById('page'));
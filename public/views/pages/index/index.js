import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// 引入React-Router模块
import { HashRouter, HashRouter as Router, Route, Redirect } from 'react-router-dom';
// bundle模型用来异步加载组件
import Bundle from './../../../base/scripts/bundle';
// 同步引入
import HomePageContainer from 'bundle-loader?lazy&name=[name]!./../../../routes/home/Home';
import LibPageContainer from 'bundle-loader?lazy&name=[name]!./../../../routes/lib/Lib';
import ManagePageContainer from 'bundle-loader?lazy&name=[name]!./../../../routes/manage/Manage';
import './../../../base/style/common.scss'

const Home = props => (
  <Bundle load={HomePageContainer}>
    {HomePage => <HomePage {...props} />}
  </Bundle>
);
const Lib = props => (
  <Bundle load={LibPageContainer}>
    {LibPage => <LibPage {...props} />}
  </Bundle>
);
const Manage = props => (
  <Bundle load={ManagePageContainer}>
    {ManagePage => <ManagePage {...props} />}
  </Bundle>
);

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Router basename="/">
          <div className="root">
            <Redirect to="/home" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/lib" component={Lib} />
            <Route exact path="/manage" component={Manage} />
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

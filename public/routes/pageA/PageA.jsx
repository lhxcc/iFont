import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import HelloWorld from './../../components/test/test';
import './../../base/style/style.scss';
import './PageA.less';
import logoPic from './imgs/logo.png';
import testPic from './../../base/imgs/test.jpg';

class PageA extends Component {
  constructor() {
    super();
    this.state = {
      textVal: 'hello world ~~!'
    };
    this.handlerChange = this.handlerChange.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {}
  handlerChange(e) {
    this.setState({
      textVal: e.target.value
    });
  }
  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <a href="http://127.0.0.1:8080">
            <img alt="logoPic" src={logoPic} />
          </a>
          <HelloWorld />
          <div className="bg-box" />
          <img alt="testPic" src={testPic} />
          <br />
          <input
            value={this.state.textVal}
            onChange={this.handlerChange}
          />
        </div>
      </DocumentTitle>
    );
  }
}
export default PageA;

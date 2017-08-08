import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import './../../base/style/style.scss';
import './PageB.less';

class PageB extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <DocumentTitle title="pageB">
        <div>
          pageB  test
        </div>
      </DocumentTitle>
    );
  }
}
export default PageB;

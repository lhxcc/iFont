/**
 * Created by yaoguofeng on 2017/02/03.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import { Tabs } from 'antd';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import IconList from './../../components/iconList/IconList';
import Download from './../../components/download/Download';
import './../../components/canvasBg/StarBg';
import './Lib.less';

const TabPane = Tabs.TabPane;

class LibPage extends Component{
  constructor() {
    super();
    this.state = {
      fontName: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.refreshStore = this.refreshStore.bind(this);
  }
  changeHandler(e) {
    this.setState({
      fontName: e.target.value
    });
  }
  refreshStore() {
    this.refs.header.refreshHeadIconCount();
    this.refs.download.refreshDownloadIcons();
  }
  render() {
    return (
      <DocumentTitle  title="图标库">
        <div className="page-box">
          <div className="page-main">
            <Header active="lib" ref="header" downloadIconShow={() => {this.refs.download.show()}}/>
            <MainContent>
              <Tabs defaultActiveKey="1" animated={false}>
                <TabPane tab="官方图标库" key="1">
                  <div className="lib-main-box">
                    <IconList type="1" refreshStore={this.refreshStore}/>
                  </div>
                </TabPane>
                <TabPane tab="常用图标库" key="2">
                  <div className="lib-main-box">
                    <IconList type="2" refreshStore={this.refreshStore} />
                  </div>
                </TabPane>
              </Tabs>
            </MainContent>
          </div>
          <Footer />
          <Download ref="download" refreshStore={this.refreshStore} />
        </div>
      </DocumentTitle>
    );
  }
}
export default LibPage;

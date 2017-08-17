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
  }
  changeHandler(e) {
    this.setState({
      fontName: e.target.value
    });
  }

  render() {
    return (
      <DocumentTitle  title="图标库">
        <div className="page-box">
          <div className="page-main">
            <Header active="lib" />
            <MainContent>
              <Tabs defaultActiveKey="1" animated={false}>
                <TabPane tab="官方图标库" key="1">
                  <div className="lib-main-box">
                    <IconList type="1" />
                  </div>
                </TabPane>
                <TabPane tab="常用图标库" key="2">
                  <div className="lib-main-box">
                    <IconList type="2" />
                  </div>
                </TabPane>
              </Tabs>
            </MainContent>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
export default LibPage;

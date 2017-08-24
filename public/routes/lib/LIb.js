/**
 * Created by yaoguofeng on 2017/02/03.
 */
import React,{Component} from 'react';
import DocumentTitle from 'react-document-title';
import { Tabs } from 'antd';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import IconList from './../../components/iconList/IconList';
import './../../components/canvasBg/StarBg';
import './Lib.less';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const TabPane = Tabs.TabPane;

class LibPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fontName: '',
      type: props.match.params.type
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.refreshStore = this.refreshStore.bind(this);
    this.tabChangeHandler = this.tabChangeHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({
      fontName: e.target.value
    });
  }
  refreshStore() {
    this.refs.header.refreshHeadIcon();
  }
  tabChangeHandler(key) {
    history.replace({
      pathname: `/lib/${key}`
    });
    switch(Number(key)) {
      case 1:
        this.refs.iconlist1 && this.refs.iconlist1.initPage();
        break;
      case 2:
        this.refs.iconlist2 && this.refs.iconlist2.initPage();
        break;
    }
  }
  scrollHandler(e) {
    const {
      scrollTop,
      scrollHeight,
      offsetHeight
    } = e.target;
    if(scrollHeight - scrollTop - offsetHeight < 100) {
      switch(Number(this.state.type)) {
        case 1:
          this.refs.iconlist1 && this.refs.iconlist1.nextPage();
          break;
        case 2:
          this.refs.iconlist2 && this.refs.iconlist2.nextPage();
          break;
      }
    }
  }
  render() {
    return (
      <DocumentTitle title="图标库">
        <div onScroll={this.scrollHandler.bind(this)} className="page-box">
          <div className="page-main">
            <Header active="lib" ref="header" refreshStore={this.refreshStore} />
            <MainContent>
              <Tabs defaultActiveKey={this.state.type} animated={false} onChange={this.tabChangeHandler}>
                <TabPane tab="官方图标库" key="1">
                  <div className="lib-main-box">
                    <IconList ref="iconlist1" type="1" refreshStore={this.refreshStore}/>
                  </div>
                </TabPane>
                <TabPane tab="常用图标库" key="2">
                  <div className="lib-main-box">
                    <IconList ref="iconlist2" type="2" refreshStore={this.refreshStore} />
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

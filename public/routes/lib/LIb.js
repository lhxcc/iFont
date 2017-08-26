import React,{Component} from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      total: '?',
      type: props.match.params.type || '1',
      query: props.match.params.query || ''
    };
    this.refreshStore = this.refreshStore.bind(this);
    this.tabChangeHandler = this.tabChangeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.refreshTotal = this.refreshTotal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const oldQuery = this.props.match.params.query;
    const newQuery = nextProps.match.params.query;
    if(oldQuery !== newQuery) {
      this.setState({
        query: newQuery || ''
      });
    }
  }

  /**
   * 刷新local缓存信息
   */
  refreshStore() {
    this.refs.header.refreshHeadIcon();
    this.refs.iconlist0 && this.refs.iconlist0.refreshStoreIcon();
    this.refs.iconlist1 && this.refs.iconlist1.refreshStoreIcon();
    this.refs.iconlist2 && this.refs.iconlist2.refreshStoreIcon();
  }

  /**
   * 刷新总数
   * @param total
   */
  refreshTotal(total) {
    this.setState({
      total
    });
  }

  /**
   * 搜索事件
   * @param value
   */
  searchHandler(value) {
    this.props.history.push({
      pathname: `/lib/${encodeURIComponent(value || ' ')}/0`
    });
  }
  /**
   * tab切换时间
   * @param  {string} key 标签序号
   */
  tabChangeHandler(key) {
    this.props.history.push({
      pathname: `/lib/${encodeURIComponent(' ')}/${key}`
    });
    switch(Number(key)) {
      case 0:
        this.refs.iconlist0 && this.refs.iconlist0.initPage();
        break;
      case 1:
        this.refs.iconlist1 && this.refs.iconlist1.initPage();
        break;
      case 2:
        this.refs.iconlist2 && this.refs.iconlist2.initPage();
        break;
    }
  }
  render() {
    return (
      <DocumentTitle title="图标库">
        <div className="page-box">
          <div className="page-main">
            <Header
              query={this.state.query.trim()}
              active="lib"
              ref="header"
              hideSearch={false}
              refreshStore={this.refreshStore}
              onSearch={this.searchHandler}
            />
            <MainContent>
              {this.state.query.trim()
                ?
                <div className="query-result-box">
                  <div className="query-tip-box">
                    <span className="title">{this.state.query.trim()}</span>
                    <span className="count">{this.state.total}</span>
                    <span className="content">icons</span>
                  </div>
                  <div className="lib-main-box">
                    <IconList
                      ref="iconlist0"
                      type="0"
                      query={this.state.query}
                      refreshStore={this.refreshStore}
                      refreshTotal={this.refreshTotal}
                    />
                  </div>
                </div>
                :
                <Tabs defaultActiveKey={this.state.type} animated={false} onChange={this.tabChangeHandler}>
                  <TabPane tab="官方图标库" key="1">
                    <div className="lib-main-box">
                      <IconList
                        ref="iconlist1"
                        type="1"
                        refreshStore={this.refreshStore}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="常用图标库" key="2">
                    <div className="lib-main-box">
                      <IconList
                        ref="iconlist2"
                        type="2"
                        refreshStore={this.refreshStore}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="所有图标库" key="0">
                    <div className="lib-main-box">
                      <IconList
                        ref="iconlist0"
                        type="0"
                        refreshStore={this.refreshStore}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              }

            </MainContent>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
export default LibPage;

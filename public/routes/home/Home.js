/**
 * Created by yaoguofeng on 2017/02/03.
 */
import React,{Component} from 'react';
import DocumentTitle from 'react-document-title';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import { Input } from 'antd';
import './../../components/canvasBg/StarBg';
import './Home.less';
const Search = Input.Search;

class HomePage extends Component{
  constructor() {
    super();
    this.state = {
      fontName: ''
    };
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(value) {
    this.props.history.push({
      pathname: `/lib/${encodeURIComponent(value || ' ')}/0`
    });
  }
  render() {
    return (
      <DocumentTitle  title="首页">
        <div className="page-box">
          <div className="page-main">
            <Header
              active="home"
              ref="header"
              hideSearch={true}
            />
            <MainContent>
              <div className="home-main-box">
                <mascot className="search-mascot" />
                <div className="search-input">
                  <Search
                    className="sinput inputstyle"
                    placeholder="请输入搜素内容"
                    onChange={this.changeHandler}
                    onSearch={this.searchHandler}
                  />
                </div>
                <span className="welcome-tip">Welcome to use the iFont</span>
              </div>
            </MainContent>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
export default HomePage;

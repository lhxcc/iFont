/**
 * Created by yaoguofeng on 2017/02/03.
 */
import React,{Component} from 'react';
import DocumentTitle from 'react-document-title';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import './../../components/canvasBg/StarBg';
import './Home.less';

class HomePage extends Component{
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
      <DocumentTitle  title="首页">
        <div className="page-box">
          <div className="page-main">
            <Header active="home" />
            <MainContent>
              <div className="home-main-box">
                <mascot className="search-mascot" />
                <div className="search-input">
                  <input type="text" className="sinput inputstyle" placeholder="搜索" />
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

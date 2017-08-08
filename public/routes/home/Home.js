/**
 * Created by yaoguofeng on 2017/02/03.
 */
import reqwest from 'reqwest';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import './../../components/canvasBg/CanvasBg';
import './Home.less';

class HomePage extends Component{
  constructor() {
    super();
    this.state = {
      fontName: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({
      fontName: e.target.value
    });
  }
  clickHandler() {
    reqwest({
      url: '/api/fontIconCreate',
      method: 'post',
      data: {
        fontName: this.state.fontName || 'webFont'
      },
      success: (resData) => {}
    });
  }
  render() {
    return (
      <DocumentTitle  title="首页">
        <div>
          <Header />
          <MainContent>
            <div className="main-box">
              <mascot className="search-mascot" />
              <div className="search-input">
                <input type="text" className="sinput inputstyle" placeholder="搜索" />
              </div>
              <span className="welcome-tip">Welcome to use the iFont</span>
            </div>
          </MainContent>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
export default HomePage;

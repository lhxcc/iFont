/**
 * Created by yaoguofeng on 2017/02/03.
 */
import reqwest from 'reqwest';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from  './../../../components/header/Header';
import MainContent from './../../../components/mainContent/MainContent';
import Footer from  './../../../components/footer/Footer';
import Loading from './../../../components/Loading';
import './../../../components/canvasBg/CanvasBg';
import './index.less';

class NavbarInstance extends Component{
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
      <div>
        <Header />
        <MainContent>
          <div className="main-box">
            <mascot className="search-mascot">
              IFONT
              <Loading />
            </mascot>
            <div className="search-input">
              <input type="text" className="sinput inputstyle" placeholder="搜索" />
            </div>
            <span className="welcome-tip">Welcome to use the iFont</span>
          </div>
        </MainContent>
        <Footer />
      </div>
    );
  }
}
// 然后我们渲染到body里
ReactDOM.render(<NavbarInstance/>,document.getElementById("page"));

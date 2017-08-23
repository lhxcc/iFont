/**
 * Created by yaoguofeng on 2017/02/03.
 */
import React,{Component} from 'react';
import DocumentTitle from 'react-document-title';
import Header from  './../../components/header/Header';
import MainContent from './../../components/mainContent/MainContent';
import Footer from  './../../components/footer/Footer';
import './../../components/canvasBg/StarBg';
import './Manage.less';

class ManagePage extends Component{
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
      <DocumentTitle  title="项目管理">
        <div className="page-box">
          <div className="page-main">
            <Header active="manage" />
            <MainContent>
              <div className="manage-main-box">
                这是项目管理页面
              </div>
            </MainContent>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}
export default ManagePage;

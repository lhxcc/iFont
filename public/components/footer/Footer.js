import React from 'react';
import MainContent from './../mainContent/MainContent';
import './Footer.less';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-line" />
      <MainContent>
        <div className="Footer-content">
          <div className="copyright">
            <span>©</span>2017 杭州萤石网络有限公司&nbsp;|&nbsp;<a href="http://www.miitbeian.gov.cn/" target="_blank">浙ICP备16009593号-1</a>&nbsp;|&nbsp;
            <a href="https://service.ys7.com/policy?id=47" type="url" target="_blank">使用条款</a>
            <span>&nbsp;|&nbsp;</span>
            <a href="https://service.ys7.com/policy?id=140" type="url" target="_blank">隐私权政策</a>
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default Footer;

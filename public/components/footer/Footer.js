import React from 'react';
import MainContent from './../mainContent/MainContent';
import './Footer.less';

const Footer = () => {
  return (
    <div className="Footer">
      <MainContent>
        <div className="Footer-content">
          <div className="copyright">
            <span>©</span>{new Date().getFullYear()} 杭州萤石网络有限公司
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default Footer;

/**
 * Created by yaoguofeng on 2017/02/03.
 */
import './index.less';
import reqwest from 'reqwest';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class NavbarInstance extends Component{
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    reqwest({
      url: '/api/fontIconCreate',
      method: 'post',
      data: {},
      success: (resData) => {}
    });
  }
  render() {
    return (
      <div>
        <button
          onClick={this.clickHandler}
        >test</button>
      </div>
    );
  };
};
// 然后我们渲染到body里
ReactDOM.render(<NavbarInstance/>,document.getElementById("page"));

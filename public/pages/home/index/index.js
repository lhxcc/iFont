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
        <input
          placeholder="请输入要生成的字体名"
          value={this.state.fontName}
          onChange={this.changeHandler}
        />
        <br />
        <button
          onClick={this.clickHandler}
        >test</button>
      </div>
    );
  };
};
// 然后我们渲染到body里
ReactDOM.render(<NavbarInstance/>,document.getElementById("page"));

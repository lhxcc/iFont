/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import Loading from './../Loading';
import FetchData from './../../base/scripts/FetchData.js';
import Icon from './../icon/Icon';
import './IconList.less';

export default class IconList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: []
    }
  };
  componentWillMount() {
    this.fetchDates();
  };
  componentDidMount() {};
  renderList(data) {
    const _this = this;
    return data.map((item,i) => {
      return (
          <Icon info={item} />
      );
    });
  }
  fetchDates() {
    const fetchData = new FetchData({
      url: '/api/iconList',
      method: 'POST',
      data: {
        type: this.props.type,
        offset: 0,
        limit: 10
      }
    });
    fetchData.then((res) => {
      this.setState({
        loading: false,
        list: res.data.result
      });
    }).catch((err) => {
      debugger
    });
  }

  /**
   * 组件生命周期：正在渲染
   * @returns {XML}
     */
  render() {
    const iconList = this.renderList(this.state.list);
    return (
      <div className="icon-list-box">
        {this.state.loading
          ? <div className="loadingBox">
              <Loading/>
            </div>
          : <div>
              <ul>
                {iconList}
              </ul>

            </div>
        }
      </div>
    );
  };
};

/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import { Pagination } from 'antd';
import Loading from './../Loading';
import FetchData from './../../base/scripts/FetchData.js';
import Icon from './../icon/Icon';
import './IconList.less';

class IconList extends Component {
  constructor(props) {
    super(props);
    this.listCfg = {
      type: props.type,
      pageSize: 80
    }
    this.state = {
      loading: true,
      currentPage: 1,
      list: [],
      total: 0
    }
    this.onChange = this.onChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
  };
  componentWillMount() {
    this.initPage();
  };
  onChange(page) {
    this.fetchDates(page);
  }
  renderList(data) {
    const _this = this;
    return data.map((item,i) => {
      const todos = ['fav'];
      return (
        <Icon key={item.id} info={item} todos={todos} refreshStore={() => {this.props.refreshStore()}} />
      );
    });
  }
  initPage() {
    this.fetchDates(1);
  }
  fetchDates(page) {
    const _this = this;
    const {type, pageSize} = _this.listCfg;
    const pageStart = page -1;
    const fetchData = new FetchData({
      url: '/api/iconList',
      method: 'POST',
      data: {
        type,
        pageStart,
        pageSize
      }
    });
    fetchData.then((res) => {
      _this.setState({
        loading: false,
        currentPage: page,
        list: res.data.result,
        total: res.data.total
      });
    });
  }
  showTotal(total) {
    return `共 ${total} icons`;
  }
  /**
   * 组件生命周期：正在渲染
   * @returns {XML}
   */
  render() {
    const total = this.state.total;
    const iconList = this.renderList(this.state.list);
    return (
      <div className="icon-list-box">
        {this.state.loading
          ? <div className="loadingBox">
              <Loading />
            </div>
          : <div>
              {this.state.list.length == 0
              ? <div className="list-empty">
                  <div className="message">暂时木有内容呀～～</div>
                </div>
              : <div>
                  <div className="icon-list">
                    {iconList}
                  </div>
                  { this.state.total > this.listCfg.pageSize &&
                    <Pagination
                      size="small"
                      showTotal={this.showTotal}
                      current={this.state.currentPage}
                      pageSize={this.listCfg.pageSize}
                      onChange={this.onChange}
                      total={this.state.total}
                    />
                  }
                </div>
              }
            </div>
        }
      </div>
    );
  };
};
export default IconList;

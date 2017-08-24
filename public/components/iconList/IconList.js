/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import { Pagination } from 'antd';
import Loading from './../Loading';
import FetchData from './../../base/scripts/FetchData.js';
import Icon from './../icon/Icon';
import './IconList.less';

export default class IconList extends Component {
  constructor(props) {
    super(props);
    this.listCfg = {
      type: props.type,
      currentPage: 0,
      pageSize: 1
    }
    this.state = {
      loading: true,
      list: [],
      total: 0
    }
    this.onChange = this.onChange.bind(this);
  };
  componentWillMount() {
    this.initPage();
  };
  onChange(page) {
    this.listCfg.currentPage = page-1;
    this.fetchDates();
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
    this.listCfg.currentPage = 0;
    this.fetchDates();
  }
  fetchDates() {
    const _this = this;
    const {type, pageSize} = _this.listCfg;
    const pageStart = _this.listCfg.currentPage;
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
        list: res.data.result,
        total: res.data.total
      });
    });
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
              ? <div>暂时木有内容呀～～</div>
              : <div>
                  <div className="icon-list">
                    {iconList}
                  </div>
                  { this.state.total > this.listCfg.pageSize &&
                    <Pagination
                      current={this.state.currentPage + 1}
                      defaultPageSize={this.listCfg.pageSize}
                      onChange={this.onChange} total={this.state.total}
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

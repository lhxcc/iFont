/**
 * Created by yaoguofeng on 2017/08/16.
 */

import React, {Component} from 'react';
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'
import Loading from './../Loading';
import FetchData from './../../base/scripts/FetchData.js';
import Icon from './../icon/Icon';
import './IconList.less';

export default class IconList extends Component {
  constructor(props) {
    super(props);
    this.listCfg = {
      type: props.type,
      pageStart: 0,
      pageSize: 10
    }
    this.state = {
      loading: true,
      list: [],
      total: 0
    }
    this.nextPage = this.nextPage.bind(this);
  };
  componentWillMount() {
    this.initPage();
  };
  nextPage() {
    this.listCfg.pageStart += 1;
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
    this.listCfg.pageStart = 0;
    this.fetchDates();
  }
  fetchDates() {
    const {type, pageStart, pageSize} = this.listCfg;
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
      this.setState({
        loading: false,
        list: this.state.list.concat(res.data.result),
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
          : <LimitedInfiniteScroll
              className="icon-list"
              limit={5}
              hasMore={total === undefined || iconList.length < total}
              spinLoader={<div className="loader"><Loading /></div>}
              mannualLoader={<span className="loadmore">Load More</span>}
              loadNext={this.nextPage}
            >
              {iconList}
            </LimitedInfiniteScroll>
        }
      </div>
    );
  };
};

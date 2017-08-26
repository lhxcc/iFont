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
    this.state = {
      type: props.type || 1,
      loading: true,
      currentPage: 1,
      query: props.query || '',
      list: [],
      total: 0,
      pageSize: 80
    };
    this.onChange = this.onChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
  }
  componentWillMount() {
    this.initPage();
  }
  componentWillReceiveProps(nextProps) {
    const oldQuery = this.props.query;
    const newQuery = nextProps.query;
    if(oldQuery !== newQuery) {
      this.setState({
        query: newQuery
      });
      this.fetchDates(this.state.currentPage, newQuery);
    }
  }
  /**
   * 初始化列表
   */
  initPage() {
    this.fetchDates(1, this.state.query);
  }

  /**
   * 分页改变事件
   * @param page
   */
  onChange(page) {
    this.fetchDates(page, this.state.query);
  }

  /**
   * 渲染列表
   * @param data 列表数据
   */
  renderList(data) {
    return data.map((item, i) => {
      const todos = ['fav'];
      return (
        <Icon
          key={item.id}
          info={item}
          ref={`icon_${i}`}
          todos={todos}
          refreshStore={() => {this.props.refreshStore()}}
        />
      );
    });
  }

  /**
   * 缓存变化刷新列表信息
   */
  refreshStoreIcon() {
    const len = this.state.list.length;
    for(let i = 0; i < len ; i++){
      const iconI = `icon_${i}`;
      this.refs[iconI].refresh();
    }
  }
  /**
   * 获取列表信息
   * @param page
   */
  fetchDates(page, query) {
    const _this = this;
    const {type, pageSize} = _this.state;
    const pageStart = page -1;
    const fetchData = new FetchData({
      url: '/api/iconList',
      method: 'POST',
      data: {
        type,
        pageStart,
        pageSize,
        query
      }
    });
    fetchData.then((res) => {
      _this.setState({
        loading: false,
        currentPage: page,
        list: res.data.result,
        total: res.data.total
      });
      this.props.refreshTotal && this.props.refreshTotal(res.data.total);
    });
  }

  /**
   * f分页端显示总数
   * @param total 总数
   * @returns {string} 显示内容
   */
  showTotal(total) {
    return `共 ${total} icons`;
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
                  { this.state.total > this.state.pageSize &&
                    <Pagination
                      size="small"
                      showTotal={this.showTotal}
                      current={this.state.currentPage}
                      pageSize={this.state.pageSize}
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

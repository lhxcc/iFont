const util = {
  /**
   * 生成随机字符串
   * @param l 生成字符串位数
   * @returns {string}
   */
  randomStr: (l) => {
    let index = l || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const length = chars.length;
    let result = '';
    while (index) {
      index -= 1;
      result += chars.charAt(Math.floor(Math.random() * length));
    }
    return result;
  },
  /**
   * 时间格式
   * @param time 需要转换的时间如：new Date()
   * @param fmt 时间格式：如：'yyyy-MM-dd hh:mm:ss'
   * @returns 返回安装时间格式的时间
   */
  format: (time, fmt) => {
    let result = fmt;
    const o = {
      'y+': time.getFullYear(),
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
    };
    if (/(y+)/.test(fmt)) {
      const fullYear = time.getFullYear();
      result = fmt.replace(RegExp.$1, (`${fullYear}`).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((item) => {
      const value = o[item];
      if (new RegExp(`(${item})`).test(result)) {
        result = result.replace(RegExp.$1,
          (RegExp.$1.length === 1) ? value : ((`00${value}`).substr(`${value}`.length)));
      }
    });
    return result;
  },
  /**
   * 时间格式
   * @param time 需要转换的时间如：new Date()
   * @param fmt 时间格式：如：'yyyy-MM-dd hh:mm:ss'
   * @returns 返回安装时间格式的时间
   */
  dataFormat: (time, fmt) => {
    const t = util.format(new Date(time), fmt);
    const space = ' ';
    const n = util.format(new Date(), fmt.split(space)[0]) + space;
    return t.replace(n, '');
  },
  /**
   * 获取dom的位置
   * @param obj dom元素
   */
  getElemPos: (obj) => {
    let dom = obj;
    const pos = {
      top: 0,
      left: 0,
    };
    if (dom.offsetParent) {
      while (dom.offsetParent) {
        pos.top += dom.offsetTop;
        pos.left += dom.offsetLeft;
        dom = dom.offsetParent;
      }
    } else if (dom.x) {
      pos.left += dom.x;
    } else if (dom.x) {
      pos.top += dom.y;
    }
    return {
      x: pos.left,
      y: pos.top,
    };
  },
  getZhAddress: (zhArea, adCode, detailAddress) => {
    const ac = adCode * 1;
    const provinceCode = `${ac - (ac % 10000)}`;
    const cityCode = `${ac - (ac % 100)}`;
    return `${zhArea[provinceCode]}${zhArea[cityCode]}${zhArea[adCode]}${detailAddress}`;
  },
  /**
   * 数字每个三位加逗号效果
   * @param num
   * @returns {string} 处理后的数据
   */
  formatNum: (num) => {
    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
      return num;
    }
    const a = RegExp.$1;
    let b = RegExp.$2;
    const c = RegExp.$3;
    const re = /(\d)(\d{3})(,|$)/;
    while (re.test(b)) b = b.replace(re, '$1,$2$3');
    return `${a}${b}${c}`;
  }
};

export default util;

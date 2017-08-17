/**
 * Created by yaoguofeng on 2017/08/16.
 */

export default class FetchData {
  constructor(obj) {
    let {
      url,
      data,
      cookie,
      method,
      headers
    } = obj;

    let body,
        contentType = 'application/x-www-form-urlencoded';

    method = method || 'POST';

    headers = headers || {};
    headers['Accept'] = 'application/json';

    //创建表单对象
    if(data instanceof FormData) {
      body = data;
      contentType = '';
    } else {
      let paramStrs = [], o;
      for(o in data) {
        paramStrs.push(`${o}=${encodeURIComponent(data[o])}`);
      }

      body = paramStrs.join('&');
    }

    let fetchReqObj = {
          method: method,
          headers: headers
        };

    !!body && (fetchReqObj.body = body);
    !!contentType && (fetchReqObj.headers['content-type'] = contentType);
    cookie && (fetchReqObj.credentials = 'include');
    const promise = new Promise((resolve, reject) => {
      fetch(url, fetchReqObj)
      .then(resData => {
        if(resData.status == 200 || resData.status == 304) {
          resData.json().then(jsonData => {
            this.doSuccess(jsonData, resolve, reject);
          });
        } else {
          this.doError(resData, reject);
        }
      })
      .catch(err => {
        this.doError(err, reject);
      });
    });

    return promise;
  }
  doSuccess(data, resolve, reject) {
    if(data.code === 0) {
      resolve(data);
      //console && console.info(data);
    } else {
      reject(data);
      console && console.warn(data);
    }
  }

  doError(err, reject) {
    reject(err);
  }
}

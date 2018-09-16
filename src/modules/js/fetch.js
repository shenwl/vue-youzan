import axios from 'axios';


const fetch = function(url, type='get', data) {
  return new Promise((resolve, reject) => {
    if(type.toLowerCase() === 'post') {
      axios.post(url, data).then(res => {
        let status = res.data.status;
        if(status === 200) {
          resolve(res);
        }
        reject(res);
      }).catch(error => {
        reject(error);
      })
    } else if(type.toLowerCase() === 'get') {
      axios.get(url, data).then(res => {
        let status = res.data.status;
        if(status === 200) {
          resolve(res);
        }
        reject(res);
      }).catch(error => {
        reject(error);
      })
    } else {
      console.error('非法的请求方法');
    }
  })
}

export default fetch;

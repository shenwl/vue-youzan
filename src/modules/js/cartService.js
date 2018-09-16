import fetch from './fetch';
import url from 'js/api';


export default class {
  static getList() {
    return fetch(url.cartList, 'post');
  }
  static add(id) {
    return fetch(url.cartAdd, 'post', {
      id: id,
      number: 1,
    });
  }
  static reduce(id) {
    return fetch(url.cartReduce, 'post', {
      id: id,
      number: 1,
    });
  }
  static remove(id) {
    return fetch(url.cartRemove, 'post', {
      id: id,
    });
  }
  static mrremove(goodsList) {
    let ids = [];
    goodsList.forEach(goods => {
      ids.push(goods.id);
    });
    return fetch(url.cartMrremove, 'post', {
      ids: ids,
    });
  }
}

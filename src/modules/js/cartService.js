import fetch from './fetch';
import url from 'js/api';


export default class {
  static getList() {
    return fetch(url.cartList, 'post')
  }
  static add(id) {
    return fetch(url.cartAdd, 'post', {
      id: id,
      number: 1,
    })
  }
  static reduce(id) {
    return fetch(url.cartReduce, 'post', {
      id: id,
      number: 1,
    })
  }
  static remove(id) {
    let data = {
      id: id,
    };
    if(id instanceof Array) {
      data = {
        ids: id
      }
    }
    return fetch(url.cartRemove, 'post', data)
  }
}

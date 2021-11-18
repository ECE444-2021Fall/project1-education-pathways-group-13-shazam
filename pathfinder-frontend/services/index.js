'use strict';

import { courses, user } from './mockdata';

import axios from 'axios';

//Singleton object
class Service {
  #user = null;
  baseurl = '';

  constructor(baseurl) {
    if (!Service.instance) {
      this.baseurl = baseurl;
      Service.instance = this;
    }
    return Service.instance;
  }

  async _request(request) {
    const response = await axios(request);
    return response;
  }

  async search(query, filter = '') {
    // for now just returns mock data
    return Promise.resolve(courses);
  }

  //TODO - remove test name
  async getUser(name = 'test') {
    if (this.#user) return Promise.resolve(this.#user);
    else {
      this.#user = user;
      // return mock data for now
      return Promise.resolve(this.#user);
    }
  }
  async getUserCart() {
    if (this.#user) return Promise.resolve(this.#user.cart);
    else {
      await this.getUser();
      // return mock data for now
      return Promise.resolve(this.#user.cart);
    }
  }
  async postUser(name = 'test', data) {
    this.#user = { ...this.#user, ...data };
    return Promise.resolve();
  }
  async postUserCart(data) {
    return this.postUser('', data);
  }
}

const api = new Service('');
// freeze it so no one can add or expand this api
// during runtime
Object.freeze(api);
export default api;

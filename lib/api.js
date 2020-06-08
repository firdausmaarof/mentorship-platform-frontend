import axios from 'axios';
import qs from 'query-string';
import Cookies from 'js-cookie';

const urls = {
  development: 'http://localhost:3001/api',
  production: 'https://mentor-api.firdausmaarof.com/api',
};

class Api {
  static uri(path) {
    const ROOT_URL = urls[process.env.NODE_ENV];

    return ROOT_URL + path;
  }

  static headers() {
    return {
      'content-type': 'application/json',
      accept: 'application/json',
    };
  }

  static headersWithToken(options) {
    return Object.assign(Api.headers(), {
      authorization: Api.getToken(),
    });
  }

  static request(resources, params, opts = {}) {
    let headers = !Api.hasToken(params)
      ? Api.headers()
      : opts.headers
      ? opts.headers
      : Api.headersWithToken(params);

    let endpoint = Api.uri(resources);

    let options = Object.assign(
      {},
      {
        url: endpoint,
        mode: 'cors',
        headers,
      },
      opts
    );

    return axios(endpoint, options);
  }

  static get(resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      method: 'GET',
      data: null,
    });

    resources = !params ? resources : resources + '?' + qs.stringify(params);

    return Api.request(resources, null, opts);
  }

  static post(resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: Api.serialize(params),
      method: 'POST',
    });

    return Api.request(resources, params, opts);
  }

  static put(resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: Api.serialize(params),
      method: 'PUT',
    });

    return Api.request(resources, params, opts);
  }

  static delete(resources, params, opts = {}) {
    opts = Object.assign({}, opts, {
      data: Api.serialize(params),
      method: 'DELETE',
    });

    return Api.request(resources, params, opts);
  }

  static serialize(params) {
    return JSON.stringify(params);
  }

  static hasToken(options) {
    return Api.getToken() ? true : false;
  }

  static getToken() {
    return Cookies.get('token');
  }
}

export default Api;

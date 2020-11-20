import fetch from 'dva/fetch';
import axios from 'axios'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

async function request(url, options) {
  
  if(options !== undefined) {
    const data = options.body ?  options.body :  {};
    
  return await axios({
    method:options.method,
    url:url,
    data :data
    })
  }  
  return  await axios(url,options);
}

export default request;

import axios from 'axios'
import store from 'store'
import Errors from 'helpers/Errors.js'

class Form {

  /*
   * To initialize the form
   *
   *@
   */
  constructor(data) {
    this.originalData = data;

    for(let field in data) { 
      this[field] = data[field] 
    }

    this.errors = new Errors
  }

  /*
   * To reset the form after successful completion of request
   *
   *@
   */
  reset() {
    let data = {}
    for(let field in this.originalData) {
      this[field] = ''
    }
  }

  /*
   * Get the form data
   *
   *@
   */
  data() {
    let data = {}
    for(let field in this.originalData) {
      data[field] = this[field];
    }
    return data;
  }

  /*
   * To send a patch request to the server
   *
   *@
   */
   patch(url) {
    return this.submit('patch', url);
   }

  /*
   * To get details from the server
   *
   *@
   */
   get(url) {
    return this.submit('get', url);
   }

  /*
   * To send a post request to the server
   *
   *@
   */
  post(url) {
    return this.submit('post', url);
  }

  /*
   * To submit a request to the server
   *
   *@
   */
  submit(requestType, url) {
    let baseUrl = store.getters.api.baseUrl;
    let api_token = store.getters.user.api_token;
    let company_id = store.getters.company.id;
    axios.defaults.headers.common['Authorization'] = "Bearer " + api_token;
    axios.defaults.headers.common['company-id'] = company_id;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

    return new Promise((resolve, reject) => {
      axios[requestType](baseUrl + url, this.data())  
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error.response.data.errors) 
          reject(error.response.data.errors) 
        })
    }) 
  }

  /*
   * If the request is successful
   *
   *@
   */
  onSuccess(data) {
    // this.reset();
    this.errors.clear();
    // alert('Successfully handling in api!');
  }

  /*
   * If the request fails
   *
   *@
   */
  onFail(errors) {
    this.errors.record(errors); 
  }

  /*
   * Validation errors if exists
   *
   *@
   */
  validate(refs) {
    Object.keys(refs).forEach(item => {
      if(refs[item])
        item != 'originalData' ? refs[item].validate(true) : '' 

    })
  }

}

export default Form;
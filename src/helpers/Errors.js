class Errors {

  /*
   * TO initalise the errors object
   *
   *@
   */
  constructor() {
    this.errors = {}
  }

  /*
   * To check if that error exists
   *
   *@
   */
  has(field) {
    return !!this.errors.hasOwnProperty(field);
  }

  /*
   * If there is any error 
   *
   *@
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }

  /*
   * To get the error text
   *
   *@
   */
  get(field) { 
    if(this.errors[field]) {
      return this.errors[field][0];
    }
  } 

  /*
   * Record new errors
   *
   *@
   */
  record(errors) {
    this.errors = errors
  }

  /*
   * To clear the error
   *
   *@
   */
  clear(field) {
    if(field) {
      delete this.errors[field]
      return
    };
    this.errors = {}
  }

}

export default Errors;
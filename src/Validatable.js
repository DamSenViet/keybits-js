class Validatable {

  validate() {
    return true;
  }

  get isValid() {
    try {
      this.validate();
      return true;
    }
    catch (Error) {
      return false;
    }
  }
}

export default Validatable;
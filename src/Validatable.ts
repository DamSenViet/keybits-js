class Validatable {

  validate() {}

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
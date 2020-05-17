class Validatable {

  public validate(): void {
    return;
  }

  public get isValid(): boolean {
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
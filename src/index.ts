let test:string = "test";

const throwThis = (): void => {
  throw new Error();
};

export default test;
export {
  throwThis,
  test,
};
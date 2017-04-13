export class Test {
  private mTest: string

  constructor(message: string) {
    this.mTest = message
  }

  public sayHello() {
    return this.mTest
  }
}

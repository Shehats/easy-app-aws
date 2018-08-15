import * as ApiBuilder from 'claudia-api-builder';
// import * as aws from 'aws-sdk';

class App {
  private app: any;
  constructor () {
    this.app = new ApiBuilder();
  }
}
import * as ApiBuilder from 'claudia-api-builder';
import * as AWS from 'aws-sdk';
import * as dynamo from 'dynamodb';

export interface AppConfig {
  configPath: string, 
  useDynamo?: boolean, 
  dynamoConfig?: any
}

export class App {
  private _app: any;
  constructor (config: AppConfig) {
    this._app = new ApiBuilder();
    if (config.useDynamo) {
    dynamo.AWS.config.loadFromPath(config.configPath);
    let dynamoDB = (config.dynamoConfig) ? new AWS.DynamoDB(config.dynamoConfig): new AWS.DynamoDB();
    dynamo.dynamoDriver(dynamoDB);
    dynamo.createTables((err) => {
      if (err)
        console.log('Error creating tables: ', err);
      else 
        console.log('Tables has been created');
      });
    }
  }
  get App() {
    return this._app;
  }
}
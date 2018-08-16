import { App, AppConfig } from './app';
import { Easily, is } from 'easy-injectionjs';

export const EasyApp = <T extends {new(...args:any[]):{}}>
(config: AppConfig) => function(target: T): any {
  let app = new App(config);
  Easily('App', app.App)
  let controllers = <any[]>is('Controller_Stack');
  while (controllers && controllers.length > 0) {
    let curn = controllers.pop();
    new curn.controller(app.App, curn.entity, curn.routes, curn.target);
  }
}

export const getApp = () => (<any>is('App'));
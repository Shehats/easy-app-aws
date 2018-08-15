import { Routes } from '../models/model';
import { is, Easily } from 'easy-injectionjs';

export abstract class Controller <T> {
  private _app: any;
  private _entity: any;
  private _routes: Routes;
  private _target: (new(...args: any[]) => T);

  constructor(app: any,
              entity: any,
              routes: Routes, 
              target: (new(...args: any[]) => T)){
    this._app = app;
    this._entity = entity;
    this._routes = routes;
    this._target = target;
  }

  get App() {
    return this._app;
  }
  get Entity() {
    return this._entity;
  }
  get Routes() {
    return this._routes;
  }
  get Target() {
    return this._target;
  }
}

export class BasicController<T> extends Controller<T> {
  constructor(app: any,
              entity: any,
              routes: Routes, 
              target: (new(...args: any[]) => T)) {
    
    super(app, entity, routes, target);
    app.get(`/${routes.getUrl}`, req => 
      entity.scan().loadAll().exec());

    app.get(`/${routes.getByIdUrl}/{id}`, req => 
      entity.query(req.pathParams.id).exec());

    app.post(`/${routes.postUrl}`, req => 
      entity.create(req.body), {success: 201});

    app.put(`/${routes.putUrl}/{id}`, req =>
      entity.update(req.body),{ succes: 201 });

    app.delete(`/${routes.deleteUrl}/{id}`, req => 
      entity.delete(req.pathParams.id), { succes: 203 });
  }
}
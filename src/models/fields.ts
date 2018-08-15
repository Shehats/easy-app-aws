import { Easily, is } from 'easy-injectionjs';
import 'reflect-metadata';
import { createType } from './helpers';

export interface Field {
  type: any,
  name: string,
  params?: string | any | any[]
}

export const column = (params?: string | any | any[]) => function (target: Object, key: string) {
  let field: Field = {
    type: createType(<string>params,Reflect.getMetadata("design:type", target, key).name),
    name: key,
    params: params
  }
  let stack = <Field[]>is(target.constructor.name+'_Fields') || [];
  stack.push(field)
  Easily(target.constructor.name+'_Fields', stack);
}

export const id = (params?: string | any | any[]) => function (target: Object, key: string) {}

export const key = (params?: string | any | any[]) => function (target: Object, key: string) {}

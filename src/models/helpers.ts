import * as Joi from 'joi';
import * as dynamo from 'dynamodb';
import { Easily, is } from 'easy-injectionjs';
import { Field } from './fields';


export const createType = (config: string, type: string) =>
  (type === 'String' && config === 'email')
  ? Joi.string().email()
  : (type === 'String')
  ? Joi.string()
  : (type === 'Number')
  ? Joi.number()
  : (config === 'set')
  ? dynamo.types.stringSet()
  : (type === 'Boolean')
  ? Joi.boolean()
  : (type === 'Date')
  ? Joi.date()
  : null

export const createSchema = <T extends {new(...args: any[]):{}}> (target: T) => {
  let stack = <Field[]>is(target.name+'_Fields')
  let schema = {};
  while (stack) {
    let x = stack.pop();
    schema[x.name] = x.type;
  }
  dynamo.define(target.name, schema);
}
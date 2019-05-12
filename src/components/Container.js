import React from 'react';
import { classNames } from 'react-extras';
import './Container.scss';
/**
 * @param {any} [props]
 */
export function Container({ className, ...props }) {
  return <div className={classNames('Container', className)} {...props} />;
}

import React, { FunctionComponent } from 'react';

import $ from './ErrorMessage.module.css';

interface ErrorMessageprops {
  children: string
}

const ErrorMessage:FunctionComponent<ErrorMessageprops>  = ({children}) => {
  return (
    <div className={$.error}>{children}</div>
  )
}

export default ErrorMessage
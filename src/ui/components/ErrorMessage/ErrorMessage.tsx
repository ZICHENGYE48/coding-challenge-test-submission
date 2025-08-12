import React, { FunctionComponent } from 'react';

import $ from './ErrorMessage.module.css';

interface ErrorMessageprops {
  children: string
}

const ErrorMessage:FunctionComponent<ErrorMessageprops>  = ({children}) => {
  return (
    <p className={$.error}>{children}</p>
  )
}

export default ErrorMessage